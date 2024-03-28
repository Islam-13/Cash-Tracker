import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import supabase from "../services/supabase";
import { LuFileBarChart2 } from "react-icons/lu";
import {
  HiMiniBars3,
  HiOutlineArrowRightOnRectangle,
  HiOutlineHome,
  HiOutlineUser,
  HiXMark,
} from "react-icons/hi2";

import { useEffect, useRef, useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    localStorage.removeItem("userId");
    toast.success("Signed out successfully!!");
    navigate("/signin");

    if (error) throw new Error(error.message);
  }

  function handleOpenMenu() {
    setIsOpen(true);
    ref.current.style.left = "0";
  }

  function handleCloseMenu() {
    setIsOpen(false);
    ref.current.style.left = "-295px";
  }

  useEffect(function () {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handleCloseMenu();
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <>
      {isOpen && <div className="menu-overlay"></div>}
      <nav className="bg-[#325765] text-green-50">
        <div className="mx-auto flex max-w-[94%] flex-wrap items-center justify-between gap-3 tab:max-w-[80%] tab:p-0">
          <Link to="/" className="flex items-center p-1 text-xl sm:text-2xl">
            <img src="logo.png" alt="logo" className=" w-[50px]" />{" "}
            <span className=" text-[12px]">Cash Tracker</span>
          </Link>

          <button className="tab:hidden" onClick={handleOpenMenu}>
            <HiMiniBars3 className=" text-3xl" />
          </button>

          <div
            ref={ref}
            className="menu-sm tab:flex tab:grow tab:justify-between"
          >
            <div className="flex items-center justify-between px-3 tab:hidden">
              <Link
                to="/"
                className="flex items-center p-1 text-xl sm:text-2xl"
              >
                <img src="logo.png" alt="logo" className=" w-[50px]" />{" "}
                <span className=" text-[12px]">Cash Tracker</span>
              </Link>

              <button className="text-3xl" onClick={handleCloseMenu}>
                <HiXMark />
              </button>
            </div>

            <hr className="border-green-500 tab:hidden" />

            <ul className="grow items-center justify-center gap-3 tab:flex">
              <li className="mb-2 text-[20px] capitalize tracking-wider tab:my-0">
                <NavLink
                  to="/"
                  className="nav-link duration-500 hover:text-green-400 tab:px-2"
                >
                  <HiOutlineHome className="tab:hidden" /> home
                </NavLink>
              </li>

              <li className="mb-2 text-[20px] capitalize tracking-wider tab:my-0">
                <NavLink
                  to="/data"
                  className="nav-link duration-500 hover:text-green-400 tab:rounded-md tab:px-2"
                >
                  <LuFileBarChart2 className="tab:hidden" /> Data
                </NavLink>
              </li>

              <li className="mb-2 text-[20px] capitalize tracking-wider tab:my-0">
                <NavLink
                  to="/profile"
                  className="nav-link duration-500 hover:text-green-400 tab:rounded-md tab:px-2"
                >
                  <HiOutlineUser className="tab:hidden" /> Profile
                </NavLink>
              </li>
            </ul>

            <ul className=" items-center gap-2 tab:flex">
              <li className="my-2 text-[20px] ">
                <button
                  className="nav-link p-2 font-semibold capitalize tracking-wider text-red-500 duration-500"
                  onClick={signOut}
                >
                  <HiOutlineArrowRightOnRectangle className="tab:hidden" /> log
                  out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
