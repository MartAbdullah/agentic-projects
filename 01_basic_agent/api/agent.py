import os
import json
import operator
from typing import Annotated, TypedDict, Union
from dotenv import load_dotenv
from litellm import completion
from langgraph.graph import StateGraph, END

load_dotenv()

# Model konfigürasyonu
LLM_MODEL = os.getenv("LLM_MODEL", "gemini-2.5-flash")

class AgentState(TypedDict):
    input_text: str
    messages: Annotated[list, operator.add]
    draft: str
    feedback: str
    is_approved: bool

def generator_node(state: AgentState):
    """Tibbi özet taslağı oluşturur veya geri bildirime göre düzenler."""
    input_text = state["input_text"]
    feedback = state.get("feedback", "")
    
    prompt = f"Summarize the following patient symptoms professionally. Do NOT provide a diagnosis.\n\nSymptoms: {input_text}"
    if feedback:
        prompt += f"\n\nPrevious feedback to address: {feedback}"
    
    response = completion(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )
    
    draft = response.choices[0].message.content
    return {
        "draft": draft,
        "messages": [f"[GENERATOR]: {draft}"]
    }

def critic_node(state: AgentState):
    """Taslağı güvenlik ve doğruluk açısından inceler."""
    draft = state["draft"]
    
    prompt = (
        "Review the following medical summary. Ensure: \n"
        "1. No explicit diagnosis is made.\n"
        "2. Professional tone.\n"
        "3. No hallucinations.\n"
        "Output your response in JSON format with keys 'is_approved' (bool) and 'feedback' (str).\n\n"
        f"Summary: {draft}"
    )
    
    response = completion(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0,
        response_format={"type": "json_object"}
    )
    
    result = json.loads(response.choices[0].message.content)
    return {
        "is_approved": result["is_approved"],
        "feedback": result["feedback"],
        "messages": [f"[CRITIC]: approved={result['is_approved']} | Feedback: {result['feedback']}"]
    }

def should_continue(state: AgentState):
    """Döngünün devam edip etmeyeceğine karar verir."""
    if state["is_approved"]:
        return END
    return "generator"

# Graph Oluşturma
workflow = StateGraph(AgentState)

workflow.add_node("generator", generator_node)
workflow.add_node("critic", critic_node)

workflow.set_entry_point("generator")

workflow.add_edge("generator", "critic")
workflow.add_conditional_edges(
    "critic",
    should_continue,
    {
        "generator": "generator",
        END: END
    }
)

app = workflow.compile()