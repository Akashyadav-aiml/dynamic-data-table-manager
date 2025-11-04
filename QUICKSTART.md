# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📋 Feature Checklist

### ✅ Core Features
- [x] Table with Name, Email, Age, Role columns
- [x] Column sorting (click headers to toggle ASC/DESC)
- [x] Global search across all fields
- [x] Client-side pagination (10 rows per page)
- [x] Manage Columns modal (show/hide/add columns)
- [x] CSV Import with validation and preview
- [x] CSV Export (only visible columns)
- [x] Column visibility persisted in localStorage

### ✅ Bonus Features
- [x] Inline row editing (click Edit button)
- [x] Input validation (age must be number)
- [x] Save All / Cancel All buttons
- [x] Row actions: Edit & Delete
- [x] Delete confirmation dialog
- [x] Light/Dark theme toggle
- [x] Theme persisted across sessions
- [x] Fully responsive design

---

## 🎯 Try These Features

### 1. Search & Sort
- Type "Developer" in search box → filters rows
- Click "Age" column header → sorts by age
- Click again → reverses sort order

### 2. Manage Columns
- Click "Columns" button
- Uncheck "Email" → hides email column
- Add "Department" as text column → creates new column
- Refresh page → settings are saved!

### 3. Import CSV
- Click "Import" button
- Upload `sample-data.csv` file
- See preview of data
- Click "Import" → data loaded with Department & Location columns

### 4. Export CSV
- Hide some columns using "Columns" modal
- Click "Export" button
- CSV file downloads with only visible columns

### 5. Edit Data
- Click Edit icon (✏️) on any row
- Modify name, age, etc.
- Click Save (✓) to commit
- Or click Cancel (✕) to discard

### 6. Bulk Edit
- Edit multiple rows (click Edit on several rows)
- Notice "Save All" and "Cancel All" buttons appear
- Use them to save/cancel all edits at once

### 7. Delete Row
- Click Delete icon (🗑️)
- Confirmation dialog appears
- Click "Delete" to confirm removal

### 8. Theme Toggle
- Click sun/moon icon in toolbar
- Switches between light/dark mode
- Refresh page → theme persists

---

## 📦 What's Included

```
✓ Next.js 14 (App Router)
✓ TypeScript (fully typed)
✓ Redux Toolkit + Redux Persist
✓ Material UI v5 (with theming)
✓ PapaParse (CSV parsing)
✓ FileSaver.js (CSV export)
✓ Sample data (sample-data.csv)
✓ Comprehensive README
```

---

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 📊 Sample Data

Use the included `sample-data.csv` file to test CSV import:
- 15 employee records
- Includes Department and Location columns
- Properly formatted CSV with headers

---

## 🎨 Customization

### Add More Default Columns
Edit `src/store/tableSlice.ts`:
```typescript
const defaultColumns: Column[] = [
  // Add your columns here
  { id: 'salary', label: 'Salary', visible: true, sortable: true, type: 'number' },
];
```

### Change Pagination Options
Edit `src/components/DataTable.tsx`:
```typescript
rowsPerPageOptions={[5, 10, 25, 50, 100]}
```

### Modify Theme Colors
Edit `src/providers/ThemeProvider.tsx`:
```typescript
primary: { main: '#1976d2' },  // Change to your color
```

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Change port in package.json
"dev": "next dev -p 3001"
```

### TypeScript errors?
```bash
# Rebuild TypeScript
npm run build
```

### State not persisting?
- Check browser localStorage (Developer Tools → Application → Local Storage)
- Clear cache if needed: `localStorage.clear()`

---

## ✨ Pro Tips

1. **Double-click rows** - Alternative to clicking Edit button
2. **Use keyboard** - Tab through editable fields when editing
3. **Batch operations** - Edit multiple rows before saving all at once
4. **Export filtered data** - Search first, then export to get filtered results
5. **Dynamic columns** - Add columns on-the-fly without code changes

---

**Happy coding! 🎉**

For detailed documentation, see [README.md](./README.md)
