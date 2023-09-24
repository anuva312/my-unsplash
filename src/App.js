import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MasonryLayout from "./components/MasonryLayout";
import Header from "./components/Header";
import Loader from "./components/Loader";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

let imagesAPIInvoked = false;
let searchValue = "";

function App() {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  let domainURL = `https://${process.env.REACT_APP_PROD_URL}`;

  if (process.env.NODE_ENV === "development") {
    domainURL = `http://${process.env.REACT_APP_DEV_URL}`;
  }

  const onGetImagesSuccess = function (data) {
    if (data?.images) {
      data.images.sort(
        (a, b) => new Date(b.lastUpdatedTime) - new Date(a.lastUpdatedTime)
      );
      setAllImages(data.images);
      filterImages(searchValue, data.images);
    }
  };
  const getAllImages = useCallback(async () => {
    const url = `${domainURL}/api/v1/images`;
    setShowLoader(true);
    imagesAPIInvoked = true;
    try {
      const response = await (
        await fetch(url, {
          method: "GET",
          mode: "cors",
        })
      ).json();
      setShowLoader(false);
      onGetImagesSuccess(response.data);
    } catch (error) {
      console.error(error);
      setShowLoader(false);
      onError("Unable to get images!");
    }
  }, [domainURL]);

  useEffect(() => {
    if (!imagesAPIInvoked) getAllImages();
  }, [getAllImages]);

  const onError = function (message) {
    toast.error(message, {
      theme: "colored",
    });
  };

  const onSuccess = function (message) {
    toast.success(message, {
      theme: "colored",
    });
  };

  const onUploadSuccess = function () {
    setAllImages([]);
    getAllImages();
  };

  const onDeleteImageSuccess = function () {
    onSuccess("Image Deleted Successfully");
    getAllImages();
  };

  const filterImages = function (newVal, images = allImages) {
    const filteredImages = images.filter((image) =>
      image.originalName.toLowerCase().includes(newVal.toLowerCase())
    );
    setFilteredImages(filteredImages);
  };

  return (
    <div className="my-unsplash">
      <ToastContainer />
      <Header
        domainUrl={domainURL}
        onUploadError={onError}
        onUploadSuccess={onUploadSuccess}
        handleSearchChange={(event) => {
          const newValue = event.target.value;
          searchValue = newValue;
          filterImages(newValue);
        }}
      ></Header>

      {!filteredImages?.length ? (
        <div className="no-data-message">No images to show...</div>
      ) : null}
      <MasonryLayout
        domainUrl={domainURL}
        imageList={filteredImages}
        onDeleteImageSuccess={onDeleteImageSuccess}
        onDeleteImageError={() => onError("Unable to delete the image")}
      ></MasonryLayout>

      {showLoader ? (
        <Loader loaderContainerClassName="main-loader-container"></Loader>
      ) : null}
    </div>
  );
}

export default App;
