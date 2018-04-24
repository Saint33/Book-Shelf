<template>
    <div class="Login">
    <div v-if="loading" class="spinner">
        <rotate-loader :loading="loading" :color="color" :size="size"></rotate-loader>
    </div>
        <div v-else>
    <form  @submit.prevent="submitRegister">
        <div class="form-group ">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>

</div>
</template>

<script>
    import RotateLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        data(){
            return {
                form: {
                    email: '',
                    password: ''
                },
                isAuth: false,
                loading: false,
                color: 'grey',
                size: '25px'
            }
        },
        components: {
            RotateLoader
        },
        methods: {
            submitRegister(){
                this.loading = true;
                this.$store.dispatch('register', this.form)
               setTimeout(() => {
                   this.loading = false;
                   if(this.$store.getters.auth === true){
                       this.$router.push('/')
                   }
               }, 1000) 
            }
            
        }
    }
</script>

<style lang="scss">
    .Login {
        width: 300px;
        margin: auto;
        margin-top: 60px;
    }
    
</style>