import { LightningElement, api, wire } from 'lwc';

import getSimilarCars from '@salesforce/apex/Car_controller.getSimilarCars';
import {getRecord} from 'lightning/uiRecordApi'

import {NavigationMixin} from 'lightning/navigation';
export default class Car_similar extends NavigationMixin(LightningElement) {

    @api recordId

    @wire(getRecord, {recordId:'$recordId', fields:['Car__c.Make__c']})
    car

    similarCarList=false;
    fetchSimilarCars1(){
        getSimilarCars({
            carId:this.recordId,
            makeType:this.car.data.fields.Make__c.value
        }).then(result=>{
            this.similarCarList = result;
            console.log('OUTPUT : ',this.similarCarList);
        }).catch(error=>{console.log('fetch error',error);})
    }

    recordId2;
    fetchSimilarCars2(event){
        this.recordId2 = event.target.value;
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.recordId2,
                objectApiName:'Car__c',
                actionName:'view'  
            }
        })
    }
}