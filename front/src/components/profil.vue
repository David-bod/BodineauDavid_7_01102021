<template>

    <div class="zone-20">
        <a href="#"><img src="../img/logo_groupomania/profil_defaut.png" class="profil-img" alt="Photo de profil" title="Photo de profil"></a>
        <p>name</p>
        <p>adressemail@mail.com</p>
        <button class="btn btn-danger modo-btn" title="Supprimer mon profil du site">Supprimer mon profil</button>
        <button class="btn btn-danger modo-btn" title="Supprimer ce profil du site">Supprimer le profil de l'utilisateur</button>
        <a href="/groupomania"><button class="btn btn-info modo-btn" title="Retour sur la page des posts">Retour</button></a>
    </div>

</template>

<script>

export default {
    name: 'profil'
}

</script>

<style>

.zone-20 {
    display: flex;
    flex-direction: column;
    width: 28%;
    padding: 15px;
    margin: auto;
    margin-top: 20px;
    box-shadow: 0px 0px 5px 0px rgb(100, 100, 100);
    border-radius: 10px;
    background-color: white;
}

</style>