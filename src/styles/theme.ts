export const theme = {
  colors: {
    primary: '#1A5276', // Azul Profundo
    secondary: '#1ABC9C', // Turquesa Amaui
    background: '#F4F6F7', // Blanco Hueso
    surface: '#FFFFFF',
    text: '#1C2833', // Negro Ébano
    textLight: '#5D6D7E',
    border: '#E5E8E8',
    success: '#27AE60', // Verde Bienestar
    warning: '#E67E22', // Terracota Scarf
    danger: '#C0392B', // Keeping a red for errors if needed
  },
  typography: {
    fontFamily: 'System', // Will use system sans-serif which maps to Roboto/San Francisco
    size: {
      small: 16,
      base: 18,
      large: 20,
      xlarge: 24,
      xxlarge: 32,
    },
    weight: {
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 56,
  },
  layout: {
    borderRadius: 16, // Puffy borders
    touchTarget: 64, // Big touch targets
  },
  shadows: {
    puffy: {
      shadowColor: '#1A5276',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    }
  }
};
