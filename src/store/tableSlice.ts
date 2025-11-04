import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableState, TableRow, Column } from '@/types';

const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', visible: true, sortable: true, type: 'string' },
  { id: 'email', label: 'Email', visible: true, sortable: true, type: 'string' },
  { id: 'age', label: 'Age', visible: true, sortable: true, type: 'number' },
  { id: 'role', label: 'Role', visible: true, sortable: true, type: 'string' },
];

const sampleData: TableRow[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 45, role: 'Manager' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 29, role: 'Developer' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', age: 35, role: 'Analyst' },
  { id: '6', name: 'Diana Wilson', email: 'diana@example.com', age: 27, role: 'Developer' },
  { id: '7', name: 'Eve Martinez', email: 'eve@example.com', age: 31, role: 'Designer' },
  { id: '8', name: 'Frank Garcia', email: 'frank@example.com', age: 42, role: 'Manager' },
  { id: '9', name: 'Grace Lee', email: 'grace@example.com', age: 26, role: 'Developer' },
  { id: '10', name: 'Henry Taylor', email: 'henry@example.com', age: 38, role: 'Analyst' },
];

const initialState: TableState = {
  rows: sampleData,
  columns: defaultColumns,
  editingRows: {},
  sortBy: null,
  sortOrder: 'asc',
  searchQuery: '',
  page: 0,
  rowsPerPage: 10,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const index = state.rows.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find((col) => col.id === action.payload);
      if (column) {
        column.visible = !column.visible;
      }
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },
    setSorting: (state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 0; // Reset to first page on search
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
    startEditingRow: (state, action: PayloadAction<string>) => {
      const row = state.rows.find((r) => r.id === action.payload);
      if (row) {
        state.editingRows[action.payload] = { ...row };
      }
    },
    updateEditingRow: (state, action: PayloadAction<{ id: string; field: string; value: any }>) => {
      const { id, field, value } = action.payload;
      if (state.editingRows[id]) {
        state.editingRows[id][field] = value;
      }
    },
    saveEditingRow: (state, action: PayloadAction<string>) => {
      const editedRow = state.editingRows[action.payload];
      if (editedRow) {
        const index = state.rows.findIndex((row) => row.id === action.payload);
        if (index !== -1) {
          state.rows[index] = editedRow;
        }
        delete state.editingRows[action.payload];
      }
    },
    cancelEditingRow: (state, action: PayloadAction<string>) => {
      delete state.editingRows[action.payload];
    },
    saveAllEdits: (state) => {
      Object.keys(state.editingRows).forEach((id) => {
        const editedRow = state.editingRows[id];
        const index = state.rows.findIndex((row) => row.id === id);
        if (index !== -1) {
          state.rows[index] = editedRow;
        }
      });
      state.editingRows = {};
    },
    cancelAllEdits: (state) => {
      state.editingRows = {};
    },
  },
});

export const {
  setRows,
  addRow,
  updateRow,
  deleteRow,
  setColumns,
  toggleColumnVisibility,
  addColumn,
  setSorting,
  setSearchQuery,
  setPage,
  setRowsPerPage,
  startEditingRow,
  updateEditingRow,
  saveEditingRow,
  cancelEditingRow,
  saveAllEdits,
  cancelAllEdits,
} = tableSlice.actions;

export default tableSlice.reducer;
