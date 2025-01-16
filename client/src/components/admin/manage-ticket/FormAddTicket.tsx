import { FormEvent } from "react";

interface FormAddTicketPropsInterface {
  addTicket: (e: FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

const FormAddTicket: React.FC<FormAddTicketPropsInterface> = ({
  addTicket,
  handleCancel,
}) => {
  return (
    <>
      {/* Form Section */}
      <form className="flex flex-col gap-y-[24px]" onSubmit={addTicket}>
        {/* First Row */}
        <div className="grid grid-cols-3 gap-x-[24px]">
          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="n_kapal">Nama Kapal</label>
            <input
              type="text"
              name="n_kapal"
              placeholder="Masukkan nama kapal"
              className="w-full text-p"
            />
          </div>

          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="k_kapal">Kelas Kapal</label>
            <input
              type="text"
              name="k_kapal"
              placeholder="Pilih kelas kapal"
              className="w-full text-p"
            />
          </div>

          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="jlh_tersedia">Kapasitas Kapal</label>
            <input
              type="number"
              name="tersedia"
              placeholder="0"
              className="w-full text-p"
            />
          </div>
        </div>
        {/* End of First Row */}

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-x-[24px]">
          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="n_kapal">Pelabuhan Berangkat</label>
            <input
              type="text"
              name="p_berangkat"
              placeholder="Pilih asal keberangkatan"
              className="w-full text-p"
            />
          </div>

          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="n_kapal">Pelabuhan Tujuan</label>
            <input
              type="text"
              name="p_tujuan"
              placeholder="Pilih pelabuhan tujuan"
              className="w-full text-p"
            />
          </div>
        </div>
        {/* End of Second Row */}

        {/* Third Row */}
        <div className="grid grid-cols-2 gap-x-[24px]">
          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="n_kapal">Waktu Keberangkatan</label>
            <input
              type="text"
              name="berangkat"
              placeholder="Pilih waktu keberangkatan"
              className="w-full text-p"
            />
          </div>

          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="n_kapal">Waktu Tiba</label>
            <input
              type="text"
              name="tiba"
              placeholder="Pilih waktu tiba"
              className="w-full text-p"
            />
          </div>
        </div>
        {/* End of Third Row */}

        {/* Fourth Row */}
        <div className="grid grid-cols-3 gap-x-[24px]">
          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="n_kapal">Tarif Normal</label>
            <input
              type="number"
              name="harga"
              placeholder="0"
              className="w-full text-p"
            />
          </div>

          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="k_kapal">Tarif Khusus (Opsional)</label>
            <input
              type="number"
              name="harga_khusus"
              placeholder="Pilih kelas kapal"
              className="w-full text-p"
            />
          </div>

          <div className="relative w-full flex flex-col gap-y-[12px]">
            <label htmlFor="jlh_tersedia">Keterangan (Opsional)</label>
            <input
              type="text"
              name="keterangan"
              placeholder="Keterangan..."
              className="w-full text-p"
            />
          </div>
        </div>
        {/* End of Fourth Row */}

        {/* Button Row */}
        <div className="flex gap-x-[8px]">
          <button
            className="bg-[#EC8B32] rounded-[8px] p-[8px] text-white font-bold"
            type="submit"
          >
            Tambah Tiket
          </button>

          <button
            className="bg-transparent border border-solid border-slate-700 rounded-[8px] p-[8px] font-bold"
            type="button"
            onClick={handleCancel}
          >
            Batal
          </button>
        </div>
        {/* End of Button Row */}
      </form>
    </>
  );
};

export default FormAddTicket;
