import { cloneElement, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [close],
  );

  if (openName !== name) return null;

  return createPortal(
    <div className="bg-teal-0 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div
        className="relative w-[85%] max-w-[450px] sm:max-w-[560px] "
        ref={ref}
      >
        <button
          onClick={close}
          className="absolute right-2 top-2 text-2xl text-red-700"
        >
          <HiXMark />
        </button>

        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
