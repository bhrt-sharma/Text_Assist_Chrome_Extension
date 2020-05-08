chrome.runtime.sendMessage({todo: "Change_the_color"});

//
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "changeColor"){
        var addColor = '#' + request.clickedColor;
         $('.site-content').css('color', addColor);
    }
});
