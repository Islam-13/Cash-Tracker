import { createPortal } from "react-dom";

function Loader() {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>,
    document.body,
  );
}

export default Loader;
