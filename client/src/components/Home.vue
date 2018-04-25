<template>
    <div class="row">
        <div class="col-8" v-if="isLoaded">
            <Review  
                v-for="review in latestReviews" 
                :review="review" :key="review._id" 
                :bookCover="review.bookInfo.coverImage" 
                :bookTitle="review.bookInfo.title" 
            />
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import Review from './Reviews/Review.vue'

    export default {
        data(){
            return {
                latestReviews: [],
                isLoaded: false
            }
        },
        created(){
            axios.get('/api/reviews')
                .then(response => {
                    this.latestReviews = response.data;
                    this.latestReviews.map((review, i) => {
                        axios.get(`/api/getBook?id=${review.bookId}`)
                            .then(response => {
                                review = Object.assign({bookInfo: response.data}, review);
                                this.latestReviews[i] = review;
                                
                                if(i === this.latestReviews.length - 1 ){
                                    setTimeout(()=> {
                                        this.isLoaded = true;
                                    }, 1000)
                                    
                                }
                            })
                    })
                    
                })
        },
        components: {
            Review
        }
    }
</script>

<style lang="scss">

</style>