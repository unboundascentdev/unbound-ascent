# Owner Load Assessment V2 — GoHighLevel completion checklist

This file records the work that must be completed in the connected GoHighLevel account. It is intentionally separate from the public website code because the current Codex connection can read the published widgets but cannot edit the GoHighLevel account.

## Verified connected assets

- Assessment email form: `LUsgmsmOLNcrYlQ3hAV3`
- Owner Load Review calendar: `rttJmfp2ZZY42nJcEw0L`
- Assessment form redirect: `https://www.unboundascent.com/assessment?assessment-complete=1`
- Assessment page: `https://www.unboundascent.com/assessment`
- Booking page: `https://www.unboundascent.com/book`

## Contact fields

Create or verify these fields and add the indicated assessment fields to the form as hidden fields. The website passes each value in the form and booking iframe query string.

| Key | Type | Update behavior |
| --- | --- | --- |
| `assessment_score` | Number | Replace on every completion |
| `assessment_status` | Text | Replace on every completion |
| `primary_profile` | Text | Replace on every completion; tied profiles are joined with “and” |
| `secondary_profile` | Text | Replace on every completion |
| `primary_profile_summary` | Long text | Replace from profile mapping |
| `primary_action` | Long text | Replace from profile mapping |
| `assessment_completed_at` | Date/time | Replace on every completion |
| `assessment_first_completed_at` | Date/time | Set only when empty |
| `assessment_latest_completed_at` | Date/time | Replace on every completion |
| `source` | Text | Replace on every completion |
| `utm_source` | Text | Replace when supplied |
| `utm_medium` | Text | Replace when supplied |
| `utm_campaign` | Text | Replace when supplied |
| `utm_term` | Text | Replace when supplied |
| `utm_content` | Text | Replace when supplied |

Use email as the contact identity so a retake updates the existing contact instead of creating an unnecessary duplicate. Do not store the ten raw answers in GoHighLevel.

## Assessment form

Update form `LUsgmsmOLNcrYlQ3hAV3`:

1. Keep fields `First name` and `Email address`.
2. Change the button to `Reveal My Complete Result`.
3. Use the consent text from the blueprint.
4. Replace both current `https://www.example.com` legal links with verified Unbound Ascent Privacy Policy and Terms URLs.
5. Add the contact fields above as hidden fields.
6. Keep the verified redirect `https://www.unboundascent.com/assessment?assessment-complete=1`.
7. Confirm the form submission updates contacts by email.

## Result and nurture workflow

Trigger: successful submission of form `LUsgmsmOLNcrYlQ3hAV3`.

1. Set `assessment_first_completed_at` only if it is empty.
2. Set `assessment_latest_completed_at` and the score/profile/source fields on every completion.
3. Map `primary_profile_summary` and `primary_action` from `primary_profile`, using the exact profile copy in the Version 2 blueprint.
4. Send Email 1 immediately: `Your Owner Load result is here`.
5. Wait until day 2; send Email 2: `Why stepping back still feels risky`.
6. Wait until day 4; send Email 3: `Delegating tasks will not solve this`.
7. Wait until day 6; send Email 4: `What is the business supposed to protect?`.
8. Wait until day 9; send Email 5: `Choose what the business stops using you for`.
9. Use the exact body copy, preheader, merge fields, and button labels from the blueprint.

Workflow goal/exit: when the contact books calendar `rttJmfp2ZZY42nJcEw0L`, immediately remove them from this general sequence.

## Owner Load Review calendar

Rename the appointment publicly to `Owner Load Review` and add these booking questions in this order:

1. What does your business do, and how long has it been operating?
2. How many people, including contractors, currently help operate the business?
3. What happens when you try to step away for several days?
4. What are you most tired of carrying in the business?
5. What would improving this make possible outside work?
6. Have you previously worked with a coach, consultant, therapist, mentor, or peer group on this or a related problem? (Optional)

Store the assessment fields passed into the booking widget with the appointment/contact. Create a separate booking confirmation and reminder workflow for this calendar.

## CRM-side measurement

- Record `Review booked` when calendar `rttJmfp2ZZY42nJcEw0L` is scheduled.
- Record `Review attended` from the appointment status.
- Record `Paid engagement` from the sales/opportunity stage used by Unbound Ascent.
- Review source, score, primary/secondary profile, completion, booking, and attendance distributions every two weeks.
