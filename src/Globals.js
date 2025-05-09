/**
 * 전역 변수 및 함수 모음
 * 애플리케이션 전체에서 사용되는 전역 상태 및 유틸리티 함수들
 */

// 글로벌 변수 초기화
if (!window.global) {
  window.global = {};
}

// 필수 전역 변수 초기화
window.global.m_nLastFieldIdx = 0;
window.global.m_nLastBoxNo = 0;
window.global.companyCode = '';
window.global.userPhone = '';
window.global.siteCode = '';
window.global.siteName = '';
window.global.loginType = '';
window.global.sidenavWidth = 240;
window.global.config = {};

// 배열 변수 초기화
window.global.m_listOfficeCode = [];
window.global.m_listOfficeName = [];
window.global.m_listGroupCode = [];
window.global.m_listGroupName = [];
window.global.m_listAreaCode = [];
window.global.m_listAreaName = [];
window.global.m_listDBName = [];
window.global.m_listBuMode = [];
window.global.m_listBoxUseState = [];
window.global.m_listBoxHeight = [];
window.global.m_listShowBoxNo = [];

// 현재 선택된 변수들
window.global.m_nLastOfficeIdx = 0;
window.global.m_nLastGroupIdx = 0;
window.global.m_nLastAreaIdx = 0;
window.global.m_strCurrOfficeCode = '';
window.global.m_strCurrOfficeName = '';
window.global.m_strCurrGroupCode = '';
window.global.m_strCurrGroupName = '';
window.global.m_strCurrAreaCode = '';
window.global.m_strCurrAreaName = '';
window.global.m_strCurrDBName = '';

// 박스 관련 변수들
window.global.m_nBoxMin = 0;
window.global.m_nBoxSum = 0;
window.global.m_nCol = 0;
window.global.m_nTotalPage = 0;

/**
 * 박스 수 계산 함수
 */
export function countBoxes() {
  return window.global.m_nBoxSum - window.global.m_nBoxMin + 1;
}

// 전역 객체 export
const global = window.global;
export default global; 