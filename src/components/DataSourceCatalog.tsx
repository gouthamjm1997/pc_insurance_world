import { DatabaseZap, ExternalLink } from "lucide-react";
import type { DataSource } from "../types";

type DataSourceCatalogProps = {
  sources: DataSource[];
};

export function DataSourceCatalog({ sources }: DataSourceCatalogProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Open data strategy</p>
          <h2>APIs and source plan</h2>
        </div>
        <span className="source-chip">
          <DatabaseZap size={15} /> {sources.length} sources mapped
        </span>
      </div>

      <div className="source-grid">
        {sources.map((source) => (
          <article key={source.name} className="source-card">
            <div>
              <span className={`access-chip ${source.access.toLowerCase().replaceAll(" ", "-").replace("/", "")}`}>
                {source.access}
              </span>
              <a href={source.url} aria-label={`Open ${source.name}`}>
                <ExternalLink size={16} />
              </a>
            </div>
            <h3>{source.name}</h3>
            <p>{source.coverage}</p>
            <footer>{source.dashboardUse}</footer>
          </article>
        ))}
      </div>
    </section>
  );
}
