import { Font } from '@react-pdf/renderer';

// Font URLs - using Google Fonts CDN for reliability
const FONT_REGULAR = 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf';
const FONT_BOLD = 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.ttf';

export const registerFonts = () => {
  try {
    Font.register({
      family: 'CustomFont',
      fonts: [
        { src: FONT_REGULAR, fontWeight: 'normal' },
        { src: FONT_BOLD, fontWeight: 'bold' }
      ]
    });
  } catch (error) {
    console.error('Error registering fonts:', error);
  }
};

export const pdfConfig = {
  fonts: {
    regular: 'CustomFont',
    bold: 'CustomFont'
  },
  colors: {
    primary: '#3F1E43',
    text: {
      primary: '#1F2937',
      secondary: '#4B5563',
      light: '#6B7280'
    },
    background: {
      light: '#F3F4F6',
      white: '#FFFFFF'
    },
    border: '#E5E7EB'
  }
};