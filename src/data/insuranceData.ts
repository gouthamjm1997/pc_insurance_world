import type { CatastropheEvent, DataSource, Insurer, NewsItem, RegionMarket, Regulation } from "../types";

export const regions: RegionMarket[] = [
  {
    id: "north-america",
    name: "North America",
    centroid: [-98, 42],
    globalPcSharePct: 54.2,
    premiumsUsdBn: 1167,
    growthPct: 7.1,
    combinedRatioPct: 101.7,
    protectionGapPct: 34,
    climateRiskIndex: 82,
    notes: "Largest P&C market; US dominates personal auto, homeowners, commercial liability, and catastrophe reinsurance demand."
  },
  {
    id: "europe",
    name: "Europe",
    centroid: [10, 51],
    globalPcSharePct: 22.6,
    premiumsUsdBn: 487,
    growthPct: 5.4,
    combinedRatioPct: 96.5,
    protectionGapPct: 45,
    climateRiskIndex: 63,
    notes: "Mature solvency regimes, strong specialty and commercial lines, and rising climate disclosure expectations."
  },
  {
    id: "asia-pacific",
    name: "Asia-Pacific",
    centroid: [112, 24],
    globalPcSharePct: 17.8,
    premiumsUsdBn: 383,
    growthPct: 8.2,
    combinedRatioPct: 98.1,
    protectionGapPct: 71,
    climateRiskIndex: 76,
    notes: "China and Japan anchor the market while Southeast Asia has high growth and a large catastrophe protection gap."
  },
  {
    id: "latin-america",
    name: "Latin America",
    centroid: [-62, -15],
    globalPcSharePct: 3.1,
    premiumsUsdBn: 67,
    growthPct: 10.9,
    combinedRatioPct: 99.3,
    protectionGapPct: 78,
    climateRiskIndex: 69,
    notes: "Higher nominal growth, lower penetration, and heavy exposure to flood, quake, and agriculture losses."
  },
  {
    id: "middle-east-africa",
    name: "Middle East & Africa",
    centroid: [30, 2],
    globalPcSharePct: 2.3,
    premiumsUsdBn: 49,
    growthPct: 9.6,
    combinedRatioPct: 97.8,
    protectionGapPct: 86,
    climateRiskIndex: 72,
    notes: "Emerging-market insurance penetration remains low, with infrastructure, energy, and climate resilience driving opportunities."
  }
];

