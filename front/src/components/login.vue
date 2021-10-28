<template>
    <form @submit="loginSubmit" class="connexion" action="#">
        <h3>Connexion</h3>
        <p v-if="errors.length <= 1">
            <ul>
                <li v-for="(error, ok) in errors" v-bind:key="ok">{{ errors }}</li>
            </ul>
        </p>

        <div class="form-group">
            <label>Adresse mail</label>
            <input type="email" class="form-control" name="email" v-model="dataLog.email" placeholder="Adresse e-mail" minlength="5" required/>
        </div>

        <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" class="form-control" name="password" v-model="dataLog.password" placeholder="Mot de passe" minlength="7" required/>
        </div>

        <p v-if="otherData.msg">{{ message }}</p>
        <button class="btn btn-success btn-block">Je me connecte !</button>
        <a href="http://localhost:8080/" class="btn btn-dark btn-block"><i class="fas fa-arrow-left"></i> Retourner à l'accueil</a>
    </form>
</template>


<script>
    import axios from "axios"

    export default {
        name: 'login',
        data() {
            return {
                errors: [],
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
                if(!this.dataLog.email) {
                    this.errors.push("L'email est nécessaire !");
                } else if (!this.validEmail(this.dataLog.email)) {
                    this.errors.push("L'email est invalide !");
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
            loginSubmit(){
                this.dataSend = JSON.stringify(this.dataLog);
                axios.post('http://localhost:3000/login', this.dataSend, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    let dataSend =  JSON.parse(response.data);
                    localStorage.userId = dataSend.userId;
                    localStorage.name = dataSend.name;
                    localStorage.email = dataSend.email;
                    localStorage.token = dataSend.token;
                    localStorage.admin = dataSend.admin;
                    this.$router.push('/groupomania');
                })
                .catch(err => {
                    this.otherData.message = err;
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

</style>
