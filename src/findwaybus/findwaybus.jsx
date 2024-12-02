import React, { useState, useEffect } from 'react';
import './findwaybus_styleguide.css';
import './findwaybus_style.css';

import busYellow from '../img/busyellow.svg';
import busBlack from '../img/busblack.svg';
import runningManBlack from '../img/runningmanblack.png';
import runningManYellow from '../img/runningmanyellow.png';
import mapSpicy from '../img/mapspicy.png';
import menuIcon from '../img/menu.svg';
import xIcon from '../img/x.svg';
import arrowTop from '../img/arrow-top.png';
import arrowDown from '../img/arrow-down.png';

function FindWayBus() {

    const [selected, setSelected] = useState('bus');

    useEffect(() => {
        const savedSelected = localStorage.getItem('selected');
        if (savedSelected) {
            setSelected(savedSelected);
        }
    }, []);

    const handleBusClick = () => {
        if (selected !== 'bus') {
            setSelected('bus');
            localStorage.setItem('selected', 'bus');
        }
    };

    const handleWalkingClick = () => {
        if (selected !== 'walking') {
            setSelected('walking');
            localStorage.setItem('selected', 'walking');
        }
    };

    return (
        <div className="div-wrapper">
            <div className="div">
                <div className="stop-edge">
                    <div
                        className="view"
                        style={{
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid',
                            borderColor:
                                selected === 'bus' ? '#666666' : '#d1d1d1',
                        }}
                    >
                        <div
                            className="text-wrapper"
                            style={{
                                color:
                                    selected === 'bus' ? '#ffb10c' : '#000000',
                            }}
                        >
                            버스
                        </div>
                        <img
                            className="vector clickable"
                            src={selected === 'bus' ? busYellow : busBlack}
                            alt="Bus Icon"
                            style={{ cursor: 'pointer' }}
                            onClick={handleBusClick}
                        />
                    </div>

                    <div
                        className="overlap-group-wrapper"
                        style={{
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid',
                            borderColor:
                                selected === 'walking' ? '#666666' : '#d1d1d1',
                        }}
                    >
                        <div className="overlap-group">
                            <div
                                className="text-wrapper-2"
                                style={{
                                    color:
                                        selected === 'walking'
                                            ? '#ffb10c'
                                            : '#000000',
                                }}
                            >
                                도보
                            </div>
                            <img
                                className="motion-sensor clickable"
                                src={
                                    selected === 'walking'
                                        ? runningManYellow
                                        : runningManBlack
                                }
                                alt="Running Man Icon"
                                style={{ cursor: 'pointer' }}
                                onClick={handleWalkingClick}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-wrapper-3">도착지를 입력해주세요</div>
                <div className="view-2">
                    <div className="map-spicy">
                        <div className="text-wrapper-4">MapSpicy</div>
                    </div>
                    <div className="image-wrapper">
                        <img className="image" src={mapSpicy} alt="Map Image" />
                    </div>
                    <img
                        className="menu clickable"
                        src={menuIcon}
                        alt="Menu Icon"
                        onClick={() => console.log('Menu icon clicked!')}
                    />
                </div>

                <div className="view-3">
                    <div
                        className="frame clickable"
                        onClick={() => console.log('Navigate to Bus Page!')}
                    >
                        <input
                            type="text"
                            placeholder="출발지를 입력해주세요"
                            className="input-field"
                        />
                    </div>
                    <div className="frame-2">
                        <input
                            type="text"
                            placeholder="도착지를 입력해주세요"
                            className="input-field"
                        />
                    </div>
                    <div className="frame-3"></div>
                    <div className="overlap">
                        <img className="group" src={xIcon} alt="X Icon" />
                    </div>
                    <div className="overlap-2">
                        <img
                            className="arrow-left"
                            src={arrowTop}
                            alt="Arrow Up Icon"
                        />
                        <img
                            className="arrow-left-2"
                            src={arrowDown}
                            alt="Arrow Down Icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindWayBus;
