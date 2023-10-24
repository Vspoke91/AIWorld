import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";

export function ModalDeleteButton({ inputRequired, onDeleteFunction }) {
  const modalRef = useRef(null);
  const [isDisable, setDisable] = useState(true);

  const closeModal = () => {
    modalRef.current.close();
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
        className="basic-button my-0 mb-3 ml-[15%] w-[100px] bg-[#ad2727] hover:bg-[#e21f1f]"
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

      <dialog ref={modalRef}>
        <p>{`To confirm, type "${inputRequired}" in the box below`}</p>
        <input
          type="text"
          placeholder={inputRequired}
          onChange={onInputChangeHandler}
        />
        <button disabled={isDisable} onClick={onClickDeleteHandler}>
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
      <dialog ref={modalRef}>
        <p>{message}</p>
        <button onClick={closeModal}>Close</button>
      </dialog>
    </>
  );
});
ModalMessagePopup.displayName = "ModalMessagePopup";
