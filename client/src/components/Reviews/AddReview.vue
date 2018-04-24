<template>
    <div class="row">
  
        <div class="col-8">
        <h2>Новая рецензия</h2>
        <quill-editor v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        class="editor"
                        >
                        
        </quill-editor>
            <button 
                class="review_editor_button" 
                @click="addReview">Опубликовать
            </button>
        </div>
        <div class="col-3 review_book_info">
            <router-link 
                tag="img" 
                :src="bookData.coverImage" 
                :to="{name: 'book', params: { id: bookData._id }}"
                class="review_book_info_image"
                >
            </router-link>
            <div class="review_book_content">
                <span class="review_book_info_title">{{bookData.title}}</span>
                <span class="review_book_info_author">{{bookData.author}}</span>
            </div>
        </div>
        
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'
    import axios from 'axios'
    export default {
        components: {
            quillEditor
        },
        data(){
            return {
                content: '',
                editorOption: {
                    title: '',
                    text: ''
                },
                bookData: {}
            }
        },
        methods: {
            onEditorBlur(editor) {
                console.log('editor blur!', editor, this.content)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            addReview(){
                let bookId = this.$route.params.id;
                let authorUsername = this.$store.state.user.username;
                let authorId = this.$store.state.user.id;
                let reviewData = {
                    authorUsername,
                    authorId,
                    bookId,
                    content: this.content
                }

                axios.post('/api/add_review', reviewData)
                    .then(response => console.log(response))
            }
        },
        created(){
            axios.get(`/api/getBook?id=${this.$route.params.id}`)
                .then(response => {
                    this.bookData = response.data
                    })
        }
    }

</script>

<style lang="">
    .editor {
        height: 300px;
    }

    .review_editor_button {
        margin-top: 100px;
    }

    .review_book_content {
        display: inline-block;
        padding: 20px;
        height: 150px;
        width: 600px;
    }
    .review_book_info {
        margin-bottom: 20px;
    }

    .review_book_info_author{
        display: block;
        font-style: italic;
    }
    .review_book_info_title {
        display: block;
        font-size: 20px;
        font-weight: 500;
    }
    .review_book_info_image {
        display: inline-block;
        height: 250px;
        width: auto;
        cursor: pointer;
    }
</style>