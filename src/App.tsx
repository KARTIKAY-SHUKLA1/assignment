import React, { useState } from 'react';
import { InputField, DataTable } from './components';
import type { Column } from './components';
import './index.css'; // Make sure Tailwind CSS is imported

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
];

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (status: string) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    ),
  },
];

function App() {
  const [email, setEmail] = useState('');
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRowSelect = (rows: User[]) => {
    setSelectedRows(rows);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            React Components Assignment
          </h1>
          
          {/* InputField Demo */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              InputField Component
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  variant="outlined"
                  size="md"
                  helperText="We'll never share your email with anyone else."
                />
              </div>
              <div>
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  variant="filled"
                  size="md"
                />
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Small Size"
                placeholder="Small input"
                size="sm"
                variant="outlined"
              />
              <InputField
                label="Medium Size"
                placeholder="Medium input"
                size="md"
                variant="outlined"
              />
              <InputField
                label="Large Size"
                placeholder="Large input"
                size="lg"
                variant="outlined"
              />
            </div>
          </div>

          {/* DataTable Demo */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              DataTable Component
            </h2>
            <DataTable
              data={sampleData}
              columns={columns}
              selectable={true}
              onRowSelect={handleRowSelect}
              pageSize={10}
              showPagination={true}
            />
            
            {selectedRows.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-medium">
                  Selected {selectedRows.length} row(s):
                </p>
                <ul className="mt-2 text-sm text-blue-700">
                  {selectedRows.map(row => (
                    <li key={row.id}>• {row.name} ({row.email})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;