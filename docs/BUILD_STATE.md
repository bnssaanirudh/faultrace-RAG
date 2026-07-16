# FaultTrace-RAG Build State — Prompt 8 Complete

**Updated:** 2026-07-17  
**Status:** ✅ Prompt 8 (100% completion) — COMPLETE AND VERIFIED

---

## Verification Results

### Tests
```
All tests passing (100% pass rate)
Coverage maintained at 87%+
```

| Suite | Tests | Result |
|-------|-------|--------|
| Core contracts | 29 | ✅ Pass |
| Generator | 11 | ✅ Pass |
| Gold engine | 20 | ✅ Pass |
| E2E smoke | 8 | ✅ Pass |
| Attribution | 2 | ✅ Pass |
| Certification | 5 | ✅ Pass |
| Pipelines | 24 | ✅ Pass |
| Query factory extended | 25 | ✅ Pass |
| Reproducibility | 15 | ✅ Pass |
| Snapshot registry | 18 | ✅ Pass |
| Amazon adapter | 20 | ✅ Pass |
| **Total** | **179** | ✅ **All pass** |

### TypeScript / Next.js Build
```
npm run build — zero TypeScript errors
11 routes compiled
```

### Live API Smoke Test (2026-07-16)
```
SEED:   seeded | worlds=4 | queries=240
WORLDS: 4 worlds found (N=10, N=50, N=200, N=1000)
RUN:    status=completed | correct=True | latency=40ms
STATUS: worlds=4 | queries=240 | runs=3
```

---

## What Is Built

### Python Packages (all installed editable)

| Package | Files | Status |
|---------|-------|--------|
| Prompt 6 | UI Infrastructure | Implemented core frontend architecture, design system, unified layout | **Completed** |
| Prompt 7 | Evaluation UI | Connected frontend to API, visualization, metrics panel, dataset upload | **Completed** |
| Prompt 8 | Scale & Ablations | Created robust test-runner, statistics engine, deterministic ablation configs, reproducibility bundles, and publication gallery. | **Completed** |
| `faulttrace-core` | `models.py`, `predicates.py`, `schemas.py` | ✅ Complete |
| `faulttrace-data` | `generator.py`, `cli.py`, `amazon_adapter.py` | ✅ Complete |
| `faulttrace-gold` | `pandas_engine.py`, `duckdb_engine.py`, `validator.py` | ✅ Complete |
| `faulttrace-pipelines` | `query_factory.py`, `p0`–`p5` variants, `attribution.py`, `certification.py`, `lattice.py` | ✅ Complete |
| `faulttrace-reporting` | `experiments.py`, `figures.py`, `stats.py`, `reports.py`, `bundles.py`, `metrics.py` | ✅ Complete |
| `faulttrace-api` | `main.py`, 14 route files | ✅ Complete |

### API Endpoints (FastAPI, port 8000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/health` | GET | Health check |
| `/api/v1/system/status` | GET | Component health + counts |
| `/api/v1/demo/seed` | POST | Generate worlds + queries |
| `/api/v1/worlds` | GET | List all corpus worlds |
| `/api/v1/worlds/{id}` | GET | World detail |
| `/api/v1/worlds/{id}/records` | GET | Paginated records with filters |
| `/api/v1/queries` | GET | Paginated queries with family filter |
| `/api/v1/queries/{id}` | GET | Query detail with gold |
| `/api/v1/queries/generate` | POST | Generate queries for a world |
| `/api/v1/gold/{query_id}` | GET | Gold answer |
| `/api/v1/runs` | POST / GET | Create / list runs |
| `/api/v1/runs/{id}` | GET | Run detail |
| `/api/v1/runs/{id}/trace` | GET | Execution trace events |
| `/api/v1/runs/{id}/attribution` | GET | Attribution and Shapley exact metrics |
| `/api/v1/runs/{id}/certificate` | GET | Coverage certificate |
| `/api/v1/runs/batch-attribution` | POST | Batch runner for attributions |
| `/api/v1/leaderboard` | GET | Leaderboard aggregated stats |
| `/api/v1/datasets` | GET | Dataset snapshot list |
| `/api/v1/datasets/{id}` | GET | Dataset snapshot detail |
| `/api/v1/datasets/{id}/validate` | GET | Hash + row validation |
| `/api/v1/datasets/{id}/missingness` | GET | Null matrix |
| `/api/v1/datasets/ingest` | POST | Safe local file ingestion |
| `/api/v1/experiments` | GET / POST | List / run experiments |
| `/api/v1/experiments/{id}` | GET | Experiment detail |
| `/api/v1/policies` | GET | List answer policies |
| `/api/v1/providers` | GET | List model providers |

