
import { useState } from "react";
import { CompanySearch } from "@/components/CompanySearch";
import { SWOTDashboard } from "@/components/SWOTDashboard";
import { ReportHeader } from "@/components/ReportHeader";
import { AnalysisHistory } from "@/components/AnalysisHistory";

export interface SWOTData {
  company: string;
  industry: string;
  analysisDate: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  sentiment: number;
  marketCap: string;
  summary: string;
}

const Index = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState<SWOTData | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<SWOTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisGenerated = (analysis: SWOTData) => {
    setCurrentAnalysis(analysis);
    setAnalysisHistory(prev => [analysis, ...prev.slice(0, 4)]); // Keep last 5 analyses
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <ReportHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column - Search and History */}
          <div className="lg:col-span-4 space-y-6">
            <CompanySearch 
              onAnalysisGenerated={handleAnalysisGenerated}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <AnalysisHistory 
              history={analysisHistory}
              onSelectAnalysis={setCurrentAnalysis}
            />
          </div>

          {/* Right Column - SWOT Dashboard */}
          <div className="lg:col-span-8">
            {currentAnalysis ? (
              <SWOTDashboard analysis={currentAnalysis} />
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    Start Your Analysis
                  </h3>
                  <p className="text-slate-600">
                    Enter a company name to generate a comprehensive SWOT analysis powered by AI and real-time market data.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
