<template>
    <div key="read">
        <div>
            <h3>Я прочитал {{bookData.length}} книг</h3>
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
                return this.$store.state.userPageBooks.haveRead;
            }
        },
        components: {
            BookSmall
        }
    }
</script>