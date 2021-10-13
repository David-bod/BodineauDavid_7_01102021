<template>
    
    <div class="zone-principal">
        <div class="zone zone-1">
            <div>
                <post />
            </div>
        </div>

        <div class="zone zone-2">
            <a href="#"><img src="../img/logo_groupomania/profil_defaut.png" class="profil-img" alt="Photo de profil"></a>
            <p>name</p>
            <p>adressemail@mail.com</p>
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
    flex-wrap: wrap;
    width: 100%;
}

.zone{
    display: flex;
    box-shadow: 0px 0px 5px 0px rgb(100, 100, 100);
    border-radius: 10px;
}

.zone-1{
    width: 70%;
    min-height: 550px;
}

.zone-2 {
    display: flex;
    flex-direction: column;
    width: 28%;
    min-height: 150px;
    max-height: 200px;
}

.profil-img {
    margin: auto;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 3px solid rgb(102, 65, 65);
    margin-top: 15px;
}

</style>
