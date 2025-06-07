
import { Clock, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SWOTData } from "@/pages/Index";

interface AnalysisHistoryProps {
  history: SWOTData[];
  onSelectAnalysis: (analysis: SWOTData) => void;
}

export const AnalysisHistory = ({ history, onSelectAnalysis }: AnalysisHistoryProps) => {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Clock className="w-5 h-5" />
            <span>Recent Analyses</span>
          </CardTitle>
          <CardDescription>
            Your analysis history will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No analyses yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Clock className="w-5 h-5" />
          <span>Recent Analyses</span>
        </CardTitle>
        <CardDescription>
          Click to view previous SWOT analyses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((analysis, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-3"
              onClick={() => onSelectAnalysis(analysis)}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Building2 className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{analysis.company}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {analysis.industry} • {analysis.analysisDate}
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {analysis.strengths.length + analysis.weaknesses.length + 
                       analysis.opportunities.length + analysis.threats.length} insights
                    </Badge>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
