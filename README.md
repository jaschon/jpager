# JPAGER

**Oh no, more Jquery pagination!!**

## Setup

```
$('#this').jpager({options key: options val});
```

### General Options

- num_per_page (amount) current (page num to start on), 
- item_name (class of items in list)

#### Class Options

- pager_group_class 
- pager_item_class
- pager_link_class
- pager_class

#### Text Options

- pager_prev_text
- pager_next_text

### Functions

- go(page_num)
- next()
- prev() 
- find('.class_name')

### Examples

- go to a page: $("#this").data('jpager').go(page_num);

- find an item with option: $('#this').jpager({find: '.class_name'}); 
- find an item with function call: $("#this").data('jpager').find('.class_name'); 

*NOTE:* Find and Class options use jquery patterns (tag, id, class...)

