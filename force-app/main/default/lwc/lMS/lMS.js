import { LightningElement,wire } from 'lwc';
import LMS_learn from '@salesforce/messageChannel/LMS_learn__c';
import {MessageContext, publish} from 'lightning/messageService';
export default class LMS extends LightningElement {
inputValue;

    @wire (MessageContext)
    context;

    inputHandler(event){
        this.inputValue = event.target.value;
    }

    publishMessage(){
        const message={
            field1:{value:this.inputValue}
        }
    publish(this.context, LMS_learn, message)
    }
}