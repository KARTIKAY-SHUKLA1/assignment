import type { Preview } from '@storybook/react-vite'
import '../src/index.css'; // Add this line to import your Tailwind styles

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;