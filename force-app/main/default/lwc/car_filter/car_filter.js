import { LightningElement , wire} from 'lwc';
import {getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';

import Car_filters from '@salesforce/messageChannel/Car_filters__c';
import {MessageContext, publish} from 'lightning/messageService';
export default class Car_filter extends LightningElement {
    searchKey=null
    filters={searchKey:'',maxPrice:9999999}

    @wire(MessageContext)
    context;


    publishMessage(){
        const message = {filters:this.filters}
        console.log('filters:',this.filters);
        publish(this.context, Car_filters, message);
    }

    @wire(getObjectInfo,{objectApiName:'Car__c'})
    carObjectInfo;

    @wire(getPicklistValues, {recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',fieldApiName:'Car__c.Category__c'})
    categories;

    @wire(getPicklistValues, {recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',fieldApiName:'Car__c.Make__c'})
    makeType;

    handleSearchKeyChange(event){
        this.filters = {...this.filters, 'searchKey':event.target.value}
        this.publishMessage();
    }

    handleMaxPriceChange(event){
        this.filters = {...this.filters, 'maxPrice':event.target.value}
        this.publishMessage();
    }

    handleCheckbox(event){
        if(!this.filters.categories){
            let categories = [];
            for (let i=0;i<this.categories.data.values.length;i++){
                const t = this.categories.data.values[i].value;
                categories = [...categories, t]
            }
            //const categories = this.categories.data.values.map(item=>{item.value});
            //const makeType   = this.makeType.data.values.map(item=>item.value); 
            this.filters = {...this.filters, categories}
        }

        if(!this.filters.makeType){
            let makeType = [];
            for (let i=0;i<this.makeType.data.values.length;i++){
                const t = this.makeType.data.values[i].value;
                makeType = [...makeType, t]
            }
            this.filters = {...this.filters, makeType}
        }

        const name= event.target.name;
        const value = event.target.value;
        
        if(event.target.checked){
            console.log('inside checked');
            if (!this.filters[name].includes(value)){
                this.filters[name]=[...this.filters[name], value];
                console.log('inside checked if',this.filters);
            }
        }else{
                this.filters[name] = this.filters[name].filter(item => item !==value)
                console.log('inside checked else',this.filters);
            }

        this.publishMessage();
    }

}