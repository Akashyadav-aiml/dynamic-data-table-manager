'use client';

import { useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from '@/store/hooks';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: themeMode === 'dark' ? '#6366f1' : '#4f46e5',
            light: '#818cf8',
            dark: '#4338ca',
          },
          secondary: {
            main: themeMode === 'dark' ? '#f43f5e' : '#e11d48',
            light: '#fb7185',
            dark: '#be123c',
          },
          background: {
            default: themeMode === 'dark' ? '#0f172a' : '#f8fafc',
            paper: themeMode === 'dark' ? '#1e293b' : '#ffffff',
          },
          success: {
            main: '#10b981',
          },
          warning: {
            main: '#f59e0b',
          },
          error: {
            main: '#ef4444',
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: [
          'none',
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        ],
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h6: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
          },
        },
        components: {
          MuiTableCell: {
            styleOverrides: {
              root: {
                padding: '16px',
                borderBottom: themeMode === 'dark' ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(203, 213, 225, 0.5)',
              },
              head: {
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: themeMode === 'dark' 
                  ? 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(244, 63, 94, 0.1))'
                  : 'linear-gradient(to right, rgba(79, 70, 229, 0.05), rgba(225, 29, 72, 0.05))',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              },
              contained: {
                background: themeMode === 'dark'
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                '&:hover': {
                  background: themeMode === 'dark'
                    ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                    : 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backdropFilter: 'blur(20px)',
                border: themeMode === 'dark' ? '1px solid rgba(148, 163, 184, 0.1)' : '1px solid rgba(203, 213, 225, 0.3)',
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                },
              },
            },
          },
        },
      }),
    [themeMode]
  );

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
