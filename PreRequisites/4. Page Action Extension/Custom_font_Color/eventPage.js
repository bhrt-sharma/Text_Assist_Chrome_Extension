 // listen from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "Change_the_color")  // listen from content.js
    {
      // the tab has to be an acctive tag'
      // and in the current window
        chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
          // return a array of tabs

          // taking only one tag
            chrome.pageAction.show(tabs[0].id);
        });
    }
});
