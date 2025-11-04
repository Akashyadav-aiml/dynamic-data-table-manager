'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { useState, useRef } from 'react';
import Papa from 'papaparse';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setRows, setColumns } from '@/store/tableSlice';
import { setImportDialogOpen } from '@/store/uiSlice';
import { TableRow, Column } from '@/types';

export default function ImportDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.importDialogOpen);
  const columns = useAppSelector((state) => state.table.columns);
  
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<any[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(setImportDialogOpen(false));
    setError(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`Parse error: ${results.errors[0].message}`);
          return;
        }

        if (results.data.length === 0) {
          setError('The CSV file is empty');
          return;
        }

        setPreview(results.data.slice(0, 5)); // Show first 5 rows as preview
      },
      error: (error) => {
        setError(`Error reading file: ${error.message}`);
      },
    });
  };

  const handleImport = () => {
    if (!fileInputRef.current?.files?.[0]) return;

    const file = fileInputRef.current.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`Parse error: ${results.errors[0].message}`);
          return;
        }

        const data = results.data as any[];
        
        if (data.length === 0) {
          setError('The CSV file is empty');
          return;
        }

        // Extract column headers from CSV
        const csvHeaders = Object.keys(data[0]);
        
        // Create new columns for any headers not already in the table
        const existingColumnIds = columns.map((col) => col.id);
        const newColumns: Column[] = csvHeaders
          .filter((header) => !existingColumnIds.includes(header.toLowerCase()))
          .map((header) => ({
            id: header.toLowerCase(),
            label: header,
            visible: true,
            sortable: true,
            type: 'string' as const,
          }));

        // Convert data to TableRow format
        const newRows: TableRow[] = data.map((row, index) => {
          const tableRow: TableRow = {
            id: `imported-${Date.now()}-${index}`,
            name: '',
            email: '',
            age: 0,
            role: '',
          };

          csvHeaders.forEach((header) => {
            const value = row[header];
            const columnId = header.toLowerCase();
            
            // Try to determine if it's a number
            if (value && !isNaN(Number(value))) {
              tableRow[columnId] = Number(value);
            } else {
              tableRow[columnId] = value || '';
            }
          });

          return tableRow;
        });

        // Update store
        if (newColumns.length > 0) {
          dispatch(setColumns([...columns, ...newColumns]));
        }
        dispatch(setRows(newRows));
        
        handleClose();
      },
      error: (error) => {
        setError(`Error reading file: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Import CSV File</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'block', marginBottom: '16px' }}
          />
          <Typography variant="body2" color="text.secondary">
            Select a CSV file to import. The file should have headers in the first row.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {preview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Preview (first 5 rows):
            </Typography>
            <Box
              sx={{
                overflowX: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
              }}
            >
              <pre style={{ margin: 0, fontSize: '12px' }}>
                {JSON.stringify(preview, null, 2)}
              </pre>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleImport}
          variant="contained"
          disabled={!preview}
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}
