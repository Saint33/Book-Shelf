<template>
    <div class="row book">
        <div class="col-3 ">
            <img :src="book.coverImage" class="book_cover"/>
            <span class="book__read_part_button">Прочитал</span>
            <div class="book__rating">  
                <star-rating 
                :rating="book.rating" 
                :star-size="25"
                :read-only="true"
                :show-rating="false"
                
                >
                </star-rating>
            </div>
        </div>
        <div class="col-7">
            <h1 class="book__title">{{book.title}}</h1>
            <div class="book__author_group">
                <router-link class="book_author" to="">{{book.author}}</router-link>
            </div>
            <div class="book__rating">  
                <span>Моя оценка: </span>
                <star-rating 
                :rating="book.rating" 
                :star-size="20"
                :read-only="true"
                :show-rating="false"
                active-color="green"
                class="book__star_rating"
                >
                </star-rating>
            </div>
            <div class="book__reviews">
                <span class="book__reviews_item">{{book.reviews.length}} рецензий</span>
                <span class="book__reviews_item">{{book.quotes.length}}</span>
            </div>
            <div>
                <span class="book__favorites book__reviews"><icon name="heart" scale="1.3" class="book__favorites__heart"></icon> {{book.usersFavorited.length}} в избранном </span>
                <span class="book__reviews_item book__reviews"><icon name="users" scale="1.5" class=""></icon> {{book.usersHaveRead.length}} прочитали, {{book.usersWantToRead.length}} планируют </span>
            </div>
            <div class="book__edition_data">
                <div><b>ISBN:</b><span class="book__edition_data__value">{{book.ISBN}}</span></div>
                <div><b>Год издания:</b><span class="book__edition_data__value">{{book.publishedDate}}</span></div>
                <div><b>Издательство:</b><span class="book__edition_data__value">{{book.publisher}}</span></div>
                <div v-if="book.series"><b>Серия:</b><span class="book__edition_data__value">{{book.series}}</span></div>
                <div><b>Язык:</b><span class="book__edition_data__value">{{book.language}}</span></div>
            </div>
                <p class="book__description">{{book.description}}</p>
            </div>
            
        </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import Icon from 'vue-awesome/components/Icon'

    export default {
        props: ['book'],
        components: {
            StarRating,
            Icon
        }
    }
</script>

<style lang="scss">
    .book {
        margin-top: 20px;
        background: #FFFFFF;
        padding: 20px;
    }

    .book__title {
        font-size: 20px;
        font-weight: 600;
    }

    .book__edition_data {

    }

    .book__read_part_button {
        border: 1px solid green;
        color: green;
        font-size: 12px;
        font-weight: 500;
        border-radius: 5px;
        display: block;
        margin: 10px 0;
        text-align: center;
        height: 36px;
        font-size: 16px;
        line-height: 36px;
        cursor: pointer;
    }
    .book__reviews {
        display: inline-block;
        
    }
    .book__star_rating {
        float: right;
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

    .book__author_group{
        margin-bottom: 10px;
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
</style>