import { LightningElement, wire } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';

import Car_recordId from '@salesforce/messageChannel/Car_recordId__c';
import {subscribe, unsubscibe, MessageContext, APPLICATION_SCOPE} from 'lightning/messageService';

import {NavigationMixin} from 'lightning/navigation';
export default class Car_card extends NavigationMixin(LightningElement) {
   
    Name='Related'; Photo

    @wire(MessageContext)
    context;

    subscription;
    connectedCallback() {
        this.subscription = subscribe(this.context, Car_recordId, (message)=>{this.handleMessage(message)}, {scope:APPLICATION_SCOPE})
    }

    recordId=false;
    handleMessage(message){
        this.recordId= message.recordId
    }

    @wire(getRecord,{recordId:"$recordId", fields:['Car__c.Name','Car__c.Picture_URL__c']})
    picture({data,error}){
        if(data){
            this.Name = getFieldValue(data,'Car__c.Name');
            this.Photo = getFieldValue(data,'Car__c.Picture_URL__c');
            this.flag=true
        }
        if(error){console.log(error);}
    }

    gotoRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.recordId,
                objectApiName:'Car__c',
                actionName:'view'  
            }
        })
    }

}