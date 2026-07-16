# FaultTrace-RAG UI & UX Guide

This document details the interface architecture, navigation system, and visual components implemented in the RAG Analytics dashboard.

---

## Visual Design Language
- **Accent Colors**: Warm orange (`#ea580c`) is the primary active color, establishing a professional developer-tool feeling.
- **Surface Themes**: Sleek, glassmorphic dark mode panels (`bg-white/[0.04]`) with subtle borders and shadows over deep slate backgrounds.
- **Badges**: Standard badges are tailored with transparent backgrounds and borders (e.g. green for correct, orange/red for errors, yellow for warnings).

---

## Page Layouts & Navigation
1. **Overview (Dashboard)**: Contains a high-level research problem statement, an interactive chevron diagram of the REA pipeline, and the **Guided Demo Wizard**.
2. **Datasets Explorer**: Visualizes active data snapshots, schema provenance, cryptographic integrity checks, and a visual field missingness null matrix.
3. **Corpus Worlds**: Visualizes nested worlds.
4. **Query Library**: Balanced split filters, Ast copies, and launch lab action mappings.
5. **Run Lab**: Allows tweaking of retrievers, top-k candidate limits, map-extract batching, and auto-repair policies.
6. **Trace Details & Diagnostics**: Highlights step-by-step trace event latency alongside the **Attribution Intervention Lattice** and **Evidence Certificate Matrix**.
7. **System Settings**: Unlocks **Reviewer Mode** and lets reviewers wipe and reseed SQLite tables to custom seeds.
