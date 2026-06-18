import type { RegionId, Regulation } from "../types";

type RegulationBoardProps = {
  regulations: Regulation[];
  selectedRegion?: RegionId;
};

export function RegulationBoard({ regulations, selectedRegion }: RegulationBoardProps) {
  const visibleRegulations = selectedRegion
    ? regulations.filter((regulation) => regulation.regionId === selectedRegion)
    : regulations;

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Regulatory intelligence</p>
          <h2>Solvency, filings, climate, and AI governance</h2>
        </div>
        <span className="source-chip">{visibleRegulations.length} jurisdictions</span>
      </div>

      <div className="regulation-grid">
        {visibleRegulations.map((regulation) => (
          <article key={regulation.id} className="reg-card">
            <div>
              <span className="intensity">
                {Array.from({ length: 5 }, (_, index) => (
                  <i key={index} className={index < regulation.regulatoryIntensity ? "filled" : ""} />
                ))}
              </span>
              <h3>{regulation.jurisdiction}</h3>
              <p>{regulation.regulator}</p>
            </div>

            <dl>
              <div>
                <dt>Solvency</dt>
                <dd>{regulation.solvencyRegime}</dd>
              </div>
              <div>
                <dt>Filings</dt>
                <dd>{regulation.filingModel}</dd>
              </div>
              <div>
                <dt>Climate</dt>
                <dd>{regulation.climateDisclosure}</dd>
              </div>
              <div>
                <dt>AI/data</dt>
                <dd>{regulation.aiOrDataGovernance}</dd>
              </div>
            </dl>

            <footer>{regulation.notes}</footer>
          </article>
        ))}
      </div>
    </section>
  );
}
