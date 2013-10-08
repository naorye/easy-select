# Easy Select Plugin

<a href="http://www.webdeveasy.com/easy-select-plugin" target="_blank">http://www.webdeveasy.com/easy-select-plugin</a>

Demo <a href="http://www.webdeveasy.com/code/easy-select-plugin/demo/index.html" target="_blank">here</a>

## Getting Started
1. Download the plugin from <a href="https://github.com/naorye/easy-select/archive/master.zip" target="_blank">here</a>.
2. Add a reference to jquery.easy-select.js and easy-select.css in your page. You can use the minified version instead by using jquery.easy-select.min.js and easy-select.min.css.  
3. In order to use the plugin on text input element:   
Markup: ```<input type="text" class="my-input" />```   
JavaScript: ```$('.my-input').easySelect();```   

## Options
Easy select has a few options:   

<h4 style="margin-bottom: 0;">items</h4>
Type: Array of objects  
Default: `[]`   
Array of items for the select box.

<h4 style="margin-bottom: 0;">idKey</h4>
Type: String   
Default: `id`   
The name of the attribute that represents the item id.

<h4 style="margin-bottom: 0;">textKey</h4>
Type: String   
Default: `text`   
The name of the attribute that represents the item text.

<h4 style="margin-bottom: 0;">onSelect</h4>
Type: Function   
Default: `null`   
A callback function that triggered every time a new item gets selected.

## Methods
Easy select has also a few useful methods. In order to use them you need to access the API object:
```
$('.my-input').data('easySelect');
``` 

#### getValue()
In order to get the selectd text you can read the value of your text input. getValue() method returns the value (or id) of the selected item.
```
$('.my-input').data('easySelect').getValue();
```

#### setItems()
setItems() method lets you change the items list during runtime. This method is useful when you want to load data asynchronously.
```
$.get('url/to/data').done(function(items) {
    $('.my-input').data('easySelect').setItems(items);
});
```

#### destroy()
destroy() method destroys the plugin by removing unnecessary elements and unbinding events.
```
$('.my-input').data('easySelect').destroy();
```
## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Make your changes on the `src` folder, never on the `dist` folder
4. You can use `grunt build` and `grunt preview` commands in order to see your changes on the demo
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request