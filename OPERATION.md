# Nadir — Platform Operations & Technical Architecture

Nadir is an enterprise operations platform designed to rival Palantir Gotham, built specifically for the commercial sector (manufacturing, staffing, logistics, healthcare). It fuses siloed backend data (databases, SaaS APIs, spreadsheets) into a live, interactive operational graph, allowing companies to visualize their physical footprint, track risks, and automate escalations.

This document serves as the overall technical rundown of how the Nadir operation works, step-by-step, across every facet.

## 1. Data Ingestion & The "No Database" Fallback
The core of Nadir is its ability to ingest data and build an ontology.
- **Enterprise DB Integration**: Nadir connects to 15TB+ databases (SAP, EBS, SQL Server) via read-only VPC endpoints. 
- **The "No Database" Fallback (Generative Onboarding)**: If a company lacks a structured database, Nadir uses an AI onboarding pipeline. The user provides their website, address, and dictates their standard operating procedures. Nadir queries external sources (e.g., Google Maps API for physical layout, industry standard data) and dynamically generates a local SQLite/Postgres schema to structure their manual operations.

## 2. Dynamic Ontology & The Fusion Graph
Once data is ingested, it is mapped into an **Ontology** (Objects, Processes, Risks, Sources).
- **The Engine**: Raw schema tables are semantically mapped (via the `Schema Mapper`) into business objects. 
- **Fusion Graph (`/workspace/graph`)**: A live node-based UI where users can see how data connects. Clicking an Object (e.g., "Line 3 Kiln") reveals "Search Around" pills to instantly query Linked Sources, Active Tasks, or Open Alerts.
- **Executable Webhooks**: Users can trigger write-back actions directly from the graph (e.g., "Assign Certified Operator"), which push back to the client's source systems.

## 3. The 2D/3D Site Mapper
A fundamental problem with traditional enterprise software is data abstraction. Nadir solves this by making data physical.
- **Blueprint Drag-and-Drop**: Users do not get a generic 3D house. They are presented with a 2D/3D canvas (`SiteMapper`) where they can drag and drop specific zones (e.g., "Receiving Dock", "Substation 4") to recreate their exact physical layout.
- **Live Signal Overlay**: Anomalies and alerts (e.g., "Temperature spike in walk-in cooler") blink directly over the physical zone on the map, allowing operations managers to instantly digest where the problem is.

## 4. Ticketing, Unified Org Tree, & Escalation
Nadir tracks not just data, but human response to data.
- **The Org Tree**: In the `TeamScreen`, Nadir builds a hierarchical tree of the company (C-Suite → Ops Managers → Line Workers).
- **Kanban Ticketing**: Escalating an alert does not just send an email. It creates a stateful Ticket (Open, In Progress, Closed). 
- **Custom Analytics Dashboards**: The C-Suite accesses custom dashboards tracking these tickets across departments, visualizing operational bottlenecks over time (e.g., "Maintenance has a 40% spike in critical tickets this week").

## 5. Security, Isolation, & API Token Management
Because Nadir ingests the entirety of a company's operations, security is the highest priority.
- **Data Isolation**: Nadir does NOT train global AI models on client data. Every client operates in a single-tenant VPC with BYOK (Bring Your Own Key) cryptography.
- **Token Cost Optimization**: Not all data needs LLM processing. Nadir uses traditional deterministic algorithms for standard routing, reserving expensive AI API tokens only for semantic mapping, anomaly explanation, and predictive bidding. 
- **Checks and Balances**: Every AI-generated mapping or schema inference requires a "Human-in-the-Loop" confirmation before the ontology goes live.
