import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import countries110 from "world-atlas/countries-110m.json";
import type { CatastropheEvent, Insurer, RegionId, RegionMarket } from "../types";

type GlobalGlobeProps = {
  regions: RegionMarket[];
  insurers: Insurer[];
  events: CatastropheEvent[];
  selectedRegion?: RegionId;
  onSelectRegion: (regionId: RegionId) => void;
};

const width = 760;
const height = 540;

export function GlobalGlobe({ regions, insurers, events, selectedRegion, onSelectRegion }: GlobalGlobeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [rotation, setRotation] = useState<[number, number, number]>([-18, -18, 0]);

  const countries = useMemo(() => {
    const atlas = countries110 as {
      objects: {
        countries: unknown;
      };
    };

    return (feature(countries110 as never, atlas.objects.countries as never) as { features: unknown[] }).features;
  }, []);

  const projection = useMemo(
    () =>
      d3
        .geoOrthographic()
        .translate([width / 2, height / 2])
        .scale(245)
        .rotate(rotation)
        .clipAngle(90)
        .precision(0.5),
    [rotation]
  );

  const path = useMemo(() => d3.geoPath(projection), [projection]);
  const graticule = useMemo(() => d3.geoGraticule10(), []);
  const premiumScale = useMemo(
    () =>
      d3
        .scaleSqrt()
        .domain([0, d3.max(regions, (region) => region.premiumsUsdBn) ?? 1])
        .range([8, 42]),
    [regions]
  );
  const eventScale = useMemo(() => d3.scaleLinear().domain([1, 10]).range([4, 16]), []);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const dragBehavior = d3.drag<SVGSVGElement, unknown>().on("drag", (event) => {
      setRotation(([lambda, phi, gamma]) => [
        lambda + event.dx * 0.35,
        Math.max(-75, Math.min(75, phi - event.dy * 0.35)),
        gamma
      ]);
    });

    d3.select(svgRef.current).call(dragBehavior);
  }, []);

  const regionLookup = useMemo(() => new Map(regions.map((region) => [region.id, region])), [regions]);

  const project = (coordinates: [number, number]) => {
    const visible = d3.geoDistance(coordinates, [-rotation[0], -rotation[1]]) <= Math.PI / 2;
    if (!visible) {
      return undefined;
    }

    return projection(coordinates) ?? undefined;
  };

  return (
    <section className="panel globe-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Global command center</p>
          <h2>Market share, footprints, and live catastrophe signals</h2>
        </div>
        <span className="live-pill">Drag globe</span>
      </div>

      <div className="globe-shell">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Interactive globe showing global P&C insurance markets, insurer headquarters, and catastrophe events"
        >
          <defs>
            <radialGradient id="ocean" cx="45%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="58%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx={width / 2} cy={height / 2} r={246} fill="url(#ocean)" className="globe-ocean" />
          <path d={path(graticule) ?? undefined} className="globe-graticule" />

          <g>
            {countries.map((country, index) => (
              <path key={index} d={path(country as never) ?? undefined} className="country" />
            ))}
          </g>

          <g>
            {regions.map((region) => {
              const position = project(region.centroid);
              if (!position) {
                return null;
              }
              const isSelected = selectedRegion === region.id;

              return (
                <g
                  key={region.id}
                  transform={`translate(${position[0]}, ${position[1]})`}
                  className="svg-region-button"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectRegion(region.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      onSelectRegion(region.id);
                    }
                  }}
                >
                  <circle
                    r={premiumScale(region.premiumsUsdBn)}
                    className={isSelected ? "region-bubble selected" : "region-bubble"}
                  />
                  <text className="region-label" y={premiumScale(region.premiumsUsdBn) + 18}>
                    {region.globalPcSharePct.toFixed(1)}%
                  </text>
                </g>
              );
            })}
          </g>

          <g>
            {insurers.map((insurer) => {
              const position = project(insurer.coordinates);
              if (!position) {
                return null;
              }

              return (
                <g key={insurer.id} transform={`translate(${position[0]}, ${position[1]})`} className="insurer-dot">
                  <circle r={4 + insurer.marketSharePct} fill={insurer.color} />
                  <circle r={10 + insurer.marketSharePct * 2} fill={insurer.color} opacity="0.12" />
                  <title>
                    {insurer.name} - {insurer.marketSharePct}% estimated global P&C share
                  </title>
                </g>
              );
            })}
          </g>

          <g filter="url(#glow)">
            {events.slice(0, 18).map((event) => {
              const position = project(event.coordinates);
              if (!position) {
                return null;
              }

              return (
                <g key={event.id} transform={`translate(${position[0]}, ${position[1]})`} className="event-pulse">
                  <circle r={eventScale(event.severity)} className="event-halo" />
                  <circle r={Math.max(3, eventScale(event.severity) / 2.4)} className="event-core" />
                  <title>
                    {event.title} - {event.location}. {event.insuranceImpact}
                  </title>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="globe-legend">
          <span>
            <i className="legend-dot region" /> Regional P&C premium share
          </span>
          <span>
            <i className="legend-dot carrier" /> Major insurer HQ / anchor market
          </span>
          <span>
            <i className="legend-dot event" /> Catastrophe or risk signal
          </span>
        </div>
      </div>

      <div className="region-strip">
        {regions.map((region) => (
          <button
            key={region.id}
            className={selectedRegion === region.id ? "region-card active" : "region-card"}
            type="button"
            onClick={() => onSelectRegion(region.id)}
          >
            <span>{region.name}</span>
            <strong>{region.globalPcSharePct.toFixed(1)}%</strong>
            <small>{regionLookup.get(region.id)?.premiumsUsdBn.toLocaleString()}B premiums</small>
          </button>
        ))}
      </div>
    </section>
  );
}
