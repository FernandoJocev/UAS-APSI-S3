import {
  Controller,
  HttpCode,
  Get,
  HttpStatus,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketInterface } from './ticket';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  all() {
    return this.ticketService.getAllTickets();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  search(@Param() id: any): Promise<TicketInterface> {
    return this.ticketService.findTicket(parseInt(id.id));
  }

  @HttpCode(HttpStatus.OK)
  @Post('/buy/:id')
  buy(@Body() request: Record<string, any>, @Param() id: any) {
    return this.ticketService.buyTicket(request.data, parseInt(id.id));
  }

  @HttpCode(HttpStatus.OK)
  @Get('/history')
  history() {
    return JSON.parse('{"message": "History"}');
  }
}
