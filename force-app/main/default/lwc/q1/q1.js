import { LightningElement,api } from 'lwc';
export default class Q1 extends LightningElement {


myquestions=[
    {
        id:"Q-1",
        question:"Which skills is required for LWC?",
        ans:{a:'Python',b:'Java',c:'HTML,CSS and JavaScript',d:'.Net'},
        correctAnswer:"c"

    },
    {
        id:"Q-2",
        question:"What is the skills require to become Salesforce Developer? ",
        ans:{a:'Apex',b:'Salesforce Administration',c:'C++',d:'Python'}  ,
        correctAnswer:"a"
    },
    {
        id:"Q-3",
        question:"Which framework is used to build Lightning Web Component?",
        ans:{a:'ReactJS',b:'NodeJS',c:'LWC',d:'AngularJS'},
        correctAnswer:"c"
    }

];

selected_answers = {}
changehandler(event){
    console.log(event.target.name);
    console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    this.selected_answers={...this.selected_answers ,[name]:value};
    console.log(JSON.stringify(this.selected_answers));

}

correctAnswers=0;
flag=false;
get allnotselected(){
    return !(Object.keys(this.selected_answers).length === this.myquestions.length && this.flag==false);

}

submithandler(event){
    this.correctAnswers=0;
    event.preventDefault();
    let correct = this.myquestions.filter(item => this.selected_answers[item.id] === item.correctAnswer);
    console.log(JSON.stringify(correct));
    this.correctAnswers = correct.length;
    this.isSubmitted=true;
    console.log(this.correctAnswers);
    this.flag=true;    
}

resethandler(){
    this.selected_answers={};
    this.correctAnswers = 0;
    this.flag=false;
}


// -------------------------------------------------------------------Multi choice---------------------------------------------------------
multichoicequestions=[
    {
        id:"Q-4",
        question:"Which of the below is Premitive data type(s)? (select 2 answer)",
        ans:{a:'integer',b:'list',c:'boolean',d:'sObject'},
        correctAnswer:["a","c"]

    },
    {
        id:"Q-5",
        question:"Select the automation tool(s) in salesforce? (select 2 answer)",
        ans:{a:'Flow',b:'Approval Process',c:'LWC',d:'Service Console'}  ,
        correctAnswer:["a","b"]
    },
    {
        id:"Q-6",
        question:"Which of the below trigger events are valid in salesforce? (select 3 answer)",
        ans:{a:'after delete',b:'after undelete',c:'before insert',d:'after update'},
        correctAnswer:["b","d","c"]
    }];

    selected_multichoice_answers = {}
    multichangehandler(event){
        console.log(event.target.value);
        if (this.selected_multichoice_answers[event.target.name]){
            
            if (this.selected_multichoice_answers[event.target.name].includes(event.target.value)){
                let d = this.selected_multichoice_answers[event.target.name].indexOf(event.target.value);
                this.selected_multichoice_answers[event.target.name].splice(d,1);
            }
            else{
                this.selected_multichoice_answers[event.target.name].push(event.target.value);
            }
        }
        else{
        this.selected_multichoice_answers[event.target.name]=[event.target.value];
        }
        console.log(JSON.stringify(this.selected_multichoice_answers));
        this.ans=!(Object.keys(this.selected_multichoice_answers).length === this.multichoicequestions.length );
    }

    ans=true;
    correctmultichoice=0;
    flag1=false;
    
    submitsection2handler(){
       this.correctmultichoice=0
       event.preventDefault();
       let x = this.multichoicequestions.filter(item => JSON.stringify(item.correctAnswer.sort()) === JSON.stringify(this.selected_multichoice_answers[item.id].sort()));
        this.correctmultichoice=x.length;
        console.log(this.correctmultichoice);
        this.flag1=true;
        this.ans=true;
    }

    resetsection2handler(){
        this.selected_multichoice_answers={}
        this.correctmultichoice = 0;
        this.ans=true;
        this.flag1=false;

    }

    get allnotselectedmultichoice(){   
        return this.ans;
    
}
    total;per;
    
    get dynamicCSSper(){
        this.total = this.correctmultichoice+this.correctAnswers;
        this.per = (this.total*100/(6)).toFixed(2);
        console.log(this.total);
        if (this.per>=90){
            return `color:rgb(50, 157, 21);font-size:1${this.total}0%`}
        else if (this.per===0){
            return `color:rgb(199, 34, 34);font-size:100%`}
        else{
            return `color:rgb(199, 34, 34);font-size:1${this.total}0%`
        }   
    }

}