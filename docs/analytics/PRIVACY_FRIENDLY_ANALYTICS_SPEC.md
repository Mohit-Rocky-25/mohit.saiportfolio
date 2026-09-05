# Privacy-Friendly Telemetry & Performance Timing Specification

Specification for lightweight, cookie-free client telemetry and Web Vitals reporting.

## 1. Zero-Cookie Telemetry Principles

- No tracking cookies, persistent advertising identifiers, or cross-site fingerprinting.
- IP addresses are anonymized before country-level aggregation.

## 2. Web Vitals Reporting

- Emits standard `web-vitals` metrics (`CLS`, `LCP`, `INP`) via `navigator.sendBeacon` upon page unload.
- Quantifies interactive engagement metrics (case study dwell time, GitHub repository click-throughs).

