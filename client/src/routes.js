import BookView from './components/Book/BookView.vue'
import AddBook from './components/Book/AddBook.vue'
import AddReview from './components/Reviews/AddReview.vue'
import AddQuote from './components/AddQuote.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import UserHome from './components/User/UserHome.vue'
import UserEditProfile from './components/User/UserEditProfile.vue'
import UserProfile from './components/User/UserProfile.vue'
import UserRead from './components/User/UserRead.vue'
import UserWantsToRead from './components/User/UserWantsToRead.vue'
import UserFavoriteBooks from './components/User/UserFavoriteBooks.vue'
import Chats from './components/Chat/Chats.vue';
import UserStatistics from './components/User/UserStatistics.vue';
import UserQuotes from './components/User/UserQuotes.vue';

export const routes = [
    { path: '/book/:id', component: BookView, name: 'book'},
    { path: '/add', component: AddBook, meta: { requiresAuth: true } },
    { path: '/add-review/:id', component: AddReview, name: 'AddReview', meta: { requiresAuth: true }},
    { path: '/add-quote/:id', component: AddQuote, name: 'AddQuote', meta: { requiresAuth: true }},
    { path: '/', component: Home, name: 'Home'},
    { path: '/chat', component: Chats, name: 'Chat'},
    { path: '/login', component: Login, name: 'Login'},
    { path: '/user/:username', component: UserHome, name: 'user', children: [
        { path: 'profile', component: UserProfile, name: 'profile'},
        { path: 'read', component: UserRead, name: 'read'},
        { path: 'wish', component: UserWantsToRead, name: 'wish'},
        { path: 'favorite', component: UserFavoriteBooks, name: 'favorite'},
        { path: 'stats', component: UserStatistics, name: 'stats'},
        { path: 'edit-profile', component: UserEditProfile, name: 'editprofile'},
        { path: 'quotes', component: UserQuotes, name: 'userquotes'}
    ]}
]