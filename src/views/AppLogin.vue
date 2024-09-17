<script>
import axios from 'axios';
export default {
    data(){
        return{
            email:'',
            password:'',
            loading:false,
            errorMessage:'',
        };
    },
    methods:{
        async handleLogin(){
            this.loading = true;
            this.errorMessage = '';
            try{
                const response = await axios.post('http://localhost:8000/api/login', {
                    email: this.email,
                    password: this.password,
                });
                const token = response.data.token;
                const userId = response.data.user.id;

                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                this.$router.push('/').then(()=>{
                    window.location.reload();
                });
            }   catch (error){
                    this.errorMessage = 'Login failed. Please check your credentials.';
                    console.error("Login error", error);
            }   finally{
                    this.loading = false;
                }
        },
    },
};
</script>
<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="email">Email:</label>
                <input v-model="email" type="email" id="email" required />
            </div>
            <div class="form-group">
                <label for="email">Password:</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <div class="form-group">
                <button type="submit" :disabled="loading">Login</button>
            </div>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 15px;
}

    input[type="email"],
    input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

    button {
        padding: 10px 20px;
        background-color: #5cb85c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
}

    button:disabled {
        background-color: #ccc;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
