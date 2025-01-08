import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import Components from "../utils/Components";
import { TicketInterface } from "../interfaces/ticket";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import token from "../utils/Token";

const API = axios.create({
  baseURL: "http://localhost:3000/ticket/",
});

const Rupiah = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const BeliTiket = () => {
  const params = useParams();
  const [ticket, setTicket] = useState<TicketInterface>();
  const [jlhPenumpang, setJlhPenumpang] = useState<number>(0);

  const buyTicket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await API.post(
      `buy/${params.id}`,
      {
        data: {
          jlh_penumpang: jlhPenumpang,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Tiket berhasil dipesan!",
          showConfirmButton: true,
        }).then((confirmed) => {
          if (confirmed) {
            window.location.href = "/";
          }
        });
      })
      .catch((err) => {
        return Swal.fire({
          icon: "error",
          title: "Error :(",
          html: err,
          showCloseButton: true,
        });
      });
  };

  useEffect(() => {
    const getTicket = async () => {
      await API.get(`get/${params.id}`)
        .then((result) => {
          setTicket(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTicket();
  }, [params]);

  return (
    <div className="flex flex-col gap-y-[48px] pt-[24px] pr-[48px] pb-[24px] pl-[48px]">
      <Components.Navbar />

      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2 text-sm opacity-70 font-semibold">
          <h1>
            {ticket?.kota_asal} &rarr; {ticket?.kota_tujuan}
          </h1>

          <h1>{ticket?.tgl_berangkat}</h1>
        </div>

        <form
          className="flex flex-col bg-gray-100 pt-5 pb-5 pr-4 pl-4 rounded-sm shadow-md"
          onSubmit={buyTicket}
        >
          <div className="flex justify-between text-sm">
            <div className="flex flex-col gap-y-2">
              <h1>Tiket Tersedia ({ticket?.tersedia} kursi)</h1>
              <h1>
                {ticket?.kota_asal} &rarr; {ticket?.kota_tujuan}
              </h1>
              <h1>{ticket?.tgl_berangkat}</h1>
              <h1>{ticket?.jadwal}</h1>
            </div>

            <div className="flex flex-col justify-between h-full gap-y-2">
              <h1>{Rupiah.format(ticket?.harga)}</h1>

              <div className="flex items-center justify-between">
                <i
                  className="fa-solid fa-circle-minus text-[16px] cursor-pointer"
                  onClick={() => {
                    setJlhPenumpang(jlhPenumpang - 1);
                  }}
                ></i>
                <h1>{jlhPenumpang}</h1>
                <i
                  className="fa-solid fa-circle-plus text-[16px] cursor-pointer"
                  onClick={() => {
                    setJlhPenumpang(jlhPenumpang + 1);
                  }}
                ></i>
              </div>

              <div className="flex flex-col gap-y-3">
                <button
                  className="bg-[#f7b917] hover:bg-[#dfaf37] transition-all ease-in-out !duration-200 font-bold rounded-full p-2 text-sm"
                  type="submit"
                >
                  Pesan Tiket
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeliTiket;
