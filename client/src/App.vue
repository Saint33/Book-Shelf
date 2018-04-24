<template>
    <div class="container">
        <Header />
        <HeaderNav />
        <div id="app">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import BookView from './components/Book/BookView.vue';
import AddBook from './components/Book/AddBook.vue';
import AddReview from './components/Reviews/AddReview.vue';
import Home from './components/Home.vue'
import HeaderNav from './components/HeaderNav.vue';
export default {
  name: 'app',
  components: {
    Header,
    BookView,
    AddBook,
    AddReview,
    Home,
    HeaderNav
  }
}
</script>

<style>
 #app{
     padding-top: 20px;
 }
</style>
