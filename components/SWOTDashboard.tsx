
import { Download, TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { SWOTData } from "@/pages/Index";
import { SWOTGrid } from "./SWOTGrid";
import { SentimentChart } from "./SentimentChart";

interface SWOTDashboardProps {
  analysis: SWOTData;
}

export const SWOTDashboard = ({ analysis }: SWOTDashboardProps) => {
  const exportToPDF = () => {
    // In a real implementation, this would generate a PDF
    const content = `
SWOT Analysis Report
Company: ${analysis.company}
Industry: ${analysis.industry}
Date: ${analysis.analysisDate}

SUMMARY:
${analysis.summary}

STRENGTHS:
${analysis.strengths.map(s => `• ${s}`).join('\n')}

WEAKNESSES:
${analysis.weaknesses.map(w => `• ${w}`).join('\n')}

OPPORTUNITIES:
${analysis.opportunities.map(o => `• ${o}`).join('\n')}

THREATS:
${analysis.threats.map(t => `• ${t}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${analysis.company}-SWOT-Analysis.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.7) return "text-green-600";
    if (sentiment >= 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment >= 0.7) return "Positive";
    if (sentiment >= 0.5) return "Neutral";
    return "Negative";
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{analysis.company}</CardTitle>
              <CardDescription className="text-lg mt-1">
                {analysis.industry} • Market Cap: {analysis.marketCap}
              </CardDescription>
            </div>
            <Button onClick={exportToPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Executive Summary</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{analysis.summary}</p>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Market Sentiment</span>
                  <Badge variant="secondary" className={getSentimentColor(analysis.sentiment)}>
                    {getSentimentLabel(analysis.sentiment)}
                  </Badge>
                </div>
                <Progress value={analysis.sentiment * 100} className="h-2" />
              </div>
              <div className="text-xs text-slate-500">
                Analysis Date: {analysis.analysisDate}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SWOT Grid */}
      <SWOTGrid analysis={analysis} />

      {/* Charts and Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentChart analysis={analysis} />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Strengths Count</span>
                <Badge variant="outline" className="text-green-600">
                  {analysis.strengths.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Weaknesses Count</span>
                <Badge variant="outline" className="text-red-600">
                  {analysis.weaknesses.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Opportunities Count</span>
                <Badge variant="outline" className="text-blue-600">
                  {analysis.opportunities.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Threats Count</span>
                <Badge variant="outline" className="text-orange-600">
                  {analysis.threats.length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
