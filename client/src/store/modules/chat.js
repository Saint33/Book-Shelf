import axios from 'axios';
import { router } from '../../routes';

export const chat = {
    state: {
        conversations:[],
        currentConversation: null,
        loading: true
    },
    getters:{
        conversationList(state, getters){
            return state.conversations;
        }
    },
    mutations: {
        'userConversations'( state, conversationsData ){
            state.conversations = conversationsData.conversations;
        },
        'sendMessage'(state, {conversationId, body, createdAt, author, authorUsername, _id}){
            let currentConversationIndex = state.conversations.findIndex(conversation => {
                return conversation.id === conversationId; 
            });

            if(!state.conversations[currentConversationIndex].hasOwnProperty('messages')){
                state.conversations[currentConversationIndex] = Object.assign(
                    {messages: [{body, createdAt, author, authorUsername}]},state.conversations[currentConversationIndex]
            )} else {
                    // state.conversations[currentConversationIndex].messages = state.conversations[currentConversationIndex].messages.concat({body, createdAt, author, authorUsername, id: _id})
                    state.conversations[currentConversationIndex].messages.push({body, createdAt, author, authorUsername, id: _id})
            }
        },
        'receiveRecipientInfo'( state, { username, id }){
            let currentRecipientIndex = state.conversations.findIndex(conversation => {
                return conversation.participants.includes(id);
            })
            state.conversations[currentRecipientIndex] = Object.assign({
                recipient: {
                    username
                }
            }, state.conversations[currentRecipientIndex])
        },
        'loading'(state){
            state.loading = false
        },
        'handleCurrentConversation'(state, id){
            state.currentConversation = id;
        }
    },
    actions: {
        getUserConversations({ commit, dispatch }, userId ){
            axios.get(`/api/chat/conversations?id=${userId}`)
                .then(response => {
                    commit('userConversations', response.data);
                    let recipients = response.data.conversations.map(conversation => {
                        return conversation.participants.filter(participant=> participant !== userId).toString()
                    })
                    dispatch('getRecipientsInfo', recipients);
                })
        },
        postMessage({ commit }, {conversationId, body, author, authorUsername} ){
            axios.post('/api/message', {conversationId, body, author, authorUsername})
                .then(response => {
                    commit('sendMessage', response.data.message);
                })
        },
        getRecipientsInfo({ commit }, recipients){
            recipients.map((recipient, i) => {
                axios.get(`/api/user/info?id=${recipient}`)
                    .then(response => {
                        commit('receiveRecipientInfo', response.data)
                        if(i === recipients.length - 1){
                            commit('loading');
                        }
                    })
            })
        },
        startConversation({commit},{userId, recipientId}){
            axios.get(`/api/chat/conversation?user=${userId}&recipent=${recipientId}`)
                .then(response => {
                    console.log(response);
                    commit('handleCurrentConversation', response.data[0]._id)
                    router.push('/chat')
                })
                .catch(error => {
                    axios.post('/api/chat/conversation', {userId, recipientId})
                        .then(response => {
                            commit('handleCurrentConversation', response.data.newConversation._id)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
        }
    }
}