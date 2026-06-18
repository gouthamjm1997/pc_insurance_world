import { useMemo } from "react";
import * as d3 from "d3";
import type { Insurer } from "../types";

type MarketTreemapProps = {
  insurers: Insurer[];
};

const width = 720;
const height = 390;

type TreemapDatum = {
  name: string;
  value: number;
  color?: string;
  insurer?: Insurer;
};

export function MarketTreemap({ insurers }: MarketTreemapProps) {
  const nodes = useMemo(() => {
    const root = d3
      .hierarchy<TreemapDatum>({
        name: "P&C market",
        value: 0,
        children: insurers.map((insurer) => ({
          name: insurer.name,
          value: insurer.marketSharePct,
          color: insurer.color,
          insurer
        }))
      } as TreemapDatum & { children: TreemapDatum[] })
      .sum((datum) => datum.value)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    return d3.treemap<TreemapDatum>().size([width, height]).paddingInner(6).round(true)(root).leaves();
  }, [insurers]);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Carrier landscape</p>
          <h2>Estimated global P&C market share</h2>
        </div>
        <span className="source-chip">Seeded from public rankings</span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="treemap"
        role="img"
        aria-label="Treemap of estimated global P&C market share by major insurer"
      >
        {nodes.map((node) => {
          const insurer = node.data.insurer;
          const cellWidth = node.x1 - node.x0;
          const cellHeight = node.y1 - node.y0;
          const textVisible = cellWidth > 80 && cellHeight > 52;

          return (
            <g key={node.data.name} transform={`translate(${node.x0}, ${node.y0})`}>
              <rect
                width={cellWidth}
                height={cellHeight}
                rx="16"
                fill={node.data.color}
                opacity="0.88"
                className="treemap-cell"
              />
              {textVisible ? (
                <>
                  <text x="14" y="24" className="treemap-label">
                    {node.data.name}
                  </text>
                  <text x="14" y="48" className="treemap-value">
                    {node.data.value.toFixed(1)}% share
                  </text>
                  <text x="14" y="72" className="treemap-subvalue">
                    ${insurer?.grossDirectPremiumsUsdBn.toFixed(1)}B premiums
                  </text>
                </>
              ) : null}
              <title>
                {node.data.name}: {node.data.value.toFixed(1)}% estimated global P&C share; combined ratio{" "}
                {insurer?.combinedRatioPct.toFixed(1)}%
              </title>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
