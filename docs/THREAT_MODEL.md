# FaultTrace-RAG Threat Model

## 1. Overview
FaultTrace-RAG is a research-grade analytical system. Its primary purpose is to benchmark RAG pipelines through counterfactual interventions and deterministic data generation. Although designed for local or intranet research use, providing an HTTP API and a Web UI introduces attack surfaces that must be mitigated, particularly because the system executes LLM prompts and handles local file ingestion.

## 2. Trust Boundaries
*   **Web Client (Untrusted):** Any browser or script hitting the Next.js frontend or FastAPI backend.
*   **FastAPI Backend (Semi-trusted):** Serves the API, handles file uploads, executes evaluation logic. It must sanitize all inputs from the Web Client.
*   **Local Filesystem / DB (Trusted):** The `data/` and `artifacts/` directories where records and generated worlds are stored.
*   **External LLM Providers (Semi-trusted):** OpenAI, Anthropic APIs. They execute arbitrary text prompts. The system must guard against Prompt Injection, though primarily it must protect the *integrity of the benchmark* rather than protect the LLM.

## 3. Threat Analysis (STRIDE)
*   **Spoofing:** Minor risk in local research deployments, but Data Governance (Track T) requires attributing annotations to specific user IDs to compute inter-rater reliability.
*   **Tampering:** Attackers could upload malicious JSON/Parquet files to manipulate benchmark results or inject malicious data. Mitigated by strict Pydantic validation and schema enforcement.
*   **Repudiation:** Actions like triggering a 1000-job matrix run could be costly. The system logs these in the `AuditLog` to ensure non-repudiation of large operations.
*   **Information Disclosure:** Path traversal attacks during dataset ingestion could expose `.env` or system files. Mitigation: strict path validation and isolation to `data_root`.
*   **Denial of Service (DoS):** Triggering excessively large experiment matrices (e.g., 500,000 runs) could exhaust API budgets or crash the backend. Mitigated by matrix capping (max 10,000 jobs per request).
*   **Elevation of Privilege:** If arbitrary code execution was possible through the pandas/duckdb engine. Mitigated by the custom `PredicateCompiler` that transforms predicates safely without using `eval()`.

## 4. Mitigation Strategies
*   **Input Validation:** All API inputs are strictly typed with Pydantic. File uploads check MIME types and enforce size limits.
*   **Path Traversal Prevention:** Any filename provided by the user is sanitized.
*   **Resource Limits:** Experiment matrices are capped.
*   **Safe SQL Generation:** Queries are constructed parametrically or via the verified AST compiler; no raw SQL from the client is executed.
