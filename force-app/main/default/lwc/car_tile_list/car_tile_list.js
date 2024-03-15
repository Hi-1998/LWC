import { LightningElement, wire } from 'lwc';
import getCarList from '@salesforce/apex/Car_controller.getCarList';

import Car_filters from '@salesforce/messageChannel/Car_filters__c';
import Car_recordId from '@salesforce/messageChannel/Car_recordId__c';
import {subscribe, unsubscibe, MessageContext, APPLICATION_SCOPE, publish} from 'lightning/messageService';
export default class Car_tile_list extends LightningElement {

    Car_list;
    filters = {};
    
    @wire(MessageContext)
    context;

    subscription;
    connectedCallback() {
        this.subscription = subscribe(this.context, Car_filters, (message)=>{this.handleMessage(message)}, {scope:APPLICATION_SCOPE})
    }

    handleMessage(message){
        this.filters=message.filters;
    
    }

    clickHandler(event){
        const message = {recordId:event.currentTarget.getAttribute('value')};
        console.log('messgae',JSON.stringify(message));
        publish(this.context, Car_recordId, message);
        console.log('sent');
    }


    @wire(getCarList, {Filters: '$filters'})
    list({data, error}){
        if(data){
            this.Car_list=data;
            console.log(data);
        }
        if(error){
            console.log('errorrrr',error);
        }
    }

}