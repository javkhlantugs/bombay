$(document).on('turbolinks:load', function() {
	$('body').on('click', '[data-editable]', addNewMenu);
    $('.js-menu-delete').on('click', deleteMenu);
    $('.menu-item-modal').on('click', function () {
        var menuIdForItem = $(this).data('menu-id');
    });
    $('.js-menu-edit').on('click', editMenu);

    $('.js-menu-item-edit').on('click', showEditMenuItem);
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
//Edit menu item
function showEditMenuItem() {
    var currentItemId = $(this).data('menu-item-id');
    var currentItem = $(`.single-item-${currentItemId}`);
    var itemName = $(`.js-item-name-${currentItemId}`);
    var itemPrice = $(`.js-item-price-${currentItemId}`);
    var itemDescription = $(`.js-item-description-${currentItemId}`);
    var $nameInput = $('<input class="name-price"/>');
    var $priceInput = $('<input class="name-price"/>').val(itemPrice.text());
    var $descriptionInput = $('<textarea rows="4" style="font-size:10px;width:85%"/>').val(itemDescription.text());
    var menuID = $(this).data('menu-id');

    itemName.replaceWith($nameInput);
    itemPrice.replaceWith($priceInput);
    itemDescription.replaceWith($descriptionInput);
    $(currentItem).append('<button id="save">Save</button>')
    var saveItem = function() {
        var params = {menu_item: {name: `${$nameInput.val()}`, price: `${$priceInput.val()}`, description: `${$descriptionInput.val()}`}}
        
        if(confirm('Do you want to save?')) {
            $.ajax({
                type: 'PUT',
                url: `/api/menus/${menuID}/menu_items/${currentItemId}`,
                data: params,
                success: reloadPage(),
                error: handleError
            });
        }
    }
    $('#save').on('click', saveItem)
    
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

