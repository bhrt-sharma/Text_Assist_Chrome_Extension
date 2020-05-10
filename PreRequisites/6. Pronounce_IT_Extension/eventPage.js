var menuItem = {
    "id": "Pronounce",
    "title": "Pronounce_It",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);


chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "Pronounce" && clickData.selectionText){
        chrome.tts.speak(clickData.selectionText,{'rate':0.7})
    }


});


//you will get this error
// Unchecked runtime.lastError: Cannot create item with duplicate id

// to avoid this remove

//  "persistance" : False
