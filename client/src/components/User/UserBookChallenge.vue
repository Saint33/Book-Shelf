<template>
    <div class="col-4 book-challenge">
        <img 
            class="book-challenge__image"
            src="https://www.jamescumminsbookseller.com/pictures/309222.jpg?v=1504633029" />
        <span class="book-challenge__title">Принять книжный вызов</span>
        <input type="text" class="book-challenge__input" v-model.number="bookChallenge"/>
        <button>Принять</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bookChallenge: 0
            }
        }
    }
</script>

<style lang="">
    .book-challenge {
        position: fixed;
        right: 30px;
        height: 500px;
    }
    .book-challenge__title {
        margin-left: 30px;
    }
    .book-challenge__image {
        width: 100%;
        height: auto;
    }

    .book-challenge__input {
        margin-left: 10px;
        width: 50px;
    }
</style>