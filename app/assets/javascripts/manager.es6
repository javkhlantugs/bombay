$(document).on('turbolinks:load', function() {
	$('body').on('click', '[data-editable]', addNewMenu);
    $('.js-menu-delete').on('click', deleteMenu);
    $('.menu-item-modal').on('click', function () {
        var menuIdForItem = $(this).data('menu-id');
    });
    $('.js-menu-edit').on('click', editMenu);

    $('.js-menu-item-edit').on('click', showEditMenu);
});

function addNewMenu () {
	var $el = $(this);
	var $input = $('<input/>')
	$el.replaceWith( $input );

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
	}
    $input.replaceWith( $p );
  };


   $input.one('blur', save).focus();
}

//======================================
// Menu Edit

function editMenu () {
    var theId = $(this).data('menu-id');
    var theMenu = $(`.js-menu-head-${theId}`) ;
    var menuText = theMenu.text();
    var $theInput = $('<input/>').val(menuText);
    
    theMenu.replaceWith($theInput);

    var saveMenu =  function () {
        var menu = {menu: {name: `${$theInput.val()}`}}
        if (confirm('Do you want to save?')) {
            $.ajax({
                type: 'PUT',
                url: `/api/menus/${theId}`,
                data: menu,
                success: reloadPage,
                error: handleError,
            })
        }
    }
    $theInput.one('blur', saveMenu).focus();
}


//======================================
// Menu delete

function deleteMenu () {
    var menuId = $(this).data('menu-id');
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
//Edit menu
function showEditMenu() {
    var currentItemId = $(this).data('menu-item-id');
    var currentItem = $(`.single-item-${currentItemId}`);
    var inputItem = $('<%= render "/edit" %>');
    currentItem.replaceWith(inputItem);

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

