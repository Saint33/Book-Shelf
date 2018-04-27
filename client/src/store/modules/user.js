import axios from 'axios'

export const user = {
    state: {
        isAuth: false,
        error: '',
        username: '',
        email: '',
        id: ''
    },
    mutations: {
        'userLogin'(state, { isAuth, username, id, email }){
            state.isAuth = isAuth;
            state.username = username;
            state.id = id;
            state.email = email;
            state.error = '';
        },
        'userLoginFailed'(state, { isAuth, message }){
            state.isAuth = isAuth;
            state.error = message;
        }
    },
    actions: {
        login({commit}, {email, password}){
            axios.post('/api/auth/login', {email, password})
            
                .then(response => {
                    console.log(response)
                    commit('userLogin', response.data)
                }).catch(error => {
                    commit('userLoginFailed', error.response.data)
                })
        },
        logout({commit}){
            axios.get('/api/auth/logout')
        },
        register({commit}, payload){
            axios.post('/api/auth/register', payload)
                .then( response => {
                    commit('userLogin', response.data)
                })
        },
        auth({commit}){
            axios.get('/api/auth/auth')
                .then(response => {
                    if(!response.data.error){
                        commit('userLogin', response.data)
                    }
                })
        }

    }
}