import React, { createContext, useContext, useState } from 'react';

// Context 생성
const MapContext = createContext(null);

// Provider 컴포넌트
export const MapProvider = ({ children }) => {
    const [map, setMap] = useState(null); // 지도 인스턴스를 저장할 상태

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};

// Context를 사용하기 위한 커스텀 훅
export const useMap = () => useContext(MapContext);
