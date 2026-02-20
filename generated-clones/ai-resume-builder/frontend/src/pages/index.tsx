import React from 'react';
import Head from 'next/head';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="text-center p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
      <span className="text-blue-600 font-bold">✓</span>
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home: React.FC = () => {
  const features: string[] = ["AI writing","Templates","PDF export","ATS optimization"];

  return (
    <>
      <Head>
        <title>AI Resume Builder - TypeScript</title>
        <meta name="description" content="Create professional resumes with AI assistance - Built with TypeScript" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              AI Resume Builder <span className="text-sm text-blue-500">TS</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Create professional resumes with AI assistance
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Built with TypeScript for maximum type safety and developer experience
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm mb-8">
              <span className="mr-2">💪</span>
              100% Type Safe • Zero Runtime Type Errors
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {features.map((feature: string, index: number) => (
                <FeatureCard
                  key={index}
                  title={feature}
                  description={`Type-safe ${feature} implementation`}
                />
              ))}
            </div>

            <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold mb-4">TypeScript Powered! 🚀</h2>
              <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl mb-2">🛡️</div>
                  <div className="font-semibold">Type Safety</div>
                  <div className="text-sm text-gray-600">Catch errors at compile time</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="font-semibold">IntelliSense</div>
                  <div className="text-sm text-gray-600">Better autocomplete & refactoring</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-semibold">Self-Documenting</div>
                  <div className="text-sm text-gray-600">Types serve as documentation</div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors">
                  Start Building
                </button>
                <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors border">
                  View TypeScript Code
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p>© 2026 AI Resume Builder TypeScript Clone</p>
            <p className="text-gray-400 mt-2">Built with TypeScript + Next.js for #dayXofkillingSaaS</p>
            <div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-600 rounded-full text-sm">
              <span className="mr-2">⚡</span>
              Type-Safe SaaS Development
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;