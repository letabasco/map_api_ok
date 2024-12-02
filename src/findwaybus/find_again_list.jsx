//검색 후 장소 목록 박스 
import React from "react";
import "./find_again";
import art from '../img/arrow-right-top.svg';

function Find_again_list(props) {
  const { data } = props;  // 여러 항목을 받음

  return (
    <div className="place-list-wrapper">
      {data.map((place, index) => {
        const { name, purpose, addr, km } = place; 

        // 각 항목을 렌더링하는 부분
        return (
          <div className="place-list" key={index}>
            <div className="place-info">
              <div className="header-group">
                <h3>{name}</h3>
                <p className="purpose">{purpose}</p>
              </div>
              <p>{addr}</p>
              <p>{km}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Find_again_list;
