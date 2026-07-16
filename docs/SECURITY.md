# Security Policy

## Supported Versions
Security updates are provided only for the latest stable release of FaultTrace-RAG.

## Reporting a Vulnerability
If you discover a security vulnerability within FaultTrace-RAG, please send an e-mail to the security team. All security vulnerabilities will be promptly addressed.

## Data Governance & Audit
FaultTrace-RAG tracks all benchmark configurations, annotations, and API interactions via an Audit Log. This ensures that any data manipulation or large-scale LLM budget consumption is fully attributed.

## Secure Configuration
To deploy FaultTrace-RAG securely:
1.  **Do not expose the API to the public internet** without an authentication proxy. The system currently lacks native OAuth/JWT authentication and assumes a trusted intranet or local environment.
2.  **API Keys:** Ensure all API keys (OpenAI, Anthropic) are stored in secure `.env` files and never committed to source control.
3.  **Data Limits:** Matrix caps and upload size limits are enforced by default. Do not disable them unless operating in a highly controlled environment with infinite budget.
