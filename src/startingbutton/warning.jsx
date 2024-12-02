import React from "react";
import image from "../img/warning.png";
import "./warning_style.css";
import "./warning_styleguide.css";

export const Warning = () => {
  return (
    <div className="screen">
      <div className="div">
        <img className="image" alt="Image" src={image} />

        <p className="text-wrapper">
          이 경로는 일부 구간에서 치안이 <br />
          불안정할 수 있습니다. 주의하시기 바랍니다.
        </p>
      </div>
    </div>
  );
};

export default Warning;
