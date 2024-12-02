import React, { useState } from 'react';
import humanFemaleW from '../img/human-female-white.svg';
import humanFemaleY from '../img/human-female-yellow.svg';
import humanWheelchairW from '../img/human-wheelchair-white.svg';
import humanWheelchairY from '../img/human-wheelchair-yellow.svg';
import humanMaleW from '../img/human-male-white.svg';
import humanMaleY from '../img/human-male-yellow.svg';
import pull from '../img/pull.svg';

//하단 끌어올리는 부분

const OverlapGroupNormal = ({ toggleHeight, onUserChange }) => {
    const [selectedUser, setSelectedUser] = useState('male');
    const [safetyLevel, setSafetyLevel] = useState('안전 단계 최저');
    const [selectedButton, setSelectedButton] = useState(1);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        if (onUserChange) onUserChange(user);
    };

    const handleSafetyLevelChange = (level) => {
        setSelectedButton(level);
        switch (level) {
            case 1:
                setSafetyLevel('안전 단계 최저');
                break;
            case 2:
                setSafetyLevel('안전 단계 중간');
                break;
            case 3:
                setSafetyLevel('안전 단계 최고');
                break;
            default:
                setSafetyLevel('안전 단계 최저');
        }
    };

    return (
        <div className="overlap-group">
            <div className="on">
                <div className="text-wrapper-5">기능</div>
                <div className="on-2">
                    <div
                        className="human-female-wrapper"
                        style={{
                            backgroundColor:
                                selectedUser === 'female'
                                    ? '#ffb10c'
                                    : '#ffffff',
                        }}
                    >
                        <button
                            className="img-button"
                            onClick={() => handleUserSelect('female')}
                        >
                            <img
                                className="img-3"
                                src={
                                    selectedUser === 'female'
                                        ? humanFemaleW
                                        : humanFemaleY
                                }
                                alt="여성 사용자"
                            />
                        </button>
                    </div>
                    <div
                        className="human-wheelchair-wrapper"
                        style={{
                            backgroundColor:
                                selectedUser === 'wheelchair'
                                    ? '#ffb10c'
                                    : '#ffffff',
                        }}
                    >
                        <button
                            className="img-button"
                            onClick={() => handleUserSelect('wheelchair')}
                        >
                            <img
                                className="img-3"
                                src={
                                    selectedUser === 'wheelchair'
                                        ? humanWheelchairW
                                        : humanWheelchairY
                                }
                                alt="휠체어 사용자"
                            />
                        </button>
                    </div>
                    <div
                        className="frame-wrapper"
                        style={{
                            backgroundColor:
                                selectedUser === 'male' ? '#ffb10c' : '#ffffff',
                        }}
                    >
                        <button
                            className="img-button"
                            onClick={() => handleUserSelect('male')}
                        >
                            <img
                                className="img-3"
                                src={
                                    selectedUser === 'male'
                                        ? humanMaleW
                                        : humanMaleY
                                }
                                alt="일반 사용자"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className="view-2">
                <div className="text-wrapper-6">일반</div>
                <div className="text-wrapper-7">노약자</div>
                <div className="text-wrapper-8">여성</div>
            </div>
            <div className="overlap-2">
                <div className="div-2">
                    <hr className="line-separator" />
                    <div className="text-wrapper-9">{safetyLevel}</div>
                    <div className="overlap-group-wrapper">
                        <div className="overlap-group-2">
                            <div className="line-2"></div>
                            <div
                                className="fill-line"
                                style={{
                                    width:
                                        selectedButton === 3
                                            ? '97%'
                                            : selectedButton === 2
                                            ? '50%'
                                            : '0%',
                                    backgroundColor: '#FFB10C',
                                }}
                            ></div>
                            <div className="element">
                                <button
                                    className={`div-3 ${
                                        selectedButton >= 1 ? 'selected' : ''
                                    }`}
                                    onClick={() => handleSafetyLevelChange(1)}
                                ></button>
                                <button
                                    className={`div-5 ${
                                        selectedButton >= 2 ? 'selected' : ''
                                    }`}
                                    onClick={() => handleSafetyLevelChange(2)}
                                ></button>
                                <button
                                    className={`div-7 ${
                                        selectedButton >= 3 ? 'selected' : ''
                                    }`}
                                    onClick={() => handleSafetyLevelChange(3)}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-wrapper-10">사용자 맞춤 설정</div>
            <img
                className="pull"
                src={pull}
                alt="사용자 설정"
                onClick={toggleHeight}
            />
        </div>
    );
};

export default OverlapGroupNormal;
