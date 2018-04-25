<template>
    <div class="row">
        <div class="col-8">
            <div class="books_group">
                <h2 class="books__popular_title">Самые популярные книги</h2>
                <div class="books__popular">
                    <div v-for="book in popularBooks" class="books__popular-item">
                        <router-link 
                            tag="img" 
                            class="books__popular-item__image" 
                            :src="book.coverImage"
                            :to="{name: 'book', params: { id: book._id }}"
                            :title="`${book.title} - ${book.author}`"
                        ></router-link>
                    </div>
                </div>
            </div>

             <div class="books_group">
                <h2 class="books__popular_title">Новинки</h2>
                <div class="books__popular">
                    <div v-for="book in newBooks" class="books__popular-item">
                        <router-link 
                            tag="img" 
                            class="books__popular-item__image" 
                            :src="book.coverImage"
                            :to="{name: 'book', params: { id: book._id }}"
                            :title="`${book.title} - ${book.author}`"
                        ></router-link>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data(){
            return {
                popularBooks: [],
                newBooks: []
            }
        },
        created(){
            axios.get('/api/trendingbooks')
                .then(response => this.popularBooks = response.data);
            axios.get('/api/newbooks')
                .then(response => this.newBooks = response.data)
            
        }
    }
</script>

<style lang="">
    .books__popular-item {
        display: inline-block;
        
    }
    .books__popular-item__image {
        height: 180px;
        width: auto;
        cursor: pointer;
        margin: 10px;
    }

    .books__popular_title {
        font-size: 22px;
        text-align: center;
        margin-bottom: 10px;
    }


    .books_group {
        padding: 20px;
        border: 1px solid #ccc;
        background: #fff;
        margin: 20px 0;
        border: 1px solid #CA8165;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        -khtml-border-radius: 3px;
        box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
        -moz-box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
        -webkit-box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
    }

</style>