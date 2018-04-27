<template>
    <div>
    <div class="row book">
        <div class="col-3">
            <h1 class="book__title">{{bookData.title}}</h1>
            <div>
                <router-link class="book_author" to="">{{bookData.author}}</router-link>
            </div>
            <img :src="bookData.coverImage" class="book_cover"/>
            <div>Моя оценка</div>
            <star-rating

                :star-size="25"
                :show-rating="false"
                v-model="rating"
                >
            </star-rating>
            <span class="book__read_part_button" @click="addToWantToReadList">Хочу прочитать</span>
            <span class="book__read_part_button" @click="addToHaveReadList">Прочитал</span>
            <router-link 
                :to="{ name: 'AddReview', params: { id: bookData._id }}" 
                class="book__read_part_button">Написать рецензию</router-link>
            <router-link 
                :to="{ name: 'AddQuote', params: { id: bookData._id }}" 
                class="book__read_part_button">Добавить цитату</router-link>
        </div>
        <div class="col-6">
            <div v-if="bookData.genres">
                <span 
                    v-for="genre in bookData.genres" 
                    :genre="genre"
                    class="book_genres">
                    {{genre}}
                </span>
            </div>
            <span class="book__rating_value">{{bookRating}}</span>
            <div class="book__rating">  
        
                <star-rating 
                :increment="0.5"
                :rating="bookRating" 
                :star-size="25"
                :read-only="true"
                :show-rating="false"
                >
                </star-rating>
                
            </div>
            <div class="book__reviews">
                <span class="book__reviews_item">{{bookData.reviews.length}} рецензии</span>
                <span class="book__reviews_item">{{bookData.quotes.length}} цитат</span>
            </div>
            <div>
                <span class="book__favorites book__reviews"><div class="addtofavorites" @click="addToFavorites"><icon name="heart" scale="1.3" class="book__favorites__heart"></icon></div> {{bookData.usersFavorited.length}} в избранном </span>
                <span class="book__reviews_item book__reviews"><icon name="users" scale="1.5" class=""></icon> {{bookData.usersHaveRead.length}} прочитали, {{bookData.usersWantToRead.length}} планируют </span>
            </div>
            <div class="book__edition_data">
                <div><b>ISBN:</b><span class="book__edition_data__value">{{bookData.ISBN}}</span></div>
                <div><b>Год издания:</b><span class="book__edition_data__value">{{bookData.publishedDate}}</span></div>
                <div><b>Издательство:</b><span class="book__edition_data__value">{{bookData.publisher}}</span></div>
                <div v-if="bookData.series"><b>Серия:</b><span class="book__edition_data__value">{{bookData.series}}</span></div>
                <div><b>Язык:</b><span class="book__edition_data__value">{{bookData.language | getFormattedLanguage}}</span></div>
            </div>
                <p class="book__description">{{bookData.description}}</p>

            </div>
            
        </div>

        <div class="row">
                <div>
                    <span @click="reviewHandler" :class="{user_nav__link_active: reviews}" class="review-qoutes-switcher">Рецензии</span>
                    <span @click="quotesHandler" :class="{user_nav__link_active: quotes}" class="review-qoutes-switcher">Цитаты</span>
                </div>
        </div>

        <div class="row">
            <transition 
                name="fadeIn"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut"
                >
                <div v-if="reviews" class="col-8">
                    <Review 
                        v-for="review in bookReviews" 
                        :review="review" :key="review._id" 
                        :bookCover="bookData.coverImage" 
                        :bookTitle="bookData.title"
                    />
                </div>
                <div v-if="quotes" class="col-8">
                    <Quote 
                        v-for="quote in bookQuotes" 
                        :quote="quote" 
                        :key="quote._id" 
                        :bookCover="bookData.coverImage" 
                        :bookTitle="bookData.title"
                    />
                 </div>
            </transition>

        </div>
        </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import axios from 'axios'
    import Icon from 'vue-awesome/components/Icon'
    import Review from '../Reviews/Review.vue'
    import Quote from '../Quote.vue'

    export default {
        data(){
            return {
                rating: 0,
                bookData: {},
                bookReviews: [],
                bookQuotes: [],
                isLoaded: false,
                date: new Date(),
                quotes: false,
                reviews: false
            }
        },
        components: {
            StarRating,
            Icon,
            Review,
            Quote
        },
        created() {
            axios.get(`/api/book?id=${this.$route.params.id}`)
                .then(response => {
                    this.bookData = response.data;
                    this.rating = response.data.usersHaveRead.filter(userHaveRead => userHaveRead.id === this.$store.state.user.id)[0].rating || 0;
                    this.bookData.reviews.map(review => {
                    axios.get(`/api/review?id=${review}`)
                        .then(response => {
                            this.bookReviews.push(response.data)
                            this.isLoaded = true
                        })
                    })
                })
            axios.get(`/api/book/quotes?bookId=${this.$route.params.id}`)
                .then(response => this.bookQuotes = response.data)

        },
        computed: {
            bookRating(){
                let usersRated = this.bookData.usersHaveRead.filter(book => book.rating);
                let averageRating = (usersRated.reduce((sum, book) => {
                    return sum + book.rating;
                }, 0) / usersRated.length).toFixed(2);
                return Number(averageRating);
            },
            currentUserRating(){
                return this.bookData.usersHaveRead.filter(userHaveRead => userHaveRead.id === this.$store.state.user.id)[0].rating || 0;
            }
        },
        methods: {
            reviewHandler(){
                this.reviews = true;
                this.quotes = false;
            },
            quotesHandler(){
                this.quotes = true;
                this.reviews = false;
            },
            addToWantToReadList(){
                axios.post('/api/user/want-to-read',{
                    id: this.$store.state.user.id,
                    bookId: this.$route.params.id
                }).then(response => {
                })
            },
            addToHaveReadList(){
                axios.post('/api/user/have-read',{
                    id: this.$store.state.user.id,
                    bookId: this.$route.params.id,
                    date: this.date,
                    rating: this.rating
                }).then(response => {

                })
            },
            addToFavorites(){
                axios.post('/api/user/favorites', {
                    id: this.$store.state.user.id,
                    bookId: this.$route.params.id
                }).then(response => {

                })
            }
        }
    }
