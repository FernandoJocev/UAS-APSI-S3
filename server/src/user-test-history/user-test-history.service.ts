import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
}

export interface UserInterface {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

@Injectable()
export class UserTestHistoryService {
  constructor(private JWTService: JwtService) {}

  private readonly history = [
    {
      id: 1,
      user_id: 1,
      tiket_id: 1,
      qty: 2,
    },
  ];

  async decrypt(token: string): Promise<UserInterface> {
    return await this.JWTService.verify(token.split(' ')[1]);
  }

  async getHistories() {
    return this.history;
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

    this.history.push(obj);

    return (obj = {} as HistoryInterface);
  }
}
