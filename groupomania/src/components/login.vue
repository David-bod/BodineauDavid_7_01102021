<template>
    <form class="connexion">
        <h3>Connexion</h3>

        <div class="form-group">
            <label>Adresse mail</label>
            <input type="email" class="form-control" placeholder="Adresse e-mail" minlength="5" required/>
        </div>

        <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" class="form-control" placeholder="Mot de passe" minlength="7" required/>
        </div>

        <button class="btn btn-success btn-block">Je me connecte !</button>
        <a href="http://localhost:8080/" class="btn btn-dark btn-block"><i class="fas fa-arrow-left"></i> Retourner à l'accueil</a>
    </form>
</template>


<script>
    export default {
        name: 'login'
    }
</script>

<style>

.connexion {
    max-width: 350px;
    margin: auto;
}

.auth-inner {
    padding: 25px;
}

</style>
