import { LightningElement } from 'lwc';
import id from '@salesforce/user/Id';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class LWC_learn extends LightningElement {

    
    greeting = 'World';
    changeHandler(event) {
    this.greeting = event.target.value;
  }
  flag = true;
  handleclick(){
    this.flag=!this.flag;
    this.template.querySelector('.hello').innerHTML="Hii";
    
  }

  changeButtonName="show";
  flag1=false;
  showchild(){
    if (this.flag1===false){
      this.flag1=true;
      this.changeButtonName="hide";}
    else{
      this.flag1=false;
      this.changeButtonName="show";}
      
  }

    ml=[{id:"1"},{id:"2"},{id:"3"}];

    progressnumber;
    changeprogress(event){
      this.progressnumber=event.target.value;
    }

    userDetails = {
        name:"salesforcetroop",
        age:25
    }
    userid=id;

  searchValue;
  handleChildtoParent(event){
    this.searchValue = event.detail ; 
  }

 toasthandleClick(){
      this.dispatchEvent(
        new ShowToastEvent({title:"Success!!!",message:"this is toast notification", variant:"success"})
      )
  }
}