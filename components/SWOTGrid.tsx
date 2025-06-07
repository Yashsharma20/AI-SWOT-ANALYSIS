
import { TrendingUp, TrendingDown, Target, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SWOTData } from "@/pages/Index";

interface SWOTGridProps {
  analysis: SWOTData;
}

export const SWOTGrid = ({ analysis }: SWOTGridProps) => {
  const swotSections = [
    {
      title: "Strengths",
      items: analysis.strengths,
      icon: TrendingUp,
      color: "border-green-200 bg-green-50",
      iconColor: "text-green-600",
      headerColor: "text-green-800"
    },
    {
      title: "Weaknesses", 
      items: analysis.weaknesses,
      icon: TrendingDown,
      color: "border-red-200 bg-red-50",
      iconColor: "text-red-600",
      headerColor: "text-red-800"
    },
    {
      title: "Opportunities",
      items: analysis.opportunities,
      icon: Target,
      color: "border-blue-200 bg-blue-50",
      iconColor: "text-blue-600",
      headerColor: "text-blue-800"
    },
    {
      title: "Threats",
      items: analysis.threats,
      icon: AlertTriangle,
      color: "border-orange-200 bg-orange-50",
      iconColor: "text-orange-600", 
      headerColor: "text-orange-800"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {swotSections.map((section) => {
        const Icon = section.icon;
        return (
          <Card key={section.title} className={`${section.color} border-2`}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center space-x-2 ${section.headerColor}`}>
                <Icon className={`w-5 h-5 ${section.iconColor}`} />
                <span>{section.title}</span>
                <span className="text-sm font-normal">({section.items.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${section.iconColor.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
