// server/config/env.js
import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV       = process.env.NODE_ENV;
export const PORT           = process.env.PORT || 3000;
export const isProd         = NODE_ENV === 'production';

//MSSQL 접속 정보 
export const DB_HOST        = process.env.DB_HOST;
export const DB_PORT        = process.env.DB_PORT;
export const DB_USER        = process.env.DB_USER;
export const DB_PASSWORD    = process.env.DB_PASSWORD;
export const DB_NAME        = process.env.DB_NAME;

// 세션 시크릿 
export const SESSION_SECRET = process.env.SESSION_SECRET;

//메일 서버 정보
export const SMTP_HOST      = process.env.SMTP_HOST;
export const SMTP_PORT      = process.env.SMTP_PORT;
export const SMTP_USER      = process.env.SMTP_USER;
export const SMTP_PASS      = process.env.SMTP_PASS;

// ActiveDirectory 접속 정보 
export const AD_URL         = process.env.AD_URL;
export const AD_BASE_DN     = process.env.AD_BASE_DN;
export const AD_USERNAME    = process.env.AD_USERNAME;
export const AD_PASSWORD    = process.env.AD_PASSWORD;

// SSL 설정 
export const SSL_ENABLED    = process.env.SSL_ENABLED === 'true';
export const SSL_KEY_PATH   = process.env.SSL_KEY_PATH;
export const SSL_CERT_PATH  = process.env.SSL_CERT_PATH;