export const insurers: Insurer[] = [
  {
    id: "state-farm",
    name: "State Farm",
    headquarters: "Bloomington, United States",
    regionId: "north-america",
    coordinates: [-88.99, 40.48],
    marketSharePct: 5.4,
    grossDirectPremiumsUsdBn: 116.1,
    privateLinesPct: 94,
    commercialLinesPct: 6,
    combinedRatioPct: 106.8,
    color: "#5eead4",
    insight: "Scale leader in US personal lines; pricing adequacy and catastrophe volatility shape underwriting actions.",
    lines: [
      { line: "Auto", valuePct: 54 },
      { line: "Property", valuePct: 35 },
      { line: "Commercial Liability", valuePct: 5 },
      { line: "Workers Comp", valuePct: 2 },
      { line: "Specialty", valuePct: 4 },
      { line: "Marine & Aviation", valuePct: 0 }
    ],
    footprint: [
      { regionId: "north-america", sharePct: 98, premiumsUsdBn: 113.8 },
      { regionId: "latin-america", sharePct: 2, premiumsUsdBn: 2.3 }
    ]
  },
  {
    id: "picc",
    name: "PICC",
    headquarters: "Beijing, China",
    regionId: "asia-pacific",
    coordinates: [116.4, 39.9],
    marketSharePct: 4.7,
    grossDirectPremiumsUsdBn: 101.2,
    privateLinesPct: 62,
    commercialLinesPct: 38,
    combinedRatioPct: 97.1,
    color: "#f97316",
    insight: "Dominant Chinese non-life carrier with deep motor, agriculture, commercial property, and catastrophe relevance.",
    lines: [
      { line: "Auto", valuePct: 48 },
      { line: "Property", valuePct: 20 },
      { line: "Commercial Liability", valuePct: 10 },
      { line: "Workers Comp", valuePct: 3 },
      { line: "Specialty", valuePct: 14 },
      { line: "Marine & Aviation", valuePct: 5 }
    ],
    footprint: [
      { regionId: "asia-pacific", sharePct: 92, premiumsUsdBn: 93.1 },
      { regionId: "europe", sharePct: 4, premiumsUsdBn: 4.0 },
      { regionId: "middle-east-africa", sharePct: 4, premiumsUsdBn: 4.1 }
    ]
  },
  {
    id: "allianz",
    name: "Allianz",
    headquarters: "Munich, Germany",
    regionId: "europe",
    coordinates: [11.58, 48.14],
    marketSharePct: 4.3,
    grossDirectPremiumsUsdBn: 92.6,
    privateLinesPct: 48,
    commercialLinesPct: 52,
    combinedRatioPct: 93.8,
    color: "#60a5fa",
    insight: "Global multi-line footprint with specialty, commercial, and mature European retail franchise strength.",
    lines: [
      { line: "Auto", valuePct: 28 },
      { line: "Property", valuePct: 24 },
      { line: "Commercial Liability", valuePct: 18 },
      { line: "Workers Comp", valuePct: 4 },
      { line: "Specialty", valuePct: 20 },
      { line: "Marine & Aviation", valuePct: 6 }
    ],
    footprint: [
      { regionId: "europe", sharePct: 55, premiumsUsdBn: 50.9 },
      { regionId: "north-america", sharePct: 19, premiumsUsdBn: 17.6 },
      { regionId: "asia-pacific", sharePct: 18, premiumsUsdBn: 16.7 },
      { regionId: "latin-america", sharePct: 5, premiumsUsdBn: 4.6 },
      { regionId: "middle-east-africa", sharePct: 3, premiumsUsdBn: 2.8 }
    ]
  },
  {
    id: "axa",
    name: "AXA",
    headquarters: "Paris, France",
    regionId: "europe",
    coordinates: [2.35, 48.86],
    marketSharePct: 4.0,
    grossDirectPremiumsUsdBn: 86.1,
    privateLinesPct: 42,
    commercialLinesPct: 58,
    combinedRatioPct: 94.6,
    color: "#a78bfa",
    insight: "Large European and specialty platform with meaningful cyber, commercial property, and global risk consulting exposure.",
    lines: [
      { line: "Auto", valuePct: 26 },
      { line: "Property", valuePct: 23 },
      { line: "Commercial Liability", valuePct: 19 },
      { line: "Workers Comp", valuePct: 3 },
      { line: "Specialty", valuePct: 23 },
      { line: "Marine & Aviation", valuePct: 6 }
    ],
    footprint: [
      { regionId: "europe", sharePct: 58, premiumsUsdBn: 49.9 },
      { regionId: "north-america", sharePct: 13, premiumsUsdBn: 11.2 },
      { regionId: "asia-pacific", sharePct: 20, premiumsUsdBn: 17.2 },
      { regionId: "latin-america", sharePct: 4, premiumsUsdBn: 3.4 },
      { regionId: "middle-east-africa", sharePct: 5, premiumsUsdBn: 4.4 }
    ]
  },
  {
    id: "berkshire",
    name: "Berkshire Hathaway Insurance",
    headquarters: "Omaha, United States",
    regionId: "north-america",
    coordinates: [-95.94, 41.26],
    marketSharePct: 3.8,
    grossDirectPremiumsUsdBn: 81.8,
    privateLinesPct: 52,
    commercialLinesPct: 48,
    combinedRatioPct: 92.9,
    color: "#facc15",
    insight: "GEICO personal auto plus global reinsurance and specialty commercial lines create a hybrid risk profile.",
    lines: [
      { line: "Auto", valuePct: 46 },
      { line: "Property", valuePct: 14 },
      { line: "Commercial Liability", valuePct: 15 },
      { line: "Workers Comp", valuePct: 6 },
      { line: "Specialty", valuePct: 16 },
      { line: "Marine & Aviation", valuePct: 3 }
    ],
    footprint: [
      { regionId: "north-america", sharePct: 82, premiumsUsdBn: 67.1 },
      { regionId: "europe", sharePct: 9, premiumsUsdBn: 7.4 },
      { regionId: "asia-pacific", sharePct: 7, premiumsUsdBn: 5.7 },
      { regionId: "latin-america", sharePct: 2, premiumsUsdBn: 1.6 }
    ]
  },
  {
    id: "progressive",
    name: "Progressive",
    headquarters: "Mayfield Village, United States",
    regionId: "north-america",
    coordinates: [-81.46, 41.52],
    marketSharePct: 3.1,
    grossDirectPremiumsUsdBn: 66.7,
    privateLinesPct: 88,
    commercialLinesPct: 12,
    combinedRatioPct: 94.2,
    color: "#34d399",
    insight: "Telematics and direct distribution strength in US personal auto, with commercial auto growth optionality.",
    lines: [
      { line: "Auto", valuePct: 80 },
      { line: "Property", valuePct: 6 },
      { line: "Commercial Liability", valuePct: 4 },
      { line: "Workers Comp", valuePct: 0 },
      { line: "Specialty", valuePct: 9 },
      { line: "Marine & Aviation", valuePct: 1 }
    ],
    footprint: [{ regionId: "north-america", sharePct: 100, premiumsUsdBn: 66.7 }]
  },
  {
    id: "zurich",
    name: "Zurich Insurance",
    headquarters: "Zurich, Switzerland",
    regionId: "europe",
    coordinates: [8.54, 47.37],
    marketSharePct: 2.8,
    grossDirectPremiumsUsdBn: 60.3,
    privateLinesPct: 31,
    commercialLinesPct: 69,
    combinedRatioPct: 94.5,
    color: "#38bdf8",
    insight: "Commercial P&C and global programs orientation with climate, construction, and liability risk management focus.",
    lines: [
      { line: "Auto", valuePct: 19 },
      { line: "Property", valuePct: 25 },
      { line: "Commercial Liability", valuePct: 23 },
      { line: "Workers Comp", valuePct: 8 },
      { line: "Specialty", valuePct: 18 },
      { line: "Marine & Aviation", valuePct: 7 }
    ],
    footprint: [
      { regionId: "europe", sharePct: 45, premiumsUsdBn: 27.1 },
      { regionId: "north-america", sharePct: 30, premiumsUsdBn: 18.1 },
      { regionId: "asia-pacific", sharePct: 13, premiumsUsdBn: 7.8 },
      { regionId: "latin-america", sharePct: 8, premiumsUsdBn: 4.8 },
      { regionId: "middle-east-africa", sharePct: 4, premiumsUsdBn: 2.5 }
    ]
  },
  {
    id: "tokio-marine",
    name: "Tokio Marine",
    headquarters: "Tokyo, Japan",
    regionId: "asia-pacific",
    coordinates: [139.76, 35.68],
    marketSharePct: 2.5,
    grossDirectPremiumsUsdBn: 53.8,
    privateLinesPct: 39,
    commercialLinesPct: 61,
    combinedRatioPct: 95.4,
    color: "#fb7185",
    insight: "Japan anchor with international specialty acquisitions and natural catastrophe risk expertise.",
    lines: [
      { line: "Auto", valuePct: 31 },
      { line: "Property", valuePct: 24 },
      { line: "Commercial Liability", valuePct: 15 },
      { line: "Workers Comp", valuePct: 4 },
      { line: "Specialty", valuePct: 21 },
      { line: "Marine & Aviation", valuePct: 5 }
    ],
    footprint: [
      { regionId: "asia-pacific", sharePct: 62, premiumsUsdBn: 33.4 },
      { regionId: "north-america", sharePct: 25, premiumsUsdBn: 13.5 },
      { regionId: "europe", sharePct: 10, premiumsUsdBn: 5.4 },
      { regionId: "latin-america", sharePct: 3, premiumsUsdBn: 1.5 }
    ]
  }
];

export const regulations: Regulation[] = [
  {
    id: "us-naic",
    jurisdiction: "United States",
    regionId: "north-america",
    coordinates: [-98, 39],
    regulator: "State departments of insurance / NAIC model coordination",
    solvencyRegime: "Risk-Based Capital, state guaranty funds, ORSA",
    filingModel: "State rate and form filings; prior approval, file-and-use, or competitive depending on state and line",
    climateDisclosure: "NAIC climate risk disclosure survey and state-led climate reporting initiatives",
    aiOrDataGovernance: "Model bulletin adoption and state AI governance expectations are evolving",
    regulatoryIntensity: 4,
    notes: "Fragmented state system creates significant product, pricing, and compliance variability."
  },
  {
    id: "eu-solvency-ii",
    jurisdiction: "European Union / EEA",
    regionId: "europe",
    coordinates: [4.35, 50.85],
    regulator: "EIOPA plus national competent authorities",
    solvencyRegime: "Solvency II capital, governance, and reporting framework",
    filingModel: "Product oversight and governance rules; national conduct requirements",
    climateDisclosure: "Sustainability and climate scenario analysis embedded in supervisory priorities",
    aiOrDataGovernance: "EU AI Act and GDPR shape underwriting, pricing, and claims analytics",
    regulatoryIntensity: 5,
    notes: "Open EIOPA registers can be used to enrich authorized undertaking views."
  },
  {
    id: "uk-pra-fca",
    jurisdiction: "United Kingdom",
    regionId: "europe",
    coordinates: [-0.13, 51.51],
    regulator: "Prudential Regulation Authority and Financial Conduct Authority",
    solvencyRegime: "Solvency UK reforms following Solvency II",
    filingModel: "Conduct, pricing fairness, and product governance rules",
    climateDisclosure: "Climate Biennial Exploratory Scenario legacy and ongoing PRA expectations",
    aiOrDataGovernance: "FCA consumer duty, data ethics, and operational resilience emphasis",
    regulatoryIntensity: 5,
    notes: "London Market remains a global specialty and reinsurance hub."
  },
  {
    id: "china-nfra",
    jurisdiction: "China",
    regionId: "asia-pacific",
    coordinates: [116.4, 39.9],
    regulator: "National Financial Regulatory Administration",
    solvencyRegime: "C-ROSS solvency framework",
    filingModel: "Tariff liberalization by line with strong product and distribution oversight",
    climateDisclosure: "Green finance and catastrophe protection policy initiatives continue expanding",
    aiOrDataGovernance: "Data localization and algorithm governance are central compliance factors",
    regulatoryIntensity: 5,
    notes: "High growth but tightly supervised market, with agriculture and catastrophe pools strategically important."
  },
  {
    id: "japan-fsa",
    jurisdiction: "Japan",
    regionId: "asia-pacific",
    coordinates: [139.76, 35.68],
    regulator: "Financial Services Agency",
    solvencyRegime: "Economic value-based solvency regime transition",
    filingModel: "Product approval and conduct supervision",
    climateDisclosure: "TCFD-style disclosures and earthquake risk resilience remain major themes",
    aiOrDataGovernance: "Customer protection and governance controls guide advanced analytics use",
    regulatoryIntensity: 4,
    notes: "Earthquake and typhoon exposures strongly influence pricing and reinsurance demand."
  },
  {
    id: "brazil-susep",
    jurisdiction: "Brazil",
    regionId: "latin-america",
    coordinates: [-47.88, -15.79],
    regulator: "SUSEP",
    solvencyRegime: "Risk-based supervision with local capital and reinsurance rules",
    filingModel: "Product registration and open insurance modernization",
    climateDisclosure: "Climate risk and sustainability regulation is developing",
    aiOrDataGovernance: "Open insurance and data-sharing governance are emerging priorities",
    regulatoryIntensity: 4,
    notes: "Largest Latin American non-life market with growing embedded and digital distribution."
  },
  {
    id: "uae-cbuae",
    jurisdiction: "United Arab Emirates",
    regionId: "middle-east-africa",
    coordinates: [54.38, 24.45],
    regulator: "Central Bank of the UAE",
    solvencyRegime: "Risk-based capital and governance standards",
    filingModel: "Mandatory product and distribution oversight",
    climateDisclosure: "Sustainable finance policy direction is increasing",
    aiOrDataGovernance: "Digital insurance, outsourcing, and data controls are important supervisory themes",
    regulatoryIntensity: 4,
    notes: "Regional hub for commercial, energy, construction, and specialty risk."
  }
];

