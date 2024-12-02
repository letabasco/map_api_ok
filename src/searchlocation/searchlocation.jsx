import React from "react";
import menuIcon from "../img/menu.svg"; // SVG를 일반 이미지로 불러오기
import arrowLeftIcon from "../img/longarrow-right.png"; // PNG 아이콘
import mapSpicyImg from "../img/mapspicy.png";
import closeIcon from "../img/x.svg";
import timeIcon from "../img/time.png";
import line2Svg from "../img/Line 2.svg";

import "./searchlocation_style.css";
import "./searchlocation_styleguide.css";

export const Searchlocation = () => {
  // 반복되는 데이터를 배열로 정리
  const locations = [
    {
      date: "10.27",
      address: "대구 달서구 신당동 183",
      groupIcon: timeIcon,
      closeIcon: closeIcon,
    },
    {
      date: "10.27",
      address: "대실역 대구 2호선",
      groupIcon: timeIcon,
      closeIcon: closeIcon,
    },
  ];

  return (
    <div className="div-wrapper">
      <div className="div">
        {/* Line 2 이미지 */}
        <img className="line" alt="Line" src={line2Svg} />

        {/* 상단 View */}
        <div className="view">
          <div className="map-spicy">
            <div className="text-wrapper">map spicy</div>
          </div>

          <div className="image-wrapper">
            <img className="image" alt="Map Spicy" src={mapSpicyImg} />
          </div>

          <img src={menuIcon} className="menu-instance" alt="Menu Icon" />
        </div>

        {/* 중간 View */}
        <div className="view-2">
          <div className="frame">
            <div className="overlap-group">
              <div className="frame-wrapper">
                <div className="frame-2" />
              </div>
              <div className="text-wrapper-2">여기에 입력이 되는 거임</div>
            </div>
          </div>

          <div className="frame-3">
            <div className="overlap">
              <img className="img" alt="Close Icon" src={closeIcon} />
            </div>
            <div className="text-wrapper-3">다이소 대구 신당점</div>
          </div>

          <div className="overlap-2">
            <img className="group" alt="Time Icon" src={timeIcon} />
            <img className="vector-2" alt="Vector Icon" src={timeIcon} />
          </div>

          <div className="overlap-3">
            <img src={arrowLeftIcon} className="arrow-left" alt="Arrow Left" />
          </div>
        </div>

        {/* 하단 Location List */}
        <div className="div-2">
          {locations.map((location, index) => (
            <div key={index} className={`element-${index + 1}`}>
              <div className="text-wrapper-4">{location.date}</div>
              <img className="group-2" alt="Group Icon" src={location.groupIcon} />
              <div className="text-wrapper-5">{location.address}</div>
              <img
                className={`vector-${index + 3}`}
                alt="Close Icon"
                src={location.closeIcon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Searchlocation;
