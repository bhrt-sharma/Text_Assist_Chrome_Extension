$(function(){
    color = $('#fontColor').val();

    // on this ID if any of three things happen i.e
    // change paste or keyup
    // then call the function

    $("#fontColor").on("change paste keyup", function() {
        color = $(this).val();
    });

   // listen to the click event of submit button
   $('#btnChange').click(function(){
         chrome.tabs.query({active:true,currentWindow: true}, function(tabs){
           // give an array to tabs
         //       //what the message contains
            chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color });
        });
   });
});
