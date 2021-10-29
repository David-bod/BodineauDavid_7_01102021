<template>
  <div id="app">
    <navi />

     <div class="auth-wrapper0">
       <div class="auth-inner0">
         <router-view />
       </div>
     </div>
     <footerb />
  </div>
</template>

<script>

import navi from './components/navi.vue'
import home from './components/home.vue'
import footerb from './components/footer.vue'

export default {
  name: 'App',
  home,
  components: {
    navi,
    footerb
  }
}

</script>

<style lang="scss">

*{
  box-align: border-box;
}

body{
  background: #5e5e5e !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6, label, span {
  font-weight: 500;
}

body, html, #app, .auth-wrapper{
  width: 100%;
  height: 100%;
}

#app {
  text-align: center;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.auth-wrapper0{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

.auth-inner0{
  width: 98%;
  height: 85%;
  max-width: 1200px;
  border-radius: 15px;
  transition: all .3s;
  margin-top: 50px;
}

.auth-wrapper .form-control:focus{
  border-color: #d1515a;
  box-shadow: none;
}

.auth-wrapper h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label{
  font-weight: 400;
}

@media screen and (max-width: 1100px) {
}

</style>
