'use client';

import {
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Toolbar as MUIToolbar,
  Typography,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchQuery, saveAllEdits, cancelAllEdits } from '@/store/tableSlice';
import { toggleTheme, setManageColumnsOpen, setImportDialogOpen } from '@/store/uiSlice';
import { saveAs } from 'file-saver';

const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.table.searchQuery);
  const { rows, columns, editingRows } = useAppSelector((state) => state.table);
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  const hasEditingRows = Object.keys(editingRows).length > 0;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleExport = () => {
    const visibleColumns = columns.filter((col) => col.visible);
    
    // Create CSV header
    const header = visibleColumns.map((col) => col.label).join(',');
    
    // Create CSV rows
    const csvRows = rows.map((row) =>
      visibleColumns.map((col) => {
        const value = row[col.id];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      }).join(',')
    );
    
    const csv = [header, ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `table-export-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const handleImport = () => {
    dispatch(setImportDialogOpen(true));
  };

  const handleManageColumns = () => {
    dispatch(setManageColumnsOpen(true));
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSaveAll = () => {
    dispatch(saveAllEdits());
  };

  const handleCancelAll = () => {
    dispatch(cancelAllEdits());
  };

  return (
    <MUIToolbar
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        gap: 2,
        flexWrap: 'wrap',
        background: (theme) =>
          themeMode === 'dark'
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.1)} 0%, ${alpha(theme.palette.secondary.dark, 0.1)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
        mb: 3,
        p: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: (theme) =>
            `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
          animation: 'shimmer 3s infinite',
        },
        '@keyframes shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              right: 0,
              height: 3,
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 2,
            },
          }}
        >
          Data Table Manager
        </Typography>
      </motion.div>

      <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ width: '100%', maxWidth: 300 }}
        >
          <TextField
            size="small"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <motion.div
                  animate={{ rotate: searchQuery ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />
                </motion.div>
              ),
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                background: (theme) => alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
              },
            }}
          />
        </motion.div>
      </Box>

      {hasEditingRows && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ display: 'flex', gap: 8 }}
        >
          <MotionButton
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveAll}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            }}
          >
            Save All
          </MotionButton>
          <MotionButton
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={handleCancelAll}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel All
          </MotionButton>
        </motion.div>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Tooltip title="Import CSV">
            <MotionButton
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={handleImport}
              whileHover={{ y: -2 }}
              sx={{
                borderWidth: 2,
                '&:hover': { borderWidth: 2 },
              }}
            >
              Import
            </MotionButton>
          </Tooltip>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Tooltip title="Export CSV">
            <MotionButton
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
              whileHover={{ y: -2 }}
              sx={{
                borderWidth: 2,
                '&:hover': { borderWidth: 2 },
              }}
            >
              Export
            </MotionButton>
          </Tooltip>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Tooltip title="Manage Columns">
            <MotionButton
              variant="outlined"
              startIcon={<ViewColumnIcon />}
              onClick={handleManageColumns}
              whileHover={{ y: -2 }}
              sx={{
                borderWidth: 2,
                '&:hover': { borderWidth: 2 },
              }}
            >
              Columns
            </MotionButton>
          </Tooltip>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
            <MotionIconButton
              onClick={handleToggleTheme}
              color="inherit"
              animate={{ rotate: themeMode === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                '&:hover': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
                },
              }}
            >
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </MotionIconButton>
          </Tooltip>
        </motion.div>
      </Box>
    </MUIToolbar>
  );
}
