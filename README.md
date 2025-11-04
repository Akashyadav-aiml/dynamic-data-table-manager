# 📊 Dynamic Data Table Manager

A powerful and feature-rich data table manager built with **Next.js 14**, **Redux Toolkit**, and **Material UI (MUI)**. This application demonstrates advanced React patterns, state management, and real-world features like CSV import/export, dynamic columns, inline editing, and more.

## 🚀 Features

### ✅ Core Features Implemented

#### 1. **Advanced Table View**
- Clean, responsive table with sortable columns
- Click any column header to toggle between ascending/descending sort
- Client-side pagination (10 rows per page, configurable)
- Real-time global search across all fields
- Sticky header for better UX on scroll

#### 2. **Dynamic Column Management**
- "Manage Columns" modal to control table display
- Show/hide columns with checkboxes
- Add new custom columns dynamically (text or number types)
- Column visibility persisted using Redux Persist

#### 3. **CSV Import & Export**
- **Import CSV**: Upload CSV files with automatic parsing using PapaParse
  - Validates file format and shows preview
  - Automatically creates new columns if CSV has additional fields
  - Displays helpful error messages for invalid files
- **Export CSV**: Download current table data
  - Exports only visible columns
  - Properly escapes commas and quotes in data
  - Filename includes current date

### 🎁 Bonus Features Implemented

#### 4. **Inline Row Editing**
- Double-click any row or click Edit button to enable editing
- All fields become editable with proper input types
- Input validation (age must be a number)
- Individual "Save" and "Cancel" buttons per row
- Global "Save All" and "Cancel All" buttons for bulk operations

#### 5. **Row Actions**
- Edit button with inline editing support
- Delete button with confirmation dialog
- Actions column always visible on the right

#### 6. **Theme Toggle (Light/Dark Mode)**
- Beautiful Material UI theming
- Toggle button in toolbar
- Theme preference persisted across sessions
- Smooth transitions between modes

#### 7. **Responsive Design**
- Fully responsive layout
- Works on desktop, tablet, and mobile
- Optimized table scrolling
- Adaptive toolbar layout

## 🛠️ Tech Stack

- **React 18** - Latest React features
- **Next.js 14** - App Router with server components
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Efficient state management
- **Redux Persist** - Persist state to localStorage
- **Material UI v5** - Beautiful, accessible components
- **PapaParse** - CSV parsing library
- **FileSaver.js** - CSV export functionality
- **React Hook Form** - Form handling (ready for extension)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── DataTable.tsx       # Main table with sorting, pagination, editing
│   ├── Toolbar.tsx         # Search, import/export, theme toggle
│   ├── ManageColumnsDialog.tsx  # Column management modal
│   ├── ImportDialog.tsx    # CSV import modal
│   └── ConfirmDialog.tsx   # Reusable confirmation dialog
├── providers/
│   ├── ReduxProvider.tsx   # Redux store provider
│   └── ThemeProvider.tsx   # MUI theme provider
├── store/
│   ├── index.ts            # Redux store configuration
│   ├── tableSlice.ts       # Table state and actions
│   ├── uiSlice.ts          # UI state (theme, modals)
│   └── hooks.ts            # Typed Redux hooks
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### 1. Searching Data
- Use the search bar in the toolbar to filter rows
- Search works across all fields in real-time
- Pagination resets to page 1 when searching

### 2. Sorting
- Click any column header to sort
- First click: ascending order
- Second click: descending order
- Active sort column is highlighted

### 3. Managing Columns
- Click "Columns" button in toolbar
- Check/uncheck columns to show/hide them
- Add new columns by entering a name and selecting type
- Changes persist across sessions

### 4. Editing Data
- Click the Edit icon (✏️) on any row
- All fields become editable
- Press Save (✓) to commit changes
- Press Cancel (✕) to discard changes
- Use "Save All" or "Cancel All" for bulk operations

### 5. Deleting Rows
- Click the Delete icon (🗑️) on any row
- Confirm deletion in the dialog
- Deletion is permanent (no undo)

### 6. Importing CSV
1. Click "Import" in toolbar
2. Select a CSV file (must have headers)
3. Preview the first 5 rows
4. Click "Import" to add data
5. New columns are created automatically if needed

### 7. Exporting CSV
- Click "Export" in toolbar
- Downloads CSV with only visible columns
- Filename includes current date
- Data is properly escaped

### 8. Theme Toggle
- Click the sun/moon icon to switch themes
- Preference is saved automatically

## 🎨 Sample Data

A sample CSV file (`sample-data.csv`) is included with 15 employee records. It includes:
- Name, Email, Age, Role (default columns)
- Department, Location (additional columns)

Try importing this file to see how the app handles dynamic columns!

## 🔧 Configuration

### Default Columns
Defined in `src/store/tableSlice.ts`:
```typescript
const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', visible: true, sortable: true, type: 'string' },
  { id: 'email', label: 'Email', visible: true, sortable: true, type: 'string' },
  { id: 'age', label: 'Age', visible: true, sortable: true, type: 'number' },
  { id: 'role', label: 'Role', visible: true, sortable: true, type: 'string' },
];
```

### Pagination Options
Configured in `src/components/DataTable.tsx`:
```typescript
rowsPerPageOptions={[5, 10, 25, 50]}
```

### Redux Persist
State is persisted to localStorage with key `root`. Clear browser data to reset.

## 🧪 Testing

### Manual Testing Checklist
- [ ] Search functionality works across all fields
- [ ] Sorting works on all columns
- [ ] Pagination displays correct rows
- [ ] Column visibility toggle works
- [ ] Adding new columns works
- [ ] CSV import handles valid files
- [ ] CSV import shows errors for invalid files
- [ ] CSV export includes only visible columns
- [ ] Inline editing saves correctly
- [ ] Delete confirmation prevents accidents
- [ ] Theme toggle switches properly
- [ ] State persists after page reload
- [ ] Responsive design works on mobile

## 🚀 Future Enhancements

Potential features for future development:
- Column reordering via drag-and-drop
- Advanced filters (date ranges, multi-select)
- Data validation rules
- Undo/redo functionality
- Export to Excel format
- Backend API integration
- Real-time collaboration
- Keyboard shortcuts
- Bulk operations (select multiple rows)
- Custom column formatters

## 📝 Code Quality

- **TypeScript**: Fully typed for type safety
- **ESLint**: Code linting configured
- **Component Structure**: Clean, reusable components
- **State Management**: Centralized Redux store
- **Performance**: Memoized selectors and computed values
- **Accessibility**: MUI components are accessible by default

## 🤝 Contributing

This is a frontend interview task project. Feel free to fork and experiment!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer Notes

### Key Implementation Decisions

1. **Redux Toolkit over Context API**: Better DevTools, middleware support, and performance
2. **Redux Persist**: Seamless state persistence without manual localStorage calls
3. **Material UI**: Production-ready components with excellent accessibility
4. **PapaParse**: Robust CSV parsing with good error handling
5. **Client-side only**: All operations run in browser (could be extended with API)

### Performance Optimizations

- `useMemo` for filtered, sorted, and paginated data
- Component-level state for UI elements
- Redux selectors for derived data
- Minimal re-renders with proper React patterns

### Known Limitations

- Maximum recommended rows: ~10,000 (client-side pagination)
- No server-side sorting/filtering
- No backend persistence (uses localStorage)
- CSV import replaces existing data

---

**Built with ❤️ for the Frontend Interview Task**

🌟 **Star this repo if you found it helpful!**
