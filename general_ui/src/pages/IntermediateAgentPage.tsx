import { useState, useEffect } from 'react';
import { SendIcon, Loader2Icon, UsersIcon } from '../icons';

interface SpecialistAnalysis {
  specialist: string;
  assessment: string;
}

interface AnalysisResult {
  case_summary: string;
  specialist_assessments: SpecialistAnalysis[];
  unified_summary: string;
  specialists_count: number;
}

// Specialist Database with Descriptions
const SPECIALIST_DATABASE: Record<string, { fullName: string; description: string; emoji: string; color: string }> = {
  'Cardiologist': { fullName: 'Dr. Sarah Mitchell', description: 'Heart & Cardiovascular System Specialist', emoji: '❤️', color: 'from-red-500 to-red-600' },
  'Nephrologist': { fullName: 'Dr. Ahmed Hassan', description: 'Kidney & Renal System Specialist', emoji: '🫘', color: 'from-blue-500 to-blue-600' },
  'Endocrinologist': { fullName: 'Dr. Emily Johnson', description: 'Metabolic & Hormonal Disorders Specialist', emoji: '⚗️', color: 'from-purple-500 to-purple-600' },
  'Clinical Pharmacist': { fullName: 'Dr. Michael Chen', description: 'Medication & Drug Therapy Expert', emoji: '💊', color: 'from-green-500 to-green-600' },
  'Pulmonologist': { fullName: 'Dr. Lisa Anderson', description: 'Respiratory & Lung System Specialist', emoji: '💨', color: 'from-cyan-500 to-cyan-600' },
  'Geriatrician': { fullName: 'Dr. Robert Williams', description: 'Elderly Health & Aging Specialist', emoji: '👴', color: 'from-amber-500 to-amber-600' },
  'Neurologist': { fullName: 'Dr. James Brown', description: 'Nervous System & Brain Specialist', emoji: '🧠', color: 'from-violet-500 to-violet-600' },
  'Psychiatrist': { fullName: 'Dr. Maria Garcia', description: 'Mental Health & Psychology Specialist', emoji: '🧘', color: 'from-pink-500 to-pink-600' },
  'Rheumatologist': { fullName: 'Dr. David Kumar', description: 'Autoimmune & Joint Disorders Specialist', emoji: '🦴', color: 'from-orange-500 to-orange-600' },
  'Radiologist': { fullName: 'Dr. Emma Thompson', description: 'Medical Imaging & Diagnostics Expert', emoji: '🖼️', color: 'from-slate-500 to-slate-600' },
};

