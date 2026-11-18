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
No ARIA attributes were kept. Landmark elements (nav, main, section) were sufficient to explain the role of each piece of content on the homepage.

## Usability review of services.html

Task scenarios:

- Task A: Estimate the cost for a large dog for boarding and grooming.
    Selecting L3 on size, clicking on boarding, noticing price pops up under "Kennel nights" for boarding, then clicked grooming. Total of $148.50 appeared below.
- Task B: Find out if a stay from December 24, 2026 to December 26, 2026 is possible.
    I selected both dates in Date 1 and Date 2 respectively, and hit Go. it returned no info, but estimated cost stayed at $0. I assume there is no availability?
- Task C: You added Training by mistake. Remove only Training.
    Could not easily unselect Training, had to reset all options. 

Findings (at least 6, at least 5 different heuristics):

| # | Task | Evidence (what happened) | Heuristic | Change to test |
|---|---|---|---|---|
| 1 | Remove one selected service | I could not unselect Training without resetting all options. | User control and freedom | Add a Remove button beside each selected service and recalculate the estimate without removing other services. Test by adding Boarding and Training, removing Training, and confirming Boarding remains. |
| 2 | Determine whether dates are available | After entering December 24 to 26, 2026 and selecting Go, no availability result appeared; the estimate remained $0. | Visibility of system status | Show an inline availability result after checking dates. Until a real availability source is connected, clearly say availability cannot be confirmed instead of implying the dates are open or booked. |
| 3 | See what a membership includes | Memberships appears as a selectable button, but the page does not explain its benefits or terms. | Recognition rather than recall | Add a concise, verified description of membership benefits, price, and limitations beside the option. Test whether a visitor can decide what it includes before selecting it. |
| 4 | Set up services for dogs of multiple sizes | The page has one size selector for the entire estimate and no separate dog profiles. | User control and freedom | Let users add each dog with its own size and services, then show per-dog subtotals and a combined total. Test with two dogs of different sizes. |
| 5 | Identify a dog's size | The original options used codes such as S1, M2, and L3 without weight ranges, so I could not tell where a 60 lb dog belonged. | Match between system and real world | Display the size bands (Small 2-22 lbs, Medium 23-57 lbs, Large 58-99 lbs, XL 100+ lbs). Test 60 lbs as Large and check boundary weights of 22, 23, 57, 58, 99, and 100 lbs. |
| 6 | Avoid clearing options by mistake | Reset clears all selected services immediately without confirmation. | Error prevention | Ask for confirmation before clearing the estimate. Test that Cancel preserves all selections and Confirm clears them. |

Design checklist for this page:

- Who is using this? Dog owners looking for a variety of care services for their pet(s).
- What is the primary action? To select one or multiple packages of services from MPLS Dog Boarding.
- What competes with it? Poor tracking, indication, and freedom of options.

## Retest of services.html

| Task | Before (result) | After (result) |
|---|---|---|
| A | Selecting L3 on size, clicking on boarding, noticing price pops up under "Kennel nights" for boarding, then clicked grooming. Total of $148.50 appeared below. | selected Large, Boarding, and Grooming; results were clear: $148.50|
| B |  I selected both dates in Date 1 and Date 2 respectively, and hit Go. it returned no info, but estimated cost stayed at $0. I assume there is no availability? | now it confirms the dates selected, but returns error message and a CTA to call the store to confirm holiday hours, returns an answer now, not guesswork. |
| C | Could not easily unselect Training, had to reset all options.  | able to remove just training on its own; boarding and grooming remained and the estimate recalculated after removal to $148.50. |

## Verification of book.html

| Check | Result |
|---|---|
| HTML validator errors | 0 in WAVE, 0 in W3 validator|
| Lighthouse accessibility score |100 |
| Keyboard test (notes) | keyboard test is incredibly functional, even included the skip main content hidden focusable button on the top left|
| DevTools check of the status message container (what attribute did you see?) | role="status"|

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

