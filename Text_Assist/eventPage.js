var menuItem = {
    "id": "TextAssist",
    "title": "TextAssist",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "TextAssist" && clickData.selectionText){
        var wikiUrl = "http://127.0.0.1:5000/find/" + fixedEncodeURI(clickData.selectionText);
        var createData = {
            "url": wikiUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": 475,
            "height": 350
        };
        chrome.windows.create(createData, function(){});
    }
});
