import { LightningElement,api,wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import Account_object from '@salesforce/schema/Account';
import Account_name from '@salesforce/schema/Account.Name';
import Industry from '@salesforce/schema/Account.Industry';
import Type from '@salesforce/schema/Account.Type';

import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import {getRecord, getFieldValue, getFieldDisplayValue} from 'lightning/uiRecordApi';
import {getRecordUi, createRecord, updateRecord, deleteRecord} from 'lightning/uiRecordApi';


const FIELDS = ['Account.Name'];

export default class Work_with_Data extends LightningElement {
    objectname=Account_object;
    fieldlist=[Account_name, Industry, Type];

    successhandler(event){
        console.log('the account record has been created with '+event.detail.id);
        console.log('OUTPUT : ',event.detail);
        this.dispatchEvent(new ShowToastEvent({title:'Success',message:event.detail.id, variant:'success'}));
    }

//---------------------------------------------------------------wire service--------------------------------------------------------------

    name
    @wire(getRecord, {recordId:'0012w00001GVc18AAD',fields:['Account.Name']})
    handler({data,error}){
        if (data) {
          //  this.name= data.fields.Name.value;  or
            this.name = getFieldValue(data,'Account.Name')
        }
        if (error){
            console.log(error);
        }
    };

    //getPicklist Values
    @wire(getObjectInfo,{objectApiName:'Account'})
        accountObjectInfo;

     @wire(getPicklistValues, { recordTypeId: '$accountObjectInfo.data.defaultRecordTypeId', fieldApiName: 'Account.Industry' })
        propertyOrFunction({data,error}){
            if (data){
                console.log('OUTPUT : ');
                console.log(data.values)
               }
        };

    @wire(getRecord, {recordId:'0012w00001GVc18AAD',fields:['Account.Industry']})
    record;

    get industry() {
    return this.record.data.fields.Industry.value;
}

    @wire(getRecordUi, {recordIds:'0012w00001GVc18AAD', layoutTypes:'Full', modes:'Edit'})
    accounthandler({data, error}){
        if (data){console.log(data)}
        if (error){console.log(error)}
    }
    
                                                        //    --create record---
    formfields={}
    changehandler(event){
        const name = event.target.name;
        const value = event.target.value;
        this.formfields[name] = value;
    }

    createContact(){
        const recordInput = {apiName:'Contact', fields:this.formfields}
        createRecord(recordInput).then(result=>{
            console.log('successfully created contact');
            this.toast('Success','Contact created successfully', 'success');
            this.template.querySelector('form.form').reset();
        }).catch(error=>{
            console.log(error.body.message);
            this.toast('Error','There is an error, check it..'+error.body.message, 'error');
        })
    }

    toast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({title, message, variant}));

    }

                                                   // --update record 0032w00000zdD3sAAE
    updateRecordhandler(){
        const recordInput = {fields:{Id:'0032w00000zdD3sAAE',Phone:'9727065860'}}
        updateRecord(recordInput).then(()=>{
            console.log('successfully updated contact');
            this.toast('Success','Contact updated successfully', 'success'); 
        }).catch((error)=>{
            this.toast('Error','There is an error, check it..'+error.body.message, 'error');
        })
        
    }


                                            //  -- delete Record

    deleteRecordhandler(){
      
        deleteRecord("0032w00000zdD3sAAE").then(()=>{
            console.log('successfully deleted contact');
            this.toast('Success','Contact deleted successfully', 'success'); 
        }).catch((error)=>{
            this.toast('Error','There is an error, check it..'+error.body.message, 'error');
        })
        
    }



   
   
}