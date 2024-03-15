import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import fontAwesome from '@salesforce/resourceUrl/fontAwesome';
export default class Memory_Game extends LightningElement {

    isloaded=true;
    cards=[ {id:1,listclass:"card",type:'plane',icon:'fa fa-paper-plane-o'},
            {id:2,listclass:"card",type:'anchor',icon:'fa fa-cloud'},
            {id:3,listclass:"card",type:'bolt',icon:'fa fa-bolt'},
            {id:4,listclass:"card",type:'cube',icon:'fa fa-cube'},
            {id:5,listclass:"card",type:'anchor',icon:'fa fa-anchor'},
            {id:6,listclass:"card",type:'leaf',icon:'fa fa-leaf'},
            {id:7,listclass:"card",type:'bicycle',icon:'fa fa-bicycle'},
            {id:8,listclass:"card",type:'diamond',icon:'fa fa-diamond'},
            {id:9,listclass:"card",type:'plane',icon:'fa fa-paper-plane-o'},
            {id:10,listclass:"card",type:'anchor',icon:'fa fa-anchor'},
            {id:11,listclass:"card",type:'bolt',icon:'fa fa-bolt'},
            {id:12,listclass:"card",type:'cube',icon:'fa fa-cube'},
            {id:13,listclass:"card",type:'anchor',icon:'fa fa-cloud'},
            {id:14,listclass:"card",type:'leaf',icon:'fa fa-leaf'},
            {id:15,listclass:"card",type:'bicycle',icon:'fa fa-bicycle'},
            {id:16,listclass:"card",type:'diamond',icon:'fa fa-diamond'}]

   openedCards=[];
   moves=0;
   matchedCards=[];

   showCard(event){
       event.target.classList.add("open","show","disabled");
       this.openedCards = this.openedCards.concat(event.target);
       if(this.openedCards.length === 2){
           this.moves+=1;
            if(this.openedCards[0].type === this.openedCards[1].type){
                this.matchedCards = this.matchedCards.concat(this.openedCards[0],this.openedCards[1]);
                this.matched();
            }else{
                this.unmatched();
            }
        }
   }

   matched(){
       this.openedCards[0].classList.add("match","disabled");
       this.openedCards[1].classList.add("match","disabled");
       this.openedCards[0].classList.remove("show","open");
       this.openedCards[1].classList.remove("show","open");
       this.openedCards=[];
   }

   unmatched(){
       this.openedCards[0].classList.add("unmatch");
       this.openedCards[1].classList.add("unmatch");
       this.action('DISABLE');
       setTimeout(()=>{
           this.openedCards[0].classList.remove("show","open","unmatch");
           this.openedCards[1].classList.remove("show","open","unmatch");
           this.openedCards=[];
           this.action('ENABLE');
       },1100)
   }

   action(action){
       let cards = this.template.querySelectorAll('.card');
       Array.from(cards).forEach(item=>{
           if (action === 'ENABLE'){
               let ismatch = item.classList.contains('match');
               if (!ismatch){
                   item.classList.remove("disabled");
               }
           }
           if(action === 'DISABLE'){
               item.classList.add('disabled')
           }
       })
   }

    shuffle(){
        this.openedCards = [];
        this.matchedCards = [];
        this.moves = 0;
        Array.from(this.template.querySelectorAll('.card')).forEach(item=>{
            item.classList.remove('open','show','match','disabled','unmatch');
        });

        for (let i=0;i<16;i++){
            let x = Math.floor((Math.random() * 15) + 1);
            let temp = this.cards[i];
            this.cards[i]=this.cards[x];
            this.cards[x] = temp;
        }
    }

   renderedCallback(){
        if(this.isloaded===true){
            loadStyle(this,fontAwesome+'/fontawesome/css/font-awesome.min.css').then(()=>console.log("loaded successfully")).catch(error=>console.error(error))
            this.isloaded=false;
    }}
}