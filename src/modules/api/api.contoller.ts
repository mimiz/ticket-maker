import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { TicketDto } from './dto/ticket.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly printerService: PrinterService) {
    // Constructor logic if needed
  }

  @Get('test')
  async test() {
    await this.printerService.testPage();
    return { message: 'API is working!' };
  }

  @Post('ticket')
  async createTicket(@Body() ticketData: TicketDto) {
    // Here you would typically process the ticketData and print it
    // We should save it beore
    // create header
    // create items
    // create footer
  }
}
