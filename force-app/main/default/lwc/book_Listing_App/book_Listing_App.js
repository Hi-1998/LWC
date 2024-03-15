import { LightningElement } from 'lwc';
const api_link = 'https://www.googleapis.com/books/v1/volumes?q=';
export default class Book_Listing_App extends LightningElement {

    query = 'Man';

    Books = [];
    connectedCallback() {
        this.callAPI();
    }

    callAPI() {
        fetch(api_link + this.query)
            .then(response =>
                response.json()
            )
            .then(data => {
                this.Books = data ? data : [];
                console.log('o:', this.Books);
            })
            .catch(Error => console.log("errrrrrrrrror" + Error));
    }

    changeHandler(event) {
        this.query = event.target.value;
        setTimeout(() => {
            this.callAPI();
        }, 1000)

    }
}