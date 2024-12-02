import axios from 'axios';
import xml2js from 'xml2js';

// 공사 현장 위치 검색 및 마커 관리를 위한 서비스
class ConstructionService {
    constructor() {
        this.apiKey = 'OLVQDGR3-OLVQ-OLVQ-OLVQ-OLVQDGR3DL'; // 제공된 API 키
    }

    // 공사 현장 데이터 가져오기
    async getConstructionSites() {
        try {
            const url = 'http://www.safemap.go.kr/openApiService/wms/getLayerData.do';
            const params = {
                apikey: this.apiKey,
                layername: 'VIEW_CNTWRKSTTUS',
                styles: 'A2SM_CntwrkSttus',
            };

            const response = await axios.get(url, { params, responseType: 'text' });
            const parsedData = await this.parseXML(response.data);

            // 필요한 데이터 가공
            const constructionSites = parsedData.map(item => ({
                id: item.OBJT_ID,
                name: item.CNTWRK_NM,
                type: item.CNTWRK_SE,
                startDate: item.STRWRK_DE,
                endDate: item.COMPET_DE,
                address: item.WRK_ADRES,
                x: parseFloat(item.X),
                y: parseFloat(item.Y),
            }));

            return constructionSites;
        } catch (error) {
            console.error('공사 현장 데이터 가져오기 실패:', error);
            return [];
        }
    }

    // XML 데이터를 JSON으로 파싱
    parseXML(xml) {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, { explicitArray: false, strict: false }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    // XML 구조에 맞게 데이터 접근
                    const items = result.response?.body?.items?.item;
                    if (items) {
                        resolve(items);
                    } else {
                        reject(new Error('Expected data structure not found'));
                    }
                }
            });
        });
    }
}

export const constructionService = new ConstructionService();