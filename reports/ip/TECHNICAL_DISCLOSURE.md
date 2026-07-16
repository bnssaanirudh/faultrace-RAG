# Technical Mechanism Disclosure: FaultTrace-RAG

## 1. Title
Deterministic Counterfactual Evaluation Framework for RAG Analytics Pipelines using Dual-Engine Predicate Compilation

## 2. Problem Statement
Current evaluation of Large Language Models (LLMs) on complex analytical tasks (like answering "How many companies in sector X reported revenue > Y in 2023?") suffers from "data leakage" and irreproducibility. When an LLM fails, it is often impossible to determine whether the failure was due to context retrieval failure, parsing error, or core reasoning deficiency, because the underlying data corpus and the ground truth are not deterministically linked or queryable in a procedural manner.

## 3. Detailed Description of the Mechanism
FaultTrace-RAG introduces a novel architecture to generate deterministic, counterfactual benchmarks for analytical RAG systems. The core mechanism consists of the following components:

### 3.1 Procedural Query Generation
Instead of using fixed, human-annotated datasets, the system employs a `PredicateCompiler` that generates deterministic queries from structured datasets (e.g., SEC EDGAR XBRL facts). Queries are represented as Abstract Syntax Trees (ASTs) rather than raw SQL or natural language, ensuring they can be manipulated, translated, and evaluated rigorously.

### 3.2 Dual-Engine Gold Answer Evaluation
To guarantee the accuracy of ground truth answers, the system executes the generated query ASTs against the exact data corpus snapshot using two independent execution engines:
1.  **PandasEvaluator:** Executes the AST using in-memory DataFrame operations.
2.  **DuckDBEvaluator:** Executes the AST using an embedded SQL database engine.

The system requires exact consensus between these two engines (`results_agree` mechanism). Only queries where both engines yield the exact same result (with configurable tolerance for floats) are admitted to the benchmark. This dual-verification eliminates the possibility of engine-specific bugs corrupting the ground truth.

### 3.3 Counterfactual Interventions (Worlds)
The system creates isolated "Worlds" which are deterministic subsets of the data corpus (controlled by fixed seeds and N-scales). RAG pipelines are executed against these controlled worlds. By modifying the data in a world (e.g., removing a specific document) and re-running the pipeline, researchers can isolate the exact cause of a failure (Counterfactual Fault Localization).

### 3.4 Selective Prediction and Certification
The framework includes a `CertificatePolicy` layer that enforces strict validation rules (e.g., `strict_exact_v1`). Pipelines can emit confidence certificates. The system automatically calculates Risk-Coverage calibration curves, enabling operators to choose an operating point that minimizes downstream error loss.

## 4. Empirical Evidence
The mechanisms described above are fully implemented and verified via the accompanying test suite (e.g., `tests/test_edgar_pipeline.py`). The dual-engine evaluator successfully guarantees consensus on synthetically generated queries over SEC XBRL facts, providing a 100% reproducible benchmark for evaluating LLM reasoning pipelines.
