import LoaderMini from "./LoaderMini";

function ConfirmDelete({ fn, id, fnLoad, onCloseModal, resourceName }) {
  function handleDelete() {
    fn(id, { onSuccess: onCloseModal });
  }

  return (
    <div className="flex flex-col gap-3 rounded-md bg-white p-3 shadow sm:px-8 sm:py-5">
      <h3 className="text-xl capitalize sm:text-2xl">{resourceName}</h3>
      <p>
        Are you sure you want to {resourceName} permanently? This action cannot
        be undone.
      </p>
      <div className="flex items-center justify-end gap-3">
        <button className="btn cancel" disabled={fnLoad} onClick={onCloseModal}>
          Cancel
        </button>
        <button className="btn danger" disabled={fnLoad} onClick={handleDelete}>
          {fnLoad && <LoaderMini />} Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
