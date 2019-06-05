let app = new Vue({
    el: '#app',
    data: {
        loading: true,
        search: '',
        docs: [{
            title: '',
            isbn: '',
            favorite: false,
            thumbnail: '',
        }],
        loading: false,
        show: 'all',

    },
    methods: {
        async bookSearch() {
            try {

                this.loading = true; 
                const response = await axios.get('https://openlibrary.org/search.json?q=' + this.search);
                console.log("response :", response);
                this.docs = response.data.docs;
                for(item in this.docs) {
                    this.docs[item].favorite = false;
                }
                console.log("docs :", this.docs);
                this.loading = false;
                this.thumbnailGet();
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }
        },
        async thumbnailGet() {
            try {
                for(var i = 0; i < this.docs.length; ++i) {
                    var picture = '';
                    if(this.docs[i].isbn != undefined) {
                        picture = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + this.docs[i].isbn[0] + '&jscmd=details&format=json');
                        console.log("picture :", picture)
                        console.log(picture.data['ISBN:' + this.docs[i].isbn[0]].thumbnail_url);
                        this.docs[i].thumbnail = picture.data['ISBN:' + this.docs[i].isbn[0]].thumbnail_url;
                    }
                }
                return true;
            }
            catch(err) {
                console.log(error);
                return false;
            }
        },
        showAll() {
            this.show = 'all';
        },
        showFavorites() {
            this.show = 'favorites';
        },
    },
    computed: {
        filterFavorites() {
            if (this.show === 'favorites')
            return this.docs.filter(item => {
             return item.favorite;
            });
            return this.docs;
        }
    },
});