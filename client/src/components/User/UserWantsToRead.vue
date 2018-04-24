<template>
    <div>
        <div>
            <h3>Хочу прочитать:</h3>
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
                return this.$store.state.userPageBooks.wantToRead;
            }
        },
        components: {
            BookSmall
        }
    }
</script>