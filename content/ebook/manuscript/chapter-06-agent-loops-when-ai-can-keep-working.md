# Chapter 6: Agent Loops: When AI Can Keep Working

The support agent looked useful at first. It read new customer tickets, summarized the issue, classified urgency, and drafted a suggested reply for the support team. Good, useful and contained job. Then someone asked the obvious next question: "Can it keep going until the issue is resolved?"

That is when the room should get quieter. Not because the answer is no. Because the answer is sometimes, and sometimes is where business owners need to pay attention.

A support ticket comes in from a customer who says the latest invoice is wrong. The agent reads the message. It checks the billing system. It sees two invoices. It compares the service dates. It finds a mismatch. It drafts a reply. Then it notices the customer also mentioned a cancelled add-on service. It checks the account history. It finds a cancellation request from three weeks ago. It updates the draft. Then it creates an internal note for accounting. Then it flags the ticket for human review.

That is useful, but imagine a sloppier version.

The agent reads the message. It misunderstands the issue. It checks the wrong account. It drafts a confident reply. It keeps searching for evidence that supports its first guess. It updates a record it should not touch. It sends the customer a message without approval. Now accounting, support, and the customer are all confused.

That is also an agent loop. Same concept, but very different outcome.

Agent loops are powerful because they let AI keep working through a task instead of taking one step and stopping. Agent loops are risky because they let AI keep working through a task instead of taking one step and stopping.

That's the whole chapter. We're done. No need to keep reading.  Kidding!

## What An Agent Loop Actually Is

An agent loop is a repeated cycle of work. The agent observes what is happening, decides what to do next, acts, checks the result, and repeats until it reaches a stopping point. An agent loop is like telling a helper, "Look at the situation, choose the next step, do it, check whether it worked, and keep going until the job is done or you need help."

The basic loop looks like this:

1. Observe
2. Decide
3. Act
4. Check
5. Repeat or stop

That is it. Observe means the agent gathers information. Decide means the agent chooses the next step. Act means the agent does something. Check means the agent looks at the result. Repeat means it goes through the cycle again if the job is not done. Stop means it has finished, hit a limit, or needs a human.

Loops are not new. People work in loops all day.

A salesperson follows up, checks for a reply, adjusts the message, follows up again, and stops when the prospect responds or the sequence ends.

A project manager asks for status, checks what is missing, follows up with the right person, updates the plan, and repeats until the project is clear.

A support person reads a ticket, asks a question, waits for the customer, checks the answer, tries a fix, and repeats until the issue is resolved.

The concept is familiar, but AI just makes it possible for software to perform parts of that cycle.

That is useful, but it's also where sloppy design gets expensive.

## Why Loops Matter

A lot of work cannot be finished in one step, which is why loops matter. A simple AI prompt can draft a reply. A workflow can move that reply through a process. An agent can own a narrow job inside that process. A loop lets the agent keep checking and adjusting until the job reaches a defined stopping point.

For example:

A lead comes in without a budget. A one-step agent might flag "budget missing" and stop. A looping agent might draft a question asking for budget range, wait for the reply, read the answer, update the CRM, re-score the lead, and notify sales if the lead now qualifies.

Or:

A project status report is missing updates from two managers. A one-step agent might say, "Updates missing." A looping agent might send reminders, wait for responses, read the updates, revise the report, and flag anything still missing before the meeting.

Or:

A support ticket does not include enough information. A one-step agent might draft a generic response. A looping agent might ask the customer for the missing detail, wait for the response, classify the issue again, then route it correctly.

The point of a loop is not motion; it's progress.

A bad loop creates activity, but a good loop moves the work closer to done.

## The Five Parts Of A Safe Loop

A useful agent loop needs five things.

1. Goal
2. State
3. Rules
4. Tools
5. Stop conditions

Let's dig in.

## Goal: What Is The Loop Trying To Finish?

The goal is the result the loop is working toward. The goal is the finish line.

Bad goal: "Resolve customer issues."

