import { Injectable } from '@nestjs/common';
import { TicketPrinter } from '../../common/ticket-printer/ticket-printer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PrinterService {
  constructor(private readonly config: ConfigService) {
    // Constructor logic if needed
  }
  async testPage() {
    const printer = new TicketPrinter(
      this.config.get('PRINTER_VENDOR_ID') as number,
      this.config.get('PRINTER_PRODUCT_ID') as number,
      this.config.get('PRINTER_PAPER_WIDTH') as number,
    );
    await printer.open();
    printer.printText('test.png');
    printer.close();
  }
}
