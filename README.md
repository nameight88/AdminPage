# 통합 매니저 관리 시스템

로커 시스템 관리를 위한 웹 애플리케이션입니다.

## 시스템 요구사항

- Node.js 16.x 이상
- npm 8.x 이상

## 설치 방법

```bash
# 의존성 패키지 설치
npm install
```

## 실행 방법

### 개발 모드

```bash
# 서버만 실행 (3000번 포트)
npm run dev

# 프론트엔드 개발 서버만 실행 (5173번 포트)
npm run dev:client

# 서버와 프론트엔드 동시 실행
npm run dev:all
```

### 프로덕션 모드

```bash
# 프론트엔드 빌드
npm run build

# 프로덕션 서버 실행 (3000번 포트)
npm run start
```

## 디렉토리 구조

```
├── config/              # 설정 파일 디렉토리
├── public/              # 정적 파일 디렉토리
├── server/              # 백엔드 서버 코드
│   ├── index.js         # 서버 진입점
│   └── routes/          # API 라우트
├── src/                 # 프론트엔드 소스 코드
│   ├── components/      # 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── layouts/         # 레이아웃 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   ├── services/        # API 서비스
│   └── utils/           # 유틸리티 함수
├── vite.config.js       # Vite 설정
└── package.json         # 프로젝트 설정
```

## 주요 기능

- 락커 목록 조회 및 관리
- 사용자 관리
- 사용 내역 조회
- 장기 미사용자 리포트
- 예약 관리

## 포트 정보

이 애플리케이션은 다음 포트를 사용합니다:

- **3000**: 메인 서버 포트 (API 및 정적 파일 제공)
- **5173**: 개발 환경에서 Vite 서버 포트 (선택적 사용)

## 라이센스

Copyright © 2024
