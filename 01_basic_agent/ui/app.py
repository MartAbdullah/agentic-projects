import streamlit as st

# Sayfa Ayarları
st.set_page_config(
    page_title="Gezondhied - Medical AI Assistant", 
    page_icon="➕", 
    layout="wide"
)

# Arayüz Stili (CSS)
st.markdown("""
<style>
    .main-header { font-size: 3rem; font-weight: 700; color: #007BFF; margin-bottom: 0.5rem; }
    .sub-header { font-size: 1.5rem; color: #6C757D; margin-bottom: 2rem; }
    .card {
        background-color: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        border: 1px solid #dee2e6;
        height: 100%;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover { transform: translateY(-5px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .card-icon { font-size: 3rem; margin-bottom: 1rem; }
    .card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
    .card-text { color: #6c757d; margin-bottom: 1.5rem; }
    .stButton > button { width: 100%; border-radius: 8px; font-weight: 600; }
</style>
""", unsafe_allow_html=True)

# Title & Subtitle
st.markdown('<h1 class="main-header">➕ Gezondhied</h1>', unsafe_allow_html=True)
st.markdown('<p class="sub-header">Medical AI Assistant Dashboard</p>', unsafe_allow_html=True)

st.markdown("### Welcome to the Gezondhied Medical AI Assistant Dashboard!")

# Dashboard Cards
col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("""
    <div class="card">
        <div class="card-icon">👤</div>
        <div class="card-title">Patient Dashboard (Basic Agent)</div>
        <p class="card-text">Reflection Loop.</p>
        <p style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Aktif <span style="font-size: 0.9rem; color: #6c757d;">Basic Agent</span></p>
    </div>
    """, unsafe_allow_html=True)
    if st.button("Start Analysis (Patient)", key="btn_patient"):
        st.switch_page("pages/1_Patient.py")

with col2:
    st.markdown("""
    <div class="card">
        <div class="card-icon">👥</div>
        <div class="card-title">Specialist Dashboard</div>
        <p class="card-text">Intermediate Agent</p>
        <p style="font-size: 1.2rem; color: #6c757d;"><i>Coming soon..</i></p>
    </div>
    """, unsafe_allow_html=True)
    st.button("Find Specialists", key="btn_specialist", disabled=True)

with col3:
    st.markdown("""
    <div class="card">
        <div class="card-icon">📄</div>
        <div class="card-title">Document Dashboard</div>
        <p class="card-text">Advanced Agent</p>
        <p style="font-size: 1.2rem; color: #6c757d;"><i>Coming soon..</i></p>
    </div>
    """, unsafe_allow_html=True)
    st.button("Browse Documents", key="btn_document", disabled=True)

st.divider()

# Example Analysis View
col_left, col_right = st.columns([2, 1])

