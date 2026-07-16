# Guided Demo Execution Script

Follow this script to demonstrate the capabilities of FaultTrace-RAG to reviewers, recruiters, or patent evaluators.

---

## Script Flow

### Step 1: Initialize Database
- Navigate to the **Overview** dashboard page.
- Note the baseline statistics showing the seeded worlds and queries.
- If no data has been populated, click **Seed Demo** at the top right header.

### Step 2: Launch Guided Demo
- On the Overview dashboard, scroll down to the **Guided Walkthrough** card.
- Click the **Run Guided Demo** button.
- The wizard will proceed to:
  1. Validate query availability
  2. Execute **P1-wrong-scope** (Retrieval Omission Fault)
  3. Execute **P4-compound-scope-facts** (R + E Fault)

### Step 3: Inspect Outputs and Attributions
- Once the pipeline runs finish, review the **Comparison Grid**:
  - P1 and P4 outputs will fail exact-match bounds against Gold.
- Review the **Shapley Attributions**:
  - The lattice calculations cleanly show **100% Retrieval contribution** for P1.
  - The attributions show split contributions across Retrieval and Extraction layers for P4.

### Step 4: Examine Evidence Integrity Certificates
- In the certificate cards, note the certificate status:
  - Both P1 and P4 return an **ABSTAIN** policy decision, successfully preventing downstream hallucinations.
  - Omission and extraction field errors are caught by comparing expected observations to actual Parquet files.
