import Components from "../../utils/Components";
import { Modal } from "antd";
import axios from "axios";
import { FormEvent, useState, useEffect } from "react";
import token from "../../utils/Token";
import Swal from "sweetalert2";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { TicketInterface } from "../../interfaces/ticket";
import FormAddTicket from "../../components/admin/manage-ticket/FormAddTicket";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/ticket/",
  headers: { "Content-Type": "application/json" },
});

const Rupiah = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const ManageTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addTicket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await API.post("admin/add", new FormData(e.currentTarget), {
      headers: { Authorization: "Bearer " + token },
    })
      .then((result) => {
        getTickets();

        Swal.fire({
          icon: "success",
          title: result.data.message,
          showConfirmButton: true,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err,
          showConfirmButton: true,
        });
      });
  };

  const columns: TableProps<TicketInterface>["columns"] = [
    {
      title: "Kapal",
      dataIndex: "nama_kapal",
      key: "kapal",
    },

    {
      title: "Berangkat",
      dataIndex: "kota_asal",
      key: "berangkat",
    },

    {
      title: "Sampai",
      dataIndex: "kota_tujuan",
      key: "sampai",
    },

    {
      title: "Tarif",
      dataIndex: "harga",
      key: "tarif",
      render: (harga) => {
        return Rupiah.format(harga);
      },
    },

    {
      title: "Kapasitas",
      dataIndex: "tersedia",
      key: "kapasitas",
    },

    {
      title: "Aksi",
      key: "aksi",
      render: () => {
        return (
          <Space size="middle">
            <a>Edit</a>
            <a>Hapus</a>
          </Space>
        );
      },
    },
  ];

  const [tickets, setTickets] = useState<TicketInterface[]>([]);

  const getTickets = async () => {
    await API.get("all")
      .then((result) => {
        setTickets(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="flex flex-col gap-y-[48px] pt-[24px] pr-[48px] pb-[24px] pl-[48px]">
      <style scoped>
        {`input {
          padding-left: 16px !important;
        }

        label {
        font-weight: bold;
        font-size: 16px;
        color: #112F45;
        }`}
      </style>

      <Components.Navbar />

      <section id="main" className="flex flex-col gap-y-[24px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-[21px]">Daftar Tiket</h1>

          <button
            className="flex items-center gap-x-[8px] bg-[#214754] rounded-full text-white font-bold pt-[12px] pr-[24px] pb-[12px] pl-[24px]"
            onClick={showModal}
          >
            <i className="ri-add-box-line text-[18px]"></i>
            Tambah Tiket
          </button>

          {/* Add Ticker Modal */}
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            className="!w-fit"
            footer={() => <></>}
          >
            <div className="flex flex-col gap-y-[24px]">
              <h1 className="font-bold text-[27px] text-[#112F45]">
                Tambah Tiket
              </h1>

              <hr />

              {/* Form Section */}
              <FormAddTicket
                addTicket={addTicket}
                handleCancel={handleCancel}
              />
              {/* End of Form Section */}
            </div>
          </Modal>
        </div>

        <div>
          <Table<TicketInterface> columns={columns} dataSource={tickets} />
        </div>
      </section>
    </div>
  );
};

export default ManageTicket;
