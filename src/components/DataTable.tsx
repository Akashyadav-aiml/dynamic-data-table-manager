'use client';

import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
  Tooltip,
  TextField,
  Box,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setSorting,
  setPage,
  setRowsPerPage,
  deleteRow,
  startEditingRow,
  updateEditingRow,
  saveEditingRow,
  cancelEditingRow,
} from '@/store/tableSlice';
import { TableRow as TableRowType } from '@/types';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { rows, columns, editingRows, sortBy, sortOrder, searchQuery, page, rowsPerPage } = useAppSelector(
    (state) => state.table
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);

  const visibleColumns = columns.filter((col) => col.visible);

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    if (!searchQuery) return rows;
    
    const query = searchQuery.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [rows, searchQuery]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (!sortBy) return filteredRows;

    const sorted = [...filteredRows].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (sortOrder === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });

    return sorted;
  }, [filteredRows, sortBy, sortOrder]);

  // Paginate rows
  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedRows.slice(start, end);
  }, [sortedRows, page, rowsPerPage]);

  const handleSort = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column?.sortable) return;

    if (sortBy === columnId) {
      dispatch(setSorting({ sortBy: columnId, sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' }));
    } else {
      dispatch(setSorting({ sortBy: columnId, sortOrder: 'asc' }));
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleEdit = (rowId: string) => {
    dispatch(startEditingRow(rowId));
  };

  const handleSave = (rowId: string) => {
    dispatch(saveEditingRow(rowId));
  };

  const handleCancel = (rowId: string) => {
    dispatch(cancelEditingRow(rowId));
  };

  const handleDeleteClick = (rowId: string) => {
    setRowToDelete(rowId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (rowToDelete) {
      dispatch(deleteRow(rowToDelete));
      setRowToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setRowToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleFieldChange = (rowId: string, field: string, value: string) => {
    const column = columns.find((col) => col.id === field);
    let processedValue: string | number = value;

    // Convert to number if column type is number
    if (column?.type === 'number') {
      const numValue = parseFloat(value);
      processedValue = isNaN(numValue) ? 0 : numValue;
    }

    dispatch(updateEditingRow({ id: rowId, field, value: processedValue }));
  };

  const isEditing = (rowId: string) => !!editingRows[rowId];

  const getRowData = (row: TableRowType) => {
    return isEditing(row.id) ? editingRows[row.id] : row;
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: 'calc(100vh - 250px)',
          background: (theme) => alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: (theme) => 
              `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableCell key={column.id}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortOrder : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
            {paginatedRows.map((row, index) => {
              const rowData = getRowData(row);
              const editing = isEditing(row.id);

              return (
                <TableRow 
                  key={row.id} 
                  hover
                  component={motion.tr}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05, type: 'spring' }}
                  whileHover={{ 
                    scale: 1.01,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    zIndex: 1,
                  }}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id}>
                      {editing ? (
                        <TextField
                          size="small"
                          fullWidth
                          value={rowData[column.id] ?? ''}
                          onChange={(e) => handleFieldChange(row.id, column.id, e.target.value)}
                          type={column.type === 'number' ? 'number' : 'text'}
                          variant="standard"
                        />
                      ) : (
                        rowData[column.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      {editing ? (
                        <>
                          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Save">
                              <IconButton size="small" color="primary" onClick={() => handleSave(row.id)}>
                                <SaveIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Cancel">
                              <IconButton size="small" color="default" onClick={() => handleCancel(row.id)}>
                                <CancelIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Edit">
                              <IconButton size="small" color="primary" onClick={() => handleEdit(row.id)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Delete">
                              <IconButton size="small" color="error" onClick={() => handleDeleteClick(row.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this row? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}
