"""faulttrace_reporting: Reporting and summary utilities for FaultTrace-RAG."""
__version__ = "0.1.0"

from faulttrace_reporting.metrics import MetricsComputer, AggregateMetrics
from faulttrace_reporting.experiments import ExperimentSpec, ResumableMatrixRunner, Job
from faulttrace_reporting.stats import compute_paired_bootstrap_ci, holm_bonferroni_correction
from faulttrace_reporting.figures import FigureGenerator
from faulttrace_reporting.reports import ReportGenerator
from faulttrace_reporting.bundles import ReproducibilityBundle
from faulttrace_reporting.generate_ablations import generate_locked_ablations

__all__ = [
    "MetricsComputer",
    "AggregateMetrics",
    "ExperimentSpec",
    "ResumableMatrixRunner",
    "Job",
    "compute_paired_bootstrap_ci",
    "holm_bonferroni_correction",
    "FigureGenerator",
    "ReportGenerator",
    "ReproducibilityBundle",
    "generate_locked_ablations",
]
