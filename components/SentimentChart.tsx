
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import type { SWOTData } from "@/pages/Index";

interface SentimentChartProps {
  analysis: SWOTData;
}

export const SentimentChart = ({ analysis }: SentimentChartProps) => {
  const data = [
    {
      name: 'Strengths',
      value: analysis.strengths.length,
      color: '#16a34a'
    },
    {
      name: 'Weaknesses', 
      value: analysis.weaknesses.length,
      color: '#dc2626'
    },
    {
      name: 'Opportunities',
      value: analysis.opportunities.length,
      color: '#2563eb'
    },
    {
      name: 'Threats',
      value: analysis.threats.length,
      color: '#ea580c'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">SWOT Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
