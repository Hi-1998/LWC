public with sharing class apex_in_LWC {

    @AuraEnabled(cacheable=true)
    public static list<account> getAccountList(list<string> industry){

        return [select id, name, phone, industry from account where industry in :industry];
    }

}