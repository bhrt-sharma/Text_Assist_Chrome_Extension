$(function(){

    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });

// to listen to the click event of submit button.

  $(function(){
      $('#submit').click(function(){
          chrome.storage.sync.get('total',function(budget_obj){
            //

             var newTotal = 0; // otherwise it remains 0

             if(budget_obj.total>0){  // i.e if budget already exists
               newTotal += parseInt(budget_obj.total)
             }

             var amount = $('#input').val();
             if(amount>0){
               newTotal += parseInt(amount);
             }

             // {key :  value}
             // updating varible total in chrome storage
             chrome.storage.sync.set({'total':newTotal})



             // updating the new total on html
             $('#total').text(newTotal);

             // clearing the input on HTML
             $('#input').val('');

          }); // end of function
          // all chrome API are asynchronous in nature
          // therefore we will need a callback function

        });
    });
});
  // and it changes the heading with the "val" of input
