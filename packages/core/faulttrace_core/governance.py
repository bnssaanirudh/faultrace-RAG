from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Dict, Any, Optional

class AuditLog(BaseModel):
    log_id: str
    user_id: str
    action: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    resource_type: str
    resource_id: str
    details: Dict[str, Any] = Field(default_factory=dict)
    ip_address: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
