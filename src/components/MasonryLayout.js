import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./MasonryLayout.css";

export default function MasonryLayout({ imageList }) {
  return (
    <div className="masonry-container">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 200: 1, 450: 2, 650: 3, 850: 4 }}
      >
        <Masonry gutter="10px">
          {imageList.map((item) => (
            <div className="masonry-item" key={item._id}>
              <img
                className="masonry-image"
                src={`https://${process.env.REACT_APP_DOMAIN_URL}/${item.path}`}
                alt={item.originalName}
              ></img>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
