# Mevie

## 🎞 영화 검색 웹 애플리케이션 프로젝트
![Logo](https://github.com/SoominYim/Mevie/assets/107674737/4aa69fea-1822-497b-a572-761df4ee505a "Bright")

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [프로젝트 계획](#프로젝트-계획)
3. [기획 단계](#기획-단계)
4. [개발 단계](#개발-단계)
5. [테스트 단계](#테스트-단계)



## 프로젝트 개요 

영화 검색 웹 애플리케이션은 Vue.js 3.X를 사용하여 개발된 웹 애플리케이션입니다.
<br>

이 애플리케이션은 사용자가 원하는 영화를 검색하고 해당 영화에 대한 정보를 제공하는 기능을 제공합니다
<br>

TMDB API를 활용하여 영화 데이터를 가져와 사용자에게 제공합니다. 
<br>
<br>

### 주요 기능 

- **영화 검색**: 사용자는 검색 창에 영화 제목을 입력하여 원하는 영화를 검색  
  
- **영화 정보 제공**: 검색된 영화에 대한 정보(영화 제목, 개봉일, 포스터 등)를 화면에 표시  
  
- **TMDB API 연동**: TMDB API를 활용하여 영화 데이터를 실시간으로 가져와 화면에 표시  
<br>

### 기술 스택 

- Vue3, Vue Router, Vuex 
  
- Axios

- HTML, CSS, SCSS, JavaScript

- mobile-detect : 사용 디바이스 체크 

- TMDB : 영화 Data

<br>

### 프로젝트 목적

이 프로젝트의 목적은 Vue.js를 활용하여 실전 프로젝트를 구현하고, 외부 API와의 데이터 통신 및 처리 방법을 익히는 것입니다.

또한, 사용자 경험을 고려하여 직관적이고 효율적인 영화 검색 서비스를 제공하는 것을 목표로 하였습니다.
<br>
<br>

***

# 프로젝트 계획 

1. **기획 단계**: 프로젝트의 목적과 주요 기능을 정의하고, UI/UX 디자인을 계획
2. **개발 단계**: Vue.js를 사용하여 프론트엔드를 개발하고, KOFIC API와의 연동
3. **테스트 단계**: 각 기능의 동작을 테스트하고, 버그를 수정하여 안정적인 서비스를 제공
4. **배포 단계**: 완성된 애플리케이션을 웹 호스팅 서비스에 배포

# 추가 계획

1. PC / Mobile 라우터 분기처리 ☑️

<br>

## 📕 기획 단계

### **스토리보드**
### **공통 사항**
- Logo 클릭 시 메인 화면으로 이동합니다.
- Search Button 클릭 시 검색 페이지로 이동합니다.
- Arrow Top 클릭 시 페이지 최상단으로 이동합니다.
- Mode 토글 시 Bright Mode, Dark Mode로 Mode 변경이 가능합니다.
- 페이지 재방문 시 기존에 적용했던 Mode는 유지 됩니다. 

### **메인 페이지**
- 인기 Movie Slider와 장르별 Movie List Slider가 표시됩니다.
- 페이지 리사이즈 시 요소들의 scale이 작아집니다.
- 페이지 리사이즈 되어도 장르별 영화는 중앙 정렬됩니다.
- 장르별 영화 클릭 시 상세 페이지로 이동합니다.
- 장르별 영화 슬라이드에 Mouse Over 시 좌우 Arrow가 표시됩니다.
- 더 이상 슬라이드가 없다면 Arrow가 표시 되지 않습니다.

### **상세 페이지**
- 선택한 영화의 상세 내용이 표시됩니다.
- 감독/출연진의 내용이 표시됩니다.
- 비슷한 장르의 Movie List가 표시되며 클릭 시 상세 페이지로 이동합니다.

### **검색 페이지**
- 입력시 실시간으로 입력한 Movie가 Filtering 되어 화면에 표시됩니다.
- 문자열의 앞과 끝은 띄어쓰기가 적용되지 않습니다.
- 한 글자 이상 입력하여야 결과가 표시됩니다.
- Movie List는 window가 리사이즈 되어도 중앙 정렬됩니다.
- ~~더 불러오기 Button 클릭 시 더 많은 영화가 표시됩니다.~~ _기능 삭제_
- ~~더 이상 불러올 영화가 없으면 Button은 표시되지 않습니다.~~ _기능 삭제_
- **더 불러올 영화정보가 있다면, 최하단으로 스크롤 시 추가로 영화를 불러옵니다** _기능 추가_


<br>

### **UI/UX 디자인**
#### Design Tool
- **Canva**: Canva를 사용하여 UI/UX 디자인을 진행합니다.

  <br>
1.**Logo**

![Logo](https://github.com/SoominYim/Mevie/assets/107674737/4aa69fea-1822-497b-a572-761df4ee505a "Bright")


![Logo](https://github.com/SoominYim/Mevie/assets/107674737/21cffdcd-26ff-469d-a2ff-fee9556f4173 "Dark")

<br>

2.**UI/UX**
- #### 메인 화면
<img src="https://github.com/SoominYim/Mevie/assets/107674737/9a2c37da-9860-460f-992b-f52e83904448" alt="메인화면 상단" width="560">

<br>

<img src="https://github.com/SoominYim/Mevie/assets/107674737/a24b9846-d061-4b21-baaf-d7e1a7f810dc" alt="메인화면 중하단" width="560">

<br>


- #### 상세 화면
<img src="https://github.com/SoominYim/Mevie/assets/107674737/5fb50cf2-dfdf-4bfe-860f-52731808626e" alt="상세화면" width="560">


<br>


- #### 검색 화면
<img src="https://github.com/SoominYim/Mevie/assets/107674737/dd05b91b-f518-4659-ba35-deb3cedbdd6e" alt="상세화면" width="560">

***

# 💻 개발 단계
### **공통 사항**
- [x] TMDB API 사용하여 영화정보 GET
- [x] Arrow Top, Dark Mode 구현
  - [x] 사용모드 Local storage 저장 (재방문 시 기존에 설정했던 모드 사용)
- [x] Main, Search, Detail Router 적용
  - [x] 현재 접속한 디바이스 별로 보여지는 Router 다르게 적용 (MobileDetect 사용)
- **Mobile**
  - [x] 각종 Icon의 LayOut 변경 (Size, Position 등)
### **메인 페이지**
- [x] 메인 Slider에서 infinyty slide 구현
  - [x] 인기영화 순으로 Sorted
  - [x] 페이지 성능을 위해 필요 한 경우에만 API 요청
  - [x] Window Resize시에도 이미지 크기 유지
- [x] 장르별 Movie List Slider 구현
    - [x] Mouse Over시 Arrow 표시
      - [x] 더 이상 움직일 Slide가 없다면 Arrow는 표시 되지 않습니다.
      - [x] Window Resize 시 가운데 유지
        - [ ] Window Resize 시 Slide Page 유지
- [x] 영화 클릭 시 상세 페이지로 Route
- **Mobile**
  - [x] 메인 Slider의 Overview 삭제
  - [ ] 장르별 영화 Slide는 Drag 방식
### **상세 페이지**
- [x] 선택한 영화로 페이지 이동
  - [x] URL로 영화 구분 
- [x] 영화 상세, 감독/출연진, 비슷한 영화 Component 분리
  - [x] Parent Component에서 Data 처리 후 각각의 Component로 Data Binding
- [x] 비슷한 장르 영화 클릭 시 Detail Page로 Route

### **검색 페이지**
- [x] 입력시 실시간으로 입력한 내용 표시
  - [x] 두 글자 이상 입력 시 내용 표시 (필요하지 않은 정보가 요청되는 것을 방지)
  - [x] trim을 이용하여 앞뒤 띄어쓰기 무시
  - [x] 검색 input 상단 고정
- [x] Window Resize 시에도 요소 중앙 정렬
- [x] 최하단으로 스크롤 시 더 불러올 Data가 있다면 API 추가 요청
- [ ] data Loading시 더 나은 사용자 경험을 위해 Spinner 사용
- [x] 영화 클릭 시 상세 페이지로 Route 


# 🔧 테스트 단계
## Dark Mode 기능
### ❌ 최초 접속 시 localStorage에 theme 미적용 ☑️
  - **원인**
    - 최초 Local Storage에 값을 저장할때 Store에 state에서 저장을 하는데, default 값을 '' 빈 문자열로 선언함
  - **해결방법**
    - state에 default 인 "brightMode"로 선언
### ❌ Dark Mode 사용중 새로고침시에 화면 깜빡임 버그 ☑️
![recording-_1_](https://github.com/SoominYim/Mevie/assets/107674737/313e671e-a0ae-493d-b40c-26fc84885e05)
  - **원인**
    - 좀 더 나은 사용자 경험을 위해 transition 애니메이션을 준 것
  - **해결방법**
    - transition 코드 제거 후 정상 작동
***

# 마치며 

