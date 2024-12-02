import axios from 'axios';

// 범죄 주의 구간 데이터를 가져오기 위한 서비스
class CrimeService {
    constructor() {
        this.apiUrl = 'http://www.safemap.go.kr/openApiService/wms/getLayerData.do';
        this.apiKey = 'OLVQDGR3-OLVQ-OLVQ-OLVQ-OLVQDGR3DL'; // 실제 API 키로 변경
    }

    // 범죄 주의 구간 데이터 가져오기
    async getCrimeZones() {
        try {
            const params = {
                apikey: this.apiKey,
                layername: 'A2SM_CRMNLHSPOT_TOT',
                styles: 'A2SM_CrmnlHspot_Tot_Tot',
                format: 'image/png',
                transparent: true,
            };

            const response = await axios.get(this.apiUrl, { params });
            console.log(response.data); // 응답 데이터 확인

            // 응답 데이터가 배열인지 확인하고 변환
            const data = response.data; // 실제 데이터 형식에 맞게 수정
            return Array.isArray(data) ? data : []; // 배열로 변환
        } catch (error) {
            console.error('범죄 주의 구간 데이터 가져오기 실패:', error);
            return [];
        }
    }
}

export const crimeService = new CrimeService(); 