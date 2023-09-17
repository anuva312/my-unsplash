import "./Loader.css";
import OverLay from "./OverLay";

export default function Loader({
  loaderContainerClassName,
  loaderClassName,
  overLayClassName,
  showOverLay = true,
}) {
  return (
    <div className={`loader-container ${loaderContainerClassName || ""}`}>
      {showOverLay ? (
        <OverLay overLayClassName={overLayClassName}></OverLay>
      ) : (
        ""
      )}
      <div className={`loader ${loaderClassName || ""}`}></div>
    </div>
  );
}
