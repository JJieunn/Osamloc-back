<img src="https://user-images.githubusercontent.com/108418225/197380707-73b8d37d-7796-497e-a71c-322a40e9dcf4.png" width="100" height="140" />

# 오삼록

- 국내 대표 차(Tea) 브랜드 '[오설록](https://www.osulloc.com/kr/ko)'을 모티브로 한 프로젝트입니다.
- 사이트 선정 이유
  -  처음 프로젝트인 만큼 그동안 배운 지식을 활용하여 E-commerce에 CRUD 기반으로 직접 기능들을 구현해보고 적용해볼 수 있는 사이트를 선정

![오설록](https://user-images.githubusercontent.com/108418225/190359024-709b2df0-3249-4708-8e2f-7d6bcb38c07a.png)

<br />
  
## 1. 개발 기간 및 인원
- __개발 기간__  : 2022.08.29 ~ 2022.09.08 (11일)

- __프론트엔드__ : 유상호, 김정연, 이동호, 이유나 (4명)

- __백엔드__ : 김교은, 박지은 (2명)

- __[프론트엔드 GitHub](https://github.com/wecode-bootcamp-korea/justcode-6-1st-osamloc-front)__ 

- __[백엔드 GitHub](https://github.com/wecode-bootcamp-korea/justcode-6-1st-osamloc-back)__

- __[팀 노션](https://www.notion.so/wecode/93b4fdf1dd4b49dd9b2fe71f7b85d8d0)__

<br />  

## 2. 데이터 모델링

- [dbdiogram.io](https://dbdiagram.io/d/631550500911f91ba5332730)   
<img src="https://user-images.githubusercontent.com/108418225/190328843-2bbf8125-2c98-43a3-a3d0-f31fd9613631.png" width="780" height="880" />

<br />
  
## 3. 시연 영상

- https://www.youtube.com/watch?v=jhNUPFSqefA (약 5분)
 
<br />


## 4. 사용 기술 

- 사용 언어 : `JavaScript`
- 런타임 환경 : `Node.js`
- 프레임워크 : `Express`
- 데이터베이스 : `MySQL`
- HTTP 요청/응답 : `Postman`  
- 협업 : `Github, Slack, Notion, Zep`

<br />


## 5. 실행 방법

#### Step 1. 레포지토리 clone

```
git clone https://github.com/wecode-bootcamp-korea/justcode-6-1st-osamloc-back.git
```

#### Step 2. 폴더로 이동

```
cd justcode-6-1st-osamloc-back
```

#### Step 3. 의존성들 설치

```
npm install
```

#### Step 4. .env 파일 생성
```
(로컬에 미리 DB/Schema를 만들어 주세요.)

DATABASE_URL = mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 127.0.0.1
TYPEORM_PORT = 3306
TYPEORM_USERNAME = 계정
TYPEORM_PASSWORD = 비밀번호
TYPEORM_DATABASE = 미리 생성한 데이터베이스 이름

PORT = 애플리케이션 서버 포트 번호
```
#### Step 5. DataBase Tables 생성

```
dbmate up
```

#### Step 6. 실행

```
node server.js
```  

<br />

## 6. 프로젝트 구조

MVC pattern에 Service가 추가된 Layered achitecture 로 routers - controllers - services - models 의 구조 
```
📦justcode-6-1st-osamloc-back
 ┣ 📂controllers
 │    ┗ usersController.js
 │    ┗ product.js
 │    ┗ getDetailController.js
 │    ┗ reviewController.js
 │    ┗ cartOrder.js
 │    ┗ shopLocation.js
 ┗ 📂middlewares
 │    ┗ authorization.js
 ┣ 📂models
 │    ┗ usersDao.js
 │    ┗ productDao.js
 │    ┗ getDetailDao.js
 │    ┗ reviewDao.js
 │    ┗ cartOrderDao.js
 │    ┗ shopLocation.js
 ┣ 📂routes
 │    ┗ index.js
 │    ┗ usersRouter.js
 │    ┗ product.js
 │    ┗ cartOrder.js
 │    ┗ shopLocation.js
 ┣ 📂services
 │    ┗ usersService.js
 │    ┗ product.js
 │    ┗ getDetailService.js
 │    ┗ reviewService.js
 │    ┗ cartOrder.js
 │    ┗ shopLocation.js
 ┣ 📂db
 ┣ 📂data  
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜app.js
 ┗ 📜server.js
```
- `controllers` : client의 요청과 응답을 처리
- `services` : 비즈니스 로직 처리
- `models` : 데이터베이스 연결과 데이터 처리
- `data` : 프로젝트에 사용된 데이터 INSERT 파일 모음


<br />

## 7. 담당 기능

  - 회원가입 / 로그인 API 
    - 회원가입 시 계정 및 전화번호 중복을 체크하도록 구현
    - bcryptjs, JWT를 활용하여 비밀번호를 hased 하고 로그인 성공 시 토큰을 발행 
    - jwt.verify() 메소드를 통해 User Check Middleware를 구현하였으며 토큰이 없을 때, 유효하지 않은 토큰일 때, 토큰 발행 이후 탈퇴하여 유저가 존재하지 않을 때의 상황에 따라 적절한 에러 처리

<br />

  - 제품 상세 페이지 조회 API
    - if 조건문을 이용한 path params의 id 값(제품 고유 키값) 검사를 진행, 키 에러나 제품이 없을 시의 에러 처리 구현
    - 필요에 따라 각각 다른 SQL 함수를 통해 상세 정보와 리뷰, 옵션을 조회한 후 service단에서 다시 병합
    - 쿼리문을 통해 불러온 정보를 원하는 데이터 형식에 맞춰 가공
      - 프론트엔드에서의 계산을 위해 가격을 number 값으로 변환
      - 한글 문자로 query에 정보가 넘겨질 경우 발생할 에러를 방지하고자 영어로 카테고리 DB 값을 변경, 때문에 상세 정보 조회시 replace를 이용해 다시 한글로 변환해주는 로직 구현
      - 카테고리 고유 키값을 이름으로, 별점 평균 및 리뷰 수를 계산하는 로직 구현
       

<br />

  - 리뷰 CRUD API
    - User Check Middleware를 이용해 로그인 했을 때만 리뷰 작성이 가능
    - 제품에 리뷰가 존재하는지 에러 체크 후, 리뷰와 유저의 고유 키값을 조건으로 리뷰 삭제 및 수정이 가능
    - 수정할 때 이미지 값, 별점, 내용 중 어떤 값이 들어오는지에 따라서 처리하는 SQL 함수가 달라지도록 service단에 if문 로직을 구현
    - 리뷰 작성 및 삭제 후에 전체 리뷰 목록을 updated 기준의 내림차순으로 조회
  

<br />

## 8. API Docs

- [회원가입 / 로그인 / 제품 상세 페이지 / 리뷰 CRUD API](https://documenter.getpostman.com/view/22723173/VUxVrQLd)  
- [카테고리 / 제품 필터, 정렬 / 제품 리스트 API](https://documenter.getpostman.com/view/22723465/VUxXKNsa)  
- [장바구니 / 결제 API](https://documenter.getpostman.com/view/22723465/VVBQX98b)  

<br />

## 9. 그 외 기능 분담

- 김교은  
  - 카테고리 API  
  - 제품 리스트 API  
  - 제품 정렬 API  
  - 장바구니 / 결제 API
  - 최종 발표  

- 박지은
  - 회원가입 / 로그인 API 
  - 제품 상세 페이지 API   
  - 리뷰 CRUD API
  - Backend README.md 작성
  
<br />

## Reference
- 이 프로젝트는 [오설록](https://www.osulloc.com/kr/ko) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무 수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
