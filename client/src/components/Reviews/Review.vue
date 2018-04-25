<template>
    <div class="review">
        <div>
            <router-link
                class="review__image" 
                tag="img" 
                :src="bookCover" 
                :to="{name: 'book', params: { id: review.bookId }}">
            </router-link>
            <router-link :to="{name: 'user', params: {username: review.authorUsername}}">{{review.authorUsername}}</router-link>
            <span class="review__date">{{ review.createdAt | getFormattedDate }}</span>
            <h4 class="review__title">Title</h4>
            <span class="review__target">Рецензия на книгу <router-link class="review__book" :to="{name: 'book', params: { id: review.bookId }}">{{bookTitle}}</router-link></span>
            <div>
                <span class="review__rating review__rating__text">Оценка: {{review.rating}}</span>
                <star-rating 
                    :rating="review.rating" 
                    :star-size="20" 
                    :read-only="true" 
                    :show-rating="false" 
                    class="review__rating"
                >
                </star-rating>
            </div>
        </div>
        <div class="review__text" v-html="review.content">
        </div>
        <div class="review__icon_group">
            <span class="align-baseline">
                <icon name="thumbs-up" scale="1.5" class="fa-icon fa-icon__like"></icon> 
                66
            </span>
            <span class="align-baseline"> 
                <icon name="heart" scale="1.5" class="fa-icon fa-icon__heart"></icon> 
                5
            </span>
            <span class="align-baseline"> 
                <icon name="comment" scale="1.5" class="fa-icon"></icon> 
                11
            </span>
            <span class="fa-icon__views_row"> 
                <icon name="eye" scale="1.5" class="fa-icon__views"></icon> 
                11
            </span>
        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import Icon from 'vue-awesome/components/Icon'

    export default {
        props: ['review', 'bookCover', 'bookTitle'],
        components: {
            StarRating,
            Icon
        }
    }
</script>

<style lang="scss">
    .review {
        padding: 20px;
        border: 1px solid #ccc;
        background: #fff;
        margin: 20px 0;
        border: 1px dashed #CA8165;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        -khtml-border-radius: 3px;
        box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
        -moz-box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
        -webkit-box-shadow: 0px 1px 1px 0px rgba(50, 50, 50, 0.20);
    }

    .review__image {
        float: left;
        margin: 0 10px 10px 0;
        width: 90px;
        height: auto;
        cursor: pointer;
    }

    .review__date {
        color: #9ca1a6;
        float: right;
        margin-right: 20px;
        margin-top: 3px;
    }

    .review__target {
        display: block;
        font-size: 13px;
    }

    .review__book {
        font-style: italic;
    }

    .review__title {
        font-size: 20px;
        font-weight: 600;
    }

    .review__text {
        font-size: 16px;
        clear: both;
    }

    .review__icon_group {
        margin: 10px;
    }

    .fa-icon {
        margin: 0 6px;
        color: #78ACE9;
        padding: 0;
    }

    .fa-icon__heart {
        color: red;
    }

    .fa-icon__like {
        color: green;
    }

    .fa-icon__numbers {
        line-height: 30px;
    }

    .review__rating {

        float: left;
        font-size: 13px;
        color: green;
        margin: 6px 0;
        line-height: 21px;
    }

    .review__rating__text {
        margin-right: 7px;
    }

    .fa-icon__views_row {
        float: right;
    }
    .fa-icon__views {
        color: #ccc;
    }
</style>