<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container"> 
        <a href="http://localhost:8080/" class="navbar-brand" title="Retourner sur la page d'accueil">Accueil</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="#" @click="deco()" class="nav-link" title="Se déconnecter">Se déconnecter</a>
            </li>
            <li class="nav-item">
              <a href="groupomania" class="nav-link" title="Connectez-vous ici">Forum</a>
            </li>
          </ul>
        </div> 
      </div>
     </nav>
</template>

<script>

  export default {
    name: 'navi',
    data() {
      return {
        userId: localStorage.userId
      }
    },
    methods: {
      deco() {
        console.log("Deconnexion...");
        localStorage.clear();
        this.$router.push('/');
      }
    }
  }

</script>