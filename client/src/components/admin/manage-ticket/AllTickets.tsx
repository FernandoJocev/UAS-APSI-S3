import { useState, useEffect } from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { TicketInterface } from "../../../interfaces/ticket";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const Rupiah = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const AllTickets = () => {
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
    await API.get("ticket/all")
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
    <div>
      <Table<TicketInterface> columns={columns} dataSource={tickets} />
    </div>
  );
};

export default AllTickets;
