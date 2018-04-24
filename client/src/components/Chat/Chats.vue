<template>
    <div >
        <clip-loader v-if="loading" :color="color" :size="size"></clip-loader>
        <div class="row" v-else>
            <DialogList :conversations="conversations" @handleCurrentView="handleCurrentView" />
            <keep-alive>
                    <Dialog 
                        v-if="currentConversation(conversation.id)" 
                        v-bind:key="conversation.id"
                        v-for="conversation in conversations"
                        :conversation="conversation"
                    />
            </keep-alive>

        </div>
    </div>
</template>

<script>

    import moment from 'moment';
    import uuidv4 from 'uuid/v4'
    import DialogList from './DialogList.vue';
    import Dialog from './Dialog.vue';
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

    export default {
        data(){
            return {
                currentMessage: '',
                color: 'grey',
                size: '25px',
                currentView: '5adc4224ccd8000a4c13f04a'
            }
        },
        computed: {
            conversations(){
                return this.$store.getters.conversationList;
            },
            userId(){
                return this.$store.state.user.id;
            },
            loading(){
                return this.$store.state.chat.loading;
            }
        },
        created(){
            this.getConversations(this.userId);
        },
        methods: {
            getConversations(id){
                this.$store.dispatch('getUserConversations', id);
            },
            currentConversation(id){
                return this.$store.state.chat.currentConversation === id;
            },
            getConversation(id){
                return this.$store.getters.conversationList.filter(conversation => conversation.id === id)[0];
            },
            getMessages(id){
                return this.$store.getters.conversationList.filter(conversation => conversation.id === id)[0].messages;
            },
            handleCurrentView(id){
                this.currentView = id; 
            }
        },
        components: {
            Dialog,
            DialogList,
            ClipLoader
        }
    }

</script>

<style lang="scss">
    .message {
        border: 2px solid #ccc;
        border-radius: 6px;
        padding: 10px;
        width: 400px;
        background: #F0F2F9;
        margin: 5px;
        clear: both;
    }

    .message__image {
        height: 40px;
        width: auto;
        display: inline-block;
    }

    .message__text {
        font-size: 16px;
        padding: 3px 10px;
    }

    .message__time {
        font-size: 14px;
        color: #AEADAF;
        display: inline-block;
    }

    .message__other_user {
        float: right;
        margin-right: 10px;
    }
    .message__input {
        clear: both;
    }

    .message__author {
        font-weight: 500;
        margin-right: 10px;
    }

    .vuebar-element {
    height: 500px;
    width: 100%;
    max-width: 500px;
    background: #dfe9fe;
    }


    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }

    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0,0,0,0);
        transform: rotate3d(0,0,0,0);
        -webkit-transition:
            background-color 100ms ease-out,
            margin 100ms ease-out,
            height 100ms ease-out;
        transition:
            background-color 100ms ease-out,
            margin 100ms ease-out,
            height 100ms ease-out;
        background-color: rgba(48, 121, 244,.1);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
    }

    .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.3);
    }

    .vb > .vb-dragger:hover > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.5);
    }
</style>