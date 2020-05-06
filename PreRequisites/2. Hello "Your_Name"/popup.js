$(function(){
    $('#name').keyup(function(){
        $('#Hello_ID').text('Hello ' + $('#name').val())
    })
});


// the keyup function means whenever a key is pressed in INPUT it activates

// and it changes the heading with the "val" of input