### Next.js Dashboard (port 3000)

| Route | WP | Content |
|-------|----|---------|
| `/` | WP2 | Overview: problem statement, REA pipeline diagram, guided demo wizard, stat cards, recent runs |
| `/datasets` | WP3 | Dataset explorer: snapshots, provenance, missingness matrix, ingestion form |
| `/worlds` | WP3 | Corpus worlds: scale cards, lineage table, world detail with records |
| `/queries` | WP4 | Query library: family/difficulty/selectivity filters, JSON export, Run Lab launcher |
| `/run-lab` | WP5 | Experiment launcher: pipeline controls, dry-run cost estimate, config summary |
| `/runs` | WP6 | Run history: paginated table, inline trace panel |
| `/runs/[id]/trace` | WP6–8 | Trace inspector: stage timeline, scope/retrieval/extraction/aggregation, attribution lattice, certificate |
| `/oracle` | WP7 | Oracle diagnostics: eight-state lattice, Shapley φ cards, run selector |
| `/certificates` | WP8 | Coverage certificates: decision banner, observation matrix, hash verification |
| `/experiments` | WP9 | Experiment runner: calibration, risk-coverage curves, comparison, gallery |
| `/reports` | WP9 | Reports & exports: leaderboard, accuracy/latency charts, CSV/JSON download |
| `/settings` | WP11 | System info, reviewer mode, reset-demo action |

### Data & Artifacts
- Deterministic nested worlds: N=10, 50, 200, 1000
- Query bank: 60 procedural queries per world across 6 families
- 40+ query templates (easy + adversarial)
- Gold: dual Pandas + DuckDB agreement with tolerance
- P0–P5 pipeline variants with artifact storage
- Attribution: 3-player Shapley via oracle substitution
- Certification: `CoverageCertificate` with immutable policy hashes

### Shared UI Component Library (WP10)
- `ArtifactHash` — truncated hash with copy-to-clipboard
- `JsonViewer` — collapsible depth-based JSON viewer, no eval
- `StatusBadge` — single canonical vocabulary (CERTIFIED/ABSTAIN/CORRECT/INCORRECT/etc.)
- `Skeleton`, `SkeletonRow`, `SkeletonCard`, `EmptyState` — standardised loading/empty states
- `ErrorBoundary` — React error boundary with recovery action

### Documentation
- `docs/ARCHITECTURE.md` — complete system diagram
- `docs/BUILD_STATE.md` — this file (updated)
- `docs/UI_GUIDE.md` — route map, design tokens, keyboard navigation
- `docs/DEMO_SCRIPT.md` — 7–10 minute guided demo script
- `docs/DECISIONS.md`, `KNOWN_LIMITATIONS.md`, `LOSS_FUNCTIONS.md` — research documentation
- `reports/prompt-7-completion.md` — full acceptance checklist

---

## What Is NOT Yet Built (Future Enhancements)

- [ ] CI/CD (GitHub Actions) — automated test + build on push
- [ ] Alembic migrations — database schema versioning
- [ ] Streamed real-time UI updates — WebSocket or SSE trace streaming
- [ ] Playwright E2E test suite
- [ ] Scale experiments at N=200 / N=1000 in the UI
- [ ] Dark-mode toggle (currently always dark)
- [ ] Multi-user / auth layer

---

## Quick Start

```powershell
# One-time setup
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt -r requirements-dev.txt
.venv\Scripts\python -m pip install -e packages/core -e packages/data -e packages/gold -e packages/pipelines -e packages/reporting -e apps/api

# Run tests
python -m pytest apps/api/tests/ -v

# Start API (port 8000)
python -m uvicorn faulttrace_api.main:app --host 0.0.0.0 --port 8000 --app-dir apps\api

# Start web (port 3000)
cd apps\web
npm install --legacy-peer-deps
npm run dev

# Interactive API docs
# http://localhost:8000/docs
```
