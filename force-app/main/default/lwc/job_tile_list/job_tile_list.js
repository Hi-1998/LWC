import { LightningElement, api, wire } from "lwc";
export default class job_tile_list extends LightningElement {

    @api job_list; // job list received from job_list.c

    connectedCallback() {
        let job_list_copy = JSON.parse(JSON.stringify(this.job_list));
        job_list_copy.forEach((j, i) => {
            job_list_copy[i]['created_at'] = this.job_created_at(j);
        });
        this.job_list = [...job_list_copy];
    }

    //logic to change the date and time format
    job_created_at(j) {
        let a = j.created_at.split(' ');
        return `${a[0]} ${a[2]}-${a[1]},${a[5]} at ${a[3]}`;
    }

    //when user clicks on view butoon on any tile
    handleViewCardClick(event) {
        let job_object = this.job_list[event.target.value];
        this.dispatchEvent(new CustomEvent("eventfromjobtile", { detail: { job_object: job_object } }));
        window.scrollTo(0, 0);
    }

}