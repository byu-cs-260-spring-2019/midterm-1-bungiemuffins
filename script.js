let app = new Vue({
    el: '#app',
    data: {
        loading: true,
        search: '',
        docs: [{
            title: '',
            author_name: '',
            publish_date: '',
            isbn: '',
            favorite: false,
            thumbnail: '',
        }],
        loading: false,


    },
    methods: {
        async bookSearch() {
            try {

                this.loading = true; 
                const response = await axios.get('https://openlibrary.org/search.json?q=' + this.search);
                console.log("response :", response);
                this.docs = response.data.docs;
                this.loading =  false;
                console.log("docs :", this.docs);
                console.log("title :", this.docs[0].title);
                for(var i = 0; i < this.docs.length; ++i) {
                    var picture = '';
                    if(this.docs[i].isbn != undefined) {
                        picture = await axios.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + this.docs[i].isbn[0] + '&jscmd=details&format=json');
                        console.log(picture.data.thumbnail_url);
                        this.docs[i].thumbnail = picture.data.thumbnail_url;
                    }
                    console.log(picture);
                    console.log(this.docs[i].thumbnail);
                }
                console.log('picture', picture);
                this.loading = false;
                return true;
            }
            catch(err) {
                console.log(err);
                return false;
            }
        },

    },
    computed: {
        searchFormat() {
            this.search = this.search.replace(' ', '+');
        }
    }


});