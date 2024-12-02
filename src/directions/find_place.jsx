//검색 후 지도에서 장소 위치와 장소 목록 부분 
import React, { useState } from "react";  
import "./find_place.css";
import Find_place_list from "./find_place_list";
import MapComponent from "../main/MapComponent";

import mapSpicy from '../img/mapspicy.png';
import mike from '../img/mike.svg';
import menu from '../img/menu.svg';
import x from '../img/x.svg';
import sangsaelist from '../img/sangsaelist.svg';
import map from '../img/map.svg';

//장소 정보 list
const place_list = [
  { name: '다이소 대구 신당점', purpose: '생활용품', addr: '대구 달서구 계대동문로 25-1', km: '1.2km' },
  { name: '다이소 대구 어쩌구점', purpose: '생활용품', addr: '대구 달서구 계대정문로 25-1', km: '1.2km' }
];

export const Find_place = () => {
  const [name, setName] = useState(place_list[0]);
  const [purpose, setPurpose] = useState(place_list[1]);
  const [addr, setAddr] = useState(place_list[2]);
  const [km, setKm] = useState(place_list[3]);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="screen">
      <div className="overlap-wrapper">
        
        <div className="overlap">
          <div className="view">
            <div className="map-spicy">
              <div className="text-wrapper">map spicy</div>
            </div>
            <img className="menu" alt="메뉴 아이콘" src={menu} />
            <div className="image-wrapper">
              <img className="image" alt="mapSpicy_logo" src={mapSpicy} />
            </div>
            
            <button className="overlap-group-wrapper-1" onClick={handleClick}>
                <img 
                  className="image-3" 
                  alt={isClicked ? "map" : "sangsaelist"} 
                  src={isClicked ? map : sangsaelist } />
                <div className="text-wrapper-1"> {isClicked ? "지도" : "목록"} </div>
            </button> 
            <div className="line"></div>
            <div className="overlap-group-wrapper">
              
              <div className="overlap-group">
                <input
                  className="search-input"
                  placeholder="장소, 주소 검색"
                />
                <img className="image-1" alt="마이크" src={mike} />
                <div className="view-2" />
              </div>
            </div>
            <img className="image-2" alt="x" src={x} />
          </div>
        </div>
      </div>
      <div>
      {isClicked ? (
        <>
          <div className="map">
            <div className="overlap-wrapper">
              <MapComponent className="map-component" />
            </div>
          </div>
        </>
      ) : <Find_place_list data={place_list} />}
        </div>
      </div>
  );
};

export default Find_place;
