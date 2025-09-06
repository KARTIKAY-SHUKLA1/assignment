React Component Development Assignment
A modern React component library featuring InputField and DataTable components built with TypeScript, TailwindCSS, and Storybook.
🚀 Live Demo

Storybook Preview: [Deploy to Chromatic or Vercel]
GitHub Repository: [Your Repository URL]

📋 Assignment Overview
This project implements two essential UI components as part of the React Component Development Assignment:

InputField Component - A flexible input component with validation states
DataTable Component - A data table with basic functionality

🛠 Tech Stack

React 18+ with TypeScript
TailwindCSS for styling
Storybook for documentation
Vitest for testing
Lucide React for icons

🎯 Components
InputField Component
A flexible input component with comprehensive features and theme support.
Features ✅

✅ Text input with label, placeholder, helper text, error message
✅ States: disabled, invalid, loading
✅ Variants: filled, outlined, ghost
✅ Sizes: small (sm), medium (md), large (lg)
✅ Optional clear button (auto-appears when input has value)
✅ Optional password toggle (auto-detects password fields)
✅ Theme support: light & dark theme
✅ Full accessibility with ARIA labels
✅ TypeScript with proper typing

Props Interface
typescriptinterface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}
DataTable Component
A comprehensive data table with sorting, selection, pagination, and theme support.
Features ✅

✅ Display tabular data
✅ Column sorting (with visual indicators)
✅ Row selection (single/multiple) with select all
✅ Loading state with spinner animation
✅ Empty state with helpful message
✅ Bonus: Pagination (not required but implemented)
✅ Theme support: light & dark theme
✅ Responsive design
✅ TypeScript with generics

Props Interface
typescriptinterface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  pageSize?: number;
  showPagination?: boolean;
  emptyMessage?: string;
  className?: string;
  theme?: 'light' | 'dark';
}
🏁 Getting Started
Prerequisites

Node.js 16+
npm or yarn

Installation

Clone the repository

bashgit clone [your-repo-url]
cd react-component-assignment

Install dependencies

bashnpm install
# or
yarn install

Start development server

bashnpm run dev
# or
yarn dev

Run Storybook

bashnpm run storybook
# or
yarn storybook

Run tests

bashnpm run test
# or
yarn test
📁 Project Structure
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx          # Main component
│   │   └── index.ts                # Exports
│   └── DataTable/
│       ├── DataTable.tsx           # Main component
│       └── index.ts                # Exports
├── stories/
│   ├── InputField.stories.tsx      # InputField documentation
│   ├── DataTable.stories.tsx       # DataTable documentation
│   └── Configure.mdx               # Storybook config
└── __tests__/
    ├── InputField.test.tsx         # InputField tests
    └── DataTable.test.tsx          # DataTable tests
🎨 Design Approach
Design Philosophy

Accessibility First: All components include proper ARIA labels and keyboard navigation
Theme Support: Both light and dark themes with consistent color schemes
Mobile Responsive: Components work seamlessly across all device sizes
TypeScript: Full type safety with generic support for DataTable
Modern UX: Smooth animations, hover effects, and intuitive interactions

Component Architecture

Composable: Each component can be used independently
Flexible: Extensive props for customization
Performant: Optimized with useMemo for sorting/pagination
Testable: Clean separation of concerns for easy testing

🧪 Testing
Test Coverage

✅ InputField Tests (15+ test cases)

Basic rendering and props
User interactions (typing, clearing, password toggle)
Different states (disabled, invalid, variants, sizes)
Theme application
Accessibility attributes


✅ DataTable Tests (15+ test cases)

Data rendering and column display
Sorting functionality
Row selection (individual and select all)
Pagination navigation
Empty and loading states
Custom cell rendering
Theme application



Running Tests
bash# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
📖 Storybook Documentation
Available Stories

InputField Stories:

Default variants (filled, outlined, ghost)
Different sizes (small, medium, large)
States (disabled, invalid, loading)
Theme variants (light, dark)
Interactive examples


DataTable Stories:

Basic table with sample data
Sortable columns demo
Selectable rows example
Loading and empty states
Pagination showcase
Theme variants



View Documentation
bashnpm run storybook
🚀 Deployment
Storybook Deployment Options

Chromatic (Recommended)

bashnpm install --save-dev chromatic
npx chromatic --project-token=your-project-token

Vercel

bashnpm run build-storybook
# Deploy dist folder to Vercel

Netlify

bashnpm run build-storybook
# Deploy storybook-static folder
✨ Key Features & Enhancements
Beyond Basic Requirements

Auto-Password Detection: InputField automatically detects password fields and shows/hides toggle
Advanced Theme Support: Comprehensive dark/light theme with consistent color schemes
Pagination: DataTable includes full pagination (bonus feature)
Loading Animations: Smooth loading states with spinners
Accessibility: Full ARIA support, keyboard navigation
Responsive Design: Mobile-first approach with breakpoint handling
TypeScript Generics: DataTable uses generics for type safety
Comprehensive Testing: 30+ test cases covering all scenarios

Performance Optimizations

useMemo for expensive sorting operations
useId for unique element IDs
Efficient re-rendering with proper dependency arrays
Optimized Tailwind classes for smaller bundle size

🎯 Requirements Checklist
✅ Core Requirements Met

✅ Two React components built
✅ TypeScript with proper typing
✅ Modern patterns and clean code
✅ Storybook documentation
✅ Scalable project structure
✅ Responsive design
✅ Basic accessibility (ARIA labels)
✅ Clean, modern styling
✅ Basic tests included

✅ Deliverables Completed

✅ Two working components
✅ Simple demo/example usage (via Storybook)
✅ Basic documentation (this README)
✅ Clear folder structure
✅ README with setup instructions
✅ Description of approach
✅ GitHub repository ready
✅ Storybook preview link (to be deployed)

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is part of an internship assignment and is available for educational purposes.
👨‍💻 Author
[Your Name]

GitHub: [@yourusername]
Email: your.email@example.com


Assignment completed in 2 days using React, TypeScript, TailwindCSS, and Storybook with scalability in mind.