export const seededCatastropheEvents: CatastropheEvent[] = [
  {
    id: "seed-us-flood",
    type: "Flood",
    title: "NFIP repetitive-loss watch",
    location: "Gulf Coast, United States",
    regionId: "north-america",
    coordinates: [-90.1, 29.95],
    severity: 7,
    insuredLossUsdBn: 1.8,
    insuranceImpact: "Flood claims pressure, mitigation grants, and homeowners affordability debate.",
    source: "OpenFEMA NFIP and disaster declaration APIs",
    sourceUrl: "https://www.fema.gov/api/open/v1/NfipMultipleLossProperties",
    date: "2026-06-01"
  },
  {
    id: "seed-japan-quake",
    type: "Earthquake",
    title: "Japan earthquake accumulation scenario",
    location: "Honshu, Japan",
    regionId: "asia-pacific",
    coordinates: [137.2, 36.2],
    severity: 8,
    insuredLossUsdBn: 4.6,
    insuranceImpact: "Residential earthquake pool capacity and commercial property treaty renewals in focus.",
    source: "USGS earthquake feeds and local market reporting",
    sourceUrl: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
    date: "2026-05-18"
  },
  {
    id: "seed-eu-flood",
    type: "Flood",
    title: "Central Europe flood resilience",
    location: "Germany, Austria, Czechia",
    regionId: "europe",
    coordinates: [13.4, 48.9],
    severity: 6,
    insuredLossUsdBn: 2.1,
    insuranceImpact: "Public-private flood insurance design and property rate segmentation under review.",
    source: "Public catastrophe reporting",
    date: "2026-05-29"
  },
  {
    id: "seed-latam-quake",
    type: "Earthquake",
    title: "Andean quake protection gap",
    location: "Chile and Peru corridor",
    regionId: "latin-america",
    coordinates: [-71.5, -30.3],
    severity: 7,
    insuredLossUsdBn: 1.2,
    insuranceImpact: "Infrastructure, mining, and parametric coverage demand rising amid underinsurance.",
    source: "USGS earthquake feeds and market summaries",
    date: "2026-04-22"
  }
];

