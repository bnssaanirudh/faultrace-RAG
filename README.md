# FaultTrace-RAG

## Counterfactual Fault Localization for Corpus-Level LLM Analytics Pipelines

FaultTrace-RAG addresses a fundamental challenge in LLM-based analytics: when a pipeline produces a wrong answer over a corpus, **which component failed?** Was it the retrieval scope (wrong evidence set R), fact extraction (incorrect E), aggregation logic (wrong A), or an interaction among these?

### Research Problem

Given a corpus-level query Q and a pipeline producing answer A* != A_gold, FaultTrace-RAG computes:

- **Scope Error (R)**: Did the pipeline retrieve the wrong records?
- **Extraction Error (E)**: Did it extract incorrect structured facts?
- **Aggregation Error (A)**: Did it compute the aggregate incorrectly?
- **Interaction Effects**: R x E, R x A, E x A, R x E x A combinations

By systematically replacing each component with a deterministic oracle, the system attributes recoverable errors and issues coverage certificates.

---

## System Components (Current: Prompt 10 - Final Release Candidate)

| Component | Status |
|-----------|--------|
| Core domain contracts | IMPLEMENTED |
| Track M corpus generator | IMPLEMENTED |
| Procedural query factory | IMPLEMENTED |
| Dual gold engine (Pandas + DuckDB) | IMPLEMENTED |
| Deterministic baseline pipeline (P0) | IMPLEMENTED |
| FastAPI service | IMPLEMENTED |
| Next.js dashboard | IMPLEMENTED |
| Real LLM providers (P1-P5) | IMPLEMENTED |
| Oracle replacement lattice | IMPLEMENTED |
| Counterfactual attribution scores | IMPLEMENTED |
| Coverage certificates (full) | IMPLEMENTED |
| Interactive Visualizations (Prompt 7) | IMPLEMENTED |
| Experiment Specification (Prompt 8) | IMPLEMENTED |
| Track T & Security Governance (Prompt 9) | IMPLEMENTED |
| CLI & Final Release Polish (Prompt 10) | IN PROGRESS |

---

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- (Optional) Docker

### Setup

```bash
# Clone / enter workspace
cd faulttrace-rag

# Backend setup
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt -r requirements-dev.txt
pip install -e .

# Frontend setup
cd apps/web
npm install
cd ../..

# Configure environment
cp .env.example .env
```

### Run Migrations and Seed Demo

```bash
make migrate
make seed-demo
```

### Start Development Servers

```bash
make dev
```

- API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Dashboard: http://localhost:3000

### Full Test Suite

```bash
make test        # all tests
make lint        # ruff + eslint
make typecheck   # mypy + tsc
make smoke       # end-to-end smoke path
```

---

## Demo Path

1. Open http://localhost:3000
2. Click **Start Demo** on the overview page
3. Navigate to **Corpus Worlds** to browse generated records
4. Open **Query Library** and pick any question
5. Click **Run Baseline** to execute the deterministic P0 pipeline
6. Navigate to **Trace Inspector** to see stage-by-stage trace

---

## Current Milestone: Prompt 10 (Final Release)

We have successfully implemented Prompts 1 through 9, bringing the system to ~96% completion. The system currently features:
- Track M deterministic data generation and the dual gold evaluation engine.
- Exact Counterfactual Attribution Engine (Shapley) and Selective Prediction Certification Engine.
- Interactive trace inspector, pipeline comparison views, and comprehensive reporting.
- YAML/JSON experiment specification and execution frameworks.
- Track T human-annotation workflow (EDGAR/XBRL pilot).
- Security hardening (CSP/HSTS) and comprehensive Audit Logging.

We are currently working on **Prompt 10** (Final Release Engineer). Current goals include finalizing the repository-wide audit, completing the `faulttrace` CLI for hardware benchmarking, finalizing database migrations, hardening the API, building E2E tests, and exporting the final research package.

---

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full component diagram and data flow.

## Decisions

See [docs/DECISIONS.md](docs/DECISIONS.md) for the architecture decision log.

## Build State

See [docs/BUILD_STATE.md](docs/BUILD_STATE.md) for current implementation status.
