import React, { useState, useMemo } from 'react';

// Define the interfaces
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
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

type SortOrder = 'asc' | 'desc' | null;

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  pageSize = 10,
  showPagination = true,
  emptyMessage = "No data available",
  className = "",
  theme = 'light'
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Theme classes
  const themeClasses = {
    container: theme === 'dark' 
      ? 'bg-gray-900 border-gray-700' 
      : 'bg-white border-gray-200',
    header: theme === 'dark' 
      ? 'bg-gray-800 text-gray-200' 
      : 'bg-gray-50 text-gray-500',
    row: theme === 'dark' 
      ? 'bg-gray-900 hover:bg-gray-800 text-gray-200' 
      : 'bg-white hover:bg-gray-50 text-gray-900',
    selectedRow: theme === 'dark' 
      ? 'bg-blue-900/50' 
      : 'bg-blue-50',
    border: theme === 'dark' 
      ? 'divide-gray-700 border-gray-700' 
      : 'divide-gray-200 border-gray-200',
    pagination: theme === 'dark' 
      ? 'bg-gray-900 border-gray-700 text-gray-200' 
      : 'bg-white border-gray-200 text-gray-700',
    button: theme === 'dark' 
      ? 'border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800' 
      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    activeButton: theme === 'dark' 
      ? 'bg-blue-800 border-blue-700 text-blue-200' 
      : 'bg-blue-50 border-blue-500 text-blue-600',
    emptyState: theme === 'dark' 
      ? 'text-gray-400' 
      : 'text-gray-400',
    selectedInfo: theme === 'dark' 
      ? 'bg-blue-900/30 border-blue-700 text-blue-200' 
      : 'bg-blue-50 border-blue-200 text-blue-800'
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortOrder) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortOrder]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, showPagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Handle sorting
  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortColumn === columnKey) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortColumn(null);
        setSortOrder(null);
      } else {
        setSortOrder('asc');
      }
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  // Handle row selection
  const handleRowSelect = (row: T, checked: boolean) => {
    let newSelectedRows: T[];
    
    if (checked) {
      newSelectedRows = [...selectedRows, row];
    } else {
      newSelectedRows = selectedRows.filter(selectedRow => selectedRow !== row);
    }
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...paginatedData] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const isRowSelected = (row: T) => selectedRows.includes(row);
  const isAllSelected = paginatedData.length > 0 && paginatedData.every(row => isRowSelected(row));
  const isIndeterminate = selectedRows.length > 0 && !isAllSelected;

  // Render sort icon
  const renderSortIcon = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return null;

    const iconColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-400';
    const activeIconColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-500';

    if (sortColumn !== columnKey) {
      return (
        <svg className={`w-4 h-4 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    if (sortOrder === 'asc') {
      return (
        <svg className={`w-4 h-4 ${activeIconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }

    if (sortOrder === 'desc') {
      return (
        <svg className={`w-4 h-4 ${activeIconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }

    return null;
  };

  // Empty state
  if (!loading && data.length === 0) {
    return (
      <div className={`${themeClasses.container} rounded-lg border ${className}`}>
        <div className="px-6 py-12 text-center">
          <div className={`mx-auto h-12 w-12 ${themeClasses.emptyState} mb-4`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'} mb-1`}>No data</h3>
          <p className={`text-sm ${themeClasses.emptyState}`}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${themeClasses.container} rounded-lg border overflow-hidden ${className}`}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className={`min-w-full ${themeClasses.border} divide-y`}>
          <thead className={themeClasses.header}>
            <tr>
              {/* Select all checkbox */}
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              
              {/* Column headers */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-opacity-80 select-none' : ''
                  }`}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {renderSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className={`${themeClasses.row} ${themeClasses.border} divide-y`}>
            {loading ? (
              // Loading state
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              // Data rows
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`${themeClasses.row} ${isRowSelected(row) ? themeClasses.selectedRow : ''}`}
                >
                  {/* Row selection checkbox */}
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={isRowSelected(row)}
                        onChange={(e) => handleRowSelect(row, e.target.checked)}
                      />
                    </td>
                  )}
                  
                  {/* Data cells */}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm">
                      {column.render
                        ? column.render(row[column.dataIndex], row, index)
                        : String(row[column.dataIndex] || '')
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && !loading && data.length > pageSize && (
        <div className={`${themeClasses.pagination} px-4 py-3 border-t sm:px-6`}>
          <div className="flex items-center justify-between">
            <div className="flex justify-between flex-1 sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${themeClasses.button} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${themeClasses.button} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
              <div>
                <p className="text-sm">
                  Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * pageSize, sortedData.length)}
                  </span>{' '}
                  of <span className="font-medium">{sortedData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${themeClasses.button} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? `z-10 ${themeClasses.activeButton}`
                            : themeClasses.button
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${themeClasses.button} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected rows info */}
      {selectable && selectedRows.length > 0 && (
        <div className={`${themeClasses.selectedInfo} px-6 py-3 border-t`}>
          <p className="text-sm">
            {selectedRows.length} row{selectedRows.length === 1 ? '' : 's'} selected
          </p>
        </div>
      )}
    </div>
  );
}

export { DataTable };
export type { DataTableProps, Column };