import { Activity, AlertTriangle, Newspaper, RadioTower } from "lucide-react";
import type { CatastropheEvent, NewsItem, RegionId } from "../types";

type RiskNewsFeedProps = {
  events: CatastropheEvent[];
  news: NewsItem[];
  selectedRegion?: RegionId;
  dataWarnings: string[];
};

export function RiskNewsFeed({ events, news, selectedRegion, dataWarnings }: RiskNewsFeedProps) {
  const visibleEvents = selectedRegion ? events.filter((event) => event.regionId === selectedRegion) : events;
  const visibleNews = selectedRegion ? news.filter((item) => item.regionId === selectedRegion) : news;
  const highestSeverity = Math.max(0, ...visibleEvents.map((event) => event.severity), ...visibleNews.map((item) => item.severity));

  return (
    <section className="panel risk-feed">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Catastrophe and news desk</p>
          <h2>Insurance-impact signal feed</h2>
        </div>
        <span className={highestSeverity >= 8 ? "risk-badge high" : "risk-badge"}>
          <Activity size={16} /> Peak {highestSeverity}/10
        </span>
      </div>

      {dataWarnings.length > 0 ? (
        <div className="warning-banner">
          <RadioTower size={16} />
          <span>{dataWarnings.join(" | ")}</span>
        </div>
      ) : null}

      <div className="feed-columns">
        <div>
          <h3>
            <AlertTriangle size={18} /> Event watch
          </h3>
          <div className="timeline">
            {visibleEvents.slice(0, 9).map((event) => (
              <article key={event.id} className={event.live ? "timeline-item live" : "timeline-item"}>
                <div>
                  <span>{event.type}</span>
                  {event.live ? <em>Live</em> : null}
                </div>
                <h4>{event.title}</h4>
                <p>{event.insuranceImpact}</p>
                <footer>
                  <small>{event.location}</small>
                  <strong>{event.insuredLossUsdBn ? `$${event.insuredLossUsdBn}B est.` : `Severity ${event.severity}/10`}</strong>
                </footer>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3>
            <Newspaper size={18} /> Insurance news
          </h3>
          <div className="news-list">
            {visibleNews.slice(0, 8).map((item) => (
              <article key={item.id}>
                <div>
                  <span>{item.category}</span>
                  <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                </div>
                <h4>{item.url ? <a href={item.url}>{item.title}</a> : item.title}</h4>
                <p>{item.summary}</p>
                <footer>
                  <small>{item.source}</small>
                  <strong>{item.severity}/10</strong>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(date);
}
