<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container"> 
        <a href="http://localhost:8080/" class="navbar-brand" title="Retourner sur la page d'accueil">Accueil</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="login" class="nav-link" title="Connectez-vous ici">Connexion</a>
            </li>
            <li class="nav-item">
              <a href="register" class="nav-link" title="Inscrivez-vous si vous n'avez pas de compte">Inscription</a>
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