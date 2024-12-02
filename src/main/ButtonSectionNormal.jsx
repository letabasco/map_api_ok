//경찰서 소방서 까지 마커로 표시함

import React, { useState, useRef } from 'react';
import gong4 from '../img/gong4.png';
import store from '../img/store.png';
import oneonenine from '../img/oneonenine.png';
import police from '../img/police.png';
import { policeService } from '../services/policeService';
import { fireService } from '../services/fireService';
import { useMap } from '../context/MapContext';
import { convenienceStoreService } from '../services/convenienceStoreService'; // 편의점 서비스 추가
import { constructionService } from '../services/gong4_api'; // 공사 현장 서비스 추가
import { crimeService } from '../services/crime_api'; // 범죄 주의 구간 서비스 추가

// 일반 노말 카테고리
const ButtonSectionNormal = () => {
    const [activeButton, setActiveButton] = useState(null);
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const { map } = useMap(); // 네이버 지도 인스턴스 가져오기
    const [markers, setMarkers] = useState([]);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleButtonClick = async (buttonId) => {
        if (activeButton === buttonId) {
            // 동일한 버튼이 다시 눌렸을 때 마커 제거
            markers.forEach(marker => marker.setMap(null));
            setMarkers([]);
            setActiveButton(null);
            return;
        }

        // 기존 마커 제거
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);

        setActiveButton(buttonId);

        if (buttonId === 'gong4') {
            if (!map) {
                console.error('지도 인스턴스가 초기화되지 않았습니다.');
                return;
            }

            // 공사 현장 데이터 가져오기
            const constructionSites = await constructionService.getConstructionSites();

            // 공사 현장 마커 생성
            const newMarkers = constructionSites.map(site => {
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(site.y, site.x),
                    map: map,
                    title: site.name,
                });

                const infoWindow = new window.naver.maps.InfoWindow({
                    content: `
                        <div style="padding:10px;min-width:200px;">
                            <h4>${site.name}</h4>
                            <p>${site.address}</p>
                            <p>시작일: ${site.startDate}</p>
                            <p>종료일: ${site.endDate}</p>
                        </div>
                    `,
                });

                window.naver.maps.Event.addListener(marker, 'click', () => {
                    infoWindow.open(map, marker);
                });

                return marker;
            });

            setMarkers(newMarkers);
        }

        if (buttonId === 'police') {
            if (!map) {
                console.error('지도 인스턴스가 초기화되지 않았습니다.');
                return;
            }

            // 경찰서 데이터 가져오기
            const policeStations = await policeService.searchPoliceStations();

            // 경찰서 마커 생성
            const newMarkers = policeStations.map(station => {
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(station.position.lat, station.position.lng),
                    map: map,
                    title: station.name,
                });

                const infoWindow = new window.naver.maps.InfoWindow({
                    content: `
                        <div style="padding:10px;min-width:200px;">
                            <h4>${station.name}</h4>
                            <p>${station.address}</p>
                            ${station.phone ? `<p>전화: ${station.phone}</p>` : ''}
                            <a href="${station.placeUrl}" target="_blank">상세보기</a>
                        </div>
                    `,
                });

                window.naver.maps.Event.addListener(marker, 'click', () => {
                    infoWindow.open(map, marker);
                });

                return marker;
            });

            setMarkers(newMarkers);
        }

        if (buttonId === 'fire') {
            if (!map) {
                console.error('지도 인스턴스가 초기화되지 않았습니다.');
                return;
            }

            // 소방서 데이터 가져오기
            const fireStations = await fireService.searchFireStations();

            // 소방서 마커 생성
            const newMarkers = fireStations.map(station => {
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(station.position.lat, station.position.lng),
                    map: map,
                    title: station.name,
                });

                const infoWindow = new window.naver.maps.InfoWindow({
                    content: `
                        <div style="padding:10px;min-width:200px;">
                            <h4>${station.name}</h4>
                            <p>${station.address}</p>
                            ${station.phone ? `<p>전화: ${station.phone}</p>` : ''}
                            <a href="${station.placeUrl}" target="_blank">상세보기</a>
                        </div>
                    `,
                });

                window.naver.maps.Event.addListener(marker, 'click', () => {
                    infoWindow.open(map, marker);
                });

                return marker;
            });

            setMarkers(newMarkers);
        }

        if (buttonId === 'store') {
            if (!map) {
                console.error('지도 인스턴스가 초기화되지 않았습니다.');
                return;
            }

            // 편의점 데이터 가져오기
            const convenienceStores = await convenienceStoreService.searchConvenienceStores();

            // 편의점 마커 생성
            const newMarkers = convenienceStores.map(store => {
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(store.position.lat, store.position.lng),
                    map: map,
                    title: store.name,
                });

                const infoWindow = new window.naver.maps.InfoWindow({
                    content: `
                        <div style="padding:10px;min-width:200px;">
                            <h4>${store.name}</h4>
                            <p>${store.address}</p>
                            ${store.phone ? `<p>전화: ${store.phone}</p>` : ''}
                            <a href="${store.placeUrl}" target="_blank">상세보기</a>
                        </div>
                    `,
                });

                window.naver.maps.Event.addListener(marker, 'click', () => {
                    infoWindow.open(map, marker);
                });

                return marker;
            });

            setMarkers(newMarkers);
        }

        if (buttonId === 'crime') {
            if (!map) {
                console.error('지도 인스턴스가 초기화되지 않았습니다.');
                return;
            }

            // 범죄 주의 구간 데이터 가져오기
            const crimeZones = await crimeService.getCrimeZones();

            // 범죄 주의 구간 마커 생성
            const newMarkers = crimeZones.map(zone => {
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(zone.y, zone.x),
                    map: map,
                    title: zone.name,
                });

                const infoWindow = new window.naver.maps.InfoWindow({
                    content: `
                        <div style="padding:10px;min-width:200px;">
                            <h4>${zone.name}</h4>
                            <p>${zone.description}</p>
                        </div>
                    `,
                });

                window.naver.maps.Event.addListener(marker, 'click', () => {
                    infoWindow.open(map, marker);
                });

                return marker;
            });

            setMarkers(newMarkers);
        }
    };

    return (
        <div
            className="view-normal"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
                display: 'flex',
                overflowX: 'scroll',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
            }}
        >
            <div className="frame-2">
                <button
                    className="button-wrapper"
                    style={{
                        backgroundColor:
                            activeButton === 'gong4' ? '#FFE2A4' : '#ffffff',
                    }}
                    onClick={() => handleButtonClick('gong4')}
                >
                    <img className="img" src={gong4} alt="공사 현장 이미지" />
                    <span className="text-wrapper">공사 현장</span>
                </button>
            </div>
            <div className="frame-3">
                <button
                    className="button-wrapper-2"
                    style={{
                        backgroundColor:
                            activeButton === 'store' ? '#FFE2A4' : '#ffffff',
                    }}
                    onClick={() => handleButtonClick('store')}
                >
                    <img className="image-2" src={store} alt="편의점 이미지" />
                    <span className="text-wrapper">편의점</span>
                </button>
            </div>
            <div className="frame-4">
                <button
                    className="button-wrapper-3"
                    style={{
                        backgroundColor:
                            activeButton === 'fire'
                                ? '#FFE2A4'
                                : '#ffffff',
                    }}
                    onClick={() => handleButtonClick('fire')}
                >
                    <img
                        className="img-2"
                        src={oneonenine}
                        alt="소방 시설 이미지"
                    />
                    <span className="text-wrapper">소방 시설</span>
                </button>
            </div>
            <div className="frame-5">
                <button
                    className="button-wrapper-4"
                    style={{
                        backgroundColor:
                            activeButton === 'police' ? '#FFE2A4' : '#ffffff',
                    }}
                    onClick={() => handleButtonClick('police')}
                >
                    <img className="img" src={police} alt="경찰서 이미지" />
                    <span className="text-wrapper">경찰서</span>
                </button>
            </div>
            <button
                className="button-wrapper-5"
                style={{
                    backgroundColor:
                        activeButton === 'crime' ? '#FFE2A4' : '#ffffff',
                }}
                onClick={() => handleButtonClick('crime')}
            >
                <span className="text-wrapper-4">범죄 주의 구간</span>
            </button>
        </div>
    );
};

export default ButtonSectionNormal;
