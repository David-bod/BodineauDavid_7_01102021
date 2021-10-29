<template>

    <div class="container">
        <h1>Bienvenue</h1>
        <figure>
            <img id="img_home" src="../img/logo_groupomania/icon-above-font.png" alt="Logo du groupe Groupomania" title="Groupomania">
        </figure>

        <a href="login" class="btn btn-danger btn-block max">Se connecter</a><br>
        <a href="register" class="btn btn-danger btn-block max">S'inscrire</a>
    </div>

</template>

<script>

    export default {
        name: 'home'
    }

</script>

<style>

h1, figure{
    margin: 0;
}

h1 {
    color: white;
    margin-top: 15px;
}

#img_home{
    max-width: 200px;
    margin-bottom: 50px;
    box-shadow: 0px 0px 10px 1px rgb(88, 66, 66);
    border-radius: 50%;
    margin-top: 25px;
}

.max {
    max-width: 300px;
    margin: auto;
}

</style>