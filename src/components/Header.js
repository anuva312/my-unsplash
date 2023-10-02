import "./Header.css";
import ChooseFiles from "./ChooseFiles";
import Modal from "./Modal";
import { useState } from "react";

export default function Header({
  domainUrl,
  onUploadSuccess,
  onUploadError,
  handleSearchChange,
  defaultSearchValue,
}) {
  const countOfFilesSupported = 1;
  const fileFormatsSupported = ["jpeg", "jpg", "png"];

  const [photoLabel, setPhotoLabel] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showUploadLoader, setShowUploadLoader] = useState(false);

  const invokeUploadImageAPI = async function (data) {
    const url = `${domainUrl}/api/v1/images`;
    setShowUploadLoader(true);
    try {
      const response = await (
        await fetch(url, {
          method: "POST",
          mode: "cors",
          body: data,
        })
      ).json();
      setShowUploadModal(false);
      setShowUploadLoader(false);
      clearUploadedFiles();
      onUploadSuccess(response.data, response.image);
    } catch (error) {
      console.error(error);
      setShowUploadLoader(false);
      clearUploadedFiles();
      onUploadError("Unable to upload image!");
    }
  };

  const clearUploadedFiles = function () {
    setPhotoLabel("");
    setUploadedFile(null);
  };

  const onUpload = function (files) {
    setPhotoLabel(files[0].name);
    setUploadedFile(files[0]);
  };

  const handlePhotoLabelChange = function (event) {
    // TODO: Add validation
    setPhotoLabel(event?.target?.value);
  };

  const onUploadConfirm = function () {
    if (uploadedFile && photoLabel) {
      const formData = new FormData();
      formData.append("image-file", uploadedFile);
      formData.append("image-name", photoLabel);
      invokeUploadImageAPI(formData);
    }
  };

  const onUploadCancel = function () {
    setShowUploadModal(false);
    clearUploadedFiles();
  };

  return (
    <div>
      {showUploadModal ? (
        <Modal
          modalTitle="Add a new photo"
          showCancelButton={true}
          submitButtonClassName="upload-button"
          submitButtonTitle="Submit"
          onHandleSubmitClick={() => onUploadConfirm()}
          onHandleCancelClick={() => onUploadCancel()}
          showLoader={showUploadLoader}
          loaderMessage="Uploading..."
        >
          <div className="upload-modal-label-container">
            <div className="upload-photo-label">
              <label htmlFor="photo-label">Label</label>
            </div>
            <input
              name="photo-label"
              className="upload-photo-label-input"
              value={photoLabel}
              onChange={handlePhotoLabelChange}
            ></input>
          </div>
          <div className="upload-button-container">
            <ChooseFiles
              className={"upload-button"}
              count={countOfFilesSupported}
              formats={fileFormatsSupported}
              onUpload={onUpload}
              handleError={onUploadError}
            />
          </div>
        </Modal>
      ) : null}
      <div className="header-container">
        <div className="left-header-inner-container">
          <div className="logo-container">
            <img
              src={`/images/my_unsplash_logo.svg`}
              alt="my-unsplash-logo"
            ></img>
          </div>
          <div className="search-box-container">
            <input
              name="search-box"
              className="search-input"
              onChange={handleSearchChange}
              placeholder="Search by name"
            ></input>
          </div>
        </div>
        <div>
          <button
            className="upload-button"
            onClick={() => setShowUploadModal(true)}
          >
            Add a photo
          </button>
        </div>
      </div>
    </div>
  );
}