Better goal: "Collect the missing information needed to route the support ticket correctly, draft a suggested first response, and stop for human review."

Bad goal: "Follow up with leads."

Better goal: "Send up to two approved follow-up drafts for unanswered inbound leads, update the CRM after each response, and stop when the lead replies, declines, or reaches the sequence limit."

Bad goal: "Get the project report ready."

Better goal: "Check for missing status updates, request missing updates from owners, revise the draft report when responses arrive, and stop one hour before the leadership meeting."

Loops need clear finish lines. Without a finish line, the agent may keep working because it has not been told what done means. That's not intelligence; it's bad management.

## State: What Does The Agent Know Right Now?

State is the current situation the agent uses to decide what to do next. State is the scoreboard. It tells the agent what has happened so far, what is still missing, and what step it is on.

For a lead follow-up loop, state might include:

- Lead received
- First reply drafted
- Human approved reply
- Reply sent
- No response after three days
- Second follow-up drafted
- Prospect replied
- Sales manager notified
- Loop stopped

For a support loop, state might include:

- Ticket received
- Issue summarized
- Missing account number
- Customer asked for account number
- Customer replied
- Ticket classified as billing
- Draft response created
- Human review required
- Loop stopped

State matters because loops can get confused without memory of what has already happened. You don't want the agent asking the same question three times. You don't want it sending a second follow-up after the customer already replied. You don't want it updating the wrong record because it lost track of the account.

A loop without clear state is like a manager who keeps walking into the room asking, "Where are we on this?" and never remembers the answer. Don't build that manager into software.

## Rules: What Paths Are Allowed?

Rules define what the agent should do in specific situations. Rules are the if-this-then-that instructions.

If the lead replies, stop the follow-up sequence and alert sales. If required information is missing, ask for it before drafting a recommendation. If the customer is angry, escalate for human review. If the ticket involves pricing, do not answer automatically. If the agent is uncertain, stop and ask for help. If the loop reaches three attempts, stop.

Rules are how you keep loops from becoming wandering machines. A loop should not improvise its own business policy; it should follow the policy you give it.

If the policy is missing, that is not an AI problem. That is a business problem waiting to be documented.

## Tools: What Can The Agent Use Each Time Through The Loop?

Tools give the agent ways to act. A loop with no tools can mostly think, draft, and suggest. A loop with tools can look things up, create tasks, update records, send messages, or trigger other workflows. Tools are the things the agent can use to do work outside its own head.

A loop might use:

- CRM lookup
- Email drafting
- Calendar search
- Ticket updates
- Task creation
- Spreadsheet reading
- Document search
- Internal knowledge base
- Slack or Teams messages
- Automation platform steps

The more tools a loop has, the more carefully you need to control it.

An agent that can summarize a ticket is low-risk. An agent that can email a customer is higher-risk.

An agent that can update billing records is higher still. An agent that can issue refunds, change contracts, or modify customer access should make you sit up straight.

Tools are not decorations. Tools are permissions. Give the agent the fewest tools it needs to do the job.

## Stop Conditions: When Should The Agent Stop?

A stop condition tells the loop when to end.

This is the part too many people skip.

A stop condition is the red light. It tells the agent, "You are done" or "Stop and get a person."

Stop conditions might include:

- The goal is complete.
- A human approval is required.
- Required information is still missing after two attempts.
- The customer replied.
- The task reached a deadline.
- The agent is uncertain.
- The request is outside the approved categories.
- The loop has run too many times.
- The action would touch sensitive data.
- The cost or risk is above the approved threshold.

A loop without stop conditions is not ambitious; it is unfinished. Every useful loop should know when to stop. It should also know how to stop safely.

Stopping safely might mean creating a task, notifying a person, logging the issue, saving the draft, or explaining what happened.

Do not let an agent fail silently. Silent failure is how business problems get expensive before anyone sees them.

## The Loop Ladder

Not every loop needs the same amount of freedom.

Think in levels.

