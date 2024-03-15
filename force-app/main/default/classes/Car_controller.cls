public class Car_controller {

    public class filters{
        @AuraEnabled
        public string searchKey {get;set;}
        @AuraEnabled
        public Decimal maxPrice {get;set;}
        @AuraEnabled
        public string[] categories {get;set;}
        @AuraEnabled
        public string[] makeType {get;set;}
    }

    @AuraEnabled(cacheable=true)
    public static list<Car__c> getCarList(filters Filters){
        String searchKey, whereClause = '';
        Decimal maxPrice;
        String[] categories, makeType, criteria = new list<String>{};
        if (Filters != null){
            maxPrice = Filters.maxPrice;
            categories = Filters.categories;
            makeType = Filters.makeType;
            
            if (!String.isEmpty(Filters.searchKey)){
                searchKey = '%'+Filters.searchKey+'%';
                criteria.add('Name LIKE : searchKey');
            }

            if (Filters.maxPrice >=0){
                 criteria.add('MSRP__c <=:maxPrice');
            }

            if (Filters.categories != null){
                 criteria.add('Category__c IN : categories');
            }

            if (Filters.makeType != null){
                criteria.add('Make__c IN : makeType');
            }

            if (criteria.size()>0){
                whereClause = 'WHERE ' + String.join(criteria, ' AND '); 
            }

        }

        String query = 'SELECT id, Name, Category__c, Control__c, Description__c, Fuel_Type__c, Make__c, MSRP__c, Number_of_Seats__c, OwnerId, Picture_URL__c FROM Car__c '+whereClause+' ORDER BY Name';
        System.debug(query);
        return Database.query(query);
    }

    @AuraEnabled
    public static list<Car__c> getSimilarCars(Id carId, list<string> makeType){

        return [SELECT id, Name, Category__c, Control__c, Description__c, Fuel_Type__c, Make__c, MSRP__c, Number_of_Seats__c, OwnerId, Picture_URL__c FROM Car__c WHERE Make__c IN: makeType AND Id !=:carId];

    }
}