# Mevie

## 🎞 영화 검색 웹 애플리케이션 프로젝트
![Logo](https://github.com/SoominYim/Mevie/assets/107674737/4aa69fea-1822-497b-a572-761df4ee505a "Bright")

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

- Vue.js 3.X: 사용자 인터페이스(UI)를 개발하기 위한 프론트엔드 프레임워크
  
- Axios: HTTP 요청을 보내고 응답을 받기 위해 사용
  
- HTML/CSS: 웹 페이지 구조와 스타일링을 위해 사용

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

<br>

## 📕 기획 단계

### **스토리보드**
- **시작 화면**: Main에 Logo와 Movie List가 표시됩니다. 
- **검색 결과**: 입력시 실시간으로 입력한 Movie가 Filtering 되어 화면에 표시됩니다.
- **영화 선택**: 사용자는 검색 결과에서 원하는 Movie를 선택할 수 있습니다. 
- **에러 처리**: 사용자가 잘못된 검색어를 입력하거나 검색 결과가 없는 경우에 대비하여 에러 메시지가 표시됩니다. 

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
[개발 내용 작성]

***

# 🔧 테스트 단계
## Dark Mode 기능
### ❌ 최초 접속 시 localStorage에 theme 미적용
### 원인 : Mode에 따라 로고가 변하는 코드를 css에서 처리했다.
```css
html[data-theme="blightMode"] {
  --color-body: #fff;
  --color-text: #2b2b2b;
  .logo {
    background: url("~@/assets/logo_white.png") no-repeat 0 0 / 100% auto;
  }
  // Fixed
  .fix-item {
    button {
      background-color: #fff;
      -webkit-box-shadow: 0 0 0 1px #dadcdf, 0 4px 8px 0 rgba(0, 0, 0, 0.15);
      box-shadow: 0 0 0 1px #dadcdf, 0 4px 8px 0 rgba(0, 0, 0, 0.15);
      span {
        color: #2b2b2b;
      }
    }
  }
}
html[data-theme="darkMode"] {
  --color-body: #2b2b2b;
  --color-text: #fff;
  .logo {
    background: url("./assets/logo_black.png") no-repeat 0 0 / 100% auto;
  }

  // Fixed
  .fix-item {
    button {
      background-color: #2b2b2b;
      -webkit-box-shadow: 0 0 0 1px #515254, 0 3px 6px 0 rgba(0, 0, 0, 0.08);
      box-shadow: 0 0 0 1px #515254, 0 3px 6px 0 rgba(0, 0, 0, 0.08);
      span {
        color: #d9dbdf;
      }
    }
  }
}

```
css가 먼저 렌더링이 되기 때문에 Mode 로직이 정상적으로 처리가 되지 않았다.
```javascript
<template>
  <div id="app">
    <me-header></me-header>
    <router-view />
    <me-fix></me-fix>
  </div>
</template>

<script>
import MeHeader from "@/components/common/MeHeader";
import MeFix from "@/components/common/MeFix";

export default {
  name: "App",
  components: {
    MeHeader,
    MeFix,
  },
  data() {
    return {
      localTheme: localStorage.getItem("theme") || "brightMode",
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  created() {
    this.localTheme = localStorage.getItem("theme");
    if (this.localTheme) {
      document.documentElement.setAttribute("data-theme", this.localTheme);
      this.$store.commit("setTheme", this.localTheme);
    } else {
      document.documentElement.setAttribute("data-theme", this.theme);
      window.localStorage.setItem("theme", "brightMode");
    }
  },
};
</script>

<style lang="scss">
@import "./style/reset.css";
@import "./style/app.scss";
</style>
```
### 해결방법
store에서 theme를 관리하고, logo 렌더링은 computed를 사용해 inline으로 처리 하였다.
```vue
  <div class="logo" :style="logoTheme">
      <router-link :to="{ name: 'main' }">
        <span class="blind">Mevie</span>
      </router-link>
    </div>
```
```javascript
computed: {
    logoTheme() {
      const theme = this.$store.state.theme;
      return {
        background: `url(${
          theme === "brightMode" ? require("@/assets/logo_white.png") : require("@/assets/logo_black.png")
        }) no-repeat 0 0 / 100% auto`,
      };
    },
```

### ❌ Dark Mode 사용중 새로고침시에 화면 깜빡임 버그
![recording-_1_](https://github.com/SoominYim/Mevie/assets/107674737/313e671e-a0ae-493d-b40c-26fc84885e05)
### 해결방법


***

# 마치며 

