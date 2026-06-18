import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BarChart3, Globe2, ShieldAlert, TrendingUp } from "lucide-react";
import { GlobalGlobe } from "./components/GlobalGlobe";
import { MarketTreemap } from "./components/MarketTreemap";
import { LineBusinessChart } from "./components/LineBusinessChart";
import { RegionalInsights } from "./components/RegionalInsights";
import { RegulationBoard } from "./components/RegulationBoard";
import { RiskNewsFeed } from "./components/RiskNewsFeed";
import { DataSourceCatalog } from "./components/DataSourceCatalog";
import {
  dataSources,
  insurers,
  regions,
  regulations,
  seededCatastropheEvents,
  seededNews
} from "./data/insuranceData";
import { fetchEarthquakeEvents, fetchFemaDisasterEvents, fetchInsuranceNews } from "./services/liveData";
import type { CatastropheEvent, NewsItem, RegionId } from "./types";
import "./styles.css";

type LiveState = {
  events: CatastropheEvent[];
  news: NewsItem[];
  warnings: string[];
  loading: boolean;
};

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState<RegionId>("north-america");
  const [liveState, setLiveState] = useState<LiveState>({
    events: [],
    news: [],
    warnings: [],
    loading: true
  });

  useEffect(() => {
    let cancelled = false;

    async function loadLiveSignals() {
      const [earthquakes, fema, news] = await Promise.all([
        fetchEarthquakeEvents(),
        fetchFemaDisasterEvents(),
        fetchInsuranceNews()
      ]);

      if (cancelled) {
        return;
      }

      const warnings = [earthquakes, fema, news]
        .filter((result) => result.error)
        .map((result) => `${result.source}: ${result.error}`);

      setLiveState({
        events: [...earthquakes.data, ...fema.data],
        news: news.data,
        warnings,
        loading: false
      });
    }

    void loadLiveSignals();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedRegionData = regions.find((region) => region.id === selectedRegion) ?? regions[0];
  const allEvents = useMemo(
    () =>
      [...liveState.events, ...seededCatastropheEvents].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [liveState.events]
  );
  const allNews = useMemo(
    () =>
      [...liveState.news, ...seededNews].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [liveState.news]
  );
  const totalPremium = regions.reduce((sum, region) => sum + region.premiumsUsdBn, 0);
  const topInsurerShare = insurers.reduce((sum, insurer) => sum + insurer.marketSharePct, 0);

  return (
    <main>
      <Hero loading={liveState.loading} />

      <section className="kpi-grid" aria-label="Dashboard key performance indicators">
        <KpiCard
          icon={<Globe2 />}
          label="Modeled P&C premiums"
          value={`$${totalPremium.toLocaleString()}B`}
          helper="Regional market pool"
        />
        <KpiCard
          icon={<BarChart3 />}
          label="Top carrier share"
          value={`${topInsurerShare.toFixed(1)}%`}
          helper="Top seeded global groups"
        />
        <KpiCard
          icon={<ShieldAlert />}
          label="Risk signals"
          value={allEvents.length.toString()}
          helper="Live + curated cat events"
        />
        <KpiCard
          icon={<TrendingUp />}
          label="Fastest growth"
          value={`${Math.max(...regions.map((region) => region.growthPct)).toFixed(1)}%`}
          helper="Latin America regional estimate"
        />
      </section>

      <div className="dashboard-grid">
        <GlobalGlobe
          regions={regions}
          insurers={insurers}
          events={allEvents}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />
        <RegionalInsights region={selectedRegionData} insurers={insurers} events={allEvents} />
      </div>

      <div className="visual-grid">
        <MarketTreemap insurers={insurers} />
        <LineBusinessChart insurers={insurers} />
      </div>

      <RiskNewsFeed
        events={allEvents}
        news={allNews}
        selectedRegion={selectedRegion}
        dataWarnings={liveState.warnings}
      />

      <RegulationBoard regulations={regulations} selectedRegion={selectedRegion} />
      <DataSourceCatalog sources={dataSources} />
    </main>
  );
}

type KpiCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
};

function Hero({ loading }: { loading: boolean }) {
  return (
    <header className="hero">
      <div className="hero-copy">
        <p className="eyebrow">P&C Insurance World</p>
        <h1>Global insurance intelligence for markets, carriers, catastrophes, and regulation.</h1>
        <p>
          A D3-powered dashboard for visualizing property and casualty insurer market share, regional premium
          concentration, line-of-business mix, regulation, and insurance-impact news. Open APIs are connected where
          available; curated public-source estimates fill gaps where global market-share data is restricted.
        </p>
      </div>
      <div className="hero-card">
        <span className={loading ? "status-dot loading" : "status-dot"} />
        <strong>{loading ? "Loading live feeds" : "Live feeds merged"}</strong>
        <small>USGS earthquakes, OpenFEMA declarations, optional GNews key</small>
      </div>
    </header>
  );
}

function KpiCard({ icon, label, value, helper }: KpiCardProps) {
  return (
    <article className="kpi-card">
      <span>{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{helper}</small>
      </div>
    </article>
  );
}