export default function IntermediateAgentPage() {
  const [medicalCase, setMedicalCase] = useState('');
  const [specialistsCount, setSpecialistsCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [popupSpec, setPopupSpec] = useState<string | null>(null);

  // Auto-hide snackbar after 5 seconds
  useEffect(() => {
    if (popupSpec) {
      const timer = setTimeout(() => {
        setPopupSpec(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [popupSpec]);

  const handleAnalyze = async () => {
    if (!medicalCase.trim()) {
      setError('Please enter a medical case');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setActiveTab(null);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          case: medicalCase,
          top_k: specialistsCount,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      if (data.specialist_assessments?.length > 0) {
        setActiveTab(data.specialist_assessments[0].specialist);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze case');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMedicalCase('');
    setResult(null);
    setError('');
    setActiveTab(null);
    setSpecialistsCount(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 sm:px-6 lg:px-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center space-x-3 bg-purple-500/20 border border-purple-500/40 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">02</span>
            </div>
            <span className="text-purple-200 font-semibold text-sm">Multi-Specialist Agent</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Medical Case Analysis</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Enter a patient case and let AI specialists analyze it in parallel. Get comprehensive, multi-perspective medical insights.
          </p>
        </div>

        {/* Main Content - Full Width Stacked Layout */}
        <div className="space-y-8">
          {/* Patient Case - Full Width Top */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
            <label className="block text-white font-bold mb-4 text-lg">Patient Case</label>
            <textarea
              value={medicalCase}
              onChange={(e) => setMedicalCase(e.target.value)}
              placeholder="68-year-old female with shortness of breath, bilateral leg swelling, and weight gain. PMH: hypertension, type 2 diabetes..."
              className="w-full h-32 bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/30 resize-none transition-all backdrop-blur-sm"
            />
          </div>

          {/* Controls - Patient Case Config */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specialists Slider */}
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <label className="text-white font-bold text-lg">Specialists to Consult</label>
                <span className="text-3xl font-bold text-purple-400">{specialistsCount}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={specialistsCount}
                  onChange={(e) => setSpecialistsCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                1 = Single specialist • {specialistsCount} = Current • 20 = Maximum coverage
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 justify-end">
              <button
                onClick={handleAnalyze}
                disabled={loading || !medicalCase.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2Icon size={20} className="animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <SendIcon size={20} />
                    <span>Analyze</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-4 rounded-xl transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Section - Full Width Below */}
          {loading && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl p-16 text-center backdrop-blur-sm">
              <Loader2Icon size={64} className="animate-spin text-purple-400 mx-auto mb-6" />
              <p className="text-gray-300 text-xl font-semibold">
                Analyzing case with {specialistsCount} specialist{specialistsCount !== 1 ? 's' : ''}...
              </p>
              <p className="text-gray-400 text-sm mt-3">Running specialist analyses in parallel</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-8">
              {/* Case Overview - Full Width */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">📋</div>
                  <h3 className="text-2xl font-bold text-white">Case Overview</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">{result.case_summary}</p>
              </div>

              {/* Specialist Assessments - Full Width */}
              {result.specialist_assessments && result.specialist_assessments.length > 0 && (
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <UsersIcon size={28} className="text-purple-400" />
                    <h3 className="text-2xl font-bold text-white">
                      Specialist Assessments 
                      <span className="text-purple-400 ml-3">({result.specialists_count})</span>
                    </h3>
                  </div>

                  {/* Tabs - Full Width */}
                  <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-800/50 rounded-xl border border-slate-700/30 backdrop-blur-sm overflow-visible relative">
                    {result.specialist_assessments.map((assessment) => {
                      const specInfo = SPECIALIST_DATABASE[assessment.specialist] || {
                        fullName: 'Dr. Medical Specialist',
                        description: 'Medical Specialist',
                        emoji: '👨‍⚕️',
                        color: 'from-blue-500 to-blue-600',
                      };
                      return (
                        <div key={assessment.specialist} className="relative">
                          <button
                            onClick={() => {
                              setActiveTab(assessment.specialist);
                              setPopupSpec(assessment.specialist);
                            }}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                              activeTab === assessment.specialist
                                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                            }`}
                          >
                            {assessment.specialist}
                          </button>

                          {/* Popup Card - Shows on click */}
                          {popupSpec === assessment.specialist && (
                            <>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Tab Content - Full Width */}
                  {activeTab && (
                    <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm animate-fadeIn">
                      {result.specialist_assessments
                        .filter((a) => a.specialist === activeTab)
                        .map((assessment) => (
                          <div key={assessment.specialist}>
                            <h4 className="text-2xl font-bold text-purple-400 mb-4">{assessment.specialist}</h4>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                              {assessment.assessment}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Unified Summary - Full Width */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl">✨</div>
                  <h3 className="text-2xl font-bold text-white">Unified Assessment</h3>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 via-purple-600/10 to-transparent border border-purple-500/40 rounded-2xl p-8 backdrop-blur-sm">
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-base">
                    {result.unified_summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-slate-700/30 rounded-2xl p-16 text-center backdrop-blur-sm">
              <div className="text-6xl mb-4">🏥</div>
              <p className="text-gray-400 text-lg">
                Enter a medical case above to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Snackbar - Top Center (Always on top, page level) */}
      {popupSpec && result?.specialist_assessments && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 pointer-events-auto" style={{
          animation: 'snackbarSlideDown 0.4s ease-out forwards',
          zIndex: 9999
        }}>
          <style>{`
            @keyframes snackbarSlideDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          {(() => {
            const assessment = result.specialist_assessments.find((a) => a.specialist === popupSpec);
            const specInfo = SPECIALIST_DATABASE[popupSpec] || {
              fullName: 'Dr. Medical Specialist',
              description: 'Medical Specialist',
              emoji: '👨‍⚕️',
              color: 'from-blue-500 to-blue-600',
            };
            return assessment ? (
              <div className={`bg-gradient-to-br ${specInfo.color} rounded-xl p-6 text-white shadow-2xl max-w-md border border-white/30 pointer-events-auto`}>
                <div className="flex items-start gap-4">
                  <span className="text-5xl flex-shrink-0">{specInfo.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-white mb-1">{specInfo.fullName}</h4>
                    <p className="text-sm font-semibold text-white/95 mb-2">{popupSpec}</p>
                    <p className="text-xs text-white/85 leading-relaxed">{specInfo.description}</p>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Error Container - Bottom Fixed */}
      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-2xl w-full mx-auto pointer-events-auto">
          <div className="bg-red-500/15 border border-red-500/40 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="font-bold text-red-300 mb-1 text-lg">Analysis Error</h3>
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
