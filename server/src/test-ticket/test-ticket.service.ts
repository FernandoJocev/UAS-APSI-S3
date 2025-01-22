import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserTestHistoryService } from '../user-test-history/user-test-history.service';

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

@Injectable()
export class TestTicketService {
  constructor(
    @Inject(forwardRef(() => UserTestHistoryService))
    private history: UserTestHistoryService,
  ) {}

  private readonly excluded: number[] = [];

  private readonly tickets = [
    {
      id: 1,
      tersedia: 50,
      nama_kapal: 'Kapal 1',
      tgl_berangkat: 'Rabu, 25 Desember 2024',
      jadwal: '08:00-09:00',
      harga: 60000,
      kota_asal: 'Pontianak',
      kota_tujuan: 'Sukadana',
    },

    {
      id: 2,
      tersedia: 70,
      nama_kapal: 'Kapal 2',
      tgl_berangkat: 'Kamis, 26 Desember 2024',
      jadwal: '08:00-09:00',
      harga: 60000,
      kota_asal: 'Pontianak',
      kota_tujuan: 'Sukadana',
    },

    {
      id: 3,
      tersedia: 80,
      nama_kapal: 'Kapal 3',
      tgl_berangkat: 'Jumat, 27 Desember 2024',
      jadwal: '12:00-13:00',
      harga: 60000,
      kota_asal: 'Pontianak',
      kota_tujuan: 'Sukadana',
    },

    {
      id: 4,
      tersedia: 100,
      nama_kapal: 'Kapal 4',
      tgl_berangkat: 'Sabtu, 28 Desember 2024',
      jadwal: '14:00-15:00',
      harga: 60000,
      kota_asal: 'Pontianak',
      kota_tujuan: 'Sukadana',
    },

    {
      id: 5,
      tersedia: 48,
      nama_kapal: 'Kapal 5',
      tgl_berangkat: 'Senin, 30 Desember 2024',
      jadwal: '16:00-17:00',
      harga: 60000,
      kota_asal: 'Pontianak',
      kota_tujuan: 'Sukadana',
    },
  ];

  async all() {
    return this.tickets;
  }

  async findOne(id: number): Promise<TicketInterface> | undefined {
    return this.tickets.find((ticket) => ticket.id === id);
  }

  async buyTicket(request: Record<string, any>, id: number, token?: string) {
    try {
      const ticket = this.tickets.find((ticket) => ticket.id === id);

      if (ticket.tersedia > 0) {
        ticket.tersedia -= request.jlh_penumpang;

        await this.history.addHistory(request, ticket, token);

        return JSON.parse('{"message": "Berhasil memesan tiket"}');
      }
    } catch {
      throw new Error();
    }
  }

  async addTicket(request: Record<string, any>) {
    try {
      let obj = {} as TicketInterface;
      let id = 1;

      for (let i = 0; i < this.tickets.length; i++) {
        id++;
      }

      obj['id'] = id;
      obj['tersedia'] = parseInt(request.tersedia);
      obj['nama_kapal'] = request.n_kapal;
      obj['tgl_berangkat'] = request.berangkat;
      obj['jadwal'] = request.berangkat + '-' + request.tiba;
      obj['harga'] = parseInt(request.harga);
      obj['kota_asal'] = request.p_berangkat;
      obj['kota_tujuan'] = request.p_tujuan;

      this.tickets.push(obj);

      obj = {} as TicketInterface;

      return JSON.parse('{"message": "Berhasil menambahkan tiket!"}');
    } catch {
      throw new Error();
    }
  }

  async editTicket(request: Record<string, any>) {
    try {
      const id: number = parseInt(request.id);

      const idx = this.tickets.findIndex((ticket) => ticket.id === id);

      this.tickets[idx].tersedia = parseInt(request.tersedia);
      this.tickets[idx].nama_kapal = request.n_kapal;
      this.tickets[idx].tgl_berangkat = request.berangkat;
      this.tickets[idx].jadwal = request.berangkat + '-' + request.tiba;
      this.tickets[idx].harga = parseInt(request.harga);
      this.tickets[idx].kota_asal = request.p_berangkat;
      this.tickets[idx].kota_tujuan = request.p_tujuan;

      return JSON.parse('{"message": "Berhasil mengedit tiket!"}');
    } catch (e) {
      throw new e();
    }
  }

  async deleteTicket(id: number) {
    try {
      const tickets = [];

      this.excluded.push(id);

      const filtered = this.tickets.filter((ticket) => {
        for (let i = 0; i < this.excluded.length; i++) {
          if (ticket.id === this.excluded[i]) {
            return false;
          }
        }

        return true;
      });

      tickets.push(filtered);

      const response = {
        message: 'Berhasil menghapus tiket!',
        tickets: tickets,
      };

      return response;
    } catch (e) {
      throw new e();
    }
  }
}
