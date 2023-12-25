import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MasonryLayout from "./components/MasonryLayout";
import Header from "./components/Header";
import Loader from "./components/Loader";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

let isImagesAPIInvoked = false;
let searchValue = "";

function App() {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [isWaitingForImages, setIsWaitingForImages] = useState(false);

  let domainURL = `https://${process.env.REACT_APP_PROD_URL}`;

  if (process.env.NODE_ENV === "development") {
    domainURL = `http://${process.env.REACT_APP_DEV_URL}`;
  }

  const getAllImages = useCallback(async () => {
    const url = `${domainURL}/api/v1/images`;
    setIsWaitingForImages(true);
    isImagesAPIInvoked = true;
    try {
      const response = await (
        await fetch(url, {
          method: "GET",
          mode: "cors",
        })
      ).json();
      setIsWaitingForImages(false);
      onGetImagesSuccess(response.data?.images);
    } catch (error) {
      console.error(error);
      setIsWaitingForImages(false);
      onError("Unable to get images!");
    }
  }, [domainURL]);

  const onGetImagesSuccess = function (images) {
    if (images) {
      images.sort(
        (a, b) => new Date(b.lastUpdatedTime) - new Date(a.lastUpdatedTime)
      );
      setAllImages(images);
      filterImages(searchValue, images);
    }
  };

  const filterImages = function (newVal, images = allImages) {
    const filteredImages = images.filter((image) =>
      image.originalName.toLowerCase().includes(newVal.toLowerCase())
    );
    setFilteredImages(filteredImages);
  };

  useEffect(() => {
    if (!isImagesAPIInvoked) getAllImages();
  }, [getAllImages]);

  const onDeleteImageSuccess = function () {
    onSuccess("Image Deleted Successfully");
    getAllImages();
  };

  const onSuccess = function (message) {
    toast.success(message, {
      theme: "colored",
    });
  };

  const onError = function (message) {
    toast.error(message, {
      theme: "colored",
    });
  };

  const onUploadSuccess = function () {
    setAllImages([]);
    getAllImages();
  };


  const handleNoImagesAvailable = function () {
    return !filteredImages?.length ? (
      <div className="no-data-message">No images to show...</div>
    ) : null
  }

  const showLoader = function(){
    return (
      <Loader loaderContainerClassName="main-loader-container"></Loader>
    )
  }

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

      {handleNoImagesAvailable()}
      <MasonryLayout
        domainUrl={domainURL}
        imageList={filteredImages}
        onDeleteImageSuccess={onDeleteImageSuccess}
        onDeleteImageError={() => onError("Unable to delete the image")}
      ></MasonryLayout>

      {isWaitingForImages ? showLoader() : null}
    </div>
  );
}

export default App;
