# FaultTrace-RAG UI Guide

Complete route map, design system reference, and keyboard navigation guide for the FaultTrace-RAG research analytics dashboard.

---

## Design Language

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `brand` / orange | `#ea580c` (`orange-600`) | Primary accent, active nav, Run Lab CTA |
| `validated` / teal | `#0d9488` (`teal-600`) | CERTIFIED state, coverage ≥ 1.0 |
| `failure` / red | `#dc2626` | INCORRECT, UNCERTIFIED, FAILED |
| `gold` / amber | `#f5c842` | ABSTAIN policy, warning states |
| `emerald` | `#10d98a` | CORRECT, success confirmation |
| `surface-0` | `#0c0d0f` | Page background |
| `surface-1` | `#111214` | Sidebar, modal overlays |
| `surface-2` | `#18191c` | Card backgrounds |
| `text-primary` | `#f1f1f1` | Headings, important values |
| `text-secondary` | `#9ca3af` | Body text, descriptions |
| `text-muted` | `#4b5563` | Meta text, timestamps |

### Typography

- **UI text**: Inter (300–800) — all labels, tables, buttons
- **Code / hashes**: JetBrains Mono — run IDs, artifact hashes, JSON payloads

### Status Vocabulary

All pages use `<StatusBadge>` with the single canonical vocabulary:

| Status | Color | Meaning |
|--------|-------|---------|
| `CERTIFIED` | Teal | Evidence coverage ≥ 1.0, answer safe to present |
| `CORRECT` | Emerald | Answer matches gold exactly |
| `ABSTAIN` | Amber | Policy refuses to answer (unknown scope or missing rows) |
| `RUNNING` | Orange (animated) | Pipeline executing |
| `PENDING` | Orange (dim) | Queued |
| `INCORRECT` | Red | Answer wrong vs gold |
| `UNCERTIFIED` | Red | Coverage below threshold |
| `FAILED` | Red | Pipeline error |
| `UNKNOWN` | Slate | No information available |

---

## Route Map

### `/` — Overview Dashboard (WP2)
**Purpose**: Landing page. Shows research context, pipeline status, and the guided demo entry point.

**Sections**:
- Header: project title, Seed Demo button
- Problem statement paragraph (orange-bordered card)
- REA Pipeline diagram: R → (arrow) → E → (arrow) → A
- Stat cards: Corpus Worlds, Queries, Pipeline Runs, Accuracy (recent)
- Corpus Worlds list (links to `/worlds/{id}`)
- Pipeline Registry (P0–P5 availability)
- Recent Runs (links to `/runs/{id}/trace`)
- System Components health strip
- Guided Demo Wizard (8-step workflow)

**Guided Demo Steps**:
1. `verifying_world` — seeds DB if empty
2. `running_p1` — executes P1-wrong-scope on a top_k query
3. `running_p4` — executes P4-compound-scope-facts on same query
4. `displaying_comparison` — shows P1 vs P4 answer vs gold
5. `showing_diagnostics` — loads Shapley attribution for both runs
6. `showing_certificate` — loads coverage certificates
7. `completed` — summary with links to Oracle and Certificates pages

---

### `/datasets` — Datasets Explorer (WP3)
Displays active data snapshots, schema provenance, cryptographic hash validation, field distribution summary, and missingness null matrix. Includes a safe local file ingestion form with size and path restrictions.

---

### `/worlds` — Corpus Worlds (WP3)
Deterministic nested world registry. Shows N=10/50/200/1000 scale cards, lineage (parent_world_id), seed, creation policy, and record hash. Links to world detail with paginated record table.

---

### `/queries` — Query Library (WP4)
Advanced-filtered query table with:
- Family filter: COUNT, MEAN, PROPORTION, COMPARISON, TOP_K, TREND
- Difficulty, selectivity, split, and gold-readiness filters
- Compact and expanded table modes
- JSON spec batch export
- Inline "Launch in Run Lab" action per query

---

