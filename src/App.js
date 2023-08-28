import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import MasonryLayout from "./components/MasonryLayout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

let imagesAPIInvoked = false;

function App() {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const onGetImagesOnSuccess = function (data) {
      if (data?.images) {
        data.images.sort(
          (a, b) => new Date(b.lastUpdatedTime) - new Date(a.lastUpdatedTime)
        );
        console.log("images data", data);
        setAllImages(data.images);
        setFilteredImages(data.images);
      }
    };
    const getAllImages = async function () {
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
        onGetImagesOnSuccess(response.data);
      } catch (error) {
        console.error(error);
        onError("Unable to get images image!");
      }
    };

    getAllImages();
  }, []);

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

  return (
    <div className="my-unsplash">
      <ToastContainer />
      <MasonryLayout imageList={filteredImages}></MasonryLayout>
    </div>
  );
}

export default App;
