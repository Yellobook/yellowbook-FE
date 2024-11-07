// 관리자, 주문자, 뷰어에 대한 role 조회 후, 권한만 나누면 됨
// 간단한 상태 관리라 판단 -> 별도의 라이브러리를 사용하기 보단 내장 라이브러리인 Context로 관리하고자 함
import React, {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
import { getTeam } from "./ProfileUtils";

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
                
                const teams = response.data.data.teams;
                console.log('마이프로필 조회 응답 teams: ', teams);

                // 현재 속한 팀 조회
                const teamResponse = await getTeam();
                if (teamResponse) {
                    console.log('현재 속한 팀 응답구조: ', teamResponse);
                    const currentTeamId = teamResponse.teamId;

                    // teams 배열에서 teamId를 기준으로 매칭되는 인덱스를 찾기
                    const matchedTeam = teams.find(team => team.teamId === currentTeamId);
                    
                    if (matchedTeam) {
                        console.log('매칭된 팀: ', matchedTeam);
                        // 해당 팀의 역할이 '주문자'를 포함하는지 여부 확인
                        const isCustomerRole = matchedTeam.role;
                        console.log('권한 포함 여부: ', isCustomerRole === "주문자");
                        setIsCustomer(isCustomerRole);
                    } else {
                        console.log('현재 속한 팀과 일치하는 팀을 찾을 수 없습니다.');
                        setIsCustomer(false);
                    }
                }

            } catch (error) {
                console.error("프로필 불러오기 중 오류 발생", error);
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