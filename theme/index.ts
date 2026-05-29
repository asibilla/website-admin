import { createTheme } from '@mui/material/styles';

const colors = {
  bg: {
    default: '#0c0e12',
    paper: '#151820',
    elevated: '#1c2030',
  },
  border: 'rgba(255, 255, 255, 0.08)',
  primary: {
    main: '#6b9ed9',
    light: '#8bb4e5',
    dark: '#4a7db8',
    contrastText: '#0c0e12',
  },
  text: {
    primary: '#e8eaed',
    secondary: '#9ca3af',
    disabled: '#6b7280',
  },
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: {
      main: '#94a3b8',
      light: '#cbd5e1',
      dark: '#64748b',
    },
    background: {
      default: colors.bg.default,
      paper: colors.bg.paper,
    },
    text: colors.text,
    divider: colors.border,
    action: {
      active: colors.text.primary,
      hover: 'rgba(255, 255, 255, 0.06)',
      selected: 'rgba(107, 158, 217, 0.16)',
      disabled: colors.text.disabled,
      disabledBackground: 'rgba(255, 255, 255, 0.06)',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.375rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.45,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
      color: colors.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: colors.text.secondary,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.bg.default,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': {
          backgroundColor: 'rgba(107, 158, 217, 0.35)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.bg.paper,
          border: `1px solid ${colors.border}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bg.elevated,
          border: `1px solid ${colors.border}`,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          boxShadow: 'none',
          '&.MuiButton-containedPrimary:hover': {
            boxShadow: 'none',
            backgroundColor: colors.primary.light,
          },
          '&.MuiButton-outlined': {
            borderColor: colors.border,
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.18)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.primary.main,
          textDecoration: 'none',
          '&:hover': {
            color: colors.primary.light,
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border,
        },
      },
    },
  },
});
