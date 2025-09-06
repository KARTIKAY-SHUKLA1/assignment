import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '../components/InputField';


const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper wrapper to make InputField typeable
const ControlledInput = (props: any) => {
  const [value, setValue] = useState(props.value || '');
  return (
    <InputField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// ✅ Default text field
export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    variant: 'outlined',
    size: 'md',
  },
};

// ✅ Password input
export const Password: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    variant: 'filled',
    size: 'md',
    type: 'password',
  },
};

// ✅ Error state
export const WithError: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'outlined',
    size: 'md',
    invalid: true,
    errorMessage: 'Username is required',
  },
};

// ✅ Disabled input
export const Disabled: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    variant: 'outlined',
    size: 'md',
    disabled: true,
    value: 'Read only value',
  },
};

// ✅ Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ControlledInput label="Small" placeholder="Small size" size="sm" variant="outlined" />
      <ControlledInput label="Medium" placeholder="Medium size" size="md" variant="outlined" />
      <ControlledInput label="Large" placeholder="Large size" size="lg" variant="outlined" />
    </div>
  ),
};

// ✅ Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ControlledInput label="Outlined" placeholder="Outlined variant" variant="outlined" />
      <ControlledInput label="Filled" placeholder="Filled variant" variant="filled" />
      <ControlledInput label="Ghost" placeholder="Ghost variant" variant="ghost" />
    </div>
  ),
};
