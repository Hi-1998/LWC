public class test {
	
    public void CreateAccount (string Accountname){
       //this method insert the new account
        account new_account = new Account(name=Accountname);
        insert new_account;   
    }
    
    
    public void CreateContact (string firstname, string lastname, string accountname){   
        //this method insert the contact related to given account
               
        list<account> find_account = [select id from account where name=:accountname limit 1];  //check if account is present or not
       
        if (find_account.size()>0){
       			 contact new_contact = new Contact(AccountId=find_account[0].id, FirstName=firstname, LastName=lastname);
       			 insert new_contact;
            	 system.debug('Contact created successfully with id: '+new_contact.id);
        } else {
            	system.debug('The given account does not exist.');
				}
    }
}