import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Modal from "./Modal";
import Loader from "./Loader";
import "./MasonryLayout.css";

export default function MasonryLayout({
  domainUrl,
  imageList,
  onDeleteImageSuccess,
  onDeleteImageError,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isWaitingDeletion, setIsWaitingDeletion] = useState(false);

  const invokeDeleteAPI = async function (id) {
    const url = `${domainUrl}/api/v1/images/${id}`;
    setIsWaitingDeletion(true);
    try {
      await fetch(url, {
        method: "DELETE",
        mode: "cors",
      });
      setIsWaitingDeletion(false);
      onDeleteImageSuccess();
    } catch (error) {
      console.error(error);
      setIsWaitingDeletion(false);
      onDeleteImageError();
    }
  };

  const onDeleteImageConfirm = function () {
    invokeDeleteAPI(showDeleteModal);
    setShowDeleteModal(false);
  };

  const onDeleteImageCancel = function () {
    setShowDeleteModal(false);
  };

  const handleDeleteImage = function (id) {
    setShowDeleteModal(id);
  };

  const showLoader = function(){
    return (
      <Loader loaderContainerClassName="main-loader-container"></Loader>
    )
  }

  return (
    <div className="masonry-container">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 200: 1, 450: 2, 650: 3, 850: 4 }}
      >
        <Masonry gutter="20px">
          {imageList.map((item) => (
            <div className="masonry-item" key={item._id}>
              <div className="masonry-item-overlay">
                <div>
                  <button
                    type="button"
                    className="masonry-item-delete-btn"
                    onClick={() => handleDeleteImage(item._id)}
                  >
                    delete
                  </button>
                </div>
                <div className="masonry-item-name">{item.originalName}</div>
              </div>
              <img
                className="masonry-image"
                src={`${domainUrl}${item.path}`}
                alt={item.originalName}
              ></img>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {showDeleteModal ? (
        <Modal
          modalTitle="Are you sure?"
          showCancelButton={true}
          submitButtonClassName="delete-confirm-button"
          submitButtonTitle="Confirm"
          onHandleSubmitClick={() => onDeleteImageConfirm()}
          onHandleCancelClick={() => onDeleteImageCancel()}
        >
          Please confirm if you want to delete the image
        </Modal>
      ) : null}
      {isWaitingDeletion ? showLoader() : null}
    </div>
  );
}
