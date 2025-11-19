import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme) {
      setMode(savedTheme);
    } else {
      // Set light theme as default
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', mode);
    
    // Apply theme class to body
    document.body.className = mode === 'dark' ? 'dark-theme' : 'light-theme';
  }, [mode]);

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  // Create MUI theme based on mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#EF5350' : '#D32F2F',
        light: '#FF6659',
        dark: '#B71C1C',
      },
      secondary: {
        main: mode === 'dark' ? '#FF6E9C' : '#F06292',
        light: '#FF9EC3',
        dark: '#C2185B',
      },
      background: {
        default: mode === 'dark' ? '#0A0A0F' : '#F8F7FC',
        paper: mode === 'dark' ? '#1A1A24' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#111111',
        secondary: mode === 'dark' ? '#B4B4C8' : '#5F5F7A',
      },
      error: {
        main: '#FF1744',
      },
      success: {
        main: '#00E676',
      },
      warning: {
        main: '#FFD600',
      },
    },
    typography: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '0.5px',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '0.3px',
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '0.95rem',
          },
          contained: {
            background: mode === 'dark'
              ? 'linear-gradient(135deg, #EF5350 0%, #E53935 100%)'
              : 'linear-gradient(135deg, #D32F2F 0%, #F44336 100%)',
            boxShadow: '0 4px 15px rgba(211,47,47,0.4)',
            '&:hover': {
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #FF6659 0%, #EF5350 100%)'
                : 'linear-gradient(135deg, #F44336 0%, #FF5252 100%)',
              boxShadow: '0 6px 20px rgba(211,47,47,0.6)',
              transform: 'translateY(-2px)',
            },
          },
          outlined: {
            borderWidth: '2px',
            borderColor: mode === 'dark' ? '#EF5350' : '#D32F2F',
            color: mode === 'dark' ? '#EF5350' : '#D32F2F',
            '&:hover': {
              borderWidth: '2px',
              background: mode === 'dark'
                ? 'linear-gradient(135deg, #EF5350 0%, #E53935 100%)'
                : 'linear-gradient(135deg, #D32F2F 0%, #F44336 100%)',
              color: '#FFFFFF',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: mode === 'dark' ? '#1A1A24' : '#FFFFFF',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
            border: mode === 'dark' 
              ? '1px solid rgba(239,83,80,0.25)' 
              : '1px solid rgba(211,47,47,0.2)',
            boxShadow: mode === 'dark' 
              ? '0 4px 16px rgba(239,83,80,0.2)' 
              : '0 4px 16px rgba(211,47,47,0.12)',
            '&:hover': {
              transform: 'translateY(-8px) scale(1.02)',
              zIndex: 10,
              borderColor: mode === 'dark' 
                ? 'rgba(239,83,80,0.7)' 
                : 'rgba(211,47,47,0.5)',
              boxShadow: mode === 'dark' 
                ? '0 20px 40px rgba(239,83,80,0.5), 0 0 0 1px rgba(239,83,80,0.4)' 
                : '0 20px 40px rgba(211,47,47,0.35), 0 0 0 1px rgba(211,47,47,0.25)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#111111',
            boxShadow: mode === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(239,83,80,0.2)' 
                : 'rgba(211,47,47,0.15)',
              transform: 'scale(1.1)',
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            transition: 'all 0.3s ease',
          },
          filled: {
            background: mode === 'dark'
              ? 'linear-gradient(135deg, #EF5350 0%, #E53935 100%)'
              : 'linear-gradient(135deg, #D32F2F 0%, #F44336 100%)',
            color: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(211,47,47,0.3)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(211,47,47,0.4)',
            }
          },
          outlined: {
            borderColor: mode === 'dark' ? 'rgba(239,83,80,0.6)' : 'rgba(211,47,47,0.5)',
            color: mode === 'dark' ? '#EF5350' : '#D32F2F',
            borderWidth: '1.5px',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              borderColor: mode === 'dark' ? '#EF5350' : '#D32F2F',
              backgroundColor: mode === 'dark' 
                ? 'rgba(239,83,80,0.15)' 
                : 'rgba(211,47,47,0.08)',
            }
          }
        }
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 