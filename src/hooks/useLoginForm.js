// useLoginForm.js
import { useState } from 'react';

export default function useLoginForm() {
    const [userID, setUserID] = useState('');
    const [userPW, setUserPW] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [autoLogin, setAutoLogin] = useState(true);

    return {
        userID, setUserID,
        userPW, setUserPW,
        companyCode, setCompanyCode,
        autoLogin, setAutoLogin
    };
}
