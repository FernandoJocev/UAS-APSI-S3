import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import token from "../utils/Token";
import { UserInterface } from "../interfaces/oauth";
import { checkToken } from "../utils/CheckToken";
import { Link } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState<UserInterface>();

  const getUser = () => {
    const user = jwtDecode(token!);
    setUser(user);
  };

  useEffect(() => {
    if (checkToken() != null && checkToken() != "expired") {
      getUser();
    } else {
      localStorage.removeItem("oauth_token");
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div
      className="w-full sticky flex items-center justify-between"
      id="navbar"
    >
      <Link to={"/"} className="text-title font-bold">
        App Logo
      </Link>

      <div className="flex items-center">
        {user?.role === "admin" ? (
          <div className="flex mr-[18px] gap-x-[18px] font-[700] items-center">
            <Link to={"/admin"}>Dasboard</Link>

            <Link to={"/admin/validasi-reservasi"}>Validasi Reservasi</Link>

            <Link to={"/admin/kelola-tiket"}>Kelola Tiket</Link>

            <div
              className="flex gap-x-[8px] items-center cursor-pointer relative"
              onClick={(): void => {
                const el = document.getElementById("overlay")?.classList;

                return el?.contains("hide")
                  ? el?.remove("hide")
                  : el?.add("hide");
              }}
            >
              <img
                src={user.picture}
                alt="profile"
                referrerPolicy="no-referrer"
                className="!w-[28px] rounded-full"
              />

              <h1>{user.name}</h1>

              <div
                id="overlay"
                className="hide bg-slate-200 w-full h-fit p-2 absolute text-center bottom-[-50px] font-bold hover:bg-slate-300 transition-all ease-in-out !duration-200"
              >
                <h1
                  onClick={(): void => {
                    localStorage.removeItem("oauth_token")!;
                    localStorage.removeItem("token")!;

                    window.location.href = "/masuk";
                  }}
                >
                  Logout
                </h1>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {user != null && user.role != "admin" ? (
          <div className="flex items-center gap-x-[18px]">
            <Link to={"/history"} className="font-[700]">
              History Bookingan
            </Link>

            <hr className="bg-black opacity-30 w-[2px] h-[24px]" />

            <div
              className="flex gap-x-[8px] items-center cursor-pointer relative"
              onClick={(): void => {
                const el = document.getElementById("overlay")?.classList;

                return el?.contains("hide")
                  ? el?.remove("hide")
                  : el?.add("hide");
              }}
            >
              <img
                src={user.picture}
                alt="profile"
                referrerPolicy="no-referrer"
                className="!w-[28px] rounded-full"
              />

              <h1>{user.name}</h1>

              <div
                id="overlay"
                className="hide bg-slate-200 w-full h-fit p-2 absolute text-center bottom-[-50px] font-bold hover:bg-slate-300 transition-all ease-in-out !duration-200"
              >
                <h1
                  onClick={(): void => {
                    localStorage.removeItem("oauth_token")!;
                    localStorage.removeItem("token")!;

                    window.location.href = "/masuk";
                  }}
                >
                  Logout
                </h1>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {user == null ? (
          <button
            onClick={() => {
              window.location.href = "/masuk";
            }}
            className="flex items-center gap-x-[8px] bg-[#F7F1F1] pt-[4px] pr-[18px] pb-[4px] pl-[18px] rounded-full cursor-pointer hover:bg-white hover:shadow-md transition-all ease-in-out !duration-300"
          >
            <i className="ri-account-circle-fill !text-[24px]"></i>

            <h1 className="font-[700]">Login</h1>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
