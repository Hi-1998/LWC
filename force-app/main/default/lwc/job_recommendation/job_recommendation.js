import { LightningElement } from "lwc";
import { jobs } from "./job_list";
export default class job_recommendation extends LightningElement {

    job_list = jobs;

    handleViewCardClick(event) {
        let job_object = this.job_list[event.currentTarget.dataset.value];
        this.dispatchEvent(new CustomEvent("eventfromjobrecommendation", { detail: { job_object: job_object } }));
        window.scrollTo(0, 0);
    }

}