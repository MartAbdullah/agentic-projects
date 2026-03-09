import { useState } from 'react';
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

export default function IntermediateAgentPage() {
  const [medicalCase, setMedicalCase] = useState('');
  const [specialistsCount, setSpecialistsCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(null);

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
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-3 bg-purple-500/10 border border-purple-500/20 rounded-lg px-4 py-2 mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">02</span>
            </div>
            <span className="text-purple-300 font-semibold">Intermediate Agent</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Multi-Specialist Case Analysis</h1>
          <p className="text-gray-400 text-lg">
            A supervisor LLM routes medical cases to relevant specialists, runs them in parallel, and synthesizes findings.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-6">
              {/* Medical Case Input */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Medical Case</h2>
                <textarea
                  value={medicalCase}
                  onChange={(e) => setMedicalCase(e.target.value)}
                  placeholder="Describe the patient's condition, symptoms, and medical history..."
                  className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Specialists Slider */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Number of Specialists: <span className="text-purple-400">{specialistsCount}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={specialistsCount}
                  onChange={(e) => setSpecialistsCount(parseInt(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Select {specialistsCount} specialist{specialistsCount !== 1 ? 's' : ''} to analyze this case
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !medicalCase.trim()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
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
                  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                >
                  Clear
                </button>
              </div>

              {/* Example */}
              <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                <p className="text-sm text-gray-300 font-semibold mb-2">Example:</p>
                <p className="text-sm text-gray-400">
                  "62-year-old with progressive joint pain, morning stiffness (2+ hours), and recent weight loss. CRP elevated."
                </p>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div>
                    <h3 className="font-semibold text-red-300 mb-1">Error</h3>
                    <p className="text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
                <Loader2Icon size={48} className="animate-spin text-purple-400 mx-auto mb-4" />
                <p className="text-gray-400">
                  Analyzing case with {specialistsCount} specialist{specialistsCount !== 1 ? 's' : ''}...<br />
                  <span className="text-sm">Running specialist analyses in parallel</span>
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                {/* Case Summary */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <UsersIcon size={20} className="text-purple-400" />
                    <span>Case Overview</span>
                  </h3>
                  <p className="text-gray-300">{result.case_summary}</p>
                </div>

                {/* Specialist Assessments Tabs */}
                {result.specialist_assessments && result.specialist_assessments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Specialist Assessments</h3>
                    
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4 bg-slate-800 p-2 rounded-lg border border-slate-700">
                      {result.specialist_assessments.map((assessment) => (
                        <button
                          key={assessment.specialist}
                          onClick={() => setActiveTab(assessment.specialist)}
                          className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                            activeTab === assessment.specialist
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          }`}
                        >
                          {assessment.specialist}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab && (
                      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <div className="space-y-4">
                          {result.specialist_assessments
                            .filter((a) => a.specialist === activeTab)
                            .map((assessment) => (
                              <div key={assessment.specialist}>
                                <h4 className="text-lg font-semibold text-purple-400 mb-3">{assessment.specialist}</h4>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                  {assessment.assessment}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Unified Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Unified Assessment</h3>
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-6">
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{result.unified_summary}</p>
                  </div>
                </div>

                {/* How It Works */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-300 mb-3">How This Works</h3>
                  <ol className="text-purple-200 text-sm space-y-2">
                    <li>1. <strong>Supervisor</strong> reads the case and selects top {specialistsCount} specialists</li>
                    <li>2. All specialists analyze the case <strong>in parallel</strong></li>
                    <li>3. <strong>Aggregator</strong> synthesizes all assessments into one summary</li>
                    <li>4. Final report combines expert opinions for comprehensive diagnosis</li>
                  </ol>
                </div>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <UsersIcon size={32} className="text-purple-400" />
                </div>
                <p className="text-gray-400">
                  Enter a medical case to analyze it with multiple specialist perspectives.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
