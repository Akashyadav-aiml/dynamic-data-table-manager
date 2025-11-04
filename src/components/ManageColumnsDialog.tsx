'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Typography,
  Divider,
  alpha,
  Zoom,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { motion } from 'framer-motion';
import { useState, forwardRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleColumnVisibility, addColumn } from '@/store/tableSlice';
import { setManageColumnsOpen } from '@/store/uiSlice';
import { Column } from '@/types';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

export default function ManageColumnsDialog() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.manageColumnsOpen);
  const columns = useAppSelector((state) => state.table.columns);

  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'string' | 'number'>('string');

  const handleClose = () => {
    dispatch(setManageColumnsOpen(false));
    setNewColumnName('');
  };

  const handleToggle = (columnId: string) => {
    dispatch(toggleColumnVisibility(columnId));
  };

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;

    const columnId = newColumnName.toLowerCase().replace(/\s+/g, '_');
    
    // Check if column already exists
    if (columns.find((col) => col.id === columnId)) {
      alert('A column with this name already exists');
      return;
    }

    const newColumn: Column = {
      id: columnId,
      label: newColumnName,
      visible: true,
      sortable: true,
      type: newColumnType,
    };

    dispatch(addColumn(newColumn));
    setNewColumnName('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          background: (theme) => alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          fontWeight: 700,
          borderBottom: (theme) => `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        Manage Columns
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Show/Hide Columns
          </Typography>
          <FormGroup>
            {columns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={column.visible}
                      onChange={() => handleToggle(column.id)}
                    />
                  }
                  label={column.label}
                  sx={{
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.05),
                      borderRadius: 1,
                    },
                  }}
                />
              </motion.div>
            ))}
          </FormGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Add New Column
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <TextField
              label="Column Name"
              size="small"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="e.g., Department, Location"
              sx={{ flex: 1 }}
            />
            <TextField
              select
              label="Type"
              size="small"
              value={newColumnType}
              onChange={(e) => setNewColumnType(e.target.value as 'string' | 'number')}
              SelectProps={{ native: true }}
              sx={{ width: 120 }}
            >
              <option value="string">Text</option>
              <option value="number">Number</option>
            </TextField>
            <Button variant="contained" onClick={handleAddColumn} sx={{ mt: 0.5 }}>
              Add
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
