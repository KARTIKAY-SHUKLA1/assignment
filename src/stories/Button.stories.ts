import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Primary Button",
    theme: "light",
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: "Secondary Button",
    theme: "light",
  },
};

export const DarkModePrimary: Story = {
  args: {
    primary: true,
    label: "Primary Dark",
    theme: "dark",
  },
};

export const DarkModeSecondary: Story = {
  args: {
    primary: false,
    label: "Secondary Dark",
    theme: "dark",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Large Button",
    theme: "light",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Small Button",
    theme: "light",
  },
};