Level one: internal loop. The agent works only on internal drafts, summaries, or checks. It does not contact customers or change important records. Example: revise a weekly report draft until all required sections are present, then stop for manager review.

Level two: assisted loop. The agent can request information or create internal tasks, but a human approves customer-facing work. Example: ask team members for missing project updates, update the draft report, and alert the manager before sending.

Level three: controlled external loop. The agent can send approved or low-risk messages under strict rules. Example: send a reminder to a customer asking for a missing document, but only using approved language and only up to two times.

Level four: high-autonomy loop. The agent can take meaningful actions across systems with limited human involvement. Example: monitor account activity, detect onboarding blockers, notify customers, create tasks, update records, and escalate exceptions.

The higher the level, the more valuable it can be, but the more damage it can do.

Start lower than your ambition. Earn your way up.

## Example: Lead Follow-Up Loop

Here is a practical lead follow-up loop.

Goal: Move an inbound lead from inquiry to qualified next step or respectful close-out.

Trigger: A new lead enters the CRM.

State: The system tracks whether the lead has been contacted, whether the lead replied, what information is missing, who owns the lead, and where the lead sits in the follow-up sequence.

Rules:

- Draft first reply for human approval.
- If the lead replies, stop the automated follow-up loop and notify sales.
- If the lead does not reply after three business days, draft a second follow-up.
- If there is no response after the second follow-up, create a final review task.
- Do not send pricing, guarantees, or custom recommendations without human approval.
- If the lead is high-value, notify sales immediately.

Tools:

- CRM
- Email draft tool
- Calendar availability
- Task manager
- Slack or Teams notification

Stop conditions:

- Lead replies.
- Human marks lead closed.
- Two follow-ups have been completed.
- Required information is missing.
- The lead asks a question outside approved categories.

That is a loop. What it is not doing?

It is not pretending to be a salesperson. It is not negotiating. It is not changing pricing. It is not making promises. It is keeping follow-up from falling through the cracks.

## Example: Project Status Loop

Another example: A manager needs a weekly project status report.

The problem is not writing the report. The problem is getting the updates.

A project status loop could do this:

1. Check the project tracker every Thursday morning.
2. Identify projects missing status updates.
3. Message the project owner using approved internal language.
4. Wait for the update.
5. Read the update when it arrives.
6. Add it to the report draft.
7. Flag any project still missing information by Friday at 9 a.m.
8. Stop for manager review.

That is not glamorous, but it is exactly the kind of thing that makes a business run better.

The agent is not replacing the manager. It is removing the weekly chase. Managers should manage exceptions, risks, priorities, and people. They should not spend their best hours asking adults to update fields.

## Example: Support Information Loop

A customer submits a support ticket: "The system is not working. Please fix ASAP." That message is urgent-sounding but not useful.

A support information loop could:

1. Read the message.
2. Identify missing information.
3. Draft an approved clarification question.
4. Send it if the question is low-risk and approved by policy.
5. Wait for the customer response.
6. Read the response.
7. Classify the issue.
8. Route it to the right support queue.
9. Draft a suggested first response.
10. Stop for human review if the customer is angry, the issue is high-impact, or account access is involved.

That loop does not solve every support issue. It solves a real problem before the support team touches the ticket. It turns a vague ticket into a usable ticket. That saves time and improves the customer experience because the process starts quickly instead of sitting in an inbox waiting for someone to ask the obvious question.

## The Trap: Motion Masquerading As Progress

Loops can create the illusion of progress. The agent is doing things: checking, drafting, updating, retrying. It is busy, but busy is not the same as useful.

A bad loop can chase irrelevant information, retry a broken step, ask unnecessary questions, notify too many people, or keep revising an output that was good enough twenty minutes ago.

This is not an AI-specific problem. Humans do it too. The difference is that software can do it at scale. A person wasting thirty minutes is annoying. An automation wasting thirty minutes and who knows how many tokesn across 400 records is a management event.

That is why loops need limits: attempt limits, time limits, tool limits, category limits, external actions limits, confidence limits.

