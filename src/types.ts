export type RegionId =
  | "north-america"
  | "europe"
  | "asia-pacific"
  | "latin-america"
  | "middle-east-africa";

export type Coordinates = [longitude: number, latitude: number];

export type RegionMarket = {
  id: RegionId;
  name: string;
  centroid: Coordinates;
  globalPcSharePct: number;
  premiumsUsdBn: number;
  growthPct: number;
  combinedRatioPct: number;
  protectionGapPct: number;
  climateRiskIndex: number;
  notes: string;
};

export type LineOfBusiness = {
  line: "Auto" | "Property" | "Commercial Liability" | "Workers Comp" | "Specialty" | "Marine & Aviation";
  valuePct: number;
};

export type CompanyRegionFootprint = {
  regionId: RegionId;
  sharePct: number;
  premiumsUsdBn: number;
};

export type Insurer = {
  id: string;
  name: string;
  headquarters: string;
  regionId: RegionId;
  coordinates: Coordinates;
  marketSharePct: number;
  grossDirectPremiumsUsdBn: number;
  privateLinesPct: number;
  commercialLinesPct: number;
  combinedRatioPct: number;
  color: string;
  lines: LineOfBusiness[];
  footprint: CompanyRegionFootprint[];
  insight: string;
};

export type Regulation = {
  id: string;
  jurisdiction: string;
  regionId: RegionId;
  coordinates: Coordinates;
  regulator: string;
  solvencyRegime: string;
  filingModel: string;
  climateDisclosure: string;
  aiOrDataGovernance: string;
  regulatoryIntensity: number;
  notes: string;
};

export type CatastropheEvent = {
  id: string;
  type: "Flood" | "Earthquake" | "Wildfire" | "Cyclone" | "Severe Convective Storm" | "Regulatory" | "Market";
  title: string;
  location: string;
  regionId: RegionId;
  coordinates: Coordinates;
  severity: number;
  insuredLossUsdBn?: number;
  insuranceImpact: string;
  source: string;
  sourceUrl?: string;
  date: string;
  live?: boolean;
};

export type NewsItem = {
  id: string;
  title: string;
  regionId: RegionId;
  category: "Catastrophe" | "Regulation" | "Market" | "Claims" | "Reinsurance";
  publishedAt: string;
  summary: string;
  source: string;
  url?: string;
  severity: number;
};

export type DataSource = {
  name: string;
  coverage: string;
  access: "Open API" | "Open report" | "API key" | "Commercial / restricted";
  url: string;
  dashboardUse: string;
};
