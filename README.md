Learning Support Assistant | Agentic AI Orchestration
A production-grade, event-driven intelligent tutoring system architected on n8n. This system leverages DeepSeek-V3 (via OpenAI-compatible API) to perform real-time intent classification and academic content delivery, featuring a custom-built JavaScript middleware layer for mathematical notation sanitization.

🏗️ System Architecture
The system is designed as a Multi-Agent Orchestrator (excluding the RAG experimental layer). It utilizes a "Classifier-Executor" pattern:

Ingress Layer: n8n Webhook/Chat Trigger manages asynchronous user requests.

Intelligence Layer (L1 - Classifier): Performs zero-shot classification to bifurcate traffic between General Conversation and Academic Inquiry.

Data Transformation Layer: A sequence of Node.js-based "Code Nodes" that normalize unstructured LLM outputs into schema-strict JSON.

Intelligence Layer (L2 - Executor): A specialized tutor agent that consumes context-injected parameters (Subject, Difficulty) to generate pedagogical responses.

Persistence Layer: PostgreSQL (Supabase) maintains stateful conversation history for context-aware multi-turn dialogues.

Egress Layer (Formatter): A regex-based parsing engine that converts LaTeX strings into standard UTF-8 characters for cross-platform UI compatibility.

🛠️ Technical Deep Dive: The Middleware Pipeline
To maintain high response quality and system reliability, the following logic gates are implemented in the /scripts directory:

1. Robust Intent Validation (intent_validator.js)
Problem: LLMs occasionally include conversational "chatter" around JSON outputs.

Solution: Implements a defensive parsing strategy using regex and try-catch blocks to ensure the pipeline never breaks on malformed strings.

2. Pedantic Data Sanitization (metadata_cleaner.js)
Problem: White-space noise and hidden characters in LLM responses can corrupt SQL injection-protected database rows.

Solution: Normalizes all metadata (Subject, Topic, Difficulty) before ingestion into the Supabase chat_history table.

3. Mathematical Notation Engine (math_formatter.js)
Problem: Standard chat UIs often fail to render raw LaTeX (\frac{a}{b}).

Solution: A complex replacement engine that maps LaTeX structural components to human-readable symbols (e.g., \partial → ∂), ensuring accessibility across all devices.

📊 Performance & Scalability Considerations
Stateless Execution: The n8n workflow is designed to be stateless, allowing horizontal scaling of the n8n worker nodes.

Memory Efficiency: Uses Postgres Chat Memory instead of in-memory arrays to prevent memory leaks during high-concurrency periods.

Latency: Intent classification and Tutoring are separated to allow for future implementation of faster, smaller models (like Llama 3) for the L1 classification task to reduce TTFT (Time to First Token).

🚀 Deployment
Import learning-support-assistant.json into n8n.

Configure Environment Variables for OPENAI_API_KEY (DeepSeek), POSTGRES_DB, and SUPABASE_URL.

Deploy the /scripts as separate modules if migrating to a standalone Node.js microservice.