export const seededNews: NewsItem[] = [
  {
    id: "news-iais-gimar",
    title: "Global insurance supervisors flag market concentration and climate risk monitoring",
    regionId: "europe",
    category: "Regulation",
    publishedAt: "2026-06-12",
    source: "IAIS / GIMAR public reporting",
    url: "https://www.iaisweb.org/activities-topics/financial-stability/global-insurance-market-report/",
    severity: 7,
    summary: "Sector-wide monitoring points to a US-led premium base, increasing catastrophe risk scrutiny, and continued focus on capital quality."
  },
  {
    id: "news-naic-share",
    title: "US P&C market share remains concentrated in top personal-lines groups",
    regionId: "north-america",
    category: "Market",
    publishedAt: "2026-06-08",
    source: "NAIC market share report",
    url: "https://content.naic.org/",
    severity: 6,
    summary: "Top US P&C groups retain significant share, with auto and homeowners loss trends driving rate filings and consumer affordability debate."
  },
  {
    id: "news-reinsurance-cat",
    title: "Reinsurance renewals price secondary peril volatility into global property treaties",
    regionId: "europe",
    category: "Reinsurance",
    publishedAt: "2026-06-04",
    source: "Market intelligence synthesis",
    severity: 8,
    summary: "Flood, wildfire, and severe convective storm experience continues to reshape attachment points, aggregate covers, and capital deployment."
  },
  {
    id: "news-open-insurance",
    title: "Open insurance initiatives expand data-sharing use cases in Latin America",
    regionId: "latin-america",
    category: "Regulation",
    publishedAt: "2026-05-28",
    source: "Regulatory synthesis",
    severity: 5,
    summary: "Brazil and regional peers are creating conditions for embedded distribution, real-time underwriting, and stronger conduct supervision."
  }
];

export const dataSources: DataSource[] = [
  {
    name: "USGS Earthquake GeoJSON Feeds",
    coverage: "Global real-time and historical earthquake observations",
    access: "Open API",
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
    dashboardUse: "Live catastrophe layer, event timeline, and exposure map overlays."
  },
  {
    name: "OpenFEMA API",
    coverage: "US disaster declarations, NFIP claims/policies, repetitive-loss properties, mitigation data",
    access: "Open API",
    url: "https://www.fema.gov/about/openfema/api",
    dashboardUse: "Flood and disaster signal panels, state-level loss context, and NFIP resilience indicators."
  },
  {
    name: "IAIS Global Insurance Market Report",
    coverage: "Global insurance sector monitoring across jurisdictions representing most worldwide premiums",
    access: "Open report",
    url: "https://www.iaisweb.org/activities-topics/financial-stability/global-insurance-market-report/",
    dashboardUse: "Regional premium shares, solvency themes, macro risk framing, and source notes."
  },
  {
    name: "NAIC P&C Market Share Reports",
    coverage: "US P&C top groups, premiums, loss ratios, and line-level market share",
    access: "Open report",
    url: "https://content.naic.org/",
    dashboardUse: "US insurer ranking calibration and personal/commercial line context."
  },
  {
    name: "EIOPA Registers",
    coverage: "EEA insurance and reinsurance undertaking registrations and Solvency II-related registers",
    access: "Open report",
    url: "https://www.eiopa.europa.eu/",
    dashboardUse: "European regulatory footprint and authorized undertaking enrichment."
  },
  {
    name: "GNews or NewsAPI",
    coverage: "Insurance, reinsurance, catastrophe, and regulatory news",
    access: "API key",
    url: "https://gnews.io/",
    dashboardUse: "Optional live news feed using VITE_GNEWS_API_KEY or equivalent adapter."
  },
  {
    name: "Insuramore / S&P Global / AM Best",
    coverage: "Detailed global P&C company rankings and line-of-business splits",
    access: "Commercial / restricted",
    url: "https://www.spglobal.com/marketintelligence/",
    dashboardUse: "Commercial-grade replacement for curated seed company market-share estimates."
  }
];
