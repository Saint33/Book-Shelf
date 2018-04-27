<template>

    <div class="row Header">
        <router-link 
            tag="li"
            to="/" 
            class="Header__title"
        >Book Shelf</router-link>
        <input 
            type="text" 
            placeholder="Название/Автор" 
            v-model="query" 
            @keyup="handleQuery"
            class="Header__input"
        />
        <span class="add_book">
        <router-link :to="{name: 'addBook'}" class="dropdown-menu__item"><icon name="plus" scale="1.3" ></icon></router-link>
            
        </span>
        <SearchResults v-if="queryBooks.length>0" :books="queryBooks"/>
        <div class="user">
        <div v-if="username" class="dropdown" >
            <div>
                <avatar class="avatar" :username="username" :size="40" ></avatar>
                <span class="Header__link DropDownMenuIcon" @click="isShowDrop1 = !isShowDrop1">{{username}}</span>
            </div>
            <div class="dropdown-content">
                <ul class="dropdown-menu__group">

                    <li><router-link :to="{name: 'profile', params: {username: username}}" class="dropdown-menu__item">Профиль</router-link></li>
                    <li><router-link :to="{name: 'read', params: {username: username}}" class="dropdown-menu__item">Прочитал</router-link></li>
                    <li><router-link :to="{name: 'wish', params: {username: username}}" class="dropdown-menu__item">Хочу прочитать</router-link></li>
                    <li><router-link :to="{name: 'favorite'}" class="dropdown-menu__item">Избранное</router-link></li>
                    <li><router-link :to="{name: 'read'}" class="dropdown-menu__item">Друзья</router-link></li>
                    <li><router-link :to="{name: 'addBook'}" class="dropdown-menu__item">Добавить книгу</router-link></li>
                    <li class="dropdown-menu__item" @click="handleLogout">Выйти</li>
                    
                </ul>
            </div>
        </div>
        <div v-else>
            <button @click="show">Войти / Зарегистрироваться</button>
            <modal name="hello-world" height="420">
                
                <div class="loginmodal d-flex justify-content-center">
                    <span class="loginmodalitem" @click="handleLoginButton" :class="{user_nav__link_active: login}">Войти</span>
                    <span class="loginmodalitem" @click="handleRegisterButton" :class="{user_nav__link_active:register}">Зарегистрироваться</span>
                </div>
                <Login v-if="login"/>
                <Register v-if="register"/>

               
            </modal>
        
        </div>
        </div>
    </div>

</template>

<script>
    import SearchResults from './SearchResults.vue'
    import Login from './Login.vue'
    import Register from './Register.vue'
    import Avatar from 'vue-avatar'
    import axios from 'axios'
    import Icon from 'vue-awesome/components/Icon'
    export default {
        data(){
            return{
                isShowDrop1: false,
                register: false,
                login: true,
                query: '',
                queryBooks: []
            }
        },
        computed:{
            username(){
                return this.$store.state.user.username;
            }
        },
        methods: {
            show () {
                this.$modal.show('hello-world');
            },
            hide () {
                this.$modal.hide('hello-world');
            },
            handleLoginButton(){
                this.login = true;
                this.register = false;
            },
            handleRegisterButton(){
                this.login = false;
                this.register = true;
            },
            handleLogout(){
                this.$store.dispatch('logout')
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1000)
            },
            handleQuery(){
                axios.get(`/api/book/queryBook?query=${this.query}`)
                    .then(response=> {
                        this.queryBooks = response.data
                    })
            }
        },
        components: {
            Avatar,
            Login,
            Register,
            SearchResults,
            Icon
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/settings.scss";
    .add_book{
        margin-top: 15px;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .loginmodalitem {
        margin: 10px;
        cursor: pointer;
        padding: 5px;
    }

    .user_nav__link_active {
        border-bottom: 4px solid $main-color;
    }

    .user {
        margin-right: 100px;
        font-size: 18px;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        padding: 0;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 12px 16px;
        z-index: 1;
        width: 180px;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .Header {
        position: fixed;
        top: 0;
        right: 50px;
        left: 50px;
        width: 100%;
        z-index: 999;
        height: 50px;
        border-radius: 0 0 7px 7px;
        background: #F1F1F1;
    }

    .Header__title {
       font-size: 30px;
       font-weight: bold;
       color: #180600;
       list-style: none;
       cursor: pointer;
       margin: 0 20px;
    }

    .Header__input {
        border: 1px solid #ccc;
        margin-top: 5px;
        height: 40px;
        width: 500px;
        border-radius: 12px;
        padding: 5px;
       
    }

    .Header__input:focus{
        outline-style: none;
        border: 2px solid  $main-color;
    }

    .Header__link {
        font-size: 18px;
        margin-left: 0px;
        padding: 0;
        line-height: 50px;
        color: black;
        font-weight: 500;
    }
    .Header__nav{
        background: $main-color;
        height: 60px;
        margin-top: 50px;
    }

    .Header__nav__link{
        color: #ffffff;
        height: 58px;
        line-height: 58px;
        display: inline-block;
        padding: 0px 10px;
        font-size: 18px;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
    }

    .Header__nav__link:hover {
        background: #180600;
    }

    .dropdown-menu__group {
        list-style: none;
        display: inline-block;
        width: 130px;
        padding: 10px;
        margin: 0;
    }

    .avatar {
        display: inline-block;
        margin-right: 5px;
    }
</style>