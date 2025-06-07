
import { TrendingUp, Brain, FileText } from "lucide-react";

export const ReportHeader = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
          <Brain className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
        AI-Powered SWOT Analyzer
      </h1>
      
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
        Generate comprehensive SWOT analyses from real-time market data, news sentiment, 
        and financial reports using advanced NLP and AI models.
      </p>
      
      <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Real-time Data</span>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4" />
          <span>AI-Powered Insights</span>
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Professional Reports</span>
        </div>
      </div>
    </div>
  );
};
