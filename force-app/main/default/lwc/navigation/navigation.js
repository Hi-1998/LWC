import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class Navigation extends NavigationMixin(LightningElement) {

    handleHomePage(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'home'
            }
        })
    }

    handleChatter(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'chatter'
            }
        })
    }

    handleObject(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'new' 
            }
        })
    }

    handlelistView(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'list' 
            },
            state:{
                filterName:'Recent'
            }
        })
    }

    handleViewMode(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0012w00001GVc18AAD',
                objectApiName:'Account',
                actionName:'view'  
            }
        })
    }

     handleEditMode(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'0012w00001GVc18AAD',
                objectApiName:'Account',
                actionName:'edit' 
            }
        })
    }

    handleTab(){
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            attributes:{
                apiName:'Quiz_App'
            }
        })
    }

    handleSite(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'https://www.w3schools.com/js/'
            }
        })
    }
}