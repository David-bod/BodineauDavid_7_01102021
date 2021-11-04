<template>
    
    <div class="zone-principal">
        <div class="zone zone-1">
            <div class="list-posts">
                <p class="alert-text" v-if="dataPost.text.length > 1"> {{ errors[0] }}</p>
                <div class="section-comment">
                    <form class="sendText">
                        <input autofocus type="text" minlength="20" maxlength="500" class="comment addpost" @keyup="checkForm" placeholder="Cliquez ici pour ajouter du texte" v-model="dataPost.text" required/>
                        <button class="btn btn-success" title="Envoyer un post" :disabled="canPost == false"  @click="sendPost()">Envoyer</button>
                    </form>
                </div>
                <post />
            </div>
        </div>

        <div class="zone zone-2">
            <a href="/profil"><img src="../img/logo_groupomania/profil_defaut.png" class="profil-img" alt="Voir mon profil" title="Profil"></a>
            <p>{{ userName }}</p>
            <p>{{ email }}</p>
            <a href="/profil"><button class="btn btn-dark modo-btn btn-profil" title="Regarder ma page de profil">Voir mon profil</button></a>
        </div>

    </div>

</template>

<script>

import post from './post.vue'
import axios from "axios"

export default {
    components: {
        post
    },
    data() {
        return {
            userId: "",
            userName: localStorage.userName,
            email: localStorage.email,
            admin: "",
            allPosts: [],
            canPost: false,
            errors: [],

            dataPost: {
                text: "",
                userId: ""
            },
            dataSend: ""
        }
    },
    methods: {
        checkForm:function(e) {
            this.errors = [];
            if (this.errors.length == 0) { this.canPost = true; console.log(this.canPost + "/" + this.errors.length)}
            if(!this.dataPost.text) {
                this.errors.push("Un texte est obligatoire");
                this.canPost = false;
            } else if (!this.validPost(this.dataPost.text)) {
                this.errors.push("Le texte doit faire entre 20 et 500 caractères");
                this.canPost = false;
            }
            if(!this.errors.length) return true;
            e.preventDefault();
        },
        validPost:function(isValidPost) {
            this.dataPost.text = isValidPost;
            //eslint-disable-next-line
            let re = /^[\s\S]{20,500}/;
            return re.test(isValidPost);
        },
        sendPost() {
            this.dataSend = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/groupomania", this.dataSend, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let retour = JSON.parse(response.data);
                this.message = retour.message;
                location.reload();
            })
            .catch(error => {
                console.log(error);
            });
            location.reload();
        }
    }
}

</script>

<style>

.sendText {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
}

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
    width: 100%;
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

.btn-info, .btn-profil {
    margin-bottom: 10px;
}

.alert-text {
    font-weight: bold;
    color: red;
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
