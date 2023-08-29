import "./OverLay.css";

export default function OverLay({ onOverLayClick }) {
  return <div className="overlay-container" onClick={onOverLayClick}></div>;
}
