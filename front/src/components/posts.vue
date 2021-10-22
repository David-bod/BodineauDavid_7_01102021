<template>
    
    <div class="zone-principal">
        <div class="zone zone-1">
            <div class="list-posts">
                <div class="section-comment">
                    <input type="text" class="comment addpost" placeholder="Cliquez ici pour ajouter du texte"/>
                    <button class="btn btn-success" title="Envoyer un post">Envoyer</button>
                </div>
                <post />
            </div>
        </div>

        <div class="zone zone-2">
            <a href="/profil"><img src="../img/logo_groupomania/profil_defaut.png" class="profil-img" alt="Photo de profil" title="Photo de profil"></a>
            <p>name</p>
            <p>adressemail@mail.com</p>
            <a href="/profil"><button class="btn btn-info modo-btn" title="Regarder ma page de profil">Voir mon profil</button></a>
        </div>

    </div>

</template>

<script>

import post from './post.vue'

export default {
    components: {
        post
    }
}

</script>

<style>

.zone-principal{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    margin-top: 25px;
}

.zone{
    display: flex;
    box-shadow: 0px 0px 5px 0px rgb(100, 100, 100);
    border-radius: 10px;
    background-color: white;
}

.zone-1{
    width: 70%;
    min-height: 550px;
    overflow-y: scroll;
}

.zone-2 {
    display: flex;
    flex-direction: column;
    width: 28%;
    min-height: 150px;
    max-height: 250px;
    min-width: 300px;
    max-width: 400px;
    margin-left: 5px;
}

.list-posts {
    margin-top: 15px;
    margin-left: 2%;
    margin-right: 2%;
}

.addpost {
    height: 60px;
    background-color: rgb(236, 236, 236);
}

.profil-img {
    margin: auto;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 3px solid rgb(102, 65, 65);
    margin-top: 15px;
}

.btn-info {
    margin-bottom: 10px;
}

@media screen and (max-width: 1100px) {
    .zone-principal {
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
    }

    .zone-1 {
        width: 100%;
    }

    .zone-2 {
        margin-bottom: 20px;
        width: 100%;
        margin-left: 0px;
    }
}

</style>
