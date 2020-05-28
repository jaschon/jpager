//
// JSREBUCK 2018
// v.06
// 
// setup: $('#this').jpager({options key: options val});
// NOTE: common options are: item_name (class of items in list), num_per_page (amount) current (page num to start on), 
// class options are: pager_group_class, pager_item_class, pager_link_class, pager_class
// text options are: pager_prev_text, pager_next_text
//
// runnings public functions:  $("#this").data('jpager').go(page_num);
// NOTE: functions are: go(page_num), next(), prev() and find('.class_name')
// 
// find an item with option: $('#this').jpager({find: '.class_name'}); *** REMEMBER to add dot! ***
// find an item with function call: $("#this").data('jpager').find('.class_name');  *** REMEMBER to add dot! ***
// NOTE: also matches any jquery pattern (tag, id, class...)
// 


(function($) {

    $.jpager = function(element, options) {

        var defaults = {
	    num_per_page: 9, //number of items per page
	    item_name: ".templateItem", //class name of items to look for
	    nav_pos: 'outside', //top, bottom or both
	    current: 1, //start page
	    pager_group_class: 'm-3', //add spacing classes for nav
	    pager_item_class: 'page-item', //bootstrap 4 class names for nav, nav items and nav buttons
	    pager_link_class: 'page-link',
	    pager_class: 'pagination', //pos with justify-content-center or justify-content-end
	    pager_prev_text: '<i class="fa fa-chevron-left"></i>', //needs font-awesome for icons
	    pager_next_text: '<i class="fa fa-chevron-right"></i>',
        }

        var plugin = this; //this is the plugin itself
        plugin.settings = {};

        var $element = $(element), //this is the element that it is attached to
             element = element;

        plugin.init = function() { //set up

            plugin.settings = $.extend({}, defaults, options); //set up settings
            
	    plugin.settings.num_items = $element.find(plugin.settings.item_name).length; //get number of items
            plugin.settings.num_pages = Math.ceil(plugin.settings.num_items/plugin.settings.num_per_page);  //cal number of items per page
	    plugin.settings.nav_id = $element.attr("id") + "_jpager_nav";

	    $element.find(plugin.settings.item_name).css('display', 'none'); //hide everthing

	    plugin.build_nav(); //build nav buttons

	    //default to page 1 if not in range
	    if(plugin.settings.current < 1 || plugin.settings.current > plugin.settings.num_pages){
		plugin.settings.current = 1;
	    }

	    plugin.go(plugin.settings.current); //go to current page (default 1)

	    if(plugin.settings.find){ plugin.find(plugin.settings.find); } //find classes if set

        }

	//turn on/off buttons and mark current page
	plugin.updateNav = function() {

	    //disable prev/next buttons if out of range

	    if(plugin.settings.current == plugin.settings.num_pages){ 
		$("."+plugin.settings.nav_id).find('.go_next').addClass('disabled'); 
	    } else {
		$("."+plugin.settings.nav_id).find('.go_next').removeClass('disabled'); 
	    }

	    if(plugin.settings.current == 1){ 
		$("."+plugin.settings.nav_id).find('.go_prev').addClass('disabled'); 
	    } else {
		$("."+plugin.settings.nav_id).find('.go_prev').removeClass('disabled'); 
	    }

	    //mark active page button
	    if(plugin.settings.current <= plugin.settings.num_pages){
		$("."+plugin.settings.nav_id).find('.page-item').removeClass('active');
		$("."+plugin.settings.nav_id).find('.page-num-'+plugin.settings.current).addClass('active');
	    }
	}

	//build nav button section
        plugin.build_nav = function() {
	    if(plugin.settings.num_pages > 1 ){

		var counter = 1;
		var pager = $("<ul/>").addClass(plugin.settings.pager_class).addClass(plugin.settings.nav_id);

		//build number links
		while(counter <= plugin.settings.num_pages){
		    tmp = $("<li/>").addClass(plugin.settings.pager_item_class).attr("data-page", counter).addClass('page-num-'+counter);
		    tmp.append($("<a/>").append(counter).attr("href", "#0").addClass("go_to").addClass(plugin.settings.pager_link_class));
		    pager.append(tmp);
		    counter++;
		}

		//build prev/next links
		pager.prepend( $("<li/>").addClass('go_prev').addClass(plugin.settings.pager_item_class).append($("<a/>").attr("href", "#0").addClass(plugin.settings.pager_link_class).append(plugin.settings.pager_prev_text)) );
		pager.append( $("<li/>").addClass('go_next').addClass(plugin.settings.pager_item_class).append($("<a/>").attr("href", "#0").addClass(plugin.settings.pager_link_class).append(plugin.settings.pager_next_text)) );
		pager_group = $("<nav/>").addClass(plugin.settings.pager_group_class).append(pager);

		//place nav on page

		switch (plugin.settings.nav_pos) {

		    case  'outside':
			$element.before(pager_group.clone());
			$element.after(pager_group.clone());
			break;
		    case  'top_outside':
			$element.before(pager_group.clone());
			break;
		    case  'bottom_outside':
			$element.after(pager_group.clone());
			break;
		    case 'top':
			$element.prepend(pager_group);
			break;
		    case 'bottom':
			$element.append(pager_group);
			break;
		    case 'both':
			$element.append(pager_group.clone());
			$element.prepend(pager_group.clone());
			break;
		    default:
			break;

		}

		//update nav buttons
		plugin.updateNav();

		//bind nav links to functions
		$("."+plugin.settings.nav_id).find('.go_to').click(function() { 
		    var tmp_pg = parseInt($(this).parent('li').attr("data-page"));
		    if (plugin.settings.current != tmp_pg){
			plugin.go(tmp_pg); 
		    }
		});
		$("."+plugin.settings.nav_id).find('.go_prev').click(function() { plugin.prev(); } );
		$("."+plugin.settings.nav_id).find('.go_next').click(function() { plugin.next(); } );
	    }
        }

	//prev/next functions for outside use
	plugin.next = function() { plugin.go(plugin.settings.current+1); }
	plugin.prev = function() { plugin.go(plugin.settings.current-1); }

	//find a class and turn to page
	plugin.find = function(find_class) {
	    f = $element.find(find_class).index()
	    if(f>0){ plugin.go(Math.ceil((f+1)/plugin.settings.num_per_page)); }
	}

	//switch page
	plugin.go = function(page) {
	    page = parseInt(page);
	    if((page > 0) && (page <= plugin.settings.num_pages)){
		start_from = (page-1) * plugin.settings.num_per_page;  
		end_on = start_from + plugin.settings.num_per_page; 
		plugin.settings.current = page;
		$element.find(plugin.settings.item_name).hide().slice(start_from, end_on).fadeIn("slow"); //where all the magic happens...
		plugin.updateNav();
	    } 
	}

	//run init
        plugin.init();

    }

    //set
    $.fn.jpager = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('jpager')) {
                var plugin = new $.jpager(this, options);
                $(this).data('jpager', plugin);
            }
        });

    }

})(jQuery);

