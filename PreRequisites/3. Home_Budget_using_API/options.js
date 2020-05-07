$(function(){

// initially we need the value:
  chrome.storage.sync.get('limit',function(obj){
    $('#limit').val(obj.limit);
  })


  $('#new_limit').click(function(){
// when the Set Limit button is clicked
    var limit = $('#limit').val();
    // will be initilised with the value of the text box "limit"
    if(limit){ // if > 0
      // them changing the variable in chrome storage
      chrome.storage.sync.set({'limit':limit},function(){
        close(); // and closing the tab
      });
    }
  });

  // when the reset_total button is clicked
  $('#reset_total').click(function(){
    // changing the varible back to zero
    chrome.storage.sync.set({'total':0},function(){
      close();
    });
  });
});
