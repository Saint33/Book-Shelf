import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { user } from './modules/user';
import { chat } from './modules/chat';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        books: [],
        userPage: {},
        userPageBooks: {
            haveRead:[],
            wantToRead: [],
            favoriteBooks: [],
            quotes: []
        }
    },
    modules: {
        user,
        chat
    },
    getters: {
        auth: state =>{
            return state.user.isAuth
        }
    },
    mutations: {
        'getPageOwner'(state, payload){
            state.userPage = payload;
            state.userPageBooks = {
                haveRead:[],
                wantToRead: [],
                favoriteBooks: [],
                quotes: []
            }
        },
        'getUserBooksRead'(state, payload){
            state.userPageBooks.haveRead.push(payload);
        },
        'getUserBooksWantToRead'(state, payload){
            state.userPageBooks.wantToRead.push(payload);
        },
        'getUserFavoriteBooks'(state, payload){

            state.userPageBooks.favoriteBooks.push(payload);
        },
        'getUserQuotes'(state, payload){
            state.userPageBooks.quotes = payload;
        }
    },
    actions: {
        getUserPage({commit}, username){
            axios.get(`/api/user/${username}`)
                .then(response => {
                    commit('getPageOwner', response.data[0])

                    response.data[0].haveRead.map(book => {
                        
                        axios.get(`/api/getBook?id=${book.bookId}`)
                
                            .then(response => commit('getUserBooksRead', response.data))
                
                    })
                    response.data[0].wantToRead.map(book => {

                        axios.get(`/api/getBook?id=${book}`)
                
                            .then(response => commit('getUserBooksWantToRead', response.data))
                
                    })
                    
                    response.data[0].favoriteBooks.map(book => {

                        axios.get(`/api/getBook?id=${book}`)
                
                            .then(response => commit('getUserFavoriteBooks', response.data))
                
                    })
                    axios.get(`/api/user-quotes?username=${username}`)
                        .then(response => {
                            console.log(response)
                            commit('getUserQuotes', response.data)
                        })
                })
        }
    }
})
