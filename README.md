# Therapists User Profiles App

A simple SvelteKit application displaying user profiles from Figma designs. The application is designed to be responsive and is styled using TailwindCSS.

## Tech Stack

- SvelteKit
- TailwindCSS

## External Dependencies

- **svelte-range-slider-pips:** Enables a double slider implementation.
- **dayjs:** Used for date formatting.

## Key Considerations

The "Search by Sex" feature uses strict equality to ensure accurate data retrieval, avoiding issues such as returning data with female sex for a male sex search.

Examples of search terms include:
- "What do you need help with?":
  - "Play Therapy for Children"
  - "Couples Counseling"
  - "Anxiety"
  - "Academic Stress"
- "Therapist Type":
  - "Humanistic Therapy"
  - "Existential Therapy"
  - "Family Therapy"
  - "Psychodynamic Therapy"
  - "Mindfulness-Based Therapy"
  - "Dialectical Behavior Therapy (DBT)"

## Additional Features

- Sorting integrations for an enhanced user experience.
- Convenient scroll-to-top navigation.
- "Read more" functionality for detailed therapist profiles.
- Loading states on both the main page and single therapist page.
- Interaction on calendar view book a session on single therapist page.

## How to Run

1. Clone the repository: `git clone https://github.com/Cynthiailojeme/emote-care-test`
2. Navigate to the project folder: `cd emote-care-test`
3. Install dependencies: `npm install`
4. Run the application: `npm run dev`
5. Open your browser and visit `http://localhost:5173/`

## Submission

- [GitHub Repository](https://github.com/Cynthiailojeme/therapist-profiles-sveltekit)
- [Live Demo](https://cynthia-emote-care-test.vercel.app/)
