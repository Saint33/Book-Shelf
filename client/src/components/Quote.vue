<template>
    <div class="quote">
        <div>
            <router-link
                class="quote__image" 
                tag="img" 
                :src="quote.bookCover" 
                :to="{name: 'book', params: { id: quote.bookId }}">
            </router-link>
            <router-link :to="{name: 'user', params: {username: quote.authorUsername}}">{{quote.authorUsername}}</router-link>
            <span class="quote__date">{{ quote.createdAt | getFormattedDate }}</span>
            <span class="quote__target">Цитата из <router-link class="quote__book" :to="{name: 'book', params: { id: quote.bookId }}">{{quote.bookTitle}}</router-link></span>
        </div>
        <div class="quote__text" v-html="quote.content">
        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'
    import Icon from 'vue-awesome/components/Icon'

    export default {
        props: ['quote'],
        components: {
            StarRating,
            Icon
        }
    }
</script>

<style lang="scss">
        .quote {
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

    .quote__image {
        float: left;
        margin: 0 10px 10px 0;
        width: 90px;
        height: auto;
        cursor: pointer;
    }

    .quote__date {
        color: #9ca1a6;
        float: right;
        margin-right: 20px;
        margin-top: 3px;
    }

    .quote__target {
        display: block;
        font-size: 13px;
    }

    .quote__book {
        font-style: italic;
    }

    .quote__title {
        font-size: 20px;
        font-weight: 600;
    }

    .quote__text {
        font-size: 16px;
        clear: both;
    }

    .quote__icon_group {
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

    .quote__rating {

        float: left;
        font-size: 13px;
        color: green;
        margin: 6px 0;
        line-height: 21px;
    }

    .quote__rating__text {
        margin-right: 7px;
    }

    .fa-icon__views_row {
        float: right;
    }
    .fa-icon__views {
        color: #ccc;
    }
</style>