<template>
<div>
    <div class="zone-20">
        <h1 class="profil">Profil</h1>
        <a href="#"><img src="../img/logo_groupomania/profil_defaut.png" class="profil-img" alt="Photo de profil" title="Photo de profil"></a>
        <p>{{ dataUser.name }} (n° compte : {{ dataUser.id }})</p>
        <p>{{ dataUser.email }}</p>
        <p v-if="dataUser.admin == 0">Rôle : Membre</p>
        <p v-if="dataUser.admin == 1">Rôle : Modérateur</p>
        <button class="btn btn-danger modo-btn btn-sm maxSize" title="Supprimer mon profil du site" @click="deleteUser">Supprimer mon profil</button>
        <a href="/groupomania"><button class="btn btn-dark modo-btn btn-sm" title="Retour sur la page des posts">Retour</button></a>
    </div>
    <div class="zone-20">
        <h2>Modifier votre profil</h2>
        <p v-if="newDataUser.email.length >= 5 && newDataUser.password.length >= 5 && newDataUser.name.length >= 2">
            <ul>
                <li v-for="(error, ok) in errors" v-bind:key="ok">{{ errors[ok] }}</li>
            </ul>
        </p>
        <div class="zone-modif">
            <label name="name">Nom ou pseudo :</label>
            <input type="text" name="name" v-model="newDataUser.name" @keyup="checkForm" :placeholder="dataUser.name">
        </div>
        <div class="zone-modif">
            <label name="email">Adresse mail :</label>
            <input type="email" name="email" v-model="newDataUser.email" @keyup="checkForm" :placeholder="dataUser.email">
        </div>
        <div class="zone-modif">
            <label name="password">Mot de passe :</label>
            <input type="password" name="password" v-model="newDataUser.password" @keyup="checkForm" placeholder="Votre mot de passe">
        </div>
        <button class="btn btn-warning modo-btn btn-sm maxSize" title="Modifier mon profil" :disabled="canModify == false" onClick="window.location.href = 'http://localhost:8080/groupomania';" @click="modifyUser">Modifier mon profil</button>
    </div>
</div>
</template>

<script>
// Importation du module axios pour les requêtes vers le back
import axios from "axios"

// Déclaration des données
export default {
    name: 'profil',
    data() {
        return {
            errors: [],
            canModify: false,
            dataUser: {
                name: "",
                email: "",
                admin: "",
                id: ""
            },
            newDataUser: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        // Vérification du formulaire à l'aide de Regex
        checkForm:function(e) {
            this.errors = [];
            if (this.errors.length == 0) { this.canModify = true; console.log(this.canModify + "/" + this.errors.length)}
            if(!this.newDataUser.email) {
                this.errors.push("L'email est nécessaire !");
                this.canModify = false;
            } else if (!this.validEmail(this.newDataUser.email)) {
                this.errors.push("L'email est invalide !");
                this.canModify = false;
            }
            if(!this.newDataUser.name) {
                this.errors.push("Un nom est nécessaire !");
                this.canModify = false;
            } else if (!this.validName(this.newDataUser.name)) {
                this.errors.push("Nom invalide !")
                this.canModify = false;
            }
            if (!this.newDataUser.password) {
                this.errors.push("Le mot de passe est nécessaire");
                this.canModify = false;
            }
            if (!this.validPassword(this.newDataUser.password)) {
                this.errors.push("Le mot de passe doit contenir 8 caractères, une lettre, un chiffre.");
                this.canModify = false;
            }
            if(!this.errors.length) return true;
                e.preventDefault();
            },
        validEmail:function(email) {
            this.newDataUser.email = email;
            //eslint-disable-next-line
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validPassword:function(pass) {
            this.newDataUser.password = pass;
            //eslint-disable-next-line
            let rePass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return rePass.test(pass);
        },
        validName:function(name) {
            this.newDataUser.name = name;
            //eslint-disable-next-line
            let reName = /^[a-z ,.'-]+$/i;
            return reName.test(name);
        },
        // Requête modification des données utilisateur
        modifyUser() {
            this.newData = JSON.stringify(this.newDataUser);
            axios.put("http://localhost:3000/profil", this.newData, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                console.log("Profil modifié !");
                let rep = JSON.parse(response.data);
                console.log(rep);
                location.reload();
            })
            .catch(error => {
                console.log(error);
            })
        },
        // Requête pour la suppression d'un utilisateur/posts et commentaires
        deleteUser() {
            axios.delete("http://localhost:3000/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                localStorage.clear();
                this.$router.push('/');
                location.reload();
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        }
    },
    // Requêtes au chargement de la page
    mounted() {
        // Récupération des données profil (nom/email/admin/id)
        axios.get("http://localhost:3000/profil", {headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(response => {
            let dataProfil = JSON.parse(response.data);
            this.dataUser.name = dataProfil[0].name;
            this.dataUser.email = dataProfil[0].email;
            this.dataUser.admin = dataProfil[0].admin;
            this.dataUser.id = dataProfil[0].id;
        })
        .catch(error => {
            console.log("Impossible de traiter les données du profil ! >" + error);
        })
    }
}

</script>

<style>
/* Début du CSS */
.zone-20 {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin: auto;
    margin-top: 20px;
    box-shadow: 0px 0px 5px 0px rgb(100, 100, 100);
    border-radius: 10px;
    background-color: white;
}

.profil {
    color: black;
}

.maxSize {
    margin-left: auto;
    margin-right: auto;
    max-width: 250px;
}

.zone-modif {
    margin-top: 10px;
}

label {
    margin-right: 5px;
}

input {
    border-radius: 5px;
    border: 1px solid black;
}

input:focus {
    background-color: rgb(231, 255, 211);
}

</style>