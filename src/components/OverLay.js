import "./OverLay.css";

export default function OverLay({ onOverLayClick, overLayClassName }) {
  return (
    <div
      className={`overlay-container ${overLayClassName || ""}`}
      onClick={onOverLayClick}
    ></div>
  );
}
