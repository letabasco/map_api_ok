import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

import Directions_list from "./search_list";
import mapSpicy from '../img/mapspicy.png';
import mike from '../img/mike.svg';
import menu from '../img/menu.svg';

const initialData = [];

export const Search = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [inputValue, setInputValue] = useState("");

  const maxLength = 16;
  const displayValue = inputValue.length > maxLength ? inputValue.slice(0, maxLength) + '...' : inputValue;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddData = () => {
    if (inputValue) {
      const newData = {
        date: `${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getDate().toString().padStart(2, '0')}`,
        location: displayValue,
        type: 0
      };

      setData([newData, ...data]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddData();
    }
  };

  const handleRemoveData = (index) => {
    setData(data.filter((_, i) => i !== index));
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
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <input
                  className="search-input"
                  placeholder="장소, 주소 검색"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <img className="image-1" alt="마이크" src={mike} />
                <div className="view-2" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Directions_list 
            data={data} 
            onRemove={handleRemoveData} 
            onClick={() => navigate('/findwaybus')}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
