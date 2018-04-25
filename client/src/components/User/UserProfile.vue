<template>
    <div key="profile">
  
        <h3>Мой профиль</h3>

        <div class="User__info">
    
            <div class="group__title">
    
                <h2 class="group__title_item">Информация</h2>
                <router-link 
                    :to="{name: 'editprofile'}"
                    v-if="currentUser"
                >
                    <icon name="pencil-alt" scale="1.5" class="fa-icon edit_profile">
                    </icon>
                </router-link>
    
            </div>
    
            <div class="group__body">
    
                <span class="group__row"><b>Имя: </b>{{user.name}}</span>
    
                <span class="group__row"><b>Фамилия: </b>{{user.lastname}}</span>
    
                <span class="group__row"><b>Дата рождения: </b>{{getFormattedDate(user.dateOfBirth)}}</span>
    
                <span class="group__row"><b>Местоположение: </b>{{user.city}}</span>
    
                <span class="group__row"><b>Дата регистрации: </b>{{getFormattedDate(user.createdAt)}}</span>
    
                <span class="group__row"><b>Статус: </b>Постоянный читатель</span>
    
                <span class="group__row"><b>Рейтинг: </b>88 баллов</span>
    
            </div>
    
        </div>
    
        <div class="User__info">
    
            <div class="group__title">
    
                <h4>О себе</h4>
    
            </div>
    
            <div class="group__body">Вы пока ничего не написали о себе.</div>
    
        </div>
    
        <div v-if="read" class="User__info">
    
            <div class="group__title">
    
                <h4>Прочитал</h4>
    
            </div>
    
            <div class="group__body">
    
                <div v-for="book in read" v-bind:book="book" class="book__item" :key="book._id">
    
                    <router-link :src="book.coverImage" tag="img" :to="{ name: 'book', params: {id:book._id}}">d</router-link>
    
                </div>
    
            </div>
    
        </div>
    
        <div v-if="wantToRead" class="User__info">
    
            <div class="group__title">
    
                <h4>Хочу прочитать</h4>
    
            </div>
    
            <div class="group__body">
    
                <div v-for="book in wantToRead" v-bind:book="book" class="book__item" :key="book._id">
    
                    <router-link :src="book.coverImage" tag="img" :to="{ name: 'book', params: {id:book._id}}">d</router-link>
    
                </div>
    
            </div>
    
        </div>
    
    </div>
</template>

<script>
    import moment from 'moment';
    import Icon from 'vue-awesome/components/Icon'
    export default {
        data() {
            return {
            }
        },
        components: {
            Icon
        },
        beforeRouteEnter: (to, from, next) => {
            console.log(to, from)
            if(from.params.username !== to.params.username){
                next(`/user/${to.params.username}`)
            } else next();
        },
        computed: {
            read(){
                return this.$store.state.userPageBooks.haveRead;
            },
            wantToRead(){
                return this.$store.state.userPageBooks.wantToRead;
            },
            user(){
                return this.$store.state.userPage;
            },
            currentUser(){
                return this.$store.state.user.id === this.$store.state.userPage._id;
            }
        },
    
        methods: {
    
            getFormattedDate(value) {
    
                return moment(value).format('D MMMM YYYY г.')
    
            }
    
        }
    }
</script>

<style lang="scss">
    .group__row {
    
        display: inline-block;
    
        line-height: 20px;
    
        width: 50%;
    
        margin-bottom: 12px;
    
    }
    
    
    
    .group__title {
    
        background-color: rgba(57, 66, 76, 0.03);
    
        border-bottom: 1px solid #D8D8D8;
    
        padding: 10px 24px;
    
        display: block;
    
        font-size: 20px;
    
        line-height: 26px;
        
    }

    .group__title_item {
        display: inline-block;
    }
    
    
    
    .group__body {
    
        padding: 20px;
    
    }
    
    
    
    .User__info {
    
        background: #fff;
    
        margin-bottom: 20px;
    
        border: 0;
    
        border-radius: 3px;
    
        -moz-border-radius: 3px;
    
        -webkit-border-radius: 3px;
    
        -khtml-border-radius: 3px;
    
        box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
    
        -moz-box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
    
        -webkit-box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
    
    }
    
    
    
    .book__item {
    
        padding: 10px;
    
        display: inline-block;
    
        width: 150px;
    
        height: 250px;
    
        cursor: pointer;
    
    }

    .edit_profile {
        float: right;
    }
</style>