<template>
    <div class="col-3" v-if="conversations">
            <div @click="handleCurrentConversation(conversation.id)" class="dialog__item" v-for="conversation in conversations" :conversation="conversation" :key="conversation._id">
                <span class="dialog__recipient">{{conversation.recipient.username}}</span>
                <span class="dialog__message">{{conversation.messages[0].body}}</span>
            </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import { mapMutations} from 'vuex';

    export default {
        props: ['conversations'],
        methods:{
            ...mapMutations(['handleCurrentConversation'])
        }
    }
</script>

<style lang="">
    .dialog__item {
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 10px;
        width: 100%;
    }

    .dialog__recipient {
        display: block;
        font-weight: 500;
    }

    .dialog__message {
        display: block;
        font-size: 14px;
    }
</style>