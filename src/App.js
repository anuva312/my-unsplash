import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MasonryLayout from "./components/MasonryLayout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

let imagesAPIInvoked = false;

function App() {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  const onGetImagesSuccess = function (data) {
    if (data?.images) {
      data.images.sort(
        (a, b) => new Date(b.lastUpdatedTime) - new Date(a.lastUpdatedTime)
      );
      console.log("images data", data);
      setAllImages(data.images);
      setFilteredImages(data.images);
    }
  };
  const getAllImages = useCallback(async () => {
    const url = `https://${process.env.REACT_APP_DOMAIN_URL}/api/v1/images`;
    if (imagesAPIInvoked) return;

    imagesAPIInvoked = true;
    try {
      const response = await (
        await fetch(url, {
          method: "GET",
          mode: "cors",
        })
      ).json();
      onGetImagesSuccess(response.data);
    } catch (error) {
      console.error(error);
      onError("Unable to get images image!");
    }
  }, []);

  useEffect(() => {
    getAllImages();
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

  const onDeleteImageSuccess = function () {
    onSuccess("Image Deleted Successfully");
    getAllImages();
  };

  return (
    <div className="my-unsplash">
      <ToastContainer />
      <MasonryLayout
        imageList={filteredImages}
        onDeleteImageSuccess={onDeleteImageSuccess}
        onDeleteImageError={() => onError("Unable to delete the image")}
      ></MasonryLayout>
    </div>
  );
}

export default App;
