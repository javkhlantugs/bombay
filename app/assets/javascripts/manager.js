$(document).on('turbolinks:load', function() {
	$('body').on('click', '[data-editable]', addNewMenu);
    $('.js-menu-delete').on('click', deleteMenuItem);
    $('.menu-item-modal').on('click', function () {
        var menuIdForItem = $(this).data('menu-id');
        console.log(menuIdForItem);
    });
});

function addNewMenu () {
	var $el =$(this);
	var $input = $('<input/>')
	$el.replaceWith( $input );
	console.log('success')

	 var save = function(){
    var $p = $("<p data-editable class='create-new js-create-new'/>").text('Create New');
        var menu = {menu: {name: `${$input.val()}`}};
	 	if (confirm('Do you want to save?')) {

    	$.ajax({
    		type: "POST",
    		url: '/api/menus',
    		data: menu,
    		success: reloadPage,
    		error: handleError
    	});
    	console.log($input.val());
	}
    $input.replaceWith( $p );
  };


   $input.one('blur', save).focus();
}

//======================================
// Menu delete

function deleteMenuItem () {
    var menuId = $(this).data('menu-id');
    console.log(menuId)
    if (confirm ('Do you want to delete?')) {
     $.ajax({
        type: 'DELETE',
        url: `/api/menus/${menuId}`,
        success: reloadPage,
        error: handleError

     });
 }
}

//======================================
//reload page
function reloadPage() {
    location.reload();
}



//======================================
//Error handler

function handleError(error) {
	console.log("error!");
	console.log(error.responseText)
}