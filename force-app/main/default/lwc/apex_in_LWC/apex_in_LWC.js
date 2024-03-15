import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/apex_in_LWC.getAccountList';
export default class Apex_in_LWC extends LightningElement {

    list1;
    @wire(getAccountList, {})
    list({ data, error }) {
        if (data) {
            this.list1 = data;
            console.log(data);
        }
        if (error) {
            console.log(error.body.message);
        }
    }

    list2;
    handlefetch() {
        getAccountList().then(result => {
            this.list2 = result
        }).catch(error => {
            console.log(error);
        })
    }

    value
    
    @wire(getAccountList, { industry: ['Energy', 'Apparel', 'Electronics'] })
    accountlist

    cols = [
        { label: 'Account Name', fieldName: 'Name', sortable: true, editable: true },
        { label: 'ID', fieldName: 'Id', sortable: true, editable: true },
        { label: 'Phone', fieldName: 'Phone', sortable: true, editable: true },
        { label: 'Industry', fieldName: 'Industry', sortable: true, editable: true }
    ]

}