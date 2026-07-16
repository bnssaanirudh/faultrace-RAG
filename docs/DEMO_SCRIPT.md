# FaultTrace-RAG — Guided Demo Script

**Duration**: 7–10 minutes  
**Audience**: Professor, reviewer, patent evaluator, recruiter, or engineer  
**Pre-requisites**: API running (`uvicorn`, port 8000) + Next.js running (`npm run dev`, port 3000)

---

## Opening Framing (30 seconds)

> "FaultTrace-RAG asks: when an LLM-powered analytics pipeline produces a wrong answer, *which* component failed?  
> Retrieval — Extraction — or Aggregation?  
> This system provides a verifiable, mathematically-grounded answer using modular oracle substitution and Shapley attribution."

---

## Step 1: Initialize the Corpus (30–60 seconds)

1. Navigate to **[Overview / `http://localhost:3000`]**.
2. Observe the **stat cards** — they should already show:
   - 4 Corpus Worlds (N=10, 50, 200, 1000)
   - 240+ Queries
   - Pipeline registry (P0–P5)
3. If counts are zero, click **Seed Demo** (top right). Wait ~10 seconds.
4. Walk the audience through the **REA Pipeline Diagram**:
   > "R = Retrieval: finds records matching the query scope.  
   > E = Extraction: reads structured fields from those records.  
   > A = Aggregation: computes COUNT, MEAN, or TOP_K."

---

## Step 2: Run the Guided Demo Wizard (~2 minutes)

1. Scroll to the **Guided Walkthrough** card.
2. Click **Run Guided Demo**.
3. Watch the step indicator progress:
   - **Verifying world** → confirms corpus is ready
   - **Running P1-wrong-scope** → executes pipeline with deliberately truncated retrieval (fault in R)
   - **Running P4-compound-scope-facts** → executes pipeline with faults in R + E simultaneously
   - **Displaying comparison** → shows P1 vs P4 answer vs gold
   - **Showing diagnostics** → loads Shapley attribution
   - **Showing certificate** → loads coverage certificates
4. At the **Comparison Grid**, point out:
   > "Both P1 and P4 return wrong answers. But *why* they're wrong differs — and that's what makes fault localization hard."

---

## Step 3: Inspect Oracle Diagnostics (2–3 minutes)

1. Click **Oracle Diagnostics** in the sidebar (or follow link from completed demo).
2. Select the P1 run from the left panel.
3. Point to the **Shapley Attribution cards**:
   > "φ_R ≈ 1.0 means 100% of the error is recoverable by replacing Retrieval with an oracle.  
   > Extraction and Aggregation are clean — the bug is entirely in scope filtering."
4. Select the P4 run.
5. Point to the split attribution:
   > "Now we see φ_R ~ 0.6 and φ_E ~ 0.4 — compound fault.  
   > Even perfect retrieval wouldn't fix everything because extraction is also wrong."
6. Point to the **Eight-State Intervention Lattice**:
   > "We tested 2³ = 8 oracle substitutions — none, R only, E only, A only, RE, RA, EA, REA.  
   > Shapley values are computed from the marginal improvements across these coalitions."

---

## Step 4: Examine Coverage Certificates (1–2 minutes)

1. Click **Certificates** in the sidebar.
2. Select the P1 run. Show the **ABSTAIN** decision banner.
3. Read the reason code aloud:
   > "SCOPE_OMISSION_DETECTED — the system knows it retrieved fewer records than gold requires.  
   > Instead of hallucinating, the pipeline abstains. This is the certification guarantee."
4. Show the **Requirement vs Observation Matrix** table:
   > "Each row is an evidence checkpoint. Coverage ratio of 0.6 means only 60% of required evidence was seen.  
   > The policy threshold is 1.0 — so ABSTAIN is correct here."
5. Show the **Certificate Hash**:
   > "This is a cryptographic immutable record — the certificate can be audited independently of the system."

---

## Step 5: Explore the Query Library (1 minute)

1. Navigate to **Query Library** in the sidebar.
2. Filter by **Family: TOP_K** and **Selectivity: High**.
3. Point to a query row:
   > "These are procedurally generated from templates using the corpus schema.  
   > The AST spec is deterministic — the same corpus always produces the same gold answer."
4. Click **Launch in Run Lab** on one query to show the Run Lab pre-loaded.

---

## Step 6: Run Lab (optional, 30 seconds)

1. In **Run Lab**, show the pipeline selector: P0 (baseline), P1–P4 (fault scenarios), P5 (certified).
2. Point out the **Dry-run estimate** panel:
   > "This shows the estimated context size before any LLM calls. Token budgeting is explicit."
3. Click **Run** — latency should be 40–200ms for deterministic pipelines.

---

## Step 7: Experiments & Reports (1 minute)

1. Navigate to **Experiments**. Show the **Calibration** tab with the Risk-Coverage curve:
   > "As we tighten the abstention policy, accuracy rises but coverage falls.  
   > This curve finds the optimal operating point for a given risk tolerance."
2. Navigate to **Reports & Exports**.
3. Show the **Rankings Table** — P0 (deterministic oracle) should have the highest accuracy.
4. Click **CSV** to export:
   > "All results are exportable for independent analysis or publication inclusion."

---

## Closing Framing (30 seconds)

> "FaultTrace-RAG demonstrates three contributions:  
> 1. A modular fault injection framework for RAG pipeline evaluation.  
> 2. Exact Shapley attribution using oracle substitution — no ML approximation.  
> 3. Policy-gated evidence certificates that prevent hallucinated answers.  
>
> Everything here is deterministic, reproducible from seed=42, and verifiable via artifact hashes."

---

## Fallback: If Backend Unavailable

The frontend gracefully degrades:
- Stat cards show `—` placeholders
- Tables show empty-state messages (not blank pages or crashes)
- No CORS or 404 errors (all calls via Next.js proxy at `/api/v1/`)

In **Reviewer Mode** (Settings → toggle): setup noise is hidden; the demo starts directly from seeded data.
