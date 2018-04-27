<template>
    <div key="stats">
        <h3>Статистика </h3>
    <Stats :height="300" :data="charData" />
    </div>
</template>

<script>

    import Stats from '../Stats.vue';
    import moment from 'moment';
    export default {
        data(){
            return{              
                charData:{
                    labels: ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Декабрь'],
                    datasets: [
                        {
                            label: 'Прочитано за 2018 год',
                            backgroundColor: '#f87979',
                            data: []
                        }
                    ]
                }
            }
        },
        components: {
            Stats
        },
        methods: {
            getStats(){
                let userReadBooks = this.$store.state.userPageBooks.haveRead;
                let booksByYear = userReadBooks.filter(book => {
                    return moment(book.createdAt).isBetween('2018-01-01','2018-12-31');
                })
                
                let booksByMonth = booksByYear.map(book => {
                    return moment(book.createdAt).month()
                })
                let BooksAmountByMonth = []
                for(let i =0; i<12; i++){
                    BooksAmountByMonth[i] = booksByMonth.filter(bookNumber => bookNumber === i).length;
                }
                this.charData.datasets[0].data = BooksAmountByMonth;

            }
        },
        created(){
            this.getStats();
        }
    }
</script>

<style lang="scss">
    
</style>