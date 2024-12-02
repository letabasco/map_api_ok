import React, { useEffect, useRef } from 'react';
import { useMap } from '../context/MapContext';

//지도 컴포넌트

function MapComponent() {
    const mapContainer = useRef(null);
    const { setMap } = useMap();

    useEffect(() => {
        const initMap = () => {
            const { naver } = window;

            if (!naver || !naver.maps) {
                console.error('네이버 지도 API가 로드되지 않았습니다.');
                return;
            }

            const getCurrentPosition = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude, accuracy } =
                                position.coords;

                            let location;
                            if (accuracy <= 1000) {
                                location = new naver.maps.LatLng(
                                    latitude,
                                    longitude
                                );
                            } else {
                                alert(
                                    '위치 정확도가 낮아 대구 시청으로 지도를 업데이트합니다.'
                                );
                                location = new naver.maps.LatLng(
                                    35.8714,
                                    128.6014
                                );
                            }

                            const mapOptions = {
                                center: location,
                                zoom: 17,
                            };

                            const mapInstance = new naver.maps.Map(
                                mapContainer.current,
                                mapOptions
                            );

                            new naver.maps.Marker({
                                position: location,
                                map: mapInstance,
                                icon: {
                                    content: `<div style="
                                        width: 15px;
                                        height: 15px;
                                        background-color: #FFB10C;
                                        border: 2px solid white;
                                        border-radius: 50%;
                                        box-shadow: 0 0 10px 10px rgba(255, 177, 12, 0.2);
                                    "></div>`,
                                    anchor: new naver.maps.Point(10, 10),
                                },
                                title: '현재 위치',
                            });

                            setMap(mapInstance);
                        },
                        (error) => {
                            console.error('Geolocation error:', error);
                            alert('현재 위치를 가져올 수 없습니다.');
                        },
                        {
                            enableHighAccuracy: true,
                            maximumAge: 30000,
                            timeout: 27000,
                        }
                    );
                } else {
                    alert('Geolocation을 지원하지 않습니다.');
                }
            };

            getCurrentPosition();
        };

        if (window.naver && window.naver.maps) {
            initMap();
        } else {
            const timer = setInterval(() => {
                if (window.naver && window.naver.maps) {
                    clearInterval(timer);
                    initMap();
                }
            }, 100);
        }
    }, [setMap]);

    return (
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
    );
}

export default MapComponent;
