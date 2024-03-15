import { LightningElement } from "lwc";
import Logo from '@salesforce/resourceUrl/Logo';
import Signature from '@salesforce/resourceUrl/Signature';
export default class job_footer extends LightningElement {

    Logo = Logo;
    Signature = Signature;
    column1 = ['Sign Up', 'help Center', 'About', 'Press', 'Blog', 'Careers', 'Developers'];
    column2 = ['Learning', 'Jobs', 'Salary', 'Services', 'Products'];
    column3 = ['Members', 'Companies', 'featured', 'Posts', 'Articles', 'Schools', 'News Latters', 'Advice', 'People Search'];

}