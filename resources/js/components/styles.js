export const globalStyles = `
  :host {
    --color-primary: #2F80ED;
    --color-secondary: #828282;
    --color-success: #27AE60;
    --color-error: #EB5757;
    --color-bg: #FFFFFF;
    --color-bg-alt: #F2F2F2;
    --color-text-main: #000000;
    --color-rating: #F2CB0D;


    --font-family: 'Roboto', sans-serif;
    --font-family-heading: 'Yaldevi Colombo', sans-serif;
    
    --text-h1: 600 24px/1.2 var(--font-family-heading);
    --text-h2: 600 18px/1.2 var(--font-family);
    --text-body: 400 14px/1.5 var(--font-family);
    --text-notes: 400 12px/1.5 var(--font-family);

    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
  }

  * {
    box-sizing: border-box;
  }
`;

export const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
`;
