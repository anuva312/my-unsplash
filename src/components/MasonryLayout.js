import { useEffect } from "react";
import "./MasonryLayout.css";

export default function MasonryLayout({ imageList }) {
  useEffect(() => {
    const masonryItems = document.querySelectorAll(".masonry-item");

    // Set the height of each masonry item based on its width and aspect ratio of the image
    masonryItems.forEach(function (item) {
      const image = item.closest(".masonry-image");
      if (image) {
        item.style.height = image.offsetWidth * 0.75 + "px";
      } // 0.75 is an example aspect ratio, you can adjust it based on your images
    });
  }, [imageList]);

  return (
    <div className="masonry-container">
      {imageList.map((item) => (
        <div className="masonry-item" key={item._id}>
          <img
            className="masonry-image"
            src={`https://${process.env.REACT_APP_DOMAIN_URL}/${item.path}`}
            alt={item.originalName}
          ></img>
        </div>
      ))}
    </div>
  );
}
