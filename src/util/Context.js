// 관리자, 주문자, 뷰어에 대한 role 조회 후, 권한만 나누면 됨
// 간단한 상태 관리라 판단 -> 별도의 라이브러리를 사용하기 보단 내장 라이브러리인 Context로 관리하고자 함
import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const PermissionContext = createContext();

const PermissionProvider=({ children }) => {
    const [isCustomer, setIsCustomer] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 처리

    useEffect(() => {
        // 마이프로필 조회 api를 호출하여 사용자 권한 조회
        const fetchUserPermissions = async () => {
            //const accessToken = `${process.env.REACT_APP_TOKEN}`;
            const accessToken =localStorage.getItem("accessToken");
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/members/profile`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                // 사용자 권한 출력
                console.log('사용자 권한: ', response.data.data.teams[2].role);
                // API로부터 받은 데이터에서 '주문자' 여부를 확인
                console.log('권한 찍히나?: ', response.data.data.teams[2].role.includes('주문자'));
                setIsCustomer(response.data.data.teams[2].role.includes('주문자'));
            } catch (error) {
                console.error("프로필 불러오기 중 오류 발생");
            } finally {
                setLoading(false); // 로딩 완료
            }
        };
        fetchUserPermissions();
    }, []);

    if (loading) return <div>Loading...</div>; // 로딩 중 화면 표시

    return (
        <PermissionContext.Provider value={isCustomer}>
            {children}
        </PermissionContext.Provider>
    );
}

export default PermissionProvider;

export function useIsCustomer() {
    return useContext(PermissionContext);
}