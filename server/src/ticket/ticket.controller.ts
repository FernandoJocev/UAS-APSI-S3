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
  @Get('/test')
  test() {
    return this.ticketService.test();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  all() {
    return this.ticketService.getAllTickets();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/history')
  history(@Headers('Authorization') token?: string) {
    return this.ticketService.getHistory(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/buy/:id')
  buy(
    @Body() request: Record<string, any>,
    @Param() id: any,
    @Headers('Authorization') token?: string,
  ) {
    return this.ticketService.buyTicket(request.data, parseInt(id.id), token);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get/:id')
  search(@Param() id: any): Promise<TicketInterface> {
    return this.ticketService.findTicket(parseInt(id.id));
  }

  // ? Admin Routes
  @HttpCode(HttpStatus.OK)
  @Get('/admin/all')
  adminAll() {
    return this.ticketService.adminGetAllTicket();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/admin/add')
  adminAddTicket(@Body() request: Record<string, any>) {
    return this.ticketService.adminAddTicket(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/admin/edit')
  adminEditTicket(@Body() request: Record<string, any>) {
    return this.ticketService.adminEditTicket(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/admin/delete')
  adminDeleteTicket(@Body() request: Record<string, any>) {
    return this.ticketService.adminDeleteTicket(request.data.id);
  }
}
