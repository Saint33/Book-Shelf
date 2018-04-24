<template>
    <div>
        <Quote v-for="quote in quotes" :quote="quote"/>
    </div>
</template>

<script>
    import Quote from '../Quote.vue'
    export default {
        components: {
            Quote
        },        
        computed: {
            quotes(){
                return this.$store.state.userPageBooks.quotes;
            }
        }
    }
</script>

<style lang="scss">
    
</style>