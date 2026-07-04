# Nadir — Implementation Phases (Demo to Enterprise Live)

This document outlines the step-by-step phases required to take Nadir from its current "Demo" state to a fully live, Enterprise-ready product. It covers everything from initial onboarding and data ingestion (even without a database) to advanced predictive bidding and user role management.

---

## Phase 1: The "True Demo" (Proof of Value)
The current demo is static. To convert high-value clients, the demo must be fully interactive and capable of parsing their specific operations on the fly.

### 1.1 The "No-Database" Generative Onboarding
* **The Problem:** Many prospective clients don't have a clean 15TB database ready to hook up during a pitch.
* **The Solution:** A generative onboarding flow.
  * The user inputs their company name (e.g., "NuRest in Atlanta") and website URL.
  * Nadir scrapes the public data, queries Google Maps for the physical address, and builds a mock "Site Map" automatically.
  * The user dictates their standard operating procedures (e.g., "We assemble 80,000 meals for United Airlines..."). Nadir's NLP parses this into a backend SQLite schema on the fly, instantly rendering an Operational Graph they recognize.

### 1.2 The 2D Site Map Builder
* The 3D abstract building is replaced.
* Users enter a "Blueprint Mode" where they drag and drop semantic zones (Kitchen, Assembly, Server Room) to mirror their actual physical footprint, giving them immediate visual familiarity.

---

## Phase 2: Predictive Operations & Bidding Engine
Nadir must move beyond tracking current states and begin predicting future operational costs and requirements.

### 2.1 The NuRest / Airline Use Case
* **Data Synthesis:** Nadir ingests historical menus and cycle counts (e.g., "United Airlines last cycle served 80,000 meals, 200 breakfast flights a day").
* **Micro-Costing Inference:** If a breakfast meal includes an apple yogurt, Nadir breaks down the supply chain:
  * 1 Apple = 6 slices. 
  * 2 slices per yogurt.
  * Cost of 1 raw apple + labor time to slice + packaging.
* **Automated Bidding:** Nadir rolls up the micro-costs of every process node to generate highly accurate, data-backed Bids for upcoming contracts.

---

## Phase 3: Enterprise Roles & Multi-Tenant Deployment
Once a client signs, they need enterprise-grade access control and deployment.

### 3.1 Role-Based Access Control (RBAC)
* Every user has a distinct profile, dictating what they can see and edit.
  * **C-Suite / Account Admin:** Full access to macro-dashboards, billing, ROI tracking, and cross-department API configurations.
  * **IT / Data Engineers:** Access to the Data Sources tab, Schema Mapper, and webhooks. They manage the connection strings and API keys.
  * **Ops Managers:** Restricted to the Site Mapper, Team Ticketing, and the Fusion Graph for their specific department.
  * **Line Workers:** Restricted to mobile-friendly ticket updates and anomaly reporting.

### 3.2 Security, API Keys & Token Costing
Because Nadir handles the entirety of a company's intelligence, security and cost are paramount.
* **API Key Management:** Clients provide their own API keys (Bring Your Own Key - BYOK) for LLM usage to ensure their data usage is isolated.
* **Costing Breakdown (Cheapest Route):** 
  * **Heavy Lifting (Data Parsing, Schema Mapping):** Use localized open-source models (Llama 3 70B via Groq) or lower-cost models (GPT-4o-mini / Claude 3.5 Haiku) for bulk processing at fractions of a cent per 1k tokens.
  * **High-Level Reasoning (Bidding, Complex Anomalies):** Route exclusively to Claude 3.5 Sonnet or GPT-4o only when deep reasoning is required.
* **Data Learning Silos:** Nadir strictly forbids training global AI models on client data. Client data remains in a single-tenant VPC. The AI only "learns" within the boundary of that specific client's localized vector database (pgvector).

---

## Phase 4: Full Enterprise Live
* **Live Webhooks:** Nadir connects to SAP/EBS via API, allowing users to execute actions (e.g., "Log Lockout/Tagout") from the Nadir graph directly back into the client's source of truth.
* **ROI Tracking:** The C-Suite dashboard continuously tracks the delta between predicted production costs and actual operational burn, providing a live "Return on Investment" metric directly on the homepage.
