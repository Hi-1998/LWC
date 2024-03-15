import { LightningElement, wire } from 'lwc';
import LMS_learn from '@salesforce/messageChannel/LMS_learn__c';
import {subscribe, unsubscribe,  MessageContext, APPLICATON_SCOPE} from 'lightning/messageService';
export default class Lms_x extends LightningElement {
    subscription;

    @wire(MessageContext)
    context;

    connectedCallback() {
        this.subscribeMessage()
    }

    subscribeMessage(){
    this.subscription = subscribe(this.context, LMS_learn, (message)=>{this.handleMessage(message)}, {scope:APPLICATON_SCOPE})
    }

    recievedMessage;
    handleMessage(message){
        this.recievedMessage = message.field1.value?  message.field1.value:'No message'
    }

    unsubscribeHandler(){
        unsubscribe(this.subscription)
        this.subscription = null;
    }

}