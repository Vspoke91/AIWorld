import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";

export function ModalDeleteButton({ inputRequired, onDeleteFunction }) {
  const modalRef = useRef(null);
  const [isDisable, setDisable] = useState(true);

  const closeModal = () => {
    modalRef.current.close();
    modalRef.current.querySelector("input").value = "";
    setDisable(true);
    document.removeEventListener("click", onClickOutsideHandler);
  };

  const openModal = () => {
    modalRef.current.showModal();
    document.addEventListener("click", onClickOutsideHandler);
  };

  function onClickOutsideHandler(event) {
    //mouse pointer coordinates
    const x = event.clientX;
    const y = event.clientY;

    const element = modalRef.current;

    //check if click is outside of element border else it was clicked inside
    if (
      x < element.offsetLeft ||
      x > element.offsetLeft + element.offsetWidth ||
      y < element.offsetTop ||
      y > element.offsetTop + element.offsetHeight
    ) {
      closeModal();
    }
  }

  function onInputChangeHandler(event) {
    if (event.target.value === inputRequired) setDisable(false);
    else setDisable(true);
  }

  function onClickDeleteHandler() {
    onDeleteFunction();
    closeModal();
  }

  return (
    <>
      <button
        className="basic-button palet-red! my-3 ml-[15%] w-[100px]"
        onClick={(e) => {
          /* Explanation for e.stopPropagation()
                when click on button it shows model and adds the listener, 
                but because of propagation after everything was run on click function
                it was also clicking the 'document' witch was outside of the model,
                so it was closing the modal. 
                
                the only way it would work as intended without the stopPropagation() was
                if you position the delete button right were the modal was going to popup.
                */
          e.stopPropagation();
          openModal();
        }}
      >
        Delete
      </button>

      <dialog
        className="basic-dialog-modal bg-white backdrop:bg-[#ffffff54] dark:bg-neutral-950 dark:shadow-neutral-950 dark:backdrop:bg-[#00000054]"
        ref={modalRef}
      >
        <h1 className="w-full border-b-2 py-2 text-center font-bold text-black dark:text-white">
          Confirmation
        </h1>
        <p className="m-4 text-black dark:text-white">
          To confirm, type{" "}
          <strong className="text-black dark:text-white">
            &quot;{inputRequired}&quot;
          </strong>{" "}
          in the box below
        </p>
        <input
          className="basic-input_text palet-white mx-auto block w-[90%] outline outline-red-600 focus:outline-custom_colors_highlight"
          type="text"
          placeholder={inputRequired}
          onChange={onInputChangeHandler}
        />
        <button
          className="basic-button palet-red! mx-auto my-2 block w-[90%] py-2"
          disabled={isDisable}
          onClick={onClickDeleteHandler}
        >
          Delete
        </button>
      </dialog>
    </>
  );
}
ModalDeleteButton.propTypes = {
  inputRequired: PropTypes.string,
  onDeleteFunction: PropTypes.func,
};

export const ModalMessagePopup = forwardRef((props, ref) => {
  const modalRef = useRef(null);
  const [message, setMessage] = useState(null);

  const handleClickOutside = (event) => {
    //mouse pointer coordinates
    const x = event.clientX;
    const y = event.clientY;

    const element = modalRef.current;

    //check if click is outside of element border else it was clicked inside
    if (
      x < element.offsetLeft ||
      x > element.offsetLeft + element.offsetWidth ||
      y < element.offsetTop ||
      y > element.offsetTop + element.offsetHeight
    )
      closeModal();
  };

  const closeModal = () => {
    modalRef.current.close();
    document.removeEventListener("click", handleClickOutside);
  };

  const openModal = () => {
    modalRef.current.showModal();
    document.addEventListener("click", handleClickOutside);
  };

  function openModalWithMessage(newMessage) {
    setMessage(newMessage);
    modalRef.current.showModal();
    document.addEventListener("click", handleClickOutside);
  }

  useImperativeHandle(ref, () => ({
    openModal,
    openModalWithMessage,
  }));

  return (
    <>
      <dialog
        className="basic-dialog-modal bg-white backdrop:bg-[#ffffff54] dark:bg-neutral-950 dark:shadow-neutral-950 dark:backdrop:bg-[#00000054]"
        ref={modalRef}
      >
        <h1 className="w-full border-b-2 py-2 text-center font-bold text-black dark:text-white">
          Message
        </h1>
        <p className="color-text-black m-4">{message}</p>
        <button
          className="basic-button palet-orange! mx-auto my-2 block outline-black dark:outline-white"
          onClick={closeModal}
        >
          Close
        </button>
      </dialog>
    </>
  );
});
ModalMessagePopup.displayName = "ModalMessagePopup";
