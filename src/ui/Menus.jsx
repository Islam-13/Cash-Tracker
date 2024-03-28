import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

const MenusContext = createContext();

function Menus({ children }) {
  const [openID, setOpenID] = useState("");

  const open = setOpenID;
  const close = () => setOpenID("");

  return (
    <MenusContext.Provider value={{ openID, open, close }}>
      {children}
    </MenusContext.Provider>
  );
}

function ToggleBtn({ id }) {
  const { openID, open, close } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    openID === "" || openID !== id ? open(id) : close();
  }

  return (
    <button onClick={handleClick}>
      <HiEllipsisVertical className=" text-2xl" />
    </button>
  );
}

function List({ id, children }) {
  const { openID, close } = useContext(MenusContext);
  const ref = useRef(null);

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", handleClick);

      return () => document.addEventListener("click", handleClick);
    },
    [close],
  );

  if (openID !== id) return null;

  return (
    <ul
      className="absolute right-[30px] top-0 z-20 divide-y-2 rounded border border-gray-300 bg-white p-2 shadow"
      ref={ref}
    >
      {children}
    </ul>
  );
}

function Button({ children, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li
      onClick={handleClick}
      className="cursor-pointer px-2 py-1 hover:bg-stone-200"
    >
      <button className="btn flex items-center gap-2 tracking-wide text-stone-600">
        {children}
      </button>
    </li>
  );
}

Menus.ToggleBtn = ToggleBtn;
Menus.List = List;
Menus.Button = Button;

export default Menus;
