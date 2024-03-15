import { LightningElement } from 'lwc';
import NoHeader from '@salesforce/resourceUrl/NoHeader';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { jobs } from './job_list'
export default class Job_filter extends LightningElement {

    Jobs = jobs;
    scriptloaded = false;
    connectedCallback() {
        //To load the css that hides the header of page and unnecessary padding and marging
        if (!this.scriptloaded) {
            loadStyle(this, NoHeader).then(() => console.log('succesfully loaded the css'));
            this.scriptloaded = true;
        } else {
            return;
        }
    }

    searchFields = {
        description: '', location: '', full_time: false
    }

    //to store the input of filters in object
    handleInput(event) {
        const { name, value, checked } = event.target

        if (name == 'full_time') {
            this.searchFields.full_time = checked;
        } else {
            this.searchFields[name] = value;
        }
    }

    //BASE_URL = 'https://jobs.github.com/positions.json'
    //url = `${this.BASE_URL}?page=1&description=${this.searchFields.description}&location=${this.searchFields.location}&full_time=${this.searchFields.full_time}`
    filterd_jobs = this.Jobs;
    handleSearch() {
        // console.log('url is : ',this.url);
        // fetch(this.url).then((response)=>{console.log(response);}).catch((error)=>{console.log("error is : ",error);});

        this.filterd_jobs = this.Jobs.filter((j) => {
            return j.title.toLowerCase().includes(this.searchFields.description.toLowerCase()) && j.location.toLowerCase().includes(this.searchFields.location.toLowerCase()) && (this.searchFields.full_time ? j.type.toLowerCase().includes('full') : j.type.toLowerCase().includes(''));
        })
        this.descriptionAppear = false;
        this.listViewAppear = true;
        this.recommendationAppear = true;
    }

    listViewAppear = false;
    descriptionAppear = false;
    job_object;
    handleEvent(event) {
        if (event.detail.job_object) {
            this.job_object = event.detail.job_object;
        }
        this.listViewAppear = !this.listViewAppear;
        this.descriptionAppear = !this.descriptionAppear;
        this.recommendationAppear = !this.recommendationAppear;
    }

    recommendationAppear = true;
    handleSliderEvent(event) {
        if (event.detail.job_object) {
            this.job_object = event.detail.job_object;
        }
        this.descriptionAppear = true;
        this.listViewAppear = false;
        this.recommendationAppear = false;
    }
}