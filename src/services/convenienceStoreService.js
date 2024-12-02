import axios from 'axios';

// 편의점 위치 검색 및 마커 관리를 위한 서비스
class ConvenienceStoreService {
    constructor() {
        this.markers = []; // 네이버 맵에 표시될 마커들을 저장할 배열
        this.isInitialized = false; // 카카오 api 초기화 체크
        this.apiKey = 'ad9b58cafb1b2cb3b5787aa615374281'; // 제공된 REST API 키
    }

    // 현재 위치를 기반으로 편의점 검색 실행
    async searchConvenienceStores() {
        try {
            const position = await this.getCurrentPosition();
            const { latitude, longitude } = position.coords;

            const url = 'https://dapi.kakao.com/v2/local/search/category.json';
            const config = {
                headers: {
                    Authorization: `KakaoAK ${this.apiKey}`,
                },
                params: {
                    category_group_code: 'CS2', // 편의점 카테고리
                    x: longitude, // 현재 위치의 경도
                    y: latitude, // 현재 위치의 위도
                    radius: 5000, // 검색 반경 (미터)
                },
            };

            const response = await axios.get(url, config);
            return response.data.documents.map(place => ({
                id: place.id,
                name: place.place_name,
                position: {
                    lat: parseFloat(place.y),
                    lng: parseFloat(place.x),
                },
                address: place.address_name,
                phone: place.phone,
                placeUrl: place.place_url,
            }));
        } catch (error) {
            console.error('편의점 검색 실패:', error);
            return [];
        }
    }

    // 현재 위치 가져오기
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                });
            } else {
                reject(new Error('Geolocation을 지원하지 않습니다.'));
            }
        });
    }

    // 모든 마커 제거
    clearMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }

    loadKakaoAPI() {
        return new Promise((resolve, reject) => {
            // 이미 API가 로드되어 있��지 체크
            if (window.kakao?.maps?.services) {
                resolve();
                return;
            }

            // API 로드를 위한 script 태그 생성
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6b9825e31546c91eb0af2f233ea6b052&libraries=services`;

            // API 로드 완료 시 실행될 콜백
            script.onload = () => {
                window.kakao.maps.load(() => {
                    this.isInitialized = true;
                    resolve();
                });
            };

            // API 로드 실패 시 실행될 콜백
            script.onerror = (error) => {
                reject(new Error('Kakao 지도 API 로드 실패'));
            };

            // script 태그를 HTML에 추가
            document.head.appendChild(script);
        });
    }
}

export const convenienceStoreService = new ConvenienceStoreService();
