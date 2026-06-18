import { useMemo } from "react";
import * as d3 from "d3";
import type { Insurer, LineOfBusiness } from "../types";

type LineBusinessChartProps = {
  insurers: Insurer[];
};

const width = 760;
const rowHeight = 38;
const margin = { top: 20, right: 24, bottom: 34, left: 150 };
const lineOrder: LineOfBusiness["line"][] = [
  "Auto",
  "Property",
  "Commercial Liability",
  "Workers Comp",
  "Specialty",
  "Marine & Aviation"
];

const color = d3
  .scaleOrdinal<LineOfBusiness["line"], string>()
  .domain(lineOrder)
  .range(["#22c55e", "#38bdf8", "#a78bfa", "#f97316", "#f43f5e", "#facc15"]);

export function LineBusinessChart({ insurers }: LineBusinessChartProps) {
  const height = margin.top + margin.bottom + insurers.length * rowHeight;
  const x = useMemo(() => d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]), []);
  const ticks = x.ticks(5);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Lines of business</p>
          <h2>Portfolio mix by insurer</h2>
        </div>
        <span className="source-chip">P&C split</span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="lob-chart"
        role="img"
        aria-label="Stacked bar chart showing line of business mix by insurer"
      >
        <g>
          {ticks.map((tick) => (
            <g key={tick} transform={`translate(${x(tick)},0)`}>
              <line y1={margin.top - 10} y2={height - margin.bottom + 6} className="axis-grid" />
              <text y={height - 9} className="axis-tick">
                {tick}%
              </text>
            </g>
          ))}
        </g>

        {insurers.map((insurer, rowIndex) => {
          let cumulative = 0;
          const y = margin.top + rowIndex * rowHeight + 8;

          return (
            <g key={insurer.id}>
              <text x={margin.left - 14} y={y + 16} className="row-label">
                {insurer.name}
              </text>
              {lineOrder.map((line) => {
                const segment = insurer.lines.find((candidate) => candidate.line === line);
                const value = segment?.valuePct ?? 0;
                const x0 = x(cumulative);
                cumulative += value;
                const x1 = x(cumulative);

                return (
                  <rect
                    key={line}
                    x={x0}
                    y={y}
                    width={Math.max(0, x1 - x0 - 2)}
                    height={24}
                    rx="8"
                    fill={color(line)}
                    opacity="0.9"
                  >
                    <title>
                      {insurer.name} - {line}: {value}%
                    </title>
                  </rect>
                );
              })}
            </g>
          );
        })}
      </svg>

      <div className="legend-wrap">
        {lineOrder.map((line) => (
          <span key={line}>
            <i style={{ background: color(line) }} /> {line}
          </span>
        ))}
      </div>
    </section>
  );
}
