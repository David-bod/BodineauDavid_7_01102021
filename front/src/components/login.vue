<template>
    <div class="connexion">
        <h3>Connexion</h3>
        <p v-if="dataLog.email.length >= 5 && dataLog.password.length >= 5">
            <ul>
                <li v-for="(error, ok) in errors" v-bind:key="ok">{{ errors[ok] }}</li>
            </ul>
        </p>
        <div class="form-group">
            <label>Adresse mail</label>
            <input @keyup="checkForm" type="email" class="form-control" name="email" v-model="dataLog.email" placeholder="Adresse e-mail" minlength="5" autofocus required/>
        </div>

        <div class="form-group">
            <label>Mot de passe</label>
            <input @keyup="checkForm" type="password" class="form-control" name="password" v-model="dataLog.password" placeholder="Mot de passe" minlength="7" required/>
        </div>

        <p class="error-msg" v-if="otherData.msg">{{ otherData.message }}</p>
        <button class="btn btn-success btn-block" :disabled="canLogin == false" @click="loginSubmit">Je me connecte !</button>
        <a href="http://localhost:8080/" class="btn btn-dark btn-block"><i class="fas fa-arrow-left"></i>Retourner à l'accueil</a>
    </div>
</template>


<script>
    import axios from "axios"

    export default {
        name: 'login',
        data() {
            return {
                errors: [],
                canLogin: false,
                dataLog: {
                    email : '',
                    password: ''
                },

                otherData: {
                    msg: false,
                    message: ""
                },
                dataSend: ""
            }
        },
        methods: {
            checkForm:function(e) {
                this.errors = [];
                if (this.errors.length == 0) { this.canLogin = true; console.log(this.canLogin + "/" + this.errors.length)}
                if(!this.dataLog.email) {
                    this.errors.push("L'email est nécessaire !");
                    this.canLogin = false;
                } else if (!this.validEmail(this.dataLog.email)) {
                    this.errors.push("L'email est invalide !");
                    this.canLogin = false;
                }
                if (!this.dataLog.password) {
                    this.errors.push("Le mot de passe est nécessaire");
                    this.canLogin = false;
                }
                if (!this.validPassword(this.dataLog.password)) {
                    this.errors.push("Le mot de passe doit contenir 8 caractères, une lettre, un chiffre.");
                    this.canLogin = false;
                }
                if(!this.errors.length) return true;
                e.preventDefault();
            },
            validEmail:function(email) {
                this.dataLog.email = email;
                //eslint-disable-next-line
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            validPassword:function(pass) {
                this.dataLog.password = pass;
                //eslint-disable-next-line
                let rePass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                return rePass.test(pass);
            },
            loginSubmit(){
                this.dataSend = JSON.stringify(this.dataLog);
                axios.post('http://localhost:3000/login', this.dataSend, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    let dataSend =  JSON.parse(response.data);
                    localStorage.userId = dataSend.userId;
                    localStorage.token = dataSend.token;
                    localStorage.email = dataSend.email;
                    this.$router.push('/groupomania');
                    location.reload();
                })
                .catch(err => {
                    let msgerr = "Mot de passe ou email incorrect ! ";
                    console.log(err);
                    this.otherData.message = msgerr;
                    this.otherData.msg = true;
                });
            }
        }
    }
</script>

<style>

.connexion {
    max-width: 350px;
    margin: auto;
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    background-color: rgb(255, 255, 255);
}

.auth-inner {
    padding: 25px;
}

span {
    color: brown;
    font-weight: bold;
}

ul, li {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
    color: red;
    font-weight: bold;
}

.error-msg {
    font-weight: bold;
    color: red;
}
</style>
