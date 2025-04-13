import * as path from 'path';
export const configuration = () => ({
  PRINTER_VENDOR_ID: parseInt(process.env.PRINTER_VENDOR_ID || '0483', 16),
  PRINTER_PRODUCT_ID: parseInt(process.env.PRINTER_PRODUCT_ID || '5840', 16),
  LOGO_PATH: process.env.LOGO_PATH || path.join(process.cwd(), 'logo2.png'),
  PAPER_WIDTH: parseInt(process.env.PAPER_WIDTH || '32', 10), // default paper width for 58MM printer
  QR_CODE_URL:
    process.env.QR_CODE_URL || 'https://g.page/r/CZ0OiOZiSak4EBI/review',
});
