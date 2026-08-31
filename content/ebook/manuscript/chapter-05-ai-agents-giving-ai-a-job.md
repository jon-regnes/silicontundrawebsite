# Chapter 5: AI Agents: Giving AI a Job

The owner wanted an AI agent. Not a prompt or a workflow, an actual agent. He had seen the demos. The agent opened websites, clicked buttons, researched competitors, wrote summaries, updated records, planned tasks, and talked like a tireless junior employee who never asked for PTO. So he called a meeting. "We need an AI agent for sales," he said. The room got quiet. Not because the idea was bad, but because nobody knew what it meant (sounds like it's time to find a consultant who can help with that).

The marketing lead thought the agent would write outbound emails. The sales manager thought it would qualify leads. The operations manager thought it would update the CRM. The owner thought it might do all of that, plus maybe book meetings and create proposals.

Someone piped up and asked the useful question: "What exactly is the agent's job?"

That killed the fantasy fast. Fantasy dies when the job gets specific.

That's the first thing to understand about AI agents. An agent is not magic with a job title. An agent is a system designed to pursue a specific goal using AI, context, tools, and rules.

If the job is vague, the agent will be vague. If the boundaries are weak, the agent will be risky. If the workflow is unclear, the agent will inherit the confusion.

That is why you do not start with "we need an agent;" you start with the work. Then you decide whether an agent belongs there.

## What An AI Agent Actually Is

An AI agent is an AI-powered system that can take steps toward a goal. An agent is like giving AI a small job, a set of tools, instructions, and rules for when to stop or ask for help.

A regular prompt is one request: "Summarize this sales call."

A workflow is a repeatable process: "After every sales call, summarize the call, draft a follow-up, update the CRM, and create the next task."

An agent is closer to a worker inside that process: "Review new inbound leads, decide which ones match our ideal customer profile, draft a recommended next step, and alert sales when a lead is high priority."

The agent has a job, but it needs information. It may use tools. It better follow rules. It produces an output. It may ask for approval.

That's the practical version not the sci-fi version. The sci-fi version says an agent is a digital employee that can figure everything out and run part of your company. The practical version says an agent is a constrained system that does a defined job inside a defined business process.

Constrained means boxed in. The agent knows what it is allowed to do, what it is not allowed to do, and when it must stop.

A good agent is not free-range intelligence wandering through your business. A good agent has a leash, a map, and a job description.

## The Four Parts Of A Useful Agent

A useful agent usually has four parts.

1. Goal
2. Context
3. Tools
4. Boundaries

If any one of those is missing, the agent gets weaker. If most are missing, you do not have an agent. You have a liability wearing a headset.

## Goal: What Is The Agent Trying To Accomplish?

The goal is the outcome the agent is working toward. The goal is the job you want done, stated clearly enough that someone can tell whether it happened.

Bad goal: "Help with sales."

Better goal: "Review new inbound leads, identify whether each lead matches our ideal customer profile, draft a short summary, recommend the next step, and alert the sales manager for high-priority leads."

Bad goal: "Improve customer service."

Better goal: "Classify new support tickets by type and urgency, draft a suggested first reply, and route each ticket to the right person for review."

Bad goal: "Make operations more efficient."

Better goal: "Review weekly project updates, identify missing statuses, summarize risks, and create a manager review list every Friday morning."

A vague goal forces the agent to guess; a clear goal lets the agent work. The agent does not need a grand mission. It needs a defined job.

## Context: What Does The Agent Need To Know?

Context is the information the agent needs to do the job well.

You already saw this with prompts. Agents need it even more. Because an agent may make several decisions or take several steps, bad context can create bad momentum. Context is what the agent needs to know before it starts, the same way a new employee needs background before handling real work.

For a lead qualification agent, context might include:

- What your company sells
- Who your best customers are
- Which industries you serve
- Which requests are a poor fit
- What makes a lead urgent
- What makes a lead valuable
- What questions should be asked before a quote
- What claims the business should not make
- When a human should review the lead

For a support agent, context might include:

- Product or service information
- Support categories
- Escalation rules
- Refund or warranty policy
- Approved response tone
- Customer account history
- Known issues
- What the agent is not allowed to promise

For an operations agent, context might include:

- Project stages
- Team responsibilities
- Deadlines
- Risk signals
- Reporting format
- What counts as blocked
- Who should be notified

Most agent failures start before the agent acts. They start when the business gives the agent bad context, stale context, or no context. Don't blame AI for failing a test you never properly wrote.

## Tools: What Can The Agent Use Or Touch?

A tool is something the agent can use to do work. A tool is like giving the agent a calculator, a filing cabinet, an email draft window, a CRM, a calendar, or a search box.

Tools might include:

- Email
- CRM
- Calendar
- Spreadsheet
- Ticketing system
- Project management tool
- Document storage
- Internal knowledge base
- Web search
- Database
- Automation platform
- Messaging app

This is where agents become more powerful than one-off prompts. A prompt can answer based on what you paste into the chat, but an agent may be able to look up information, compare records, create drafts, update fields, or trigger the next step.

That is useful, but it is also where the risk increases.

There is a big difference between an agent that drafts an email and an agent that sends an email. There is a big difference between an agent that recommends a CRM update and an agent that changes the CRM automatically. There is a big difference between an agent that flags a refund request and an agent that approves the refund.

Tools create power. Power requires rules. With great power comes rules.

## Boundaries: What Is The Agent Not Allowed To Do?

Boundaries are the limits.Boundaries tell the agent where the fence is. A boundary might say:

- Do not send customer-facing messages without human approval.
- Do not offer discounts.
- Do not promise delivery dates.
- Do not change pricing.
- Do not delete records.
- Do not make legal, medical, or financial claims.
- Do not respond if required information is missing.
- Do not act on low-confidence decisions.
- Do not access unrelated customer data.
- Do not continue if the request does not match a defined category.

Boundaries are not there because AI is bad. Boundaries are there because business matters.

You would not hire a new employee and say, "Do whatever seems right with our customers, pricing, contracts, and data."

The same principle applies here. If the agent can touch important systems, the boundaries need to be explicit.

## Agents Are Delegation Systems

The easiest way to understand agents is through delegation.

A prompt is like asking for help once. A workflow is like documenting how a task should happen. An agent is like delegating a specific part of that task to a software worker.

Not a full employee. A software worker.That worker may be very fast. It may be useful. It may handle boring information work better than a person who is tired, rushed, or interrupted every seven minutes.

But it still needs management. It needs a job description. It needs tools. It needs examples. It needs rules. It needs review. It needs a way to fail safely.

This is where business operators have an advantage. If you know how to delegate clearly, you already understand half of agent design. The problem is that many owners do not delegate clearly to people either.

They say, "Handle this," then get annoyed when handled means something different than expected.

AI agents will not fix that habit; they will expose it.

## A Simple Agent Example: Lead Triage

Let us build a practical example.

A company gets inbound leads from its website. Some are excellent. Some are tire-kickers. Some need a service the company does not provide. Some are urgent. Some should be referred elsewhere. Before an agent, someone has to read each lead, decide what kind it is, write a note, update the CRM, and maybe tell sales.

A lead triage agent could have a narrow job: "Review each new inbound lead, summarize the request, classify the fit, identify missing information, draft a recommended next step, and notify sales if the lead is high priority."

The agent's context might include:

- Services the company offers
- Ideal customer profile
- Poor-fit signals
- High-priority signals
- Required intake fields
- Approved response rules
- Escalation criteria

The agent's tools might include:

- Website form submissions
- CRM lookup
- Email draft creation
- Slack or Teams notifications
- Task creation

The boundaries might include:

- Do not send emails automatically.
- Do not promise pricing.
- Do not mark a lead as disqualified unless a human confirms it.
- If budget, timeline, or service need is unclear, flag the missing information.

Now the agent is not "doing sales." It is doing lead triage. That distinction matters. "Doing sales" is vague and dangerous.

"Triage inbound leads and prepare sales for follow-up" is specific and useful.

## A Simple Agent Example: Support Routing

Here is another example.

A business receives customer support messages through email and a ticketing system. The team is not overwhelmed every day, but the volume is high enough that messages sometimes sit too long or go to the wrong person.

A support routing agent could have this job: "Review new support messages, summarize the issue, classify the request type, estimate urgency, suggest a first response, and route the ticket to the correct queue for human review."

That agent might classify tickets as:

- Billing
- Product issue
- Scheduling
- Cancellation risk
- How-to question
- Complaint
- Feature request
- Other

It might flag urgency based on simple rules:

High urgency if the customer cannot use the service, mentions a deadline, threatens cancellation, reports a repeated issue, or involves a large account.

Medium urgency if the issue affects convenience but not core service.

Low urgency if the request is informational and not time-sensitive.

That is not replacing customer service; it's reducing sorting work. If the support team spends less time figuring out what something is, they can spend more time solving the problem.

That is operational leverage.

## A Simple Agent Example: Meeting Follow-Up

Meetings are where decisions go to become rumors. Everyone leaves thinking something was decided. Two weeks later, nobody agrees on who owned the task. An internal meeting agent can help.

Its job might be: "Review meeting transcripts, extract decisions, action items, owners, deadlines, open questions, and risks. Create a draft follow-up summary and suggest tasks for review."

Its tools might include:

- Meeting transcript
- Calendar invite
- Project management tool
- Team directory
- Document storage

Its boundaries might include:

- Do not create tasks without manager approval.
- Do not assign owners unless they were clearly named.
- If a deadline is unclear, mark it as missing.
- Separate decisions from discussion.
- Flag disagreements or unresolved questions.

This kind of agent does not need to be glamorous. It just needs to prevent the expensive fog that follows too many meetings. If every meeting ends with clearer decisions, owners, and deadlines, the business improves.

## The Agent Hype Trap

WARNING: the agent hype trap is believing that more autonomy automatically means more value. Autonomy means the ability to act without being manually guided at every step. Autonomy means the agent can keep going on its own within the rules you gave it.

Autonomy can be useful. It can also be expensive, embarrassing, or dangerous when the job is unclear.

A fully autonomous agent sounds exciting in a demo. In a real business, the question is not "Can it act on its own?" The question is "Should it act on its own here?"

Sometimes the answer is yes. A low-risk internal summary? Maybe. A weekly report draft? Maybe. A reminder to update missing project statuses? Probably. A customer refund approval? Danger Will Robinson. A legal response? No. A pricing commitment? Not without rules and review. A message to an angry customer? Human eyes first.

The more consequences an action has, the more careful you should be. That's not fear; that's operations.

## Levels Of Agent Responsibility

Think about agent responsibility in levels.

Level one: suggest. The agent reviews information and suggests what a human should do.

Example: "This lead looks high priority because the company is a good fit and requested a call this week."

Level two: draft. The agent creates a first version for human review.

Example: "Here is a draft reply to the lead."

Level three: update. The agent changes internal records or creates internal tasks.

Example: "The CRM record has been updated and a follow-up task has been created."

Level four: act externally. The agent sends messages, books meetings, notifies customers, submits forms, or triggers actions outside the company.

Example: "The customer has been emailed and the onboarding sequence has started."

Each level carries more risk. Do not start at level four because a demo made it look easy.  Start with suggest or draft. Build trust. Test with real examples. Add boundaries.

Then decide what can safely move up a level. That is how operators deploy agents without turning the business into a live experiment.

## What Makes A Good First Agent

A good first agent has a narrow job. It works with information your business already has. It produces something a human can review. It operates inside a workflow you understand. It improves a task people already dislike doing manually. It has clear success criteria (the signs that tell you whether the agent did the job well).

For a lead triage agent, success criteria might be:

- Did it correctly summarize the lead?
- Did it classify the service request accurately?
- Did it identify missing information?
- Did it avoid making promises?
- Did it alert the right person?
- Did it save time?

For a meeting follow-up agent:

- Did it separate decisions from discussion?
- Did it capture action items?
- Did it identify owners and deadlines?
- Did it flag unclear items instead of guessing?
- Did managers trust the output enough to use it?

For a support routing agent:

- Did it route tickets correctly?
- Did it identify urgent issues?
- Did it avoid overreacting to routine messages?
- Did it draft replies that sounded like the company?
- Did support staff spend less time sorting?

A bad first agent has a vague mission, weak context, too many tools, no review step, and no clear owner. It looks impressive right before it becomes a mess.

## The Owner Problem

Every agent needs an owner. Not a vendor. Not "the AI team," especially if your company does not have one. A real person in the business.

The owner should know:

- What the agent does
- What workflow it belongs to
- What tools it can access
- What rules it follows
- What it is not allowed to do
- How output is reviewed
- What to do when it fails
- How success is measured

Without ownership, agents become mysterious little systems that everyone assumes someone else is watching. That is how problems hide.

A useful agent should be boring enough to manage. 

You should be able to explain it in plain English: "This agent reviews new support tickets, summarizes them, labels urgency, suggests a reply, and routes them to the right queue. It does not send replies. Megan reviews the output weekly and updates the rules when needed."

If nobody can explain what the agent does, turn it off until someone can.

## The Agent Brief

Before building or buying an agent, write an agent brief (one page).

Use this format:

- Agent name: What will you call it?
- Job: What specific work does it do?
- Workflow: Where does it fit?
- Trigger: What starts it?
- Inputs: What information does it need?
- Tools: What systems can it access?
- Boundaries: What is it not allowed to do?
- Human review: Where does a person approve, edit, or reject?
- Output: What should exist when it finishes?
- Success criteria: How will you know it worked?
- Owner: Who is responsible for it?

Do not skip this because it feels basic. Basic is where many AI projects fall apart. If you cannot complete the brief, you are not ready for the agent.

That doesn't mean the idea is bad. It means the work is not clear enough yet.

Go back to the workflow. Clarify the job. Then try again.

## What To Do This Week

Pick one workflow from the previous chapter.

Don't ask a broad question like, "Could an agent do this whole thing?"

Ask: Where inside this workflow would it help to have AI perform a specific job?

Look for jobs like:

- Review new inputs
- Summarize messy information
- Classify requests
- Identify missing details
- Draft a response
- Recommend a next step
- Check output against rules
- Prepare a human for review

Then write an agent brief for one narrow job.

For example: "Lead Triage Agent: Reviews new inbound leads, summarizes the request, classifies fit and urgency, identifies missing information, drafts a recommended next step, and alerts sales for review. It does not send messages or disqualify leads without human approval."

That is a good start. It is specific. It is useful. It has boundaries. You can test it. And if it works, you can improve it.

## The Takeaway

AI agents are not digital employees you unleash on the business; they are constrained systems with specific jobs.

A useful agent has a goal, context, tools, and boundaries.

It belongs inside a workflow. It has a human owner. It has success criteria. It knows when to stop, ask, draft, suggest, or escalate.

The agent conversation gets much healthier when you stop asking, "What can an AI agent do?" and start asking, "What job should this agent be trusted to perform?"

That question forces clarity. It keeps the business grounded. It protects you from the fantasy version of agents. And it prepares you for the next idea: agent loops.

Because once an agent has a job, the next question is whether it should do one step and stop, or whether it should observe, decide, act, check, and keep working until a goal is met.

That is where agents become more powerful, and also where they need tighter control.
