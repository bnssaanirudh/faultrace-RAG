"""
faulttrace_core: Core domain contracts for FaultTrace-RAG.

This package is independent of FastAPI, SQLAlchemy, and UI frameworks.
It defines the canonical data models, predicate AST, and schema exports.
"""

from faulttrace_core.models import (
    AggregationSpec,
    ComponentOutput,
    CorpusRecord,
    CorpusWorld,
    CoverageCertificate,
    FactSpec,
    GoldAnswer,
    PipelineRun,
    QuerySpec,
    ScopePredicate,
    TraceEvent,
)
from faulttrace_core.edgar_models import EdgarFact, EdgarCompanyFacts

__all__ = [
    "AggregationSpec",
    "ComponentOutput",
    "CorpusRecord",
    "CorpusWorld",
    "CoverageCertificate",
    "FactSpec",
    "GoldAnswer",
    "PipelineRun",
    "QuerySpec",
    "ScopePredicate",
    "TraceEvent",
    "EdgarFact",
    "EdgarCompanyFacts",
]

__version__ = "0.1.0"
