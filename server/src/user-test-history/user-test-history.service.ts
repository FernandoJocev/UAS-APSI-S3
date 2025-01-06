import { Injectable } from '@nestjs/common';

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

@Injectable()
export class UserTestHistoryService {
  private readonly history = [
    {
      id: 1,
      user_id: 1,
      tiket_id: 1,
      qty: 2,
    },
  ];

  async getHistories() {
    return this.history;
  }

  async addHistory(request: Record<string, any>, ticket: TicketInterface) {
    let obj = {} as HistoryInterface;
    let id = 1;

    obj['id'] = id += 1;
    obj['user_id'] = request.token;
    obj['tiket_id'] = ticket.id;
    obj['qty'] = request.jlh_penumpang;

    this.history.push(obj);

    return (obj = {} as HistoryInterface);
  }
}
