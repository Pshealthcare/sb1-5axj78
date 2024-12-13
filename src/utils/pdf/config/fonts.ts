import { Font } from '@react-pdf/renderer';

const FONT_URLS = {
  regular: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
  bold: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.ttf'
} as const;

export const registerFonts = () => {
  try {
    Font.register({
      family: 'CustomFont',
      fonts: [
        { src: FONT_URLS.regular, fontWeight: 'normal' },
        { src: FONT_URLS.bold, fontWeight: 'bold' }
      ]
    });
  } catch (error) {
    console.error('Error registering fonts:', error);
  }
};

export const fonts = {
  regular: 'CustomFont',
  bold: 'CustomFont'
} as const;