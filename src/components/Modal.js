import OverLay from "./OverLay";
import "./Modal.css";

export default function Modal({
  children,
  modalTitle,
  showCancelButton,
  submitButtonClassName,
  submitButtonTitle = "Submit",
  onHandleSubmitClick,
  onHandleCancelClick,
}) {
  const handleSubmitClick = function (event) {
    event.preventDefault();
    onHandleSubmitClick();
  };

  return (
    <div>
      <OverLay onOverLayClick={onHandleCancelClick} />
      <form className="modal-container" onSubmit={handleSubmitClick}>
        <div className="modal-title">{modalTitle}</div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {showCancelButton ? (
            <button
              type="button"
              className="modal-cancel-button"
              onClick={() => onHandleCancelClick()}
            >
              Cancel
            </button>
          ) : null}
          <button
            type="submit"
            className={`modal-submit-button ${submitButtonClassName || ""}`}
          >
            {submitButtonTitle}
          </button>
        </div>
      </form>
    </div>
  );
}
