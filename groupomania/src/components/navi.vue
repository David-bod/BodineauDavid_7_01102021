<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container"> 
        <a href="http://localhost:8080/" class="navbar-brand">Accueil</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="login" class="nav-link">Connexion</a>
            </li>
            <li class="nav-item">
              <a href="register" class="nav-link">Inscription</a>
            </li>
          </ul>
        </div> 
      </div>
     </nav>
</template>

<script>

  export default {
    name: 'navi'
  }

</script>