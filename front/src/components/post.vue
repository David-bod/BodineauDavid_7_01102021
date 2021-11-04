<template>
    <div class="post">
        <article v-for="(post, listPost) in allPosts" v-bind:key="listPost">
        <div class="top-comment">
            <h4><a class="profil-clic" href="#" title="Auteur du post">{{ post.name }} {{ post.id }}</a></h4>
            <h5 title="Date et heure à laquelles le post a été créé">Le {{ post.date }} à {{ post.time }}</h5>
        </div>
        <p class="post-text">{{ post.text }}</p>
        <div class="section-comment">
            <p class="alert-text" v-if="comment.text.length >= 1"> {{ errors[0] }}</p>
            <div class="sendText" v-if="disabled == false || id == post.id" >
                <textarea :id="post.id" type="text" v-model="comment.text" minlength="2" maxlength="255" class="comment" @click="checkId" @keyup="checkForm" @focus="id = post.id" placeholder="Cliquez ici pour commenter" required/>
                <button class="btn btn-success btn-sm" title="Envoyer un commentaire sur ce post" :disabled="canComment == false" @click="createComment(post.id)">Envoyer</button>
            </div>
        </div>
        <button @click="afficherCom(post.id)" class="btn btn-dark btn-sm btn-comment" title="Afficher les commentaires sous ce post">Commentaires <i class="fas fa-comments"></i></button>
        <button @click="disabled = false" v-if="disabled == true" class="btn btn-dark btn-sm btn-comment commenter" title="Commenter ce post">Commenter</button>
        <div class="users-comment" v-for="(comment, listComment) in allComments" v-bind:key="listComment">
            <div v-if="post.id == comment.postid">
                <h6>{{ comment.name }} le {{ comment.date }} <button title="SUPPRIMER LE COMMENTAIRE" class="btn btn-outline-danger btn-sm" @click="deleteComment(comment.id)" v-if="comment.userId == userId || admin == 1"><i class="fas fa-trash"></i></button></h6>
                <p class="unique-com">{{ comment.text }}</p>
            </div>
        </div>
        <div class="moderation" v-if="post.userId == userId || admin == 1">
            <button class="btn btn-outline-danger modo-btn btn-sm" title="SUPPRIMER LE POST" @click="deletePost(post.id)"><i class="fas fa-trash"></i></button>
        </div>
        </article>
        <p class="no-connect" v-if="userId == null">Vous devez être connecté pour pouvoir intéragir avec les membres du forum !</p>
    </div>
</template>

<script>

import axios from "axios"
export default {
    name: 'post',
    data() {
        return {
            userId: "",
            userName: "",
            admin: "",
            allPosts: [],
            allComments: [],
            text: "",
            postId: "",
            commentId: "",
            canComment: false,
            errors: [],
            id: "",
            disabled: false,

            verifUser: {
                userId: ""
            },
            comment: {
                id: "",
                text: "",
                userId: "",
                name: ""
            },
            dataComment: "",
        }
    },
    methods: {
        checkId:function() {
            console.log(this.id);
            this.disabled = true;
        },
        checkForm:function(e) {
            this.errors = [];
            if (this.errors.length == 0) { 
                this.canComment = true; console.log(this.canComment + "/" + this.errors.length)
            }
            if(!this.comment.text) {
                this.errors.push("Un texte est obligatoire");
                this.canComment = false;
            } else if (!this.validComment(this.comment.text)) {
                this.errors.push("");
                this.canComment = false;
            }
            if(!this.errors.length) return true;
            e.preventDefault();
        },
        validComment:function(isValidCom) {
            this.comment.text = isValidCom;
            //eslint-disable-next-line
            let re = /^[\s\S]{2,255}/;
            return re.test(isValidCom);
        },
        deletePost(pId){
            this.postId = pId;
            axios.delete("http://localhost:3000/groupomania/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep.message);
                window.location.assign('http://localhost:8080/groupomania');
            })
            .catch(error => {
                console.log(error);
            })
        },
        createComment(pId){
            this.comment.id = this.userId;
            this.postId = pId;
            this.dataComment = JSON.stringify(this.comment);
            axios.post("http://localhost:3000/groupomania/" + pId + "/com", this.dataComment, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                location.reload();
            })
            .catch(error => {
                console.log(error); 
                this.message=error;
            });
        },
        afficherCom(pId) {
            this.postId = pId;
            axios.get("http://localhost:3000/groupomania/" + pId + "/com", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                console.log("Afficher commentaires.");
                let coms = JSON.parse(response.data);
                this.allComments = coms;
                console.log(coms);
            })
            .catch(error => {
            console.log(error);
            });
        },
        deleteComment(comId) {
            this.commentId = comId;
            axios.delete("http://localhost:3000/groupomania/com/" + comId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep.message);
                location.reload();
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        axios.get("http://localhost:3000/groupomania", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            let posts = JSON.parse(response.data);
            this.allPosts = posts;
            console.log(posts);
        });
        axios.get("http://localhost:3000/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            let dataProfil = JSON.parse(response.data);
            this.comment.name = dataProfil[0].name;
            this.userName = dataProfil[0].name;
            this.admin = dataProfil[0].admin;
            this.userId = dataProfil[0].id;
            this.verifUser = dataProfil[0].id;
            this.comment.userId = dataProfil[0].id;
            localStorage.userName = dataProfil[0].name;
        })
        .catch(error => {
            console.log("Impossible de traiter les données du profil ! >" + error);
        })
    }
}
</script>

<style>

.post {
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    max-height: 1000px;
    background-color: white;
}

article {
    margin-bottom: 20px;
    background: rgb(240, 240, 240);
    box-shadow: 0px 0px 5px 0.5px rgb(129, 129, 129);
    padding: 5px;
    border-radius: 10px;
}

h4, h5 {
    margin: 0;
    margin-left: 5px;
    margin-top: 5px;
}

.profil-clic {
    color: rgb(165, 39, 7);
}

.profil-clic:hover {
    text-decoration: none;
    color: navy;
    transition: .5s;
}

.post-text {
    background-color: white;
    max-width: 760px;
    padding: 10px;
    overflow: hidden;
    word-wrap: break-word;
    border-radius: 5px;
}

.top-comment {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 15px;
}

.section-comment {
    display: flex;
    margin-top: 15px;
}

textarea {
    max-height: 25px;
}

.comment {
    width: 90%;
    min-height: 35px;
    border-radius: 5px;
    border: 1px solid black;
    margin-right: 10px;
}

.users-comment {
    border-radius: 10px;
}

.unique-com {
    margin: 0;
}

.reaction-modo, .dislike-block {
    display: flex;
    justify-content: center;
}

.moderation {
    display: flex;
    flex-direction: row;
}

.modo-btn {
    margin-top: 10px;
}

.btn-secondary {
    margin-right: 10px;
}

.btn-comment {
    margin-bottom: 10px;
}

.no-connect {
    font-weight: bold;
    color: red;
}

.commenter {
    margin-left: 5px;
}

</style>