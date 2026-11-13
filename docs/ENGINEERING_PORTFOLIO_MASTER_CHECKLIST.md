# HuLaX — 10/10 Engineering Portfolio Master Checklist

**Updated:** 13 November 2026 | **Status:** EVIDENCE-GATED, NOT YET RELEASE READY

This is a working execution checklist, **not** a declaration of 10/10. A checked item means one specifically testable limited claim is supported by a linked artifact on a **draft branch**, unless otherwise stated. Everything else remains unchecked. Review before merge; avoid rewriting public portfolio or LinkedIn claims before evidence is established. No AWS apply, paid services, deletion, main-branch merge or production change without explicit approval.

## Source-of-truth checklists and review branches

| Project | Checklist | Draft PR | Current release status |
| --- | --- | --- | --- |
| FleetFlow — Data Engineering flagship | [P0–P4 Engineering Release Checklist](https://github.com/HuLaxx/FleetFlow/blob/feature/approved-dispatch-and-honest-kpis-2026-11-13/docs/ENGINEERING_RELEASE_CHECKLIST.md) | [PR #4](https://github.com/HuLaxx/FleetFlow/pull/4), stacked on #3 → #2 → #1 | Local replay, approval and partial API integrity verified; real dispatch gold path missing |
| GraphGuard — Applied ML/MLOps flagship | [P0–P4 Engineering Release Checklist](https://github.com/HuLaxx/GraphGuard/blob/feature/graphguard-at-least-once-recovery-2026-11-13/docs/ENGINEERING_RELEASE_CHECKLIST.md) | [PR #2](https://github.com/HuLaxx/GraphGuard/pull/2), stacked on #1 | Focused replay/DLQ policy tested; Kafka→graph→model→case missing |
| Sentinance — AI Systems flagship | [P0–P4 Engineering Release Checklist](https://github.com/HuLaxx/Sentinance/blob/fix/p0-kafka-consumer-broker-2026-11-13/docs/ENGINEERING_RELEASE_CHECKLIST.md) | [Draft PR #11](https://github.com/HuLaxx/Sentinance/pull/11), stacked on #10 → #9 → #8 → #7 → #6 → #5 → #4 → #3 → #2 → #1 | **2 real Kafka broker integration tests passed; 223 API tests passed (2 broker-only skips)**, MyPy/web passed on exact current code SHA; 81 Python files formatted, 75 strict Ruff findings (63 BLE001/12 DTZ003) on latest source; full CI red |

## Universal 10/10 engineering release gates (every project)

- [ ] **1. Real end-to-end journey:** source → validated ingest → persisted state → API/model → UI proven with reproducible seeded data and fault injection.
- [ ] **2. Data engineering:** versioned schemas, lineage, time semantics, deduplication, replay/backfill, durable reconciliation and correct batch/stream contracts.
- [ ] **3. Testing/CI:** latest exact commit passes lint, format, types, deterministic unit/integration/e2e and blocking dependency/security scans.
- [ ] **4. Cloud reproducibility:** costed least-privilege Terraform with OIDC, isolated settings, explicit apply/destroy review; deployed state separate from templates.
- [ ] **5. Security:** no secrets in code, secure key handling, authn/authz, validated inputs, minimal access and ethical data treatment.
- [ ] **6. Reliability:** structured logs, relevant metrics/traces, retries/DLQ, failure/recovery tests, actionable alarms and runbooks.
- [ ] **7. Measured performance/cost:** reproducible baseline and load measurements, credible cost assumptions and limits.
- [ ] **8. AI/ML evidence:** where applicable, licensed and documented data, leakage-free validation, baselines, calibrated/uncertain outputs, model artifacts and monitoring.
- [ ] **9. Credible UI:** responsive, accessible, operational states working; real/derived/simulated/LLM-generated content labelled, no misleading demo.
- [ ] **10. Explainable engineering:** truthful README, implementation-matched architecture diagram, ADRs, limitation notes, reproducible outputs and interview walkthrough.
- [ ] An independent reviewer reruns the golden path and checks meaningful failure assertions, not only exit codes.
- [ ] `docs/EVIDENCE_REGISTER.md` links every claim to current workflow, test, dataset, model, commit, benchmark or verified deployment.
- [ ] All three show **real integration evidence** before any project receives a 10/10 label.

## Execution milestones, in strict order

### Milestone A — P0 reliability
- [x] FleetFlow draft branch has full passing CI on tested code. [Run 43429154935](https://github.com/HuLaxx/FleetFlow/actions/runs/43429154935).
- [x] GraphGuard draft branch has full passing focused CI. [Run 43428457363](https://github.com/HuLaxx/GraphGuard/actions/runs/43428457363).
- [x] Sentinance 12 timezone/cooldown regression cases passed and legacy UTC parsing corrected on review branch. [CI 43433535905](https://github.com/HuLaxx/Sentinance/actions/runs/43433535905).
- [x] Sentinance preserved FastAPI auth, model schema, and routing after P0 lint cleanup: four new contract tests, 155 API tests passed, 69 Python files formatted. [CI 43436010759](https://github.com/HuLaxx/Sentinance/actions/runs/43436010759), [PR #4](https://github.com/HuLaxx/Sentinance/pull/4).
- [x] Sentinance provider failure-policy regression tests (six) passed; DB UTC-naive bridge and asyncpg URL normalization implemented without a migration, and 72 files format clean. [PR #5](https://github.com/HuLaxx/Sentinance/pull/5), [strict checks 43440292164](https://github.com/HuLaxx/Sentinance/actions/runs/43440292164).
- [x] Sentinance corrected UTC-naive database round-trip and provider tests now have **167 passing API tests**, five warnings, with MyPy and frontend passing on reviewed code SHA `45ec0b0348cbb613a71f368373868b93e285b9ac`. [API CI 43440291737](https://github.com/HuLaxx/Sentinance/actions/runs/43440291737).
- [x] Sentinance rate-limit helper now fails closed during Redis outages and ambiguous writes; all **15 new Redis/cache tests** passed in **182 total API tests** with MyPy/web passing on reviewed SHA `915102a169e81a7228d51f04509474e889a2a78c`. [CI 43445179266](https://github.com/HuLaxx/Sentinance/actions/runs/43445179266), [PR #6](https://github.com/HuLaxx/Sentinance/pull/6).
- [x] 73/73 Python files Ruff format-clean, down to **95 strict findings** (70 BLE001, 25 DTZ003); do not mistake format success for full CI success. [Strict quality 43445417231](https://github.com/HuLaxx/Sentinance/actions/runs/43445417231).
- [x] **Sentinance PR #7:** Atomic Redis fixed-window counter, login/register/refresh API enforcement, distinct HTTP 429 vs Redis-outage 503, and two real-Redis concurrent/expiry integration tests verified. **194 API tests passed**, five warnings, MyPy and frontend checks passed; 76 Python files formatted. [Code SHA d49f46a](https://github.com/HuLaxx/Sentinance/commit/d49f46aeb964a49b51cfaa5067a8493d67de5978), [CI 43450672016](https://github.com/HuLaxx/Sentinance/actions/runs/43450672016), [PR #7](https://github.com/HuLaxx/Sentinance/pull/7). Overall CI still red on Ruff.
- [x] **Sentinance PR #8:** 13 event-time emissions changed to explicit UTC across Kafka envelopes, experiments, market statistics, news, predictions, signals and price history; seven regressions test UTC offsets and mixed news timestamps. **201 API tests passed**, five warnings, with MyPy and web passing on code SHA `a88255204106695d9dcb5596fdb3c01928ae552b`. [API CI 43454910082](https://github.com/HuLaxx/Sentinance/actions/runs/43454910082), [PR #8](https://github.com/HuLaxx/Sentinance/pull/8).
- [x] **77/77 Python files Ruff format-clean** on revised source SHA `72801cfcf6aedb61beee5dddcd2b5dae5cd976b8`; strict lint reduced from 95 to **82 findings** (70 BLE001, 12 DTZ003), no blanket suppressions. [PR Checks 43455287738](https://github.com/HuLaxx/Sentinance/actions/runs/43455287738). Overall CI still red.
- [ ] Test trusted-proxy attribution, shared-IP/NAT fairness and Redis failover/load; reconcile frontend npm audit findings; clear **82 strict Ruff errors** (70 BLE001, 12 DTZ003) before claiming full CI green.
- [ ] Review/merge existing stacked PRs only after approvals, compatibility tests and documented merge order.

- [x] **Sentinance draft PR #9 — limited RSS fault transparency:** [API CI 43460271229](https://github.com/HuLaxx/Sentinance/actions/runs/43460271229) on source SHA `2e280503b7f9195ab2a3308cc4c077e55de88cdd`: **207 tests passed (five warnings)**, MyPy/web passed; [exact formatted-source CI 43460702036](https://github.com/HuLaxx/Sentinance/actions/runs/43460702036) independently reconfirmed 207 passed, MyPy/web successful. Six synthetic RSS failure tests added, and two blanket exception handlers eliminated. [PR quality 43460702032](https://github.com/HuLaxx/Sentinance/actions/runs/43460702032) on Ruff-corrected SHA `39047847e1db996b71146e59ebdea22168a59961`: **78 formatted Python files**, **80 remaining Ruff violations**, security/web/commit checks pass. **Overall CI still red**; complete feed provenance and outage UX are not verified. [Draft PR #9](https://github.com/HuLaxx/Sentinance/pull/9).

- [x] **Sentinance draft PR #10 — producer broker acknowledgments only:** `send_and_wait` for price/alerts/news, `acks=all` and idempotent producer retries, fail-visible missing Kafka/startup/delivery; updated UTC mock test and added 12 synthetic failure/ack tests. [API CI 43462637843](https://github.com/HuLaxx/Sentinance/actions/runs/43462637843) on source SHA `5371f9cecbb4f14433f5bcfbc05d30cb65c74329` confirms **219 passed (five warnings)**, MyPy/web successful; [exact formatted-source CI 43462922589](https://github.com/HuLaxx/Sentinance/actions/runs/43462922589) also verifies **219 passed and MyPy/web successful** on SHA `e71f1e7d5fa18a1e79c86683de3d6551e3671d17`. [PR Checks 43462922969](https://github.com/HuLaxx/Sentinance/actions/runs/43462922969) on formatted SHA `e71f1e7d5fa18a1e79c86683de3d6551e3671d17` confirms **79 format-clean files**, **76 strict Ruff findings**, security/web/commit checks successful. **Red full CI and no actual broker or downstream processing verified.** [Draft PR #10](https://github.com/HuLaxx/Sentinance/pull/10).

- [x] **Sentinance draft PR #11 — actual ephemeral Kafka broker replay (narrow scope):** a managed consumer lifecycle, explicit per-topic-partition offset commits only after successful handler processing, and failure exposure; two CI tests start a real `apache/kafka:3.9.1` broker, verify successful price record/group resume and replay after uncommitted handler failure. [CI 43472276017](https://github.com/HuLaxx/Sentinance/actions/runs/43472276017) confirmed **223 API passed, 2 skipped, 5 warnings**, MyPy and frontend passing on `aacd311fbbfb1cc760563781aabcef1b1407fbd5`. [Broker CI 43472651801](https://github.com/HuLaxx/Sentinance/actions/runs/43472651801) confirmed **2/2 actual broker cases passed** on later `a415d7559b6708757a64c880ee7e6d219ea02ca6`. [Exact-source API CI 43472651801](https://github.com/HuLaxx/Sentinance/actions/runs/43472651801) on the same source revision reconfirmed **223 API passed, two broker-only skips, five warnings, MyPy/web passed**. [Quality 43472652016](https://github.com/HuLaxx/Sentinance/actions/runs/43472652016) confirmed **81 format-clean files, 75 outstanding strict Ruff errors**, security/web lint passed. **Overall CI red**; Kafka consumer logic does not demonstrate durable database sink, cross-service idempotency, real market feed or browser pipeline. [Draft PR #11](https://github.com/HuLaxx/Sentinance/pull/11).

### Milestone B — One integrated golden path per repository
- [ ] FleetFlow: order → event → persisted optimiser candidate → explicit approved dispatch → GPS map update → analytical KPI.
- [ ] GraphGuard: transaction → validated store → Neo4j → past-only features → actual trained model → explanation → persisted reviewer decision.
- [ ] Sentinance: licensed/historical market source → validated curated data → indicators/baseline → evidence-traceable agent → UI.
- [ ] Test and document duplicate, out-of-order, provider/broker/DB outage and replay cases for all relevant paths.

### Milestone C — Analytical depth
- [ ] FleetFlow: dbt data quality and OR-Tools vs deterministic routing baselines, reproducible fixture sets.
- [ ] GraphGuard: chrono-split logistic/XGBoost baselines, leakage tests, PR-AUC/recall at FPR/precision@K/calibration, honest case limitations.
- [ ] Sentinance: walk-forward last-price/SMA baselines, uncertainty, realistic trading fees/slippage and no unsupported profit prediction.
- [ ] Save measured results (good **and** bad), exact scripts, time, hardware, seeds, dataset/model hashes.

### Milestone D — Cloud (separate human approval)
- [ ] Costed AWS architecture and IaC exist with least privilege, region/separate environment and budget alarms; budgets are **not** spending caps.
- [ ] User explicitly approves paid resources/apply and spending scope.
- [ ] Provision only minimal justified workload, verify logs/alarms and destroy path; record actual expenditure.
- [ ] Prefer Vercel/frontend and local services where cost-effective; no default EKS/MSK/NAT/GPU stack.

## Portfolio + GitHub + LinkedIn P4 publication checklist

- [ ] **Truthful position:** primary UK-facing theme Data Engineering; secondary Applied ML/MLOps and Python Backend/AI Systems.
- [ ] **Factual timeline:** Accenture Oct 2022–Sept 2024, Cognizant internship Jan–Apr 2022, MSc Data Science University of Glasgow; preserve subsequent non-engineering work accurately without implying ongoing commercial engineering employment.
- [ ] **Per project:** one recruiter tagline, ~120-word LinkedIn Featured description, ~250-word human first-person case study, code/tests/CI/demo evidence links, honest caveats and a technical interview story.
- [ ] Show FleetFlow first for DE jobs, GraphGuard first for MLOps jobs, Sentinance first for AI systems jobs.
- [ ] AWS, Flink, Kafka, production, user and benchmark statements match **real verified use**, not import statements or marketing claims.
- [ ] Audit [portfolio.hulax.uk](https://portfolio.hulax.uk/): desktop/tablet/mobile, loading states, broken images/domains, keyboard access, accessibility, sample/live boundaries, empty/error states.
- [ ] Confirm portfolio case pages link to current README, PR/CI/benchmark and valid project demos; note fallback/mock boundaries.
- [ ] Compare before/after content credibility (not only design), collect real screenshots and corroborated measurements.
- [ ] Review GitHub profile README, pinned project order and consistent human-written language.
- [ ] Review LinkedIn Featured/About/headline updates **only after** each project has passing evidence and working links.
- [ ] Independently validate all published URLs and live integrations before marking publication complete.

## Evidence and handoff protocol

After **each PR**, add its branch/base, URL, exact changed paths, impact, test command and exit outcome, dataset licence, model/version/metrics, screenshots/trace or log artifact, deployed vs planned cloud resources, measured or assumed monthly cost, remaining limitations and **next smallest PR**. Never check a box from code existence alone. Current work uses synthetic data and no new provisioned AWS infrastructure.

**Release decision today:** none of the three applications has independently verified all ten universal gates. Publishing their architecture as a **tested local prototype** where evidence supports it is appropriate; claiming a production 10/10 system is not.
