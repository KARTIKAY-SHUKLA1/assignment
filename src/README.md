🌟 UI Component Library (Assignment Submission)

This repository contains a small React + TypeScript component library built as part of the assignment.
It includes reusable components like DataTable, InputField, and more, with full support for Light/Dark themes, variants, and accessibility.

📂 Folder Structure
├── .storybook/         # Storybook configuration
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── DataTable/
│   │   ├── InputField/
│   │   └── ...
│   ├── stories/        # Storybook stories
│   └── index.ts        # Component exports
├── package.json
├── README.md

⚡ Getting Started
1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Install dependencies
npm install
# or
yarn install

3. Run Storybook locally
npm run storybook


This will start Storybook at http://localhost:6006

🚀 Deployment / Preview

Storybook Live Preview: View here

Deployed using Chromatic / Vercel

🛠️ Components
🔹 DataTable

Sortable columns

Pagination

Row selection

Light/Dark mode

🔹 InputField

Variants: filled, outlined, ghost

Sizes: sm, md, lg

Clear button + Password toggle

Validation & error messages

(Additional components can be listed here if you have more)

📸 Screenshots / Demos
Input Field

Data Table

📝 Approach

Built with React + TypeScript for type safety.

Used Tailwind CSS for consistent styling.

Components follow accessibility best practices (aria-*, focus states).

Storybook used for documentation & interactive testing.

📌 Submission Checklist

✅ Clear folder structure

✅ README with setup instructions

✅ Storybook deployed (Chromatic/Vercel)

✅ Screenshots/GIFs

🙌 Done! Now just replace:

<your-username>/<repo-name> with your GitHub repo

<ADD_CHROMATIC_OR_VERCEL_LINK> with your deployed Storybook link