### `/run-lab` — Run Lab (WP5)
Deliberate experiment launcher (not a chatbox). Controls:
- World / query selector
- Pipeline selector (P0–P5)
- Provider / model
- Retriever + top-k (shown only for retrieval pipelines)
- Batch size, repair policy, seed, certificate policy
- Dry-run cost / context estimate panel
- Configuration summary and hash preview

---

### `/runs` — Run History (WP6)
Paginated run table with inline trace panel. Columns: status icon, run ID, pipeline, answer, gold, latency, started. Click row to load trace sidebar. "View Full Trace" link navigates to `/runs/{id}/trace`.

---

### `/runs/[id]/trace` — Trace Inspector (WP6–8)
The deepest analysis page. Panels:
- **Header**: run status, answer vs gold, loss, certificate badge, download bundle
- **Stage Timeline**: all TraceEvents with duration and record counts
- **Stage Tabs**: Scope / Retrieval / Extraction / Aggregation (shows event payload)
- **Attribution Lattice**: Shapley bars for φ_R, φ_E, φ_A
- **Certificate Panel**: CERTIFIED/ABSTAIN decision with reason codes and observation matrix
- **Raw JSON viewer**: full run payload

---

### `/oracle` — Oracle Diagnostics (WP7)
Cross-run Shapley attribution viewer. Run selector on the left; eight-state lattice table and φ component cards on the right. Includes interpretation notice (modular counterfactual, not causal). Raw attribution JSON viewer at the bottom.

---

### `/certificates` — Coverage Certificates (WP8)
Cross-run certificate browser. Run selector on the left; decision banner (CERTIFIED/ABSTAIN/UNCERTIFIED), reason codes, requirement vs observation matrix, and certificate identity (hash + timestamp) on the right. No gauges for unknown denominators.

---

### `/experiments` — Experiments (WP9)
Four tabs:
- **Calibration**: risk-coverage curve (Recharts LineChart), abstention precision / FCR / UAR metrics
- **Runner**: experiment name, pipeline list, scale list, family list → plan and run
- **Compare**: side-by-side experiment comparison with statistical test output
- **Gallery**: experiment cards with status, run counts, and export links

---

### `/reports` — Reports & Exports (WP9)
Three tabs:
- **Rankings Table**: pipeline leaderboard with accuracy bar, correct/total, mean loss, mean latency
- **Accuracy Chart**: Recharts BarChart — accuracy % vs mean loss by pipeline
- **Latency Chart**: mean latency ms by pipeline

Export buttons: CSV, JSON.

---

### `/settings` — System & Settings (WP11)
- Environment table: API base, version, active pipeline, gold engine, database path
- Reviewer Mode toggle (hides setup noise, starts from seeded examples)
- Reset Demo action (safely recreates local demo state with seed=42)
- Mock/deterministic provider states visibly labeled `[DETERMINISTIC MOCK]`

---

## Keyboard Navigation

| Key | Context | Action |
|-----|---------|--------|
| `Tab` | Global | Move between interactive elements |
| `Enter` / `Space` | Buttons, links | Activate |
| `Escape` | Modals, trace panels | Dismiss / close |
| `Arrow keys` | Tab bars | Switch tabs |

All interactive elements have `aria-label` or visible label text. Nav links use `aria-current="page"` for screen readers.

---

## Component Library (WP10)

| Component | File | Purpose |
|-----------|------|---------|
| `StatusBadge` | `components/ui/status-badge.tsx` | Canonical status vocabulary |
| `ArtifactHash` | `components/ui/artifact-hash.tsx` | Truncated hash + copy |
| `JsonViewer` | `components/ui/json-viewer.tsx` | Collapsible JSON, no eval |
| `Skeleton`, `SkeletonRow`, `SkeletonCard` | `components/ui/skeleton.tsx` | Loading states |
| `EmptyState` | `components/ui/skeleton.tsx` | Empty table/list placeholder |
| `ErrorBoundary` | `components/ui/error-boundary.tsx` | Runtime error recovery |
| `Card`, `StatCard` | `components/ui/card.tsx` | Surface containers |
| `Badge` | `components/ui/badge.tsx` | Inline label chips |
| `Button` | `components/ui/button.tsx` | Primary / ghost / loading states |
