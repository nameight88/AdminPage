import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import global, { countBoxes } from './Globals'
import axios from 'axios'

// API 기본 URL 설정
axios.defaults.baseURL = '/api';

// Login 컴포넌트 가져오기
import Login from './pages/Login/Login'

// Constants 정의 추가
const Constants = {
  DEF_BOX_COL: 10
};


/**
 * 메인 애플리케이션 컴포넌트
 */
function App() {
  // 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [selected, setSelected] = useState('home')
  const [expanded, setExpanded] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showModalExcept, setShowModalExcept] = useState(false)
  const [error, setError] = useState(null)

  /**
   * 데이터 로딩 상태 변경 함수
   */
  const changeState = () => {
    setDataLoaded(!dataLoaded)
  }

  /**
   * 세션 종료 처리 함수
   * @param {string} sValue - 세션 상태 값
   */
  const appLogout = (sValue) => {
    if (sValue === 'sessionOut') {
      logout()
    }
  }
  
  /**
   * 로그아웃 실행 함수
   */
  const logout = () => {
    axios.get('/logout', { params: {} })
      .then((response) => {
        if (response.data.result === 'success') {
          setRedirect(true)
        } else {
          setShowModal(true)
        }
      })
      .catch((err) => {
        console.error('Logout error:', err)
        setError('로그아웃 중 오류가 발생했습니다.')
      })
  }

  /**
   * 로그인 데이터 로드 함수
   */
  const loadLoginData = () => {
    loadIniFile()
      .then(() => loadSiteInfo())
      .then(() => loadManagerAreaData())
      .catch(err => {
        console.error('Login data loading error:', err)
        setError('로그인 데이터를 불러오는 중 오류가 발생했습니다.')
      })
  }

  /**
   * INI 파일 로드 함수
   * @returns {Promise} 응답 프로미스
   */
  const loadIniFile = () => {
    return new Promise((resolve, reject) => {
      axios.get("/readIniFile", {
        params: { fieldCode: global.m_nLastFieldIdx }
      })
      .then(response => {
        appLogout(response.data.result)
        global.config = response.data
        resolve(response)
      })
      .catch(err => {
        console.error("Read INI file error:", err)
        reject(err)
      })
    })
  }

  /**
   * 사이트 정보 로드 함수
   * @returns {Promise} 응답 프로미스
   */
  const loadSiteInfo = () => {
    return new Promise((resolve, reject) => {
      axios.get("/getSiteInfo", {
        params: {
          fieldCode: global.m_nLastFieldIdx,
          companyCode: global.companyCode
        }
      })
      .then(response => {
        global.siteCode = response.data[0].SiteCode
        global.siteName = response.data[0].SiteName
        global.loginType = response.data[0].UseId === 0 ? 'P' : 'U'
        resolve(response)
      })
      .catch(err => {
        console.error("Site info error:", err)
        reject(err)
      })
    })
  }

  /**
   * 관리자 영역 데이터 로드 함수
   * @returns {Promise} 응답 프로미스
   */
  const loadManagerAreaData = () => {
    return new Promise((resolve, reject) => {
      axios.get("/searchList", {
        params: {
          info: 'searchMgrArea',
          mgrId: global.userPhone
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        if (response.data[0].AreaCode === "all") {
          handleAllAreaAccess()
        } else {
          handleSpecificAreaAccess(response.data)
        }
        resolve(response)
      })
      .catch(err => {
        console.error("Search manager area error:", err)
        reject(err)
      })
    })
  }

  /**
   * 모든 영역 접근 권한 처리 함수
   */
  const handleAllAreaAccess = () => {
    // 오피스 코드 목록 초기화
    clearOfficeList()
    
    // 오피스 목록 로드
    loadOfficeList()
      .then(() => {
        // 그룹 목록 초기화
        clearGroupList()
        return loadGroupList()
      })
      .then(() => {
        // 영역 목록 초기화
        clearAreaList()
        return loadAreaList()
      })
      .then(() => loadBoxSetInfo())
      .then(() => {
        // 박스 상태 목록 초기화
        clearBoxStateList()
        return loadBoxStateData()
      })
      .then(() => {
        countBoxes()
        changeState()
      })
      .catch(err => console.error("All area access handling error:", err))
  }

  /**
   * 특정 영역 접근 권한 처리 함수
   * @param {Array} data - 영역 데이터 배열
   */
  const handleSpecificAreaAccess = (data) => {
    const selectedAreaCode = []
    const selectedOfficeCode = []

    data.forEach(item => {
      selectedAreaCode.push(item.AreaCode)
      selectedOfficeCode.push(item.OfficeCode)
    })

    // 오피스 코드 목록 초기화
    clearOfficeList()
    
    // 오피스 목록 로드
    loadSpecificOfficeList(selectedOfficeCode)
      .then(() => {
        // 그룹 목록 초기화
        clearGroupList()
        return loadSpecificGroupList(selectedAreaCode)
      })
      .then(() => {
        // 영역 목록 초기화
        clearAreaList()
        return loadSpecificAreaList(selectedAreaCode)
      })
      .then(() => loadBoxSetInfo())
      .then(() => {
        // 박스 상태 목록 초기화
        clearBoxStateList()
        return loadBoxStateData()
      })
      .then(() => {
        countBoxes()
        changeState()
      })
      .catch(err => console.error("Specific area access handling error:", err))
  }

  /**
   * 오피스 목록 초기화
   */
  const clearOfficeList = () => {
    while (global.m_listOfficeCode.length) {
      global.m_listOfficeCode.pop()
      global.m_listOfficeName.pop()
    }
  }

  /**
   * 그룹 목록 초기화
   */
  const clearGroupList = () => {
    while (global.m_listGroupCode.length) {
      global.m_listGroupCode.pop()
      global.m_listGroupName.pop()
    }
  }

  /**
   * 영역 목록 초기화
   */
  const clearAreaList = () => {
    while (global.m_listAreaCode.length) {
      global.m_listAreaCode.pop()
      global.m_listAreaName.pop()
      global.m_listDBName.pop()
      global.m_listBuMode.pop()
    }
  }

  /**
   * 박스 상태 목록 초기화
   */
  const clearBoxStateList = () => {
    while (global.m_listBoxUseState.length) {
      global.m_listBoxUseState.pop()
      global.m_listBoxHeight.pop()
      global.m_listShowBoxNo.pop()
    }
  }

  /**
   * 오피스 목록 로드
   * @returns {Promise} 응답 프로미스
   */
  const loadOfficeList = () => {
    return new Promise((resolve, reject) => {
      axios.get("/getOfficeList", {
        params: {
          fieldCode: global.m_nLastFieldIdx,
          siteCode: global.siteCode
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        response.data.forEach(item => {
          global.m_listOfficeCode.push(item.OfficeCode)
          global.m_listOfficeName.push(item.OfficeName)
        })

        global.m_nLastOfficeIdx = 0
        global.m_strCurrOfficeCode = global.m_listOfficeCode[global.m_nLastOfficeIdx]
        global.m_strCurrOfficeName = global.m_listOfficeName[global.m_nLastOfficeIdx]
        
        resolve(response)
      })
      .catch(err => {
        console.error("Office list error:", err)
        reject(err)
      })
    })
  }

  /**
   * 특정 오피스 목록 로드
   * @param {Array} selectedOfficeCode - 선택된 오피스 코드 배열
   * @returns {Promise} 응답 프로미스
   */
  const loadSpecificOfficeList = (selectedOfficeCode) => {
    return new Promise((resolve, reject) => {
      axios.get("/searchList", {
        params: {
          info: 'searchOffice',
          siteCode: global.siteCode,
          selectedOfficeCode: selectedOfficeCode
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        response.data.forEach(item => {
          global.m_listOfficeCode.push(item.OfficeCode)
          global.m_listOfficeName.push(item.OfficeName)
        })

        global.m_nLastOfficeIdx = 0
        global.m_strCurrOfficeCode = global.m_listOfficeCode[global.m_nLastOfficeIdx]
        global.m_strCurrOfficeName = global.m_listOfficeName[global.m_nLastOfficeIdx]
        
        resolve(response)
      })
      .catch(err => {
        console.error("Specific office list error:", err)
        reject(err)
      })
    })
  }

  /**
   * 그룹 목록 로드
   * @returns {Promise} 응답 프로미스
   */
  const loadGroupList = () => {
    return new Promise((resolve, reject) => {
      axios.get("/getGroupList", {
        params: {
          fieldCode: global.m_nLastFieldIdx,
          siteCode: global.siteCode,
          officeCode: global.m_strCurrOfficeCode
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        response.data.forEach(item => {
          global.m_listGroupCode.push(item.GroupCode)
          global.m_listGroupName.push(item.GroupName)
        })

        global.m_nLastGroupIdx = 0
        global.m_strCurrGroupCode = global.m_listGroupCode[global.m_nLastGroupIdx]
        global.m_strCurrGroupName = global.m_listGroupName[global.m_nLastGroupIdx]
        
        resolve(response)
      })
      .catch(err => {
        console.error("Group list error:", err)
        reject(err)
      })
    })
  }

  /**
   * 특정 그룹 목록 로드
   * @param {Array} selectedAreaCode - 선택된 영역 코드 배열
   * @returns {Promise} 응답 프로미스
   */
  const loadSpecificGroupList = (selectedAreaCode) => {
    return new Promise((resolve, reject) => {
      axios.get('/searchList', {
        params: {
          info: 'searchGroup',
          siteCode: global.siteCode,
          officeCode: global.m_strCurrOfficeCode,
          selectedAreaCode: selectedAreaCode
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        response.data.forEach(item => {
          global.m_listGroupCode.push(item.GroupCode)
          global.m_listGroupName.push(item.GroupName)
        })

        global.m_nLastGroupIdx = 0
        global.m_strCurrGroupCode = global.m_listGroupCode[global.m_nLastGroupIdx]
        global.m_strCurrGroupName = global.m_listGroupName[global.m_nLastGroupIdx]
        
        resolve(response)
      })
      .catch(err => {
        console.error("Specific group list error:", err)
        reject(err)
      })
    })
  }

  /**
   * 영역 목록 로드
   * @returns {Promise} 응답 프로미스
   */
  const loadAreaList = () => {
    return new Promise((resolve, reject) => {
      axios.get("/getAreaList", {
        params: {
          fieldCode: global.m_nLastFieldIdx,
          siteCode: global.siteCode,
          officeCode: global.m_strCurrOfficeCode,
          groupCode: global.m_strCurrGroupCode
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        response.data.forEach(item => {
          global.m_listAreaCode.push(item.AreaCode)
          global.m_listAreaName.push(item.AreaName)
          global.m_listDBName.push(item.DBName)

          const configKey = `ServerInfo_${global.m_nLastFieldIdx + 1}`
          const buMode = global.config[configKey]?.BU_ServerIP === "" ? "Server" : item.BuMode
          global.m_listBuMode.push(buMode)
        })

        global.m_nLastAreaIdx = 0
        global.m_strCurrAreaCode = global.m_listAreaCode[global.m_nLastAreaIdx]
        global.m_strCurrAreaName = global.m_listAreaName[global.m_nLastAreaIdx]
        global.m_strCurrDBName = global.m_listDBName[global.m_nLastAreaIdx]
        
        resolve(response)
      })
      .catch(err => {
        console.error("Area list error:", err)
        reject(err)
      })
    })
  }

  /**
   * 특정 영역 목록 로드
   * @param {Array} selectedAreaCode - 선택된 영역 코드 배열
   * @returns {Promise} 응답 프로미스
   */
  const loadSpecificAreaList = (selectedAreaCode) => {
    return new Promise((resolve, reject) => {
      axios.get("/searchList", {
        params: {
          info: 'searchConfig',
          siteCode: global.siteCode,
          officeCode: global.m_strCurrOfficeCode,
          groupCode: global.m_strCurrGroupCode,
          selectedAreaCode: selectedAreaCode
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        response.data.forEach(item => {
          global.m_listAreaCode.push(item.AreaCode)
          global.m_listAreaName.push(item.AreaName)
          global.m_listDBName.push(item.DBName)

          const configKey = `ServerInfo_${global.m_nLastFieldIdx + 1}`
          const buMode = global.config[configKey]?.BU_ServerIP === "" ? "Server" : item.BuMode
          global.m_listBuMode.push(buMode)
        })

        global.m_nLastAreaIdx = 0
        global.m_strCurrAreaCode = global.m_listAreaCode[global.m_nLastAreaIdx]
        global.m_strCurrAreaName = global.m_listAreaName[global.m_nLastAreaIdx]
        global.m_strCurrDBName = global.m_listDBName[global.m_nLastAreaIdx]
        
        resolve(response)
      })
      .catch(err => {
        console.error("Specific area list error:", err)
        reject(err)
      })
    })
  }

  /**
   * 박스 설정 정보 로드
   * @returns {Promise} 응답 프로미스
   */
  const loadBoxSetInfo = () => {
    return new Promise((resolve, reject) => {
      axios.get("/getBoxSetInfo", {
        params: {
          fieldCode: global.m_nLastFieldIdx,
          areaCode: global.m_strCurrAreaCode
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        global.m_nBoxMin = response.data[0].boxmin
        global.m_nBoxSum = response.data[0].boxsum
        global.m_nCol = response.data[0].BoxCol

        global.m_nTotalPage = Math.floor(global.m_nCol / Constants.DEF_BOX_COL)
        if (global.m_nCol % Constants.DEF_BOX_COL > 0) {
          global.m_nTotalPage++
        }
        
        resolve(response)
      })
      .catch(err => {
        console.error("Box set info error:", err)
        reject(err)
      })
    })
  }

  /**
   * 박스 상태 데이터 로드
   * @returns {Promise} 응답 프로미스
   */
  const loadBoxStateData = () => {
    return new Promise((resolve, reject) => {
      axios.get("/getBoxHeightUseStateShowBoxNo", {
        params: {
          fieldCode: global.m_nLastFieldIdx,
          areaCode: global.m_strCurrAreaCode,
          dbName: global.m_strCurrDBName
        }
      })
      .then(response => {
        appLogout(response.data.result)
        
        response.data.forEach(item => {
          global.m_listBoxUseState.push(item.useState)
          global.m_listBoxHeight.push(item.BoxHeight)
          global.m_listShowBoxNo.push(item.showBoxNo)
        })
        
        resolve(response)
      })
      .catch(err => {
        console.error("Box state data error:", err)
        reject(err)
      })
    })
  }

  /**
   * 로그인 처리 함수
   */
  const handleLogin = () => {
    try {
      global.m_nLastBoxNo = 0
      global.m_nLastFieldIdx = 0

      axios.get('/getInfo', { params: {} })
        .then((response) => {
          appLogout(response.data.result)
          const session = response.data.result

          if (global.userPhone === session && session !== 'notLogined') {
            setIsLoggedIn(true)
            loadLoginData()
          } else {
            setIsLoggedIn(false)
          }
        })
        .catch((err) => {
          console.error("Login info error:", err)
          setIsLoggedIn(false)
          setError('로그인 정보를 불러오는 중 오류가 발생했습니다.')
        })
    } catch (error) {
      console.error("Login handler error:", error)
      setIsLoggedIn(false)
      setError('로그인 처리 중 오류가 발생했습니다.')
    }
  }

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    try {
      handleLogin()
    } catch (err) {
      console.error("useEffect error:", err)
      setError('애플리케이션 초기화 중 오류가 발생했습니다.')
    }
    
    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      // 필요한 정리 작업 추가
    }
  }, []) // 빈 배열은 컴포넌트가 마운트될 때만 실행

  // 사이드바 너비 설정
  global.sidenavWidth = expanded ? 240 : 64

  // 오류 발생 시
  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        color: 'red', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <h2>오류가 발생했습니다</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            background: '#337ab7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 리다이렉트 처리
  if (redirect) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  // 로그인 상태에 따라 컴포넌트 렌더링
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  return (
    <Router>
      <div className="container">
        {/* 세션 만료 모달 */}
        {showModal && (
          <SessionModal onConfirm={() => setRedirect(true)} />
        )}

        {/* 접근 오류 모달 */}
        {showModalExcept && (
          <ErrorModal onConfirm={() => setRedirect(true)} />
        )}
          
        {/* 앱 레이아웃 */}
        <AppLayout 
          expanded={expanded} 
          setExpanded={setExpanded}
          selected={selected}
          setSelected={setSelected}
          logout={logout}
        />
      </div>
    </Router>
  )
}

export default App
