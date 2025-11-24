import { SimulationData } from './types';

export const SIMULATION_DATA: SimulationData = {
  "schema_version": "v1",
  "simulation": {
    "period": "no_in_input",
    "key_variables": ["price","capacity","marketing","R&D","HR","finance"]
  },
  "teams": [
    {
      "team_id": "Team A",
      "members": ["S1","S2","S3","S4"],
      "summary": "Team establishes norms (devil’s advocate, suspend judgment) and a broad vision to 'win the market.' They struggle to interpret the dashboard/metrics early on but converge on understanding basic drivers.",
      "decisions": [
        {
          "title": "Set team norms (include devil’s advocate; suspend judgment)",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S1","A":["S3"],"P":["S2"],"I":["S3"],"D":"S1","confidence":"low"},
          "evidence": [
            {"speaker":"S1","t":"00:01:43–00:01:54","quote":"Maybe some would be like the devil's advocate… someone's gotta challenge our thinking."},
            {"speaker":"S3","t":"00:01:55–00:02:03","quote":"I think we should also suspend judgment… use half baked ideas."}
          ]
        },
        {
          "title": "Vision: be the best 'Amber' and win the market",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S3","A":["S1"],"P":["S2"],"I":["S3"],"D":"S1","confidence":"low"},
          "evidence": [
            {"speaker":"S3","t":"00:02:19–00:02:24","quote":"The vision here is just to be the best amber we can possibly be."},
            {"speaker":"S1","t":"00:03:02–00:03:10","quote":"Yeah… be the winner in the market."}
          ]
        },
        {
          "title": "Interpretation of baseline metrics & expense drivers",
          "status": "in_discussion",
          "RAPID_roles_approx": {"R":"S3","A":["S2"],"P":["S1"],"I":["S2","S3"],"D":"S1","confidence":"low"},
          "evidence": [
            {"speaker":"S1","t":"00:09:54–00:10:00","quote":"I'm still trying to figure out what I'm looking at."},
            {"speaker":"S3","t":"00:10:31–00:10:39","quote":"Because it's an expense sheet… each one is an expense showing how much we expense in each."}
          ]
        }
      ],
      "arguments_by_participant": {
        "S1":[
          {"claim":"We need explicit challenge to avoid groupthink.","data":"Suggests a devil’s advocate role.","warrant":"Structured dissent improves decision quality.","backing":"Decision-role frameworks emphasize clarity and dissent.","qualifier":"Useful if kept constructive.","rebuttal":"Could slow decisions.","t":"00:01:43–00:01:54"},
          {"claim":"Unclear metrics impede decisions.","data":"Confusion about dashboard values.","warrant":"Poor comprehension increases risk of bad choices.","backing":"General analytics best practice.","qualifier":"Until clarified.","rebuttal":"Peers interpret for context.","t":"00:09:54–00:10:05"}
        ],
        "S2":[
          {"claim":"Avoid references that confuse brand ('wires').","data":"Pushback on 'wireless partner' phrase.","warrant":"Ambiguous slogans misalign vision.","backing":"Marketing clarity norms.","qualifier":"In early naming phase.","rebuttal":"May over-constrain creativity.","t":"00:08:17–00:08:27"}
        ],
        "S3":[
          {"claim":"Set a simple, aspirational vision.","data":"'Be the best Amber… win the market.'","warrant":"Clear direction aids prioritization.","backing":"Strategy alignment practice.","qualifier":"Needs KPIs later.","rebuttal":"Too generic to guide trade-offs.","t":"00:02:19–00:02:36"},
          {"claim":"Top metrics are drivers to invest in.","data":"Lists platform/ecosystem, NPS, renewals, engagement.","warrant":"Investment shifts outcomes.","backing":"Simulation framing.","qualifier":"Assumes model fidelity.","rebuttal":"Budget and round timing unclear.","t":"00:10:08–00:10:18"}
        ],
        "S4":[]
      },
      "biases_and_risks":[
        {"type":"ambiguity_risk","evidence_t":"00:09:54–00:10:05","note":"Difficulty parsing financial dashboard before deciding."}
      ],
      "plan_alternatives": {
        "criteria":[{"name":"ROI","weight":0.35},{"name":"Risk","weight":0.25},{"name":"Time","weight":0.20},{"name":"Cost","weight":0.20}],
        "options":[
          {"name":"Grow_market_share","scores":{"ROI":4,"Risk":2,"Time":3,"Cost":3},"note":"Aggressive go-to-market + platform/ecosystem bets."},
          {"name":"Defend_margin","scores":{"ROI":3,"Risk":3,"Time":4,"Cost":4},"note":"Tight cost control, price discipline."},
          {"name":"Hybrid","scores":{"ROI":4,"Risk":3,"Time":3,"Cost":3},"note":"Selective growth with margin guardrails."}
        ],
        "recommendation":"Hybrid",
        "sensitivity":"If ROI weight increases to 0.50, Grow_market_share edges Hybrid; if Risk ≥0.35, Defend_margin dominates.",
        "explicit_assumptions":"Scores are advisory proposals; not drawn from transcript."
      },
      "next_actions":[
        {"action":"Clarify KPI definitions and baseline values in the dashboard","owner_approx":"S1 (R), S3 (I), S1 (D)","deadline":"7 days"}
      ]
    },
    {
      "team_id": "Team B",
      "members": ["S1","S2","S3","S4"],
      "summary": "Team moves swiftly from light strategy setup into simulation. Chooses an initiative aimed at employee engagement (and sees positive movement in engagement, NPS, and CCB). Later, they debate options A/B/C and converge on B (thorough/longer-term).",
      "decisions": [
        {
          "title": "Enter simulation; prioritize operating income short-term",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S3","A":["S2"],"P":["S1"],"I":["S2","S3"],"D":"S1","confidence":"medium"},
          "evidence": [
            {"speaker":"S2","t":"00:06:18–00:06:20","quote":"We should ask facilitators later… time to get into the simulation."},
            {"speaker":"S3","t":"00:07:21–00:07:35","quote":"Operating income… short term focus?"}
          ]
        },
        {
          "title": "Select first initiative to boost employee engagement",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S2","A":["S3"],"P":["S1"],"I":["S3"],"D":"S1","confidence":"medium"},
          "evidence": [
            {"speaker":"S2","t":"00:11:44–00:11:49","quote":"Employee engagement is one of our hurdles… this one would really help."},
            {"speaker":"S1","t":"00:12:33–00:12:41","quote":"That also helped customer NPS and CCB."}
          ]
        },
        {
          "title": "Decision vignette: choose B (methodical/long-term) over A/C",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S3","A":["S1"],"P":["S2"],"I":["S1","S2"],"D":"S3","confidence":"medium"},
          "evidence": [
            {"speaker":"S3","t":"00:43:17–00:43:20","quote":"Strike down C… between A and B."},
            {"speaker":"S2","t":"00:43:48–00:43:59","quote":"Option B is better… thorough."}
          ]
        }
      ],
      "arguments_by_participant": {
        "S1":[
          {"claim":"Option A risks low accountability.","data":"\"no one really has the accountability.\"","warrant":"Ambiguity leads to poor execution.","backing":"RAPID clarity principle.","qualifier":"Given current team.","rebuttal":"Faster speed possible with A.","t":"00:41:57–00:42:07"},
          {"claim":"Engagement initiative produced benefits.","data":"Engagement up; NPS/CCB improved.","warrant":"HR levers can lift CX/retention.","backing":"Observed sim indicators.","qualifier":"Early-round effect.","rebuttal":"May regress later.","t":"00:12:15–00:12:41"}
        ],
        "S2":[
          {"claim":"Choose B for thoroughness.","data":"States B is better; long-term orientation.","warrant":"Structured decisions reduce rework.","backing":"Own prior reasoning on last event.","qualifier":"Even if slower.","rebuttal":"Gaming the sim temptation noted.","t":"00:43:48–00:44:10"}
        ],
        "S3":[
          {"claim":"Eliminate C (escalate) to keep ownership.","data":"Leaders want decisions made locally.","warrant":"Escalation dilutes accountability.","backing":"Org decision norms.","qualifier":"When scope allows.","rebuttal":"High-risk items may require escalation.","t":"00:43:06–00:43:20"}
        ],
        "S4":[]
      },
      "biases_and_risks":[
        {"type":"anchoring","evidence_t":"00:07:21–00:07:35","note":"Early anchor on operating income as short-term focus may bias later trade-offs."},
        {"type":"gaming_the_system_reflection","evidence_t":"00:44:02–00:44:10","note":"One member wonders if the sim repeats 'long-term' as the correct answer."}
      ],
      "plan_alternatives": {
        "criteria":[{"name":"ROI","weight":0.35},{"name":"Risk","weight":0.25},{"name":"Time","weight":0.20},{"name":"Cost","weight":0.20}],
        "options":[
          {"name":"Grow_market_share","scores":{"ROI":4,"Risk":2,"Time":3,"Cost":3},"note":"Pair engagement levers with price/value repositioning."},
          {"name":"Defend_margin","scores":{"ROI":3,"Risk":3,"Time":4,"Cost":4},"note":"Tighten delivery costs; selective discounting controls."},
          {"name":"Hybrid","scores":{"ROI":4,"Risk":3,"Time":3,"Cost":3},"note":"Keep B-style thorough decisions; target 1–2 high-impact initiatives."}
        ],
        "recommendation":"Hybrid",
        "sensitivity":"If Risk weight rises to ≥0.35, Defend_margin wins; otherwise Hybrid.",
        "explicit_assumptions":"Proposed; not extracted from transcript."
      },
      "next_actions":[
        {"action":"Document decision log for A/B/C vignette with RAPID roles","owner_approx":"S3 (R/D), S1 (A), S2 (P)","deadline":"5 days"}
      ]
    },
    {
      "team_id": "Team C",
      "members": ["S1","S2","S3","S4"],
      "summary": "Team aligns on 'alignment over consensus' and adjusts initiative intensities (e.g., continuous learning & development to medium). They expect more events and review budgets.",
      "decisions": [
        {
          "title": "Adopt 'alignment, not agreement' decision norm",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S4","A":["S3"],"P":["S1"],"I":["S2"],"D":"S1","confidence":"low"},
          "evidence": [
            {"speaker":"S4","t":"00:01:51–00:01:57","quote":"Alignment, but not agreement."},
            {"speaker":"S1","t":"00:01:55–00:01:57","quote":"Alignment over consensus."}
          ]
        },
        {
          "title": "Set 'Continuous learning & development' intensity to Medium",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S4","A":["S3"],"P":["S1"],"I":["S2"],"D":"S1","confidence":"medium"},
          "evidence": [
            {"speaker":"S4","t":"00:34:33–00:34:46","quote":"Continuous learning and development… medium, at least."},
            {"speaker":"S1","t":"00:34:49–00:34:54","quote":"We can leave it on medium."}
          ]
        }
      ],
      "arguments_by_participant": {
        "S1":[
          {"claim":"Medium intensity is a safe choice.","data":"Accepts medium after brief push for high.","warrant":"Balances impact vs. resource constraints.","backing":"Budget review upcoming.","qualifier":"Until events unfold.","rebuttal":"Might underinvest in people.","t":"00:34:46–00:34:54"}
        ],
        "S2":[
          {"claim":"Expect more events; conserve resources.","data":"Notes additional events incoming.","warrant":"Optionality holds value.","backing":"Sim structure hint.","qualifier":"Short-term.","rebuttal":"May miss early gains.","t":"00:35:02–00:35:05"}
        ],
        "S3":[
          {"claim":"Medium intensity acceptable.","data":"Agreement with medium setting.","warrant":"Team alignment preference.","backing":"Norm: alignment over consensus.","qualifier":"Revisit later.","rebuttal":"High could accelerate capability.","t":"00:34:42–00:34:46"}
        ],
        "S4":[
          {"claim":"Prefer alignment over consensus.","data":"States norm explicitly.","warrant":"Faster decisions without unanimity.","backing":"Decision efficiency principle.","qualifier":"Still invite input.","rebuttal":"Risk of marginalizing dissent.","t":"00:01:51–00:01:57"}
        ]
      },
      "biases_and_risks":[
        {"type":"status_quo_bias","evidence_t":"00:34:49–00:34:54","note":"Settling at 'medium' due to safety may limit upside."}
      ],
      "plan_alternatives": {
        "criteria":[{"name":"ROI","weight":0.35},{"name":"Risk","weight":0.25},{"name":"Time","weight":0.20},{"name":"Cost","weight":0.20}],
        "options":[
          {"name":"Grow_market_share","scores":{"ROI":4,"Risk":2,"Time":3,"Cost":3},"note":"Leverage learning investments to upskill sales/CS."},
          {"name":"Defend_margin","scores":{"ROI":3,"Risk":3,"Time":4,"Cost":4},"note":"Keep L&D at Medium; streamline ops."},
          {"name":"Hybrid","scores":{"ROI":4,"Risk":3,"Time":3,"Cost":3},"note":"Target L&D at revenue-adjacent roles first."}
        ],
        "recommendation":"Hybrid",
        "sensitivity":"Higher Risk weight favors Defend_margin; higher ROI weight favors Grow_market_share.",
        "explicit_assumptions":"Proposed; not extracted from transcript."
      },
      "next_actions":[
        {"action":"Define success metrics for L&D","owner_approx":"S1 (D), S4 (R), S2 (I), S3 (P)","deadline":"10 days"}
      ]
    },
    {
      "team_id": "Team D",
      "members": ["S1","S2","S3","S4"],
      "summary": "Team explicitly sets norms to include all voices and seek alignment. They choose longer-term architectural/operational options (re-architect on BTP) that hurt short-term NPS/profit but improve long-term outcomes.",
      "decisions": [
        {
          "title": "Team norm: maximize participation, align even without consensus",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S1","A":["S2"],"P":["S3"],"I":["S2","S3"],"D":"S1","confidence":"medium"},
          "evidence": [
            {"speaker":"S1","t":"00:00:48–00:01:00","quote":"How do we want to work… hear everyone before we lock decisions."},
            {"speaker":"S2","t":"00:01:42–00:01:55","quote":"Value in team alignment… not mutual consensus."}
          ]
        },
        {
          "title": "Reduce cost-to-serve; accept trade-offs to lift margins & productivity",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S1","A":["S2"],"P":["S3"],"I":["S2","S3"],"D":"S1","confidence":"medium"},
          "evidence": [
            {"speaker":"S1","t":"00:19:54–00:20:05","quote":"Reduce cost to serve… cloud gross margin increases…"}
          ]
        },
        {
          "title": "Choose longer-term architecture (BTP re-architecture) despite short-term hit",
          "status": "decided",
          "RAPID_roles_approx": {"R":"S1","A":["S3"],"P":["S2"],"I":["S3"],"D":"S1","confidence":"medium"},
          "evidence": [
            {"speaker":"S1","t":"00:47:29–00:47:55","quote":"Solution re-architected on BTP… took more time… hit profitability."},
            {"speaker":"S1","t":"00:48:47–00:48:58","quote":"Miss out on short-term NPS and profit, but better long term."}
          ]
        }
      ],
      "arguments_by_participant": {
        "S1":[
          {"claim":"Inclusive input improves decisions.","data":"Calls for hearing all opinions.","warrant":"More perspectives reduce blind spots.","backing":"Decision quality literature.","qualifier":"Balanced by alignment norm.","rebuttal":"Risk of slower pace.","t":"00:00:48–00:01:00"},
          {"claim":"BTP re-architecture pays off long-term.","data":"Short-term NPS/profit dip; long-term benefits.","warrant":"Platform extensibility and reuse create value.","backing":"Observed sim feedback.","qualifier":"Time-to-value longer.","rebuttal":"Execution risk while resources constrained.","t":"00:47:29–00:48:58"}
        ],
        "S2":[
          {"claim":"Affirmative alignment is the decision rule.","data":"States preference explicitly.","warrant":"Aligned backing enables execution.","backing":"RAPID D clarity (decider) plus team buy-in.","qualifier":"Not unanimity.","rebuttal":"May suppress minority critique if rushed.","t":"00:02:11–00:02:24"}
        ],
        "S3":[
          {"claim":"Short-term satisfaction from speed may fade.","data":"Customers 'temporarily satisfied' with faster access.","warrant":"Sustained value needs deeper changes.","backing":"Product/ops experience.","qualifier":"Depends on context.","rebuttal":"Speed can matter in competitive windows.","t":"00:48:32–00:48:45"}
        ],
        "S4":[]
      },
      "biases_and_risks":[
        {"type":"sunk_cost_or_execution_risk","evidence_t":"00:47:36–00:47:55","note":"Resource constraints during re-architecture could prolong profitability dip."}
      ],
      "plan_alternatives": {
        "criteria":[{"name":"ROI","weight":0.35},{"name":"Risk","weight":0.25},{"name":"Time","weight":0.20},{"name":"Cost","weight":0.20}],
        "options":[
          {"name":"Grow_market_share","scores":{"ROI":4,"Risk":2,"Time":3,"Cost":3},"note":"Exploit extensibility to launch value-add extensions."},
          {"name":"Defend_margin","scores":{"ROI":3,"Risk":3,"Time":4,"Cost":4},"note":"Double-down on cost-to-serve reductions."},
          {"name":"Hybrid","scores":{"ROI":4,"Risk":3,"Time":3,"Cost":3},"note":"Stage-gated BTP rollout; targeted margin plays."}
        ],
        "recommendation":"Hybrid",
        "sensitivity":"If Time weight rises (≥0.30), Defend_margin wins; if ROI dominates (≥0.50), Grow_market_share.",
        "explicit_assumptions":"Proposed; not extracted from transcript."
      },
      "next_actions":[
        {"action":"Create BTP re-architecture execution plan with milestones & risk burndown","owner_approx":"S1 (D), S2 (A), S3 (R/P)","deadline":"14 days"}
      ]
    }
  ],
  "teams_comparative": {
    "common_patterns":"All teams set some norms first; prefer alignment over full consensus; show openness to long-term choices even with short-term trade-offs.",
    "key_differences":"Team B explicitly rejects escalation (C) and chooses B; Team D embraces platform re-architecture with explicit acceptance of short-term dips; Team A focuses more on norms/vision with dashboard confusion; Team C optimizes initiative intensities conservatively (medium).",
    "RAPID_roles_map_summary":{"teams_with_clear_D":["Team B","Team D"],"teams_with_diffuse_D":["Team A","Team C"]},
    "transversal_risks":["anchoring on early metrics","rushing to 'medium' settings","execution risk during re-architecture"],
    "opportunities":"Codify RAPID for vignettes; link HR (engagement/L&D) to CX and renewal drivers; stage-gate long-term architecture."
  }
};