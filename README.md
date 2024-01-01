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

## Additional Features
- Sorting integrations for an enhanced user experience.
- Convenient scroll-to-top navigation.
- "Read more" functionality for detailed therapist profiles.
- Loading states on both the main page and single therapist page.

## How to Run
1. Clone the repository: `git clone https://github.com/Cynthiailojeme/emote-care-test`
2. Navigate to the project folder: `cd emote-care-test`
3. Install dependencies: `npm install`
4. Run the application: `npm run dev`
5. Open your browser and visit `http://localhost:5173/`

## Submission
- [GitHub Repository](https://github.com/Cynthiailojeme/emote-care-test)
- [Live Demo](https://cynthia-emote-care-test.vercel.app/)
