import axios from 'axios';
import xml2js from 'xml2js';

// 안전 비상벨 데이터를 가져오기 위한 서비스
class EmergencyBellService {
    constructor() {
        this.apiUrl = 'http://www.safemap.go.kr/openApiService/data/getCmmpoiEmgbellData.do';
        this.apiKey = 'OLVQDGR3-OLVQ-OLVQ-OLVQ-OLVQDGR3DL'; // 실제 API 키로 변경
    }

    // XML 데이터를 JSON으로 파싱
    parseXML(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, { explicitArray: false, strict: false }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const items = result.response?.body?.items?.item;
                    resolve(Array.isArray(items) ? items : [items]);
                }
            });
        });
    }

    // 안전 비상벨 데이터 가져오기
    async getEmergencyBells() {
        try {
            const params = {
                apikey: this.apiKey,
            };

            const response = await axios.get(this.apiUrl, { params, responseType: 'text' });
            const data = await this.parseXML(response.data);

            // 필요한 데이터 형식에 맞게 변환
            return data.map(bell => ({
                id: bell.OBJT_ID,
                name: bell.CNTWRK_NM,
                x: parseFloat(bell.X),
                y: parseFloat(bell.Y),
            }));
        } catch (error) {
            console.error('안전 비상벨 데이터 가져오기 실패:', error);
            return [];
        }
    }
}

export const emergencyBellService = new EmergencyBellService(); 