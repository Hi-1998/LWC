trigger createcontact on Account (after insert) {
		
    if (trigger.isafter && trigger.isinsert && trigger.new.size()>0){
        
        helperclass.create_contact(trigger.new);
      
}
}