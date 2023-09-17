import "./Header.css";
import ChooseFiles from "./ChooseFiles";

export default function Header({ domainUrl, onUploadSuccess, onUploadError }) {
  const countOfFilesSupported = 1;
  const fileFormatsSupported = ["jpeg", "jpg", "png"];

  const invokeUploadImageAPI = async function (data) {
    const url = `${domainUrl}/api/v1/images`;

    try {
      const response = await (
        await fetch(url, {
          method: "POST",
          mode: "cors",
          body: data,
        })
      ).json();
      onUploadSuccess(response.data, response.image);
    } catch (error) {
      console.error(error);
      onUploadError("Unable to upload image!");
    }
  };

  const onUpload = function (files) {
    const formData = new FormData();
    formData.append("image-file", files[0]);
    invokeUploadImageAPI(formData);
  };
  return (
    <div className="header-container">
      <div className="logo-container"></div>
      <div className="upload-button-container">
        <ChooseFiles
          className={"upload-button"}
          count={countOfFilesSupported}
          formats={fileFormatsSupported}
          onUpload={onUpload}
          handleError={onUploadError}
        />
      </div>
    </div>
  );
}
