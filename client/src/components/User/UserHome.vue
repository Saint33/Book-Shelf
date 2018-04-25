<template>
    <div >
    <div class="row">
        <div class="user_avatar">
            <avatar class="avatar" :username="username"  :size="70" ></avatar>
            <span class="username">{{username}}</span>
            <span  @click="openDialog">
                <icon name="envelope" scale="1.5" class="fa-icon message-icon"></icon>
            </span>
        </div>
    </div>
    <div class="row usernav">
        <div>
            <ul class="user_nav__group">
                <router-link 
                    :to="{name: 'profile'}"
                    append
                    class="user_nav__link u"
                    active-class="user_nav__link_active"
                    
                >Профиль</router-link>
                <li class="user_nav__link">Лента</li>
                <router-link 
                    :to="{name: 'read'}"
                    append
                    class="user_nav__link"
                    active-class="user_nav__link_active"
                >Прочитал</router-link>
                <router-link 
                    :to="{name: 'wish'}"
                    class="user_nav__link"
                    active-class="user_nav__link_active"

                >Хочу прочитать</router-link>
                <router-link 
                    :to="{name: 'stats'}"
                    class="user_nav__link"
                    active-class="user_nav__link_active"
                >Статистика</router-link>
                <router-link 
                    :to="{name: 'favorite'}"
                    class="user_nav__link"
                    active-class="user_nav__link_active"

                >Избранное</router-link>
                <router-link 
                    :to="{name: 'userquotes'}"
                    class="user_nav__link"
                    active-class="user_nav__link_active"

                >Цитаты</router-link>
                <li class="user_nav__link">Не дочитал</li>
            </ul>
        </div>
        <div class="col-8">

        <transition
              name="bounce"
                enter-active-class="bounceInLeft"
                leave-active-class="bounceOutRight"
        >

            <router-view>

            </router-view>
        </transition>

        </div>
    </div>
    </div>
</template>

<script>

import Icon from 'vue-awesome/components/Icon'
import Avatar from 'vue-avatar'
    export default {
        created() {
    
            let username = this.$route.params.username;

            this.$store.dispatch('getUserPage', username);
    
        },
        components: {
            Avatar,
            Icon
        },
        computed: {
            username(){
                return this.$route.params.username;
            },
            participants(){
                return {
                    userId: this.$store.state.user.id, 
                    recipientId: this.$store.state.userPage._id
                    }
            }
        },
        methods: {
            openDialog(){
                this.$store.dispatch('startConversation', this.participants);
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/scss/settings.scss";
    .user_nav__group {
        padding: 0;
        list-style: none;
        
    }

    .user_nav__link {
        padding: 0 10px;
        display: inline-block;
        margin-right: 10px;
        font-size: 16px;
        border-bottom: 4px;
        color: #000;
    }

    .user_nav__link_active {
        border-bottom: 4px solid $main-color;
    }

    .user_avatar {
        display: block;
        margin: 10px;
    }

    .avatar {
        display: inline-block;
        margin-right: 10px;
    }

    .username {
        display: inline-block;
        font-weight: 500;
    }

    .message-icon {
        cursor: pointer;
        margin-left: 5px;
        color: $main-color;
    }
</style>