var contextMenuVariable = {
  "id":"spendMoney",
  "title":"Add to Budget Tracker",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuVariable);
function isInt(value){
  return  !isNaN(value) && parseInt(Number(value)) == value &&
  !isNaN(parseInt(value,10));
}
// listening to the click event of this button on context contextMenus
chrome.contextMenus.onClicked.addListener(function(click_obj){
// checking if selected item has ID spend Money and Text is selected
  if(click_obj.menuItemId =="spendMoney" && click_obj.selectionText){
    if(isInt(click_obj.selectionText)){ // if Int is selected
      chrome.storage.sync.get(['total','limit'],function(budget){
        var new_total = 0;
        if(budget.total){// if total > 0 then updating the total
          new_total += parseInt(budget.total);
        }
        // add selected text to new total
        new_total += parseInt(click_obj.selectionText);
        // set it back to chrome storage
        chrome.storage.sync.set({'total':new_total},function(){
          // if it is greater than limit popup
          if(new_total>=budget.limit){
            var notif = {
              type:'basic', // there are diff tyoes of notifs
              iconUrl:'icon_48.png',
              title:'Limit reached',
              message:'Boi! You have reached your limit'
            };
            chrome.notifications.create('limit_notif',notif);
          }
        });
      });
    }
  }
});
// Badges (Whenever something in the chrome storage changes)
chrome.storage.onChanged.addListener(function(changes,storageName){

  // this changes object has all the varibles which were onChanged
  // and have two values old and new
  chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
})
