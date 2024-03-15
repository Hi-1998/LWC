import { LightningElement, api } from 'lwc';
export default class P2C extends LightningElement {
    @api message;
    @api messageList;  
    @api progressValue;
    userdata
    @api
    get details(){
        return this.userdata;
    }
    set details(data){
        this.userdata = {...data, age:data.age*2, "location":"India"}
    }


    searchVal;
    handleChange(event){
        this.searchVal = event.target.value;
        this.dispatchEvent(new CustomEvent('getsearchvalue',{detail:this.searchVal}));
    }
}