import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../components/DataTable';

interface SampleUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const sampleData: SampleUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof SampleUser,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof SampleUser,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof SampleUser,
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof SampleUser,
    sortable: true,
    render: (status: string) => (
      <span
        className={`px-2 py-1 rounded text-xs ${
          status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
    ),
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Basic table
export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

// ✅ Row selection
export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

// ✅ Loading state
export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

// ✅ Empty state
export const EmptyState: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No users found',
  },
};

// ✅ Pagination
export const WithPagination: Story = {
  args: {
    data: [...sampleData, ...sampleData, ...sampleData], // More data to show pagination
    columns,
    pageSize: 3,
    showPagination: true,
  },
};

// ✅ Dark theme
export const DarkMode: Story = {
  args: {
    data: sampleData,
    columns,
    theme: 'dark',
  },
};
