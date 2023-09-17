import OverLay from "./OverLay";
import Loader from "./Loader";
import "./Modal.css";

export default function Modal({
  children,
  modalTitle,
  showCancelButton,
  submitButtonClassName,
  submitButtonTitle = "Submit",
  onHandleSubmitClick,
  onHandleCancelClick,
  submitDisableCondition,
  showLoader,
  loaderMessage = "Loading...",
}) {
  const handleSubmitClick = function (event) {
    event.preventDefault();
    onHandleSubmitClick();
  };

  return (
    <div className="modal-outer-container">
      <OverLay onOverLayClick={onHandleCancelClick} />
      <form className="modal-container" onSubmit={handleSubmitClick}>
        <div className="modal-title">
          {showLoader ? loaderMessage : modalTitle}
        </div>
        <div className="modal-body">
          {showLoader ? <Loader showOverLay={false}></Loader> : children}
        </div>
        {!showLoader ? (
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
              disabled={submitDisableCondition}
            >
              {submitButtonTitle}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
