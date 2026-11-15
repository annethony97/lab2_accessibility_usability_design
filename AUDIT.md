# AUDIT

Name: Annie Keller

## Baseline (home.html before any changes)

| Check | Result |
|---|---|
| Lighthouse accessibility score | 84|
| Lighthouse failed audits | 4|
| WAVE errors | 1|
| WAVE contrast errors | 6|
| WAVE alerts | 9|
| HTML validator errors | 8|
| Keyboard test (notes) | Can't access all content on the homepage. There is no indicator to show where your cursor is when using keyboard. Can't access anything below the header bar (home, services, buttons).|
| 200% zoom and 320px test (notes) | 200% zoom doesn't display the whole page without side-scrolling, content in the price section gets cut off. 320px window presents the same issues - sidescroll bar and cutoff text.|

Contrast pairs checked:

| Text color | Background color | Ratio | Pass or fail (4.5:1 normal, 3:1 large) |
|---|---|---|---|
| #8AB4FF (blue)|#FFFFFF (white) |2.08:1 | fail|
| #FFFFFF (white)|#F5A25D (orange) |2.05:1 | fail|
| #B288D6 (purple)| #FFFFFF (white)| 2.84:1| fail|

## Problems found on home.html (at least 8)

| # | What I saw (evidence) | Tool or test that showed it | POUR principle | WCAG idea | Severity | Planned fix |
|---|---|---|---|---|---|---|
| 1 | couldn't navigate entire page without a mouse| keyboard test| Operable| WCAG 2| webpage not operable for users who cannot use a mouse| add pseudo-elements (:focus) to CSS to make it clearer when tab is, and improve tab ordering|
| 2 | poor color contrast across the homepage (text, buttons, svg elements)| WebAIM.org| Perceivable| WCAG 2| users may not be able to distinguish any text on the page| make all text/element colors darker to contrast with backgrounds|
| 3 |poor HTML hierarchy - headings out of order | W3 validator & WAVE| Perceivable| WCAG 1| screenreaders could skip sections/misorder them| reorder HTML headers|
| 4 |no primary language attribute | W3 validator & WAVE| Understandable| WCAG 3| assistive tech can't identify primary language| add lang="en" in opening html tag|
| 5 |no alternate text for images | WAVE| Perceivable| WCAG 1| users may not be able to understand any images| add alternate text to logo image|
| 6 | duplicate id attributes (id="hours")| W3 validator| Understandable| WCAG 4| screenreaders will misidentify sections| make a new id attribute for a different section and ensure ids match sections| 
| 7 | lack of landmark elements| Lighthouse| Perceivable|WCAG 2 | not all users can distinguish content blocks and will find it harder to skip around the homepage | implement elements like nav, main, section to better differentiate blocks of content|
| 8 |redundant links (services) |WAVE |Operable | WCAG 2| adds unnecessary navigation repetition for users with assistive tools| consolidate links to services page in one link in the navigation bar|

## ARIA notes (Part 2, step 13)

For each ARIA attribute you kept or added, explain why a native HTML element could not do the job. If you use none, say so.

## Usability review of services.html

Task scenarios:

- Task A: Estimate the cost for a large dog for boarding and grooming.
- Task B: Find out if a stay from December 24, 2026 to December 26, 2026 is possible.
- Task C: You added Training by mistake. Remove only Training.

Findings (at least 6, at least 5 different heuristics):

| # | Task | Evidence (what happened) | Heuristic | Severity | Change to test |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |

Design checklist for this page:

- Who is using this?
- What is the primary action?
- What competes with it?

## Retest of services.html

| Task | Before (result) | After (result) |
|---|---|---|
| A | | |
| B | | |
| C | | |

## Verification of book.html

| Check | Result |
|---|---|
| HTML validator errors | |
| Lighthouse accessibility score | |
| Keyboard test (notes) | |
| DevTools check of the status message container (what attribute did you see?) | |

## After (home.html final)

| Check | Before | After |
|---|---|---|
| Lighthouse accessibility score | | |
| WAVE errors | | |
| WAVE contrast errors | | |
| HTML validator errors | | |
| Keyboard test | | |
| 200% zoom and 320px test | | |

## Before shipping checklist (all three pages)

- [ ] Keyboard access works everywhere. Proof:
- [ ] Focus is always visible. Proof:
- [ ] Contrast passes. Proof:
- [ ] Layout works on small screens. Proof:
- [ ] Feedback is meaningful (errors and success). Proof:

## One thing I had to check by hand that the tools did not catch

