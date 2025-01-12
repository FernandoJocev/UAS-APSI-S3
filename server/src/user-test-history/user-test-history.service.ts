import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TestTicketService } from 'src/test-ticket/test-ticket.service';

interface TicketInterface {
  id: number;
  tersedia: number;
  nama_kapal: string;
  tgl_berangkat: string;
  jadwal: string;
  harga: number;
  kota_asal: string;
  kota_tujuan: string;
}

interface HistoryInterface {
  id: number;
  user_id: number;
  tiket_id: number;
  qty: number;
  status: string;
}

export interface UserInterface {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class UserTestHistoryService {
  constructor(
    private JWTService: JwtService,
    @Inject(forwardRef(() => TestTicketService))
    private Ticket: TestTicketService,
  ) {}

  private readonly history = [
    {
      id: 1,
      user_id: 1,
      tiket_id: 1,
      qty: 2,
      status: 'Selesai',
    },
    {
      id: 2,
      user_id: 1,
      tiket_id: 2,
      qty: 2,
      status: 'Segera berangkat',
    },
  ];

  async decrypt(token: string): Promise<UserInterface> {
    return await this.JWTService.verify(token.split(' ')[1]);
  }

  async getHistories(token: string) {
    try {
      const user = await this.decrypt(token);

      const history: HistoryInterface[] = this.history.filter((history) => {
        return history.user_id === user.id;
      });

      const histories = [];
      for (const value of history) {
        const ticket = await this.Ticket.findOne(value.tiket_id);
        const obj = {};

        // ? Set History
        obj['id'] = value.id;
        obj['user_id'] = value.user_id;
        obj['qty'] = value.qty;
        obj['status'] = value.status;

        // ? Set Ticket
        obj['tersedia'] = ticket.tersedia;
        obj['nama_kapal'] = ticket.nama_kapal;
        obj['tgl_berangkat'] = ticket.tgl_berangkat;
        obj['jadwal'] = ticket.jadwal;
        obj['harga'] = ticket.harga;
        obj['kota_asal'] = ticket.kota_asal;
        obj['kota_tujuan'] = ticket.kota_tujuan;

        histories.push(obj);
      }

      histories.reverse();

      return histories;
    } catch {
      throw new Error();
    }
  }

  async addHistory(
    request: Record<string, any>,
    ticket: TicketInterface,
    token?: string,
  ) {
    let obj = {} as HistoryInterface;
    const user = await this.decrypt(token);
    let id = 1;

    obj['id'] = id += 1;
    obj['user_id'] = user.id;
    obj['tiket_id'] = ticket.id;
    obj['qty'] = request.jlh_penumpang;
    obj['status'] = 'Segera berangkat';

    this.history.push(obj);

    return (obj = {} as HistoryInterface);
  }
}
