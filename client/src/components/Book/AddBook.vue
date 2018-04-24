<template>
    <div>
        <p><span class="addBookSwitcher" @click="addBookFromGoogleHandler">Find book </span>or <span class="addBookSwitcher" @click="addBookManuallyHandler">add it yourself</span></p>
        <div v-if="google">
            <input  type="text" v-model="query"/>
            <button @click="getBookFromGoogle">Search</button>
            <div @click="addBook(item)" title="Choose book to add" class="row query_book_item" v-for="item in queryItems" v-bind:item="item" v-bind:key="item.id">
                <div class="col-3">
                    <img :src="item.volumeInfo.imageLinks.thumbnail" />
                </div>
                <div class="col-6">
                    <p> <b>Title</b>: {{item.volumeInfo.title}}</p>
                    <p v-if="item.volumeInfo.authors"> <b>Author</b>: {{item.volumeInfo.authors[0]}} </p>
                    <span class="query_book_item__pages">Pages: {{item.volumeInfo.pageCount}}</span>
                    <span class="query_book_item__pages">Rating:{{item.volumeInfo.averageRating}}</span>
                    <span class="query_book_item__pages">Published:{{item.volumeInfo.publishedDate}}</span>
                    <span class="query_book_item__pages">Publisher:{{item.volumeInfo.publisher}}</span>
                    <span class="query_book_item__pages">Language:{{item.volumeInfo.language}}</span>
                    <p>{{item.volumeInfo.description}}</p>
                </div>
            </div>
        </div>
            <div v-if="addBookManually">
                <input placeholder="title" type="text"/>
                <input placeholder="author" type="text"/>
                <button>Add</button>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return {
                query: '',
                queryItems: [],
                google: true,
                addBookManually: false

            }
        },
        methods: {
            getBookFromGoogle(){
                axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`)
                    .then(response => {
                        console.log(response.data.items)
                        this.queryItems = response.data.items.map(item => {
                            if(!item.volumeInfo.imageLinks){
                               item.volumeInfo = Object.assign({imageLinks: {
                                   thumbnail: 'http://www.scottishbooktrust.com/files/styles/book-cover-book-page/public/cover-not-available_201.png?itok=XV_bm-Xa'
                               }}, item.volumeInfo)
                               return item
                            } else {
                                return item
                            }
                        });
                    })
            },
            addBook(item){
                let bookToAdd = {
                    title: item.volumeInfo.title,
                    subtitle: item.volumeInfo.subtitle,
                    publisher: item.volumeInfo.publisher,
                    publishedDate: item.volumeInfo.publishedDate,
                    pageCount: item.volumeInfo.pageCount,
                    language: item.volumeInfo.language,
                    coverImage: item.volumeInfo.imageLinks.thumbnail,
                    category: item.volumeInfo.categories? item.volumeInfo.categories[0]: '',
                    author: item.volumeInfo.authors[0],
                    description: item.volumeInfo.description,
                    ISBN: item.volumeInfo.industryIdentifiers[0].identifier
                }

                console.log(bookToAdd)
                axios.post('/api/book', bookToAdd)
                    .then(response => this.$router.push(`/book/${response.data.bookId}`))
            },
            addBookManuallyHandler(){
                this.google = false;
                this.addBookManually = true;
            },
            addBookFromGoogleHandler(){
                this.google = true;
                this.addBookManually = false;
            }
        }
    }
</script>

<style lang="scss">
    .query_book_item {
        border: 1px solid #ccc;
        margin: 10px;
        padding: 10px;
        background: #FFFFFF;
    }
    .query_book_item__pages {
        font-size: 13px;
        color: #ccc;
        margin: 0 6px;
    }

    .query_book_item:hover{
        border: 2px solid #87F1FF;
        box-shadow: 5px;
        cursor: pointer;
    }

    .addBookSwitcher {
        color: #5A599E;
        cursor: pointer;
    }

    .addBookSwitcher:hover {
        text-decoration: underline;
    }
</style>