import type { CatastropheEvent, NewsItem, RegionId } from "../types";

const USGS_SIGNIFICANT_WEEK =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
const FEMA_DECLARATIONS =
  "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$top=25&$orderby=declarationDate%20desc&$select=disasterNumber,state,declarationTitle,incidentType,incidentBeginDate,declarationDate,declaredCountyArea,designatedArea,ihProgramDeclared,iaProgramDeclared,paProgramDeclared,hmProgramDeclared";

type FetchResult<T> = {
  data: T;
  error?: string;
  source: string;
};

type UsgsFeature = {
  id: string;
  properties: {
    mag?: number;
    place?: string;
    time?: number;
    url?: string;
    alert?: string;
    tsunami?: number;
    sig?: number;
    type?: string;
  };
  geometry?: {
    coordinates?: [number, number, number?];
  };
};

type UsgsResponse = {
  features?: UsgsFeature[];
};

type FemaDeclaration = {
  disasterNumber: number;
  state?: string;
  declarationTitle?: string;
  incidentType?: string;
  incidentBeginDate?: string;
  declarationDate?: string;
  declaredCountyArea?: string;
  designatedArea?: string;
  ihProgramDeclared?: boolean;
  iaProgramDeclared?: boolean;
  paProgramDeclared?: boolean;
  hmProgramDeclared?: boolean;
};

type FemaResponse = {
  DisasterDeclarationsSummaries?: FemaDeclaration[];
};

type GNewsArticle = {
  title?: string;
  description?: string;
  url?: string;
  source?: {
    name?: string;
  };
  publishedAt?: string;
};

type GNewsResponse = {
  articles?: GNewsArticle[];
};

const stateCoordinates: Record<string, [number, number]> = {
  AL: [-86.8, 32.7],
  AK: [-152.4, 64.2],
  AZ: [-111.7, 34.2],
  AR: [-92.3, 34.7],
  CA: [-119.4, 36.8],
  CO: [-105.5, 39.0],
  CT: [-72.7, 41.6],
  DE: [-75.5, 39.0],
  FL: [-81.7, 27.8],
  GA: [-83.4, 32.6],
  HI: [-157.8, 20.8],
  IA: [-93.2, 42.0],
  ID: [-114.7, 44.1],
  IL: [-89.4, 40.0],
  IN: [-86.1, 40.3],
  KS: [-98.4, 38.5],
  KY: [-84.3, 37.5],
  LA: [-91.9, 30.9],
  MA: [-71.8, 42.3],
  MD: [-76.7, 39.0],
  ME: [-69.0, 45.3],
  MI: [-84.5, 44.3],
  MN: [-94.3, 46.3],
  MO: [-92.5, 38.5],
  MS: [-89.7, 32.7],
  MT: [-110.4, 46.9],
  NC: [-79.0, 35.5],
  ND: [-100.5, 47.5],
  NE: [-99.8, 41.5],
  NH: [-71.6, 43.7],
  NJ: [-74.5, 40.1],
  NM: [-106.1, 34.4],
  NV: [-116.4, 39.3],
  NY: [-75.5, 42.9],
  OH: [-82.8, 40.4],
  OK: [-97.5, 35.5],
  OR: [-120.5, 44.0],
  PA: [-77.8, 41.2],
  RI: [-71.5, 41.7],
  SC: [-80.9, 33.8],
  SD: [-100.2, 44.4],
  TN: [-86.4, 35.8],
  TX: [-99.9, 31.0],
  UT: [-111.9, 39.3],
  VA: [-78.7, 37.5],
  VT: [-72.7, 44.0],
  WA: [-120.7, 47.4],
  WI: [-89.5, 44.5],
  WV: [-80.6, 38.6],
  WY: [-107.3, 43.0],
  PR: [-66.5, 18.2],
  VI: [-64.8, 17.7]
};

export async function fetchEarthquakeEvents(): Promise<FetchResult<CatastropheEvent[]>> {
  try {
    const payload = await fetchJson<UsgsResponse>(USGS_SIGNIFICANT_WEEK);
    const events =
      payload.features?.slice(0, 12).flatMap((feature): CatastropheEvent[] => {
        const coordinates = feature.geometry?.coordinates;
        if (!coordinates) {
          return [];
        }

        const magnitude = feature.properties.mag ?? 0;
        const alertWeight = feature.properties.alert === "red" ? 10 : feature.properties.alert === "orange" ? 8 : 0;
        const severity = Math.min(10, Math.max(4, Math.round(magnitude + alertWeight / 2)));
        const [longitude, latitude] = coordinates;

        return [
          {
            id: `usgs-${feature.id}`,
            type: "Earthquake",
            title: `M${magnitude.toFixed(1)} earthquake`,
            location: feature.properties.place ?? "Unknown location",
            regionId: inferRegion([longitude, latitude]),
            coordinates: [longitude, latitude],
            severity,
            insuredLossUsdBn: estimateEarthquakeLoss(magnitude, feature.properties.sig),
            insuranceImpact:
              severity >= 8
                ? "Potential property, business interruption, and reinsurance event; review exposed portfolios."
                : "Monitor local claims notifications and parametric triggers.",
            source: "USGS significant earthquakes feed",
            sourceUrl: feature.properties.url,
            date: feature.properties.time ? new Date(feature.properties.time).toISOString() : new Date().toISOString(),
            live: true
          }
        ];
      }) ?? [];

    return { data: events, source: USGS_SIGNIFICANT_WEEK };
  } catch (error) {
    return { data: [], error: getErrorMessage(error), source: USGS_SIGNIFICANT_WEEK };
  }
}

export async function fetchFemaDisasterEvents(): Promise<FetchResult<CatastropheEvent[]>> {
  try {
    const payload = await fetchJson<FemaResponse>(FEMA_DECLARATIONS);
    const events =
      payload.DisasterDeclarationsSummaries?.slice(0, 12).map((declaration) => {
        const incidentType = declaration.incidentType ?? "Disaster";
        const coordinates = stateCoordinates[declaration.state ?? ""] ?? [-98, 39];
        const hasAssistance =
          declaration.ihProgramDeclared ||
          declaration.iaProgramDeclared ||
          declaration.paProgramDeclared ||
          declaration.hmProgramDeclared;

        return {
          id: `fema-${declaration.disasterNumber}`,
          type: normalizeFemaIncident(incidentType),
          title: declaration.declarationTitle ?? `${incidentType} declaration`,
          location: [declaration.designatedArea ?? declaration.declaredCountyArea, declaration.state]
            .filter(Boolean)
            .join(", "),
          regionId: "north-america" as RegionId,
          coordinates,
          severity: hasAssistance ? 7 : 5,
          insuranceImpact:
            "Public disaster assistance signal. Cross-reference with property, flood, auto physical damage, and business interruption exposure.",
          source: "OpenFEMA disaster declarations",
          sourceUrl: "https://www.fema.gov/openfema-data-page/disaster-declarations-summaries-v2",
          date: declaration.incidentBeginDate ?? declaration.declarationDate ?? new Date().toISOString(),
          live: true
        } satisfies CatastropheEvent;
      }) ?? [];

    return { data: events, source: FEMA_DECLARATIONS };
  } catch (error) {
    return { data: [], error: getErrorMessage(error), source: FEMA_DECLARATIONS };
  }
}

export async function fetchInsuranceNews(): Promise<FetchResult<NewsItem[]>> {
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY as string | undefined;
  if (!apiKey) {
    return {
      data: [],
      error: "Set VITE_GNEWS_API_KEY to enable live insurance news.",
      source: "Optional GNews adapter"
    };
  }

  const url = new URL("https://gnews.io/api/v4/search");
  url.searchParams.set("q", '(insurance OR reinsurance) AND (flood OR earthquake OR catastrophe OR regulation OR "market share")');
  url.searchParams.set("lang", "en");
  url.searchParams.set("max", "10");
  url.searchParams.set("apikey", apiKey);

  try {
    const payload = await fetchJson<GNewsResponse>(url.toString());
    const articles =
      payload.articles?.map((article, index) => ({
        id: `gnews-${index}-${article.publishedAt ?? article.title}`,
        title: article.title ?? "Insurance market update",
        regionId: inferRegionFromText(`${article.title ?? ""} ${article.description ?? ""}`),
        category: inferNewsCategory(`${article.title ?? ""} ${article.description ?? ""}`),
        publishedAt: article.publishedAt ?? new Date().toISOString(),
        summary: article.description ?? "Live news result from configured news provider.",
        source: article.source?.name ?? "GNews",
        url: article.url,
        severity: inferNewsSeverity(`${article.title ?? ""} ${article.description ?? ""}`)
      })) ?? [];

    return { data: articles, source: url.origin };
  } catch (error) {
    return { data: [], error: getErrorMessage(error), source: url.origin };
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timeout);
  }
}

function inferRegion([longitude, latitude]: [number, number]): RegionId {
  if (longitude >= -170 && longitude <= -30 && latitude >= 5) {
    return "north-america";
  }
  if (longitude >= -120 && longitude <= -30 && latitude < 15) {
    return "latin-america";
  }
  if (longitude >= -25 && longitude <= 50 && latitude >= 35) {
    return "europe";
  }
  if (longitude >= 45 && longitude <= 180) {
    return "asia-pacific";
  }
  return "middle-east-africa";
}

function inferRegionFromText(text: string): RegionId {
  const normalized = text.toLowerCase();
  if (/(united states|u\.s\.|canada|florida|california|texas|naic|fema)/.test(normalized)) {
    return "north-america";
  }
  if (/(europe|eu|uk|germany|france|italy|spain|eiopa|solvency)/.test(normalized)) {
    return "europe";
  }
  if (/(china|japan|india|australia|asia|pacific)/.test(normalized)) {
    return "asia-pacific";
  }
  if (/(brazil|mexico|chile|peru|latin)/.test(normalized)) {
    return "latin-america";
  }
  return "middle-east-africa";
}

function inferNewsCategory(text: string): NewsItem["category"] {
  const normalized = text.toLowerCase();
  if (/(reinsurance|renewal|treaty|capital)/.test(normalized)) {
    return "Reinsurance";
  }
  if (/(regulation|regulator|solvency|naic|eiopa|fca|pra)/.test(normalized)) {
    return "Regulation";
  }
  if (/(claim|loss|settlement)/.test(normalized)) {
    return "Claims";
  }
  if (/(flood|earthquake|wildfire|hurricane|storm|catastrophe|cat)/.test(normalized)) {
    return "Catastrophe";
  }
  return "Market";
}

function inferNewsSeverity(text: string): number {
  const normalized = text.toLowerCase();
  let severity = 4;
  if (/(earthquake|hurricane|flood|wildfire|catastrophe)/.test(normalized)) {
    severity += 2;
  }
  if (/(billion|severe|record|crisis|insolvency|red alert)/.test(normalized)) {
    severity += 2;
  }
  if (/(regulator|capital|solvency|rate hike)/.test(normalized)) {
    severity += 1;
  }
  return Math.min(10, severity);
}

function normalizeFemaIncident(incidentType: string): CatastropheEvent["type"] {
  const normalized = incidentType.toLowerCase();
  if (normalized.includes("flood")) {
    return "Flood";
  }
  if (normalized.includes("earthquake")) {
    return "Earthquake";
  }
  if (normalized.includes("fire")) {
    return "Wildfire";
  }
  if (normalized.includes("hurricane") || normalized.includes("typhoon") || normalized.includes("cyclone")) {
    return "Cyclone";
  }
  if (normalized.includes("storm") || normalized.includes("tornado")) {
    return "Severe Convective Storm";
  }
  return "Market";
}

function estimateEarthquakeLoss(magnitude: number, significance?: number): number | undefined {
  if (magnitude < 5.5) {
    return undefined;
  }
  const base = Math.pow(10, Math.max(0, magnitude - 5.5)) * 0.15;
  const significanceMultiplier = significance ? Math.min(3, Math.max(1, significance / 700)) : 1;
  return Number((base * significanceMultiplier).toFixed(1));
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown data fetch error";
}
