from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from agent import app as agent_graph

# Create FastAPI app
app = FastAPI(
    title="Medical Agent API",
    description="Multi-specialist medical AI analysis system",
    version="1.0.0"
)


class AnalyzeRequest(BaseModel):
    text: str
    top_k: int = 5


class AssessmentItem(BaseModel):
    role: str
    specialist_key: str
    assessment: str


class AnalyzeResponse(BaseModel):
    assessments: List[AssessmentItem]
    final_summary: str


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    """
    Analyze medical case with multiple specialists.
    
    Args:
        text: Medical case description
        top_k: Number of specialists to consult (1-20, default 5)
    
    Returns:
        AnalyzeResponse with specialist assessments and final summary
    """
    # Validate top_k
    if not (1 <= request.top_k <= 20):
        raise HTTPException(status_code=400, detail="top_k must be between 1 and 20")
    
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="text cannot be empty")
    
    try:
        # Initialize state
        initial_state = {
            "case_description": request.text,
            "top_k": request.top_k,
            "specialist_key": "",
            "specialists_to_run": [],
            "assessments": [],
            "final_summary": ""
        }
        
        # Run the agent graph
        result = agent_graph.invoke(initial_state)
        
        # Format response
        assessments = [
            AssessmentItem(
                role=a["role"],
                specialist_key=a.get("specialist_key", ""),
                assessment=a["assessment"]
            )
            for a in result["assessments"]
        ]
        
        return AnalyzeResponse(
            assessments=assessments,
            final_summary=result["final_summary"]
        )
        
    except Exception as e:
        import traceback
        print(f"Detailed error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)    