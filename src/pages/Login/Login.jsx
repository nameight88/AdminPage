// Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import FlexView from 'react-flexview';
import Modal from '@trendmicro/react-modal';
import { Button } from '@trendmicro/react-buttons';

//css import
import '/src/pages/Login/login.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-modal/dist/react-modal.css';

// api and utils, hooks import
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { encrypt } from '../../utils/crypto';
import { login, checkUserID, getSiteInfo, getSessionInfo } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import '../../hooks/useLoginForm'


const Login = () => {

  const [userID, setUserID] = useState(''); // 관리자 아이디
  const [userPW, setUserPW] = useState(''); // 관리자 비밀번호
  const [companyCode, setCompanyCode] = useState(''); // 고유코드
  const [autoLogin, setAutoLogin] = useState(true); // 자동 로그인
  const [redirect, setRedirect] = useState(false); // 리다이렉트
  const [showModalLogin, setShowModalLogin] = useState(true); // 로그인 모달 표시
  const [showModal, setShowModal] = useState(false); // 모달 표시
  const [modalTitle, setModalTitle] = useState(''); // 모달 제목
  const [modalMsg, setModalMsg] = useState(''); // 모달 메시지 

  const compCodeInput = useRef(null); // 고유코드 입력
  const idInput = useRef(null); // 관리자 아이디 입력
  const pwInput = useRef(null); // 관리자 비밀번호 입력

  useEffect(() => {
  }, [])



  // render
  return (
    // Background Css
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Login Modal Css */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 6,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        width: 400,
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div className='login-modal-header'>
          관리자 로그인
        </div>

        {/* Body */}
        <Modal.Body>
          <FlexView column style={{ padding: 40, gap: 24 }}>
            <div  className='login-modal-body-title'>
              호호락 관리자 시스템에 오신걸 환영합니다.
            </div>
            {/* Company Code Form */}
            <FlexView column>
              <label style={{ fontSize: 14, marginBottom: 4 }}>고유코드</label>
              <input
                type='text'
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: 4
                }}
              />
            </FlexView>
            {/* End Company Code Form */}

            {/* Auto Save Form */}
            <FlexView style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ marginRight: 8 }}
                    onChange={() => {
                      setAutoLogin(!autoLogin);
                      if (!autoLogin) {
                        deleteCookie('AL');
                        deleteCookie('companyCode');
                      }
                    }}
                    checked={autoLogin}
                  />
                자동 저장
              </label>
              <Button btnStyle="primary">확인</Button>
            </FlexView>
            {/* End Auto Save Form */}

            {/* User login Form */}
            <FlexView column>
              <label style={{ fontSize: 14, marginBottom: 4 }}>아이디</label>
              <input
                type='text'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: 4
                }}
              />
            </FlexView>

            <FlexView column>
              <label style={{ fontSize: 14, marginBottom: 4 }}>비밀번호</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: 4
                }}
              />
            </FlexView>
          </FlexView>
        </Modal.Body>
        {/* End User login Form */}

        {/* Footer */}
        <div className='login-modal-footer'>
          <Button btnStyle="primary" onClick={handleLogin}>로그인</Button>
        </div>
        {/* End Footer */}

      </div>
    </div>
  );
}

export default Login;
