"""
Core models for the Track T human-annotation workflow.
This infrastructure supports rigorous human review, adjudication, and inter-rater reliability calculation.
"""

from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class AnnotationRole(str, Enum):
    ANNOTATOR = "annotator"
    ADJUDICATOR = "adjudicator"

class AnnotationStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CONFLICT = "conflict"
    ADJUDICATED = "adjudicated"

class AnnotationTask(BaseModel):
    """A specific task requiring human annotation, usually mapped to a single Query or evidence bundle."""
    task_id: str
    world_id: str
    query_id: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: AnnotationStatus = AnnotationStatus.PENDING
    
    # Context payload contains the question, candidate facts, and generated answer
    context_payload: Dict[str, Any]
    
    # Minimum required annotators for this task
    required_annotators: int = 2
    
    # Whether the task requires an adjudicator due to conflict
    requires_adjudication: bool = False

class AnnotationAssignment(BaseModel):
    """An assignment of a task to a specific human user."""
    assignment_id: str
    task_id: str
    user_id: str
    role: AnnotationRole = AnnotationRole.ANNOTATOR
    assigned_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    completed_at: Optional[datetime] = None
    
    # The actual structured annotation provided by the user
    result: Optional[Dict[str, Any]] = None
    
    # Time spent annotating in seconds
    time_spent_seconds: Optional[int] = None

class AdjudicationResult(BaseModel):
    """The final adjudicated result when annotators disagree."""
    task_id: str
    adjudicator_user_id: str
    resolved_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    final_result: Dict[str, Any]
    resolution_notes: str = ""
