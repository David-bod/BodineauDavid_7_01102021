<template>
    
    <form @submit="handlerSubmit">
        <h3>Sign up</h3>

        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Name" minlength="2" required/>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="email@email.com" minlength="5" required/>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="password" minlength="7" required/>
        </div>

        <button class="btn btn-primary btn-block">Sign up !</button>

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
        handlerSubmit(){
            const data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            console.log(data);
        }
    }
}

</script>
