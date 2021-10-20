<template>
    
    <form @submit="registerSubmit" class="connexion" onsubmit="return false;">
        <h3>Inscription</h3>

        <div class="form-group">
            <label>Prénom ou pseudo</label>
            <input type="text" class="form-control" v-model="name" placeholder="Julien" minlength="2" required/>
        </div>

        <div class="form-group">
            <label>Adresse mail</label>
            <input type="email" class="form-control" v-model="email" placeholder="Adresse e-mail" minlength="5" required/>
        </div>

        <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" class="form-control" v-model="password" placeholder="Mot de passe" minlength="7" required/>
        </div>

        <button class="btn btn-success btn-block">Je m'inscris !</button>
        <a href="http://localhost:8080/" class="btn btn-dark btn-block"><i class="fas fa-arrow-left"></i> Retourner à l'accueil</a>

    </form>

</template>

<script>

export default {
    name: 'register',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        registerSubmit(){
            const data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            fetch('http://localhost:3000/register', {
                method: "POST", body: JSON.stringify(data), headers: {"Content-type": "application/json; charset=UTF-8"}
            }).catch(err => console.log(err));
        }
    }
}

</script>

<style>



</style>