</script>

<style lang="scss">
    .addtofavorites {
        display: inline-block;
        cursor: pointer;
    }

    .book_genres {
        font-size: 14px;
        margin-right: 7px;
        padding: 3px;
        background: radial-gradient(#FFD7C8, white)
    }
    .review-qoutes-switcher {
        cursor: pointer;
        margin: 20px;
        padding: 10px;
        font-size: 18px;
    }
    .book {
        margin: 20px 0;
        background: #FFFFFF;
        padding: 20px;
        
    }

    .book_cover {
        width: 150px;
        height: auto;
    }
    .book__title {
        font-size: 24px;
        font-weight: 600;
    }

    .book__edition_data {

    }

    .book__read_part_button {
        border: 1px solid black;
        border-radius: 5px;
        display: block;
        margin: 10px 0;
        text-align: center;
        height: 36px;
        font-size: 16px;
        line-height: 36px;
        width: 180px;
        cursor: pointer;
    }
    .book__reviews {
        display: inline-block;
        
    }
    .book__reviews_item {
        white-space: nowrap;
        color: #757B82;
        text-decoration: none;
        font-size: 80%;
        line-height: 140%;
        margin-right: 10px;
    }

    .book_author {
        font-style: italic;
    }

    .book__edition_data__value {
        margin-left: 10px;
    }

    .book__rating {
        display: inline-block;
        margin-right: 20px;
    }

    .book__favorites {
        color: #78ACE9;
        margin-right: 10px;
    }

    .book__description {
        margin-top: 20px;
    }
    .book__buy {
        background: #FFEEB9;
    }

    .book__rating_value {
        display: inline-block;
        font-weight: bold;
    }
</style>