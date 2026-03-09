import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface AnalysisResult {
  status: string;
  draft: string;
  feedback?: string;
  iterations?: number;
}

export default function BasicAgentPage() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      setError('Please enter patient symptoms');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient_symptoms: symptoms }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze symptoms');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">01</span>
            </div>
            <span className="text-blue-300 font-semibold">Basic Agent</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Medical Summary Generator</h1>
          <p className="text-gray-400 text-lg">
            A two-agent reflection loop that generates and critiques a medical summary until it is approved.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-white mb-4">Patient Symptoms</h2>

              <div className="space-y-4">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Enter patient symptoms and medical history..."
                  className="w-full h-40 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />

                <div className="flex space-x-2">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || !symptoms.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
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
                    "45-year-old patient with chest pain, shortness of breath, and dizziness starting 2 days ago. History of hypertension."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-300 mb-1">Error</h3>
                    <p className="text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
                <Loader2 size={48} className="animate-spin text-blue-400 mx-auto mb-4" />
                <p className="text-gray-400">
                  Running reflection loop...<br />
                  <span className="text-sm">Generating and critiquing summary</span>
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                {/* Status */}
                <div className={`border rounded-lg p-6 ${result.status === 'approved' ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                  <div className="flex items-center space-x-3">
                    <CheckCircle size={24} className={result.status === 'approved' ? 'text-green-400' : 'text-yellow-400'} />
                    <div>
                      <p className="font-semibold text-white capitalize">{result.status}</p>
                      {result.iterations && (
                        <p className={`text-sm ${result.status === 'approved' ? 'text-green-300' : 'text-yellow-300'}`}>
                          Completed in {result.iterations} iteration{result.iterations !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Generated Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Generated Summary</h3>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{result.draft}</p>
                  </div>
                </div>

                {/* Feedback */}
                {result.feedback && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Critic Feedback</h3>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed">{result.feedback}</p>
                    </div>
                  </div>
                )}

                {/* How It Works */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-300 mb-3">How This Works</h3>
                  <ol className="text-blue-200 text-sm space-y-2">
                    <li>1. <strong>Generator</strong> creates a medical summary from symptoms</li>
                    <li>2. <strong>Critic</strong> reviews it for safety and accuracy</li>
                    <li>3. If rejected, Generator refines the draft using feedback</li>
                    <li>4. Loop continues until summary is approved (max 5 iterations)</li>
                  </ol>
                </div>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📋</span>
                </div>
                <p className="text-gray-400">
                  Enter patient symptoms to generate a medical summary with AI validation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
