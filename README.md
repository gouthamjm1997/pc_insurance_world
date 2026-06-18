# P&C Insurance World Dashboard

A React, TypeScript, and D3 dashboard for exploring global property and casualty insurance markets. It visualizes major
P&C insurers by estimated market share, regional premium pools, carrier footprints, line-of-business mix, regulation, and
catastrophe/news signals.

## What is included

- Interactive D3 globe with regional P&C premium bubbles, major insurer headquarters, and catastrophe event pulses.
- D3 treemap for estimated global P&C market share by major carrier.
- Stacked D3 line-of-business view covering auto, property, liability, workers comp, specialty, and marine/aviation.
- Regional drill-down for premiums, growth, combined ratio, protection gap, climate-risk pressure, carrier footprints,
  and risk signals.
- Regulation board for selected jurisdictions covering solvency, rate/form filing, climate disclosure, and AI/data
  governance themes.
- Insurance-impact news and event feed that blends open live feeds with curated seed context.
- Data-source catalog that separates open APIs, open reports, API-key feeds, and commercial/restricted sources.

## Live and open data sources

There is no single public open API for real-time global P&C company market share. The app therefore ships with curated
public-source seed data and live-capable adapters:

- **USGS Earthquake GeoJSON Feeds**: open global earthquake feed used for live catastrophe events.
- **OpenFEMA API**: open US disaster declarations and NFIP-related datasets used for flood/disaster context.
- **IAIS Global Insurance Market Report**: public global insurance market monitoring used for regional premium framing.
- **NAIC P&C Market Share Reports**: public US market-share reports used for US carrier calibration.
- **EIOPA registers and public Solvency II material**: used for European regulatory context.
- **GNews adapter**: optional live insurance news feed. Set `VITE_GNEWS_API_KEY` to enable it.
- **Commercial datasets**: Insuramore, S&P Global Market Intelligence, AM Best, and similar providers can replace seed
  estimates for production-grade company rankings and line-level splits.

## Run locally

```bash
npm install
npm run dev
```

Build and type-check:

```bash
npm run build
```

Optional live news:

```bash
echo "VITE_GNEWS_API_KEY=your_key_here" > .env.local
npm run dev
```

## Notes for production hardening

- Replace curated insurer seed data with licensed company filings or commercial intelligence feeds where precision is
  required.
- Add a backend proxy for news APIs if provider keys should not be exposed to the browser.
- Add jurisdiction-specific adapters for SERFF/state filings, EIOPA registers, and regulator bulletins if deeper
  compliance workflow support is needed.
- Add automated data freshness checks and source attribution badges before using output in regulated decision-making.
