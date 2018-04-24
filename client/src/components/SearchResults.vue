<template>
<div class="modal-mask" @click="closeModal" v-if="isModalVisible">
    <div class="search_results">
    <router-link class="search_results_item" v-for="book in books" tag="li" :to="{name: 'book', params: { id: book._id }}">

        
            <img class="search_results_item_image" :src="book.coverImage">
            <div class="search_results_item_info">
                <h3 class="search_results_item_title">{{book.title}}</h3>
                <span class="search_results_item_author">{{book.author}}</span>
                <star-rating 
                    
                :rating="book.rating" 
                :star-size="25"
                :read-only="true"
                :show-rating="false"
                >
                </star-rating>
            </div>

        </router-link>
    </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
    export default {
        data(){
            return{
                isModalVisible: true
            }
        },
        components:{
            StarRating
        },
        props: ['books'],
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            }
        }
    }
</script>

<style lang="">
    .search_results {
            position: relative;
            left: 250px;
            top: 0;
            width: 500px;
            background: #F1F1F1;
            z-index: 999;
            box-shadow: 0 1px 5px 0 rgba(57,66,76,0.4);
            display: block;
    }
    .search_results_item {
        border: 1px solid #ccc;
        background: #F1F1F1;
        display: block;
        height: 180px;
        width: 600px;
    }
    .search_results_item_image {
        display: inline-block;
        height: 100%;
        width: auto;
        padding: 5px;
    }
    .search_results_item_title {
        font-size: 20px;
    }

    .search_results_item_author {
        font-style: italic;
    }

    .search_results_item_info {
        display: inline-block;
        padding: 10px;
    }
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 50px;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }
</style>