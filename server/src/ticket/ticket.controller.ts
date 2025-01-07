import {
  Controller,
  HttpCode,
  Get,
  HttpStatus,
  Param,
  Post,
  Body,
  Headers,
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
  @Get('/history')
  history() {
    return this.ticketService.getHistory();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/buy/:id')
  buy(
    @Body() request: Record<string, any>,
    @Param() id: any,
    @Headers('Authorization') token?: string,
  ) {
    return this.ticketService.buyTicket(request, parseInt(id.id), token);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  search(@Param() id: any): Promise<TicketInterface> {
    return this.ticketService.findTicket(parseInt(id.id));
  }
}
