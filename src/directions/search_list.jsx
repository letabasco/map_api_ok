import React from "react";
import "./search.css";
import x from '../img/x.svg';
import place from '../img/place.svg';
import clock from '../img/clock.svg';

function Directions_list(props) {
  const { data, onRemove, onClick } = props; // onClick 추가

  return (
    <div className="directions-list-wrapper">
      {data.map((item, index) => (
        <div 
          key={index} 
          className="element-2" 
          style={{"--index": index}}
        >
          {item.type === 0 ? (
            <>
              <img className="image-3" alt="place" src={place} />
              <div className="text-wrapper-2">{item.date}</div>
              <img 
                className="image-2" 
                alt="x" 
                src={x} 
                onClick={() => onRemove(index)} 
                style={{ cursor: 'pointer' }}
              />
              <div 
                className="text-wrapper-3"
                onClick={() => onClick(item.location)} // 클릭 시 onClick 호출
                style={{ cursor: 'pointer' }}
              >
                {item.location}
              </div>
            </>
          ) : item.type === 1 ? (
            <>
              <img className="image-4" alt="clock" src={clock} />
              <div className="text-wrapper-2">{item.date}</div>
              <img 
                className="image-2" 
                alt="x" 
                src={x} 
                onClick={() => onRemove(index)} 
                style={{ cursor: 'pointer' }}
              />
              <div 
                className="text-wrapper-3"
                onClick={() => onClick(item.location)} // 클릭 시 onClick 호출
                style={{ cursor: 'pointer' }}
              >
                {item.location}
              </div>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Directions_list;