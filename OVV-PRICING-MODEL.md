# OVV (Official Virtual Visit) — Comprehensive Pricing Model

**Prepared:** March 21, 2026
**Model Version:** 1.0

---

## Table of Contents
1. [Third-Party Cost Analysis](#1-third-party-cost-analysis)
2. [Competitor Pricing Landscape](#2-competitor-pricing-landscape)
3. [Market Context & TAM](#3-market-context--tam)
4. [Recommended Pricing to Schools](#4-recommended-pricing-to-schools)
5. [Profit Margin Analysis](#5-profit-margin-analysis)
6. [Scale Economics & Break-Even](#6-scale-economics--break-even)
7. [Competitive Positioning](#7-competitive-positioning)
8. [Sources](#8-sources)

---

## 1. Third-Party Cost Analysis

### OVV's Per-School Expenses (Itemized)

#### A. One-Time Setup Costs (Per School)

| Line Item | Low Estimate | Mid Estimate | High Estimate | Notes |
|-----------|-------------|-------------|--------------|-------|
| **360 Photography (8-12 POIs)** | $800 | $1,200 | $2,000 | Local photographer: $100-200/location. Full-service agency: $500-2,000/project. At 10 POIs avg, mid = $120/location. |
| **Travel (Photographer)** | $400 | $800 | $1,400 | Domestic flight avg $370 RT + hotel 1 night $150-200 + rental car $100-150 + meals $50-75. Regional shoots cheaper. |
| **Photo Processing/Stitching** | $50 | $150 | $500 | Fiverr: $5-10/image for basic stitching. Professional HDR editing: $15-50/image. At 10 images mid = $15/image. |
| **Campus Map Creation** | $100 | $250 | $500 | Satellite imagery (free via Mapbox/Google) + custom pin styling + branding. Mostly dev time, not vendor cost. |
| **Tour Assembly (Hotspots, Branding)** | $200 | $400 | $600 | Uploading panos, adding hotspots, info overlays, school branding. ~3-5 hours at $50-80/hr. |
| **Data Entry (Full Profile)** | $300 | $500 | $800 | Coaches (15-20 bios), roster (85 players), academics, NIL, alumni. ~20-30 hours at $18-25/hr VA rate. |
| **Quality Assurance & Review** | $100 | $200 | $300 | Final review, link testing, school approval cycle. ~3-4 hours. |
| **TOTAL ONE-TIME SETUP** | **$1,950** | **$3,500** | **$6,100** |

#### B. Equipment (One-Time, Amortized)

| Item | Cost | Amortized Per School (50 schools) | Amortized Per School (100 schools) |
|------|------|----------------------------------|-----------------------------------|
| Ricoh Theta X (primary) | $600 | $12 | $6 |
| Insta360 X5 (backup) | $600 | $12 | $6 |
| Professional tripod + monopod | $200 | $4 | $2 |
| Carrying case, accessories | $150 | $3 | $1.50 |
| **TOTAL EQUIPMENT** | **$1,550** | **$31** | **$15.50** |

Equipment cost is negligible at scale. Even at 10 schools, it adds only ~$155/school.

#### C. Annual Recurring Costs (Per School)

| Line Item | Low Estimate | Mid Estimate | High Estimate | Notes |
|-----------|-------------|-------------|--------------|-------|
| **Tour Hosting** | $2/mo ($24/yr) | $5/mo ($60/yr) | $10/mo ($120/yr) | Self-hosted: Pannellum + S3 = ~$2-5/mo per school. SaaS (CloudPano Pro $33/mo or Kuula $20/mo shared across all schools). |
| **Data Updates (Roster/Coaches)** | $150 | $300 | $500 | Annual roster turnover, coaching changes, academic updates. ~12-20 hours at $18-25/hr. |
| **Platform Maintenance** | $50 | $100 | $200 | Bug fixes, uptime monitoring, minor feature updates (prorated across all schools). |
| **Customer Support** | $50 | $100 | $200 | Email/chat support for school admin questions, analytics reviews. |
| **TOTAL ANNUAL RECURRING** | **$274** | **$560** | **$1,020** |

#### D. Hosting Platform Cost (Shared Infrastructure)

| Option | Monthly Cost | Annual Cost | Best For |
|--------|-------------|-------------|---------|
| Self-hosted (Pannellum + S3 + CloudFront) | $20-50/mo (all schools) | $240-600/yr | Maximum margin, full control |
| CloudPano Pro | $33/mo (unlimited tours) | $396/yr | Quick setup, decent features |
| CloudPano Teams | $125/mo (unlimited tours) | $1,500/yr | White-label, team features |
| Kuula Pro | $20/mo | $240/yr | Budget option |

**Recommendation:** Self-host with Pannellum (open-source) + AWS S3 + CloudFront. Cost scales linearly with storage/bandwidth but stays under $100/mo even at 100 schools. This gives OVV full control over UX and avoids third-party branding.

#### E. Summary: Total Cost Per School

| | Year 1 | Year 2+ |
|--|--------|---------|
| **Low** | $2,224 | $274 |
| **Mid (Realistic)** | $3,500 + $560 = **$4,060** | **$560** |
| **High** | $7,120 | $1,020 |

---

## 2. Competitor Pricing Landscape

### Direct Competitors (Virtual Tours for Higher Ed)

| Competitor | Service | Estimated Annual Cost to School | Setup Fee | Notes |
|-----------|---------|-------------------------------|-----------|-------|
| **Skyway Interactive** | Premium 360 tours for college athletics. Did Ohio State (150 panos, 6-month project), Purdue, Notre Dame. | $25,000-75,000+/yr (estimated) | $15,000-50,000+ | High-end. Ohio State project was massive. Targets Power 4 schools with big budgets. No public pricing. |
| **EAB/YouVisit** | Full campus virtual tours (admissions-focused). 500+ partner schools. | $15,000-50,000/yr (estimated) | Included in contract | Enterprise SaaS. Schools with premium profiles see 16% higher application rates. No public pricing; quote-based. |
| **Concept3D** | Interactive campus maps + virtual tours + event calendars. | $10,000-30,000/yr (estimated) | $5,000-15,000 | Universities invest $6,000-15,000+ for comprehensive virtual tours. Full campus mapping suite. No public pricing. |
| **CampusReel** | Student-led video tours + 360 virtual tours. | $3,000-10,000/yr (estimated) | $2,500+ per production | Markets as "cost-effective." Free trial available. 3-day turnaround on video projects. |
| **CampusTours** | Interactive maps + virtual tours for 1,700+ schools. | $5,000-15,000/yr (estimated) | Varies | Long-established. Broad footprint. |
| **InVision Studio** | College-specific 360 tours. | ~$2,500/tour (one-time) | N/A | One-time production model, not SaaS. Average $2,500 per virtual tour service. |
| **CampusVR** | VR-specific tours (Oculus compatible). | Quote-based | Quote-based | Niche VR-only market. |

### Adjacent Competitors (Recruiting Platforms)

| Competitor | Service | Pricing Model | Notes |
|-----------|---------|---------------|-------|
| **Hudl** | Video analysis for athletics. | HS: $900-3,300/yr per program. College: custom (est. $5,000-15,000/yr per sport). | Dominant in game film. Not virtual tours. |
| **NCSA** | Recruiting network (recruit-facing). | Families pay $1,500-4,200+. Schools don't pay. | Revenue from recruit families, not schools. |
| **Niche.com** | College profile/ranking platform. | Schools pay for premium profiles (est. $5,000-20,000/yr). 15,000+ school clients. | Admissions-focused, not athletics. |

### Key Pricing Insight

The college virtual tour market is split into two tiers:
- **Enterprise tier** (Skyway, EAB/YouVisit, Concept3D): $15,000-75,000+/year. These serve large admissions departments with full-campus coverage.
- **Mid-market tier** (CampusReel, CampusTours, InVision): $2,500-15,000/year. Simpler products, often one-time fees.

**OVV's opportunity:** No one is offering an athletics-focused, all-inclusive platform (360 tours + recruiting data + analytics) at an accessible price point for mid-major and smaller D1/D2 programs.

---

## 3. Market Context & TAM

### Total Addressable Market

| Division | # Schools | Football Programs | Notes |
|----------|-----------|-------------------|-------|
| NCAA D1 (FBS) | ~138 | 138 | Power 4 + Group of 5 + Independents. Biggest budgets. |
| NCAA D1 (FCS) | ~127 | 127 | Smaller budgets but competitive recruiting. |
| NCAA D1 (Non-football) | ~96 | 0 | Basketball, baseball, etc. only. |
| NCAA D2 | 292 | ~170 | Growing interest in recruiting tools. |
| NCAA D3 | 422 | ~250 | Limited budgets, no athletic scholarships. |
| NAIA | 235 | ~100 | Smaller programs, tight budgets. |
| **TOTAL** | **~1,310** | **~785** | Football programs across all divisions. |

### Realistic Serviceable Market (Football Focus)

| Segment | # Schools | Avg Athletic Budget (Recruiting Tech) | Willingness to Pay | Priority |
|---------|-----------|--------------------------------------|--------------------|-|
| FBS Power 4 | ~70 | $50K-200K+ on tech/tools | High but want premium | Phase 2-3 |
| FBS Group of 5 | ~68 | $10K-50K on tech/tools | High — need competitive edge | **Phase 1 Target** |
| FCS | ~127 | $5K-20K on tech/tools | Medium-High — value-conscious | **Phase 1 Target** |
| D2 Football | ~170 | $2K-10K on tech/tools | Medium — budget limited | Phase 2 |
| NAIA Football | ~100 | $1K-5K on tech/tools | Low-Medium | Phase 3 |

**Phase 1 Target Market: ~195 schools (Group of 5 FBS + FCS)**
- These schools recruit nationally but lack the budgets for Skyway-level tours ($25K+)
- They compete against Power 4 schools with massive facility advantages
- Virtual tours level the playing field for programs that can't fly every recruit in

### NCAA Rules Context
- Virtual communication (video calls, virtual tours) is **permitted during all recruiting periods**, including dead periods when in-person contact is banned.
- Unlimited official visits are now allowed (since July 2023), but many recruits still can't afford to visit every school — virtual tours fill this gap.
- No NCAA rules restrict schools from using virtual tour platforms.

### Post-COVID Trends
- Virtual recruiting tools became essential during COVID and remain integral even as in-person visits returned.
- Transfer portal has shifted some recruiting to digital-first (phone calls, texts, financial offers), but **facility showcasing** remains critical for high school recruits making initial decisions.
- Schools that invested in virtual tours during COVID saw measurable enrollment improvements (EAB reports 16% higher application rates for schools with virtual tours).
- Recruiting budgets at some schools are declining (Tennessee down 15%, Texas A&M down 25% in FY2025), making cost-effective digital tools more attractive.

---

## 4. Recommended Pricing to Schools

### Pricing Structure

| Fee Type | Amount | What's Included |
|----------|--------|----------------|
| **One-Time Setup Fee** | **$4,500** | Professional 360 photography (8-12 POIs), photographer travel, photo processing, interactive campus map, tour assembly with hotspots/branding, full data entry (coaches, roster, academics, NIL, alumni), jersey room setup, quality assurance |
| **Annual Subscription** | **$6,000/year** ($500/mo) | Tour hosting, annual data updates (roster, coaches, academics), recruit analytics dashboard, platform access, customer support, minor tour updates |
| **Re-Shoot Fee** | **$2,500** | New 360 photos for facility renovations/additions (6-8 POIs), travel, processing, tour update |
| **Additional POI Add-On** | **$350/location** | New single 360 panorama + processing + tour integration |

### Pricing Justification

**Setup Fee ($4,500):**
- OVV's all-in cost is ~$3,500 (mid estimate) → **$1,000 margin (22%)**
- Compared to competitors: InVision charges ~$2,500 for a basic tour with NO platform. Skyway charges $15,000+. OVV at $4,500 is positioned as the affordable full-service option.
- Schools get: professional photography + full recruiting platform + data entry. Zero work on their end.

**Annual Subscription ($6,000/year):**
- OVV's annual cost is ~$560 → **$5,440 margin (91%)**
- This is where the real business is. SaaS margins are the goal.
- Compared to competitors: EAB/YouVisit charges $15,000-50,000/yr. Concept3D charges $10,000-30,000/yr. OVV at $6,000/yr is **60-80% cheaper** than enterprise competitors.
- For an FCS school spending $5K-20K on recruiting tech, $6,000/yr for a complete virtual recruiting platform is compelling.

**Re-Shoot Fee ($2,500):**
- OVV's cost for a re-shoot is ~$2,000 (travel + photography + processing) → **$500 margin (20%)**
- Schools typically need re-shoots every 2-3 years when facilities are renovated.
- Optional — not required for annual renewal.

### Discount Tiers (Volume & Commitment)

| Commitment | Setup Fee | Annual Rate | Effective Savings |
|------------|-----------|-------------|-------------------|
| 1-Year Standard | $4,500 | $6,000/yr | — |
| 2-Year Commitment | $4,500 | $5,400/yr ($450/mo) | 10% off annual |
| 3-Year Commitment | $3,500 | $4,800/yr ($400/mo) | 20% off annual + $1K off setup |
| Conference Deal (5+ schools) | $3,000/school | $4,500/yr/school | 25% off annual + $1.5K off setup |

---

## 5. Profit Margin Analysis

### Per-School Margins at Standard Pricing

| | Revenue | Cost | Gross Profit | Margin |
|--|---------|------|-------------|--------|
| **Year 1** | $4,500 + $6,000 = $10,500 | $4,060 | $6,440 | **61%** |
| **Year 2** | $6,000 | $560 | $5,440 | **91%** |
| **Year 3** | $6,000 | $560 | $5,440 | **91%** |
| **3-Year Total** | $22,500 | $5,180 | $17,320 | **77%** |

### Per-School Margins at Conference Deal Pricing

| | Revenue | Cost | Gross Profit | Margin |
|--|---------|------|-------------|--------|
| **Year 1** | $3,000 + $4,500 = $7,500 | $4,060 | $3,440 | **46%** |
| **Year 2** | $4,500 | $560 | $3,940 | **88%** |
| **Year 3** | $4,500 | $560 | $3,940 | **88%** |
| **3-Year Total** | $16,500 | $5,180 | $11,320 | **69%** |

### Lifetime Value (LTV)

| Scenario | 3-Year LTV | 5-Year LTV |
|----------|-----------|-----------|
| Standard Pricing | $17,320 | $28,200 |
| Conference Deal | $11,320 | $19,200 |

---

## 6. Scale Economics & Break-Even

### OVV Fixed Costs (Company Overhead)

| Item | Monthly | Annual | Notes |
|------|---------|--------|-------|
| Founder salary (1 person) | $0 (initially) | $0 | Bootstrap phase — take distributions |
| Infrastructure (hosting, domains, tools) | $200 | $2,400 | AWS, domain, email, dev tools |
| Software/SaaS subscriptions | $150 | $1,800 | CRM, analytics, design tools |
| Insurance (general liability) | $100 | $1,200 | Basic business insurance |
| Marketing & sales | $500 | $6,000 | LinkedIn, email, conference attendance |
| Legal & accounting | $200 | $2,400 | Quarterly bookkeeping, contracts |
| **TOTAL FIXED OVERHEAD** | **$1,150** | **$13,800** |

### Revenue & Profitability at Scale

| # Schools | Year 1 Revenue | Year 1 Variable Cost | Year 1 Gross Profit | Minus Fixed Costs | **Net Profit** |
|-----------|---------------|---------------------|---------------------|-------------------|-------------|
| **5** | $52,500 | $20,300 | $32,200 | $13,800 | **$18,400** |
| **10** | $105,000 | $40,600 | $64,400 | $13,800 | **$50,600** |
| **25** | $262,500 | $101,500 | $161,000 | $13,800 | **$147,200** |
| **50** | $525,000 | $203,000 | $322,000 | $25,000* | **$297,000** |
| **100** | $1,050,000 | $406,000 | $644,000 | $50,000* | **$594,000** |

*Fixed costs increase at 50+ schools to account for hiring (VA team, part-time dev, sales).

### Year 2+ Recurring Revenue (No New Schools)

| # Schools | Annual Recurring Revenue | Annual Variable Cost | Gross Profit | Margin |
|-----------|------------------------|---------------------|-------------|--------|
| **10** | $60,000 | $5,600 | $54,400 | **91%** |
| **25** | $150,000 | $14,000 | $136,000 | **91%** |
| **50** | $300,000 | $28,000 | $272,000 | **91%** |
| **100** | $600,000 | $56,000 | $544,000 | **91%** |

### Break-Even Analysis

| Scenario | Break-Even Point |
|----------|-----------------|
| **Bare minimum (cover fixed costs only)** | ~3 schools in Year 1 |
| **Full-time salary equivalent ($80K)** | ~12 schools in Year 1 |
| **$150K total compensation** | ~18 schools in Year 1 |
| **Profitable business ($250K+ net)** | ~40 schools in Year 1 |

**Key insight:** OVV becomes profitable from school #3. At just 10 schools, Year 1 net profit exceeds $50K. The SaaS model means Year 2 recurring revenue from those same 10 schools is $60K with almost no incremental cost.

### Cost Per School at Scale (Efficiency Gains)

| # Schools | Cost/School (Year 1) | Savings vs. Single School | Source of Savings |
|-----------|---------------------|--------------------------|-------------------|
| 1 | $4,060 | — | Baseline |
| 10 | $3,800 | 6% | Batch travel planning, VA efficiency |
| 25 | $3,400 | 16% | Regional photographer network, template data entry |
| 50 | $3,000 | 26% | Dedicated VA team, bulk travel, streamlined QA |
| 100 | $2,600 | 36% | Full-time photographers, automated data pipelines, regional hubs |

---

## 7. Competitive Positioning

### Price Positioning Map

```
Annual Cost to School

$75,000 |  Skyway Interactive (Power 4)
$50,000 |  EAB/YouVisit (Enterprise)
$30,000 |  Concept3D (Full Campus)
$20,000 |
$15,000 |
$10,000 |  CampusTours / CampusReel
 $6,000 |  *** OVV *** <-- HERE
 $2,500 |  InVision (one-time, no platform)
     $0 |  Campus360 (free, DIY)
```

### OVV's Unique Value Proposition

| Feature | OVV | Skyway | EAB/YouVisit | Concept3D | CampusReel |
|---------|-----|--------|-------------|-----------|------------|
| 360 Virtual Tours | Yes | Yes | Yes | Yes | Yes |
| Athletics-Focused | **Yes** | Yes | No (admissions) | No (general) | No (general) |
| Coaching Staff Bios | **Yes** | No | No | No | No |
| Full Roster Data | **Yes** | No | No | No | No |
| Academics/Majors | **Yes** | No | Partial | No | No |
| NIL Data | **Yes** | No | No | No | No |
| Alumni/Draft Data | **Yes** | No | No | No | No |
| Jersey Room | **Yes** | No | No | No | No |
| Recruit Analytics | **Yes** | No | Limited | No | No |
| Interactive Campus Map | Yes | No | No | **Yes** | No |
| School Handles Everything | **No work for school** | School assists | School assists | School builds | Students create |
| Price (Annual) | $6,000 | $25K-75K+ | $15K-50K+ | $10K-30K | $3K-10K |

### Why Schools Choose OVV

1. **All-inclusive service** — School signs contract, OVV does everything. No staff time needed.
2. **Athletics-specific** — Built for recruiting, not general admissions. Coaches, roster, NIL, scheme data.
3. **60-80% cheaper** than enterprise competitors (EAB, Concept3D, Skyway).
4. **Recruit analytics** — Schools see which recruits viewed their tour, for how long, which POIs.
5. **Complete recruiting profile** — Not just a tour, but a full digital recruiting package.
6. **Annual updates included** — Roster and coaching changes handled by OVV each season.

### Target Customer Profile

**Ideal early customers:**
- Group of 5 FBS programs (Sun Belt, MAC, C-USA, MW, AAC) — 68 schools
- FCS programs in competitive conferences (CAA, MVFC, Big Sky) — 127 schools
- Schools that recently built/renovated facilities and want to showcase them
- Programs competing against bigger-budget rivals for the same recruits

**Why NOT Power 4 initially:**
- Power 4 schools (SEC, Big Ten, Big 12, ACC) have $50K-200K+ budgets for premium solutions
- They want custom, white-glove service (Skyway territory)
- OVV can move upmarket later once established, but **the mid-market is underserved now**

---

## 8. Sources

### Third-Party Cost Research
- [Travvir - Virtual Tour Pricing Guide 2026](https://travvir.com/blog/en/virtual-tour-pricing-guide)
- [ThreeSixty Tours - 360 Virtual Tour Cost](https://threesixty.tours/360-virtual-tour-cost/)
- [TrueView360s Pricing](https://www.trueview360s.com/pricing-trueview360s-virtual-tours/)
- [FaithClicks 360 Photography Pricing](https://www.faithclicks360.com/360-virtual-tour.html)
- [BTS - Average Domestic Air Fares Q3 2025](https://www.bts.gov/newsroom/third-quarter-2025-average-air-fare-decreases-47-second-quarter-2025)
- [PayScale - Virtual Assistant Data Entry Hourly Rate](https://www.payscale.com/research/US/Job=Virtual_Assistant/Hourly_Rate/17e8d553/Data-Entry)
- [ZipRecruiter - Data Entry VA Salary](https://www.ziprecruiter.com/Salaries/Data-Entry-Virtual-Assistant-Salary)
- [B&H Photo - Insta360 X5 vs Ricoh Theta X](https://www.bhphotovideo.com/c/compare/Insta360_X5_vs_Ricoh_THETA+X/BHitems/1887887-REG_1689698-REG)
- [CloudPano Pricing](https://www.cloudpano.com/learn/cloudpano-pricing)
- [Kuula Pricing](https://kuula.co/page/pricing)
- [Fiverr - 360 Panorama Stitching Services](https://www.fiverr.com/goranbeg/stitch-and-create-360-panorama-sphere-images)
- [Panoee - S3 Hosting for Virtual Tours](https://hosting.panoee.com/)

### Competitor Research
- [EAB Virtual Tours](https://eab.com/solutions/virtual-tours/)
- [Skyway Interactive](https://skywayinteractive.com/)
- [Skyway x Ohio State Partnership (Eleven Warriors)](https://www.elevenwarriors.com/ohio-state-athletics/2023/03/137748/ohio-state-partners-with-skyway-interactive-launches-collection-of-360-degree-virtual-tours-of-athletic-facilities)
- [Skyway On-Demand Virtual Tours PR](https://www.prnewswire.com/news-releases/skyway-interactive-unveils-on-demand-virtual-tours-for-college-athletic-recruiting-301487820.html)
- [Concept3D Pricing](https://concept3d.com/interactive-virtual-experiences/pricing/)
- [Concept3D Campus Maps ROI](https://concept3d.com/blog/higher-ed/interactive-campus-maps-roi-how-to-model-cost-value-payback/)
- [CampusReel 360 Tours](https://products.campusreel.org/360-virtual-tour)
- [InVision Studio College Virtual Tours](https://invisionstudio.com/industries/college-virtual-tours/)
- [Story Collaborative - Campus Tour Costs](https://blog.story-collaborative.com/how-much-does-a-virtual-tour-cost-for-my-campus)
- [Niche Premium Profile](https://niche.com/about/niche-premium-profile-college)
- [NCSA Pricing](https://www.ncsasports.org/who-is-ncsa/what-does-ncsa-do/what-does-ncsa-cost-how-much)
- [Hudl College Pricing](https://www.hudl.com/pricing/college)
- [Campus360](https://campus360.org/for-education-institutions)

### Market Context
- [NCAA Three Divisions](https://www.ncaa.org/sports/2016/1/7/about-resources-media-center-ncaa-101-our-three-divisions.aspx)
- [NCSA - College Divisions Explained](https://www.ncsasports.org/recruiting/how-to-get-recruited/college-divisions)
- [NAIA Member Schools](https://www.naia.org/schools/index)
- [NCAA Division I FBS Programs (Wikipedia)](https://en.wikipedia.org/wiki/List_of_NCAA_Division_I_FBS_football_programs)
- [NCAA Recruiting Rules](https://www.ncsasports.org/ncaa-eligibility-center/recruiting-rules)
- [NCAA Official Visits](https://www.ncsasports.org/ncaa-eligibility-center/recruiting-rules/official-visits)
- [Sportico - College Recruiting Costs Shrink](https://www.sportico.com/leagues/college-sports/2026/college-football-recruiting-costs-budgets-1234882693/)
- [McMillan Education - Athletic Recruiting Trends 2025](https://www.mcmillaneducation.com/blog/athletic-recruiting-2025-trends-and-2026-predictions/)
- [VirtualTours.LLC - Cost Guide](https://virtualtours.llc/how-much-do-virtual-tours-cost/)
