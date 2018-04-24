<template>
    <div>
        <div>
            <h3>Моё избранное</h3>
        </div>
        <BookSmall v-for="book in bookData" :book="book" :key="book._id"/>
    </div>
</template>

<script>
    import BookSmall from '../Book/BookSmall.vue'

    export default {
        data(){
            return{

            }
        },
        computed: {
            bookData(){
                return this.$store.state.userPageBooks.favoriteBooks;
            }
        },
        components: {
            BookSmall
        }
    }
</script>