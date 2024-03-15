public class helperclass {
    
    public static void create_contact (list<Account> new_inserted_account){
        
        list<contact> contact_list_to_be_inserted = new list<contact>(); //empty list to store contacts
                    
  
        for (Account temp_account: new_inserted_account){
            
            list<Account> find_account = [select id from account where name=:temp_account.name limit 1];
            
            if(find_account.size()>0){
                contact new_contact = new contact (AccountId=find_account[0].id, FirstName='Amar', LastName='Kumar');
                contact_list_to_be_inserted.add(new_contact);
            } else {
                system.debug('Unable to fatch the account from database');
            }
            
        }
        
        
        
        if (contact_list_to_be_inserted.size()>0){
            insert contact_list_to_be_inserted;
            system.debug('successfully contact created with id: '+ contact_list_to_be_inserted[0].id);
        } else {
            system.debug('the contact list is empty');
        }
            	
            
        }
}