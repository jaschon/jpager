JPAGER

setup: $('#this').jpager({options key: options val});
NOTE: common options are: item_name (class of items in list), num_per_page (amount) current (page num to start on), 
class options are: pager_group_class, pager_item_class, pager_link_class, pager_class
text options are: pager_prev_text, pager_next_text

runnings public functions:  $("#this").data('jpager').go(page_num);
NOTE: functions are: go(page_num), next(), prev() and find('.class_name')

find an item with option: $('#this').jpager({find: '.class_name'}); *** REMEMBER to add dot! ***
find an item with function call: $("#this").data('jpager').find('.class_name');  *** REMEMBER to add dot! ***
NOTE: also matches any jquery pattern (tag, id, class...)

