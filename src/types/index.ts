export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: string | number | undefined;
}

export interface Column {
  id: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  type: 'string' | 'number';
}

export interface TableState {
  rows: TableRow[];
  columns: Column[];
  editingRows: { [key: string]: TableRow };
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  page: number;
  rowsPerPage: number;
}

export interface UIState {
  themeMode: 'light' | 'dark';
  manageColumnsOpen: boolean;
  importDialogOpen: boolean;
}
