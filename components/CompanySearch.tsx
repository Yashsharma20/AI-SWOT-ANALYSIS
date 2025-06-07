
import { useState } from "react";
import { Search, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SWOTData } from "@/pages/Index";

interface CompanySearchProps {
  onAnalysisGenerated: (analysis: SWOTData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const industries = [
  "Technology", "Healthcare", "Finance", "Retail", "Manufacturing", 
  "Energy", "Transportation", "Real Estate", "Telecommunications", "Media"
];

const sampleAnalyses: Record<string, Partial<SWOTData>> = {
  "apple": {
    company: "Apple Inc.",
    industry: "Technology",
    marketCap: "$2.8T",
    sentiment: 0.75,
    summary: "Apple maintains its position as a technology leader with strong brand loyalty and ecosystem integration, while facing challenges in emerging markets and regulatory scrutiny.",
    strengths: [
      "Strong brand loyalty and premium positioning",
      "Integrated ecosystem of products and services", 
      "Exceptional design and user experience",
      "Strong financial performance and cash reserves",
      "Leading innovation in mobile technology"
    ],
    weaknesses: [
      "High product prices limiting market reach",
      "Heavy dependence on iPhone revenue",
      "Limited customization options for users",
      "Slower adoption in enterprise markets",
      "Supply chain vulnerabilities"
    ],
    opportunities: [
      "Expansion in emerging markets with affordable products",
      "Growth in services revenue streams",
      "Augmented reality and virtual reality markets",
      "Health technology and medical devices",
      "Autonomous vehicle technology development"
    ],
    threats: [
      "Intense competition from Android ecosystem",
      "Regulatory scrutiny and antitrust concerns",
      "Economic downturn affecting premium sales",
      "Trade tensions and geopolitical risks",
      "Rapid technological changes and disruption"
    ]
  },
  "tesla": {
    company: "Tesla Inc.",
    industry: "Transportation",
    marketCap: "$800B",
    sentiment: 0.65,
    summary: "Tesla leads the electric vehicle revolution with innovative technology and strong brand recognition, but faces increasing competition and production challenges.",
    strengths: [
      "Market leader in electric vehicles",
      "Innovative battery and autonomous driving technology",
      "Strong brand and CEO leadership",
      "Vertically integrated manufacturing",
      "Supercharger network advantage"
    ],
    weaknesses: [
      "Production consistency and quality control issues",
      "High vehicle prices compared to competitors",
      "Limited service network coverage",
      "Dependence on CEO personality and decisions",
      "Regulatory approval delays for new features"
    ],
    opportunities: [
      "Global expansion in emerging markets",
      "Energy storage and solar panel business growth",
      "Autonomous vehicle services and robotaxis",
      "Lower-cost vehicle models for mass market",
      "Government incentives for clean energy"
    ],
    threats: [
      "Increasing competition from traditional automakers",
      "Supply chain disruptions for critical components",
      "Regulatory changes affecting EV incentives",
      "Economic recession reducing luxury purchases",
      "Safety concerns with autonomous driving technology"
    ]
  }
};

export const CompanySearch = ({ onAnalysisGenerated, isLoading, setIsLoading }: CompanySearchProps) => {
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");

  const generateSWOTAnalysis = async () => {
    if (!company.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const companyKey = company.toLowerCase().trim();
    const baseAnalysis = sampleAnalyses[companyKey] || {
      company: company,
      industry: industry || "Technology",
      marketCap: "$50B",
      sentiment: 0.6,
      summary: `${company} shows strong market position with opportunities for growth while facing competitive pressures and market uncertainties.`,
      strengths: [
        "Strong market presence and brand recognition",
        "Experienced leadership team",
        "Solid financial foundation",
        "Innovation in core business areas",
        "Customer loyalty and retention"
      ],
      weaknesses: [
        "Limited geographic diversification",
        "Dependence on key revenue streams",
        "Operational efficiency challenges",
        "Talent acquisition in competitive markets",
        "Aging infrastructure and systems"
      ],
      opportunities: [
        "Expansion into new markets and regions",
        "Digital transformation initiatives",
        "Strategic partnerships and acquisitions",
        "New product development and innovation",
        "Sustainability and ESG improvements"
      ],
      threats: [
        "Intense competitive pressure",
        "Economic uncertainty and market volatility",
        "Regulatory changes and compliance costs",
        "Cybersecurity risks and data breaches",
        "Supply chain disruptions"
      ]
    };

    const analysis: SWOTData = {
      ...baseAnalysis,
      company: baseAnalysis.company!,
      industry: baseAnalysis.industry!,
      analysisDate: new Date().toLocaleDateString(),
      strengths: baseAnalysis.strengths!,
      weaknesses: baseAnalysis.weaknesses!,
      opportunities: baseAnalysis.opportunities!,
      threats: baseAnalysis.threats!,
      sentiment: baseAnalysis.sentiment!,
      marketCap: baseAnalysis.marketCap!,
      summary: baseAnalysis.summary!
    };
    
    setIsLoading(false);
    onAnalysisGenerated(analysis);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="w-5 h-5" />
          <span>Company Analysis</span>
        </CardTitle>
        <CardDescription>
          Enter company details to generate AI-powered SWOT analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            placeholder="e.g., Apple, Tesla, Microsoft"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateSWOTAnalysis()}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industry">Industry (Optional)</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={generateSWOTAnalysis}
          disabled={!company.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Generate SWOT Analysis
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
