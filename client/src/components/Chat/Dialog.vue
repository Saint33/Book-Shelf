<template>
    <div class="col-8">
        <div class="vuebar-element" v-bar> 
                <div v-chat-scroll="{always: false}">
                    <button @click="loadMoreMessages">load more</button> 
                    <div 
                        class="message" 
                        v-for="message in messages" 
                        :message="message"
                        :key="message._id"
                        :class="{message__other_user: !currentUser(message.authorUsername)}" 
                    >

                        <avatar class="avatar" :username="message.authorUsername"  :size="30" ></avatar>
                        <span class="message__author">{{message.authorUsername}}</span>
                        <span class="message__time">{{message.createdAt | getFomattedHTime}}</span>
                        <p class="message__text">{{message.body}}</p>
                    </div>
                </div>

            </div>

            <form class="message__input">
                <input v-model="currentMessage" type="text" />

                <button @click.prevent="sendPrivateMessage">Send</button>
            </form>
        </div>
</template>

<script>
    import Avatar from 'vue-avatar'
    import axios from 'axios'
    import uuidv4 from 'uuid/v4'
    import moment from 'moment'
    export default {
        data(){
            return {
                currentMessage: '',
                messages: []
            }
        },
        props: ['conversation'],
        sockets:{
            connect: function(){

            },
            newMessage: function(message){
                this.messages.push(message)
            }
        },
        computed: {
            username(){
                return this.$store.state.user.username;
            },
            userId(){
                return this.$store.state.user.id;
            }
            
        },
        methods: {
            sendPrivateMessage(){
                let messageData = {
                    conversationId: this.conversation.id, 
                    body: this.currentMessage, 
                    author: this.userId,
                    authorUsername: this.username,
                    createdAt: new Date(),
                    id: uuidv4()
                }
                this.messages.push(messageData);
                this.emitMessage(messageData);
                this.$store.dispatch('postMessage', messageData);
                this.currentMessage = '';
                
            },
            
            currentUser(username){
                return this.$store.state.user.username === username;
            },
            emitMessage: function({body, authorUsername, createdAt, id}){
                this.$socket.emit('createMessage', {
                    body,
                    authorUsername,
                    createdAt,
                    id
                })
            },
            getMessages(limit=10, skip=0, order='desc', conversationId){
                console.log('getting messages', conversationId)
                axios.get(`/api/chat/messages?limit=${limit}&skip=${skip}&order=${order}&id=${conversationId}`)
                    .then(response => {
                        
                        this.messages = this.messages.concat(response.data.reverse())
                        console.log(response)
                        })
            },
            loadMoreMessages(){
                let skip = this.messages.length;

                axios.get(`/api/chat/messages?limit=10&skip=${skip}&order=desc&id=${this.conversation.id}`)
                    .then(response => {
                        this.messages = response.data.reverse().concat(this.messages);
                        })
            }
        },
        created(){
            this.$socket.emit('join', this.conversation.id, function(){
                console.log('joining', this.conversation.id)
            })
            this.getMessages(10, 0, 'desc', this.conversation.id)
        },
        components:{
            Avatar
        }
    }
</script>

<style lang="">
    
</style>