Confidence is how sure the system thinks it is. If confidence is low, the safer move is often to stop and ask a person. A loop should not be rewarded for activity. It should be measured by useful progress toward a defined goal.

## The Human In The Loop Is Not Optional Everywhere

Some people talk about human review like it is training wheels. Human review is not something you remove just because the automation seems mature. Sometimes you remove it. Sometimes you reduce it. Sometimes you keep it forever.

The question is not, "Can the agent do this without a person?" The question is, "What happens if it is wrong?"

If the cost of being wrong is low, the loop can have more freedom. If the cost of being wrong is high, keep human review.

Low-risk:

- Internal summaries
- Draft reports
- Categorizing routine tickets
- Reminding employees about missing updates
- Preparing meeting follow-up drafts

Higher-risk:

- Customer-facing messages
- Pricing or discounts
- Refunds
- Legal or financial language
- Account changes
- Anything involving sensitive data
- Anything that could damage trust

Human review is not anti-automation. Human review is part of good automation. The goal is not to remove people from every step. The goal is to put people where judgment matters.

## How Loops Fail

Loops tend to fail in predictable ways:

First, the goal is vague. If the loop does not know what done means, it keeps wandering.

Second, the state is messy. If the system cannot track what already happened, it repeats itself or takes the wrong next step.

Third, the rules are incomplete. If nobody defined what to do with exceptions, the agent guesses.

Fourth, the tools have too much access. If the agent can touch things it does not need, it can break things it should never have reached.

Fifth, the stop conditions are weak. If the loop never knows when to stop, it may keep acting long after the useful work is over.

Sixth, nobody owns it. If no person is responsible for reviewing performance, updating rules, and handling failures, the loop becomes unattended machinery.

Unattended machinery eventually teaches you a lesson (usually at an inconvenient time).

## The Loop Brief

Before you build an agent loop, write a loop brief. One page. Plain English. Use this structure:

- Loop name: What do we call it?
- Business goal: What result is it trying to reach?
- Trigger: What starts the loop?
- State: What must it track?
- Allowed actions: What can it do?
- Tools: What systems can it use?
- Rules: What paths should it follow?
- Stop conditions: When must it stop?
- Human review: Where does a person approve, edit, or decide?
- Failure handling: What happens when it gets stuck or errors?
- Owner: Who is responsible for the loop?
- Success measure: How will we know it is working?

If you cannot fill this out, you are not ready to build the loop. That is not bureaucracy; it's cheap insurance.

A loop brief is where you catch bad assumptions before software turns them into recurring behavior.

## What To Do This Week

Pick the agent brief you wrote after Chapter 5. Now ask whether that agent should loop. Do not assume yes. Some agents should do one job and stop, and that's fine.

For the agent you are considering, answer these questions:

1. Does the job require more than one step?
2. Does the agent need to wait for new information?
3. Does the agent need to check whether its last action worked?
4. Is there a clear finish line?
5. Can the agent track state clearly?
6. Are the rules documented?
7. Are the stop conditions obvious?
8. What is the worst thing that happens if it is wrong?
9. Where should a human review the work?
10. Who owns the loop?

If the answers are weak, do not build the loop yet. Tighten the workflow. Clarify the agent's job. Define the stop conditions. Then revisit it.

There is no prize for automating uncertainty.

## The Takeaway

Agent loops are where AI systems begin to feel more capable. They can observe, decide, act, check, and repeat. That can create real leverage when the work is repetitive, the rules are clear, the tools are limited, and the stopping point is defined.

It can also create real problems when the goal is vague, the system has too much access, or nobody has decided when the agent should stop. A loop should move work closer to done. It should not simply move.

What is the goal? What is the current state? What action is allowed? What changed? Should the agent continue or stop?

These questions keep the loop useful. They also prepare us for the next layer: graph engineering.

Once you start building agents and loops, you run into a deeper question: how does the business actually connect its customers, decisions, rules, tools, knowledge, and workflows?

The answer is mapping, and businesses that map their thinking clearly have a much better shot at automating it without making a mess.
