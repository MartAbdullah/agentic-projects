import { Link } from 'react-router-dom';
import { Zap, Brain, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const agents = [
    {
      id: 1,
      title: 'Basic Agent',
      description: 'A simple agent that demonstrates fundamental agentic patterns. Perfect for learning the basics.',
      link: '/basic-agent',
      color: 'from-blue-400 to-cyan-600',
      icon: '⚡',
      complexity: 'Beginner',
    },
    {
      id: 2,
      title: 'Intermediate Agent',
      description: 'A more advanced agent with state management, memory, and conditional logic.',
      link: '/intermediate-agent',
      color: 'from-purple-400 to-pink-600',
      icon: '🧠',
      complexity: 'Intermediate',
    },
    {
      id: 3,
      title: 'Advanced Agent',
      description: 'A production-ready clinical document processing pipeline with human-in-the-loop review.',
      link: '/advanced-agent',
      color: 'from-orange-400 to-red-600',
      icon: '🏥',
      complexity: 'Advanced',
    },
  ];

  return (
    <main className="flex-1 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Zap size={18} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">AI-Powered Agentic Systems</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            LLM Agent Suite{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Exploration
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover three distinct implementations of agentic patterns using LangGraph, from simple workflows to complex clinical document processing pipelines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/basic-agent"
              className="inline-flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/50"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all"
            >
              <span>View Source</span>
            </a>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Agent Implementations</h2>
            <p className="text-gray-400 text-lg">Choose your learning path</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <Link key={agent.id} to={agent.link}>
                <div className="h-full bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-purple-500 transition-all group cursor-pointer hover:shadow-xl hover:shadow-purple-500/20">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-4xl bg-gradient-to-br ${agent.color} bg-clip-text text-transparent`}>
                      {agent.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 bg-slate-700 text-gray-300 rounded-full">
                      {agent.complexity}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {agent.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center space-x-2 text-purple-400 group-hover:translate-x-2 transition-transform">
                    <span className="font-semibold">Explore</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Key Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Brain size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LangGraph</h3>
              <p className="text-gray-400">
                Build multi-step agent workflows with state management and human-in-the-loop capabilities.
              </p>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LLM Integration</h3>
              <p className="text-gray-400">
                Seamlessly integrate OpenAI, Gemini, and other LLM providers with LiteLLM.
              </p>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Brain size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">State Persistence</h3>
              <p className="text-gray-400">
                Save and resume workflows with checkpoint systems for reliable agent execution.
              </p>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tool Integration</h3>
              <p className="text-gray-400">
                Connect agents to external APIs, databases, and custom tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          <p>Agentic Suite © 2024. Demonstrating AI agent patterns and implementations.</p>
        </div>
      </footer>
    </main>
  );
}
