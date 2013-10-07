/*
 *  jQuery Easy Select - v1.0.0
 *  Easy Select is simply a drop down list integrated with an input field.
 *  http://www.webdeveasy.com/easy-select-plugin
 *
 *  Made by NaorYe
 */
;(function ( $, window, document, undefined ) {

	var pluginName = 'easySelect',
		defaults = {
			items: [],
			idKey: 'id',
			textKey: 'text',
			onSelect: null
		};


	function EasySelect(element, options) {
		this.element = $(element);
	    this.settings = $.extend({}, defaults, options);
	    this._initialize();
	}
	EasySelect.prototype = {
		_initialize: function() {
            this._createDropDown();

            this._openDropDown = $.proxy(this._openDropDown, this);
            this._triggerDropDownClose = $.proxy(this._triggerDropDownClose, this);
            this._matchQuery = $.proxy(this._matchQuery, this);
            this._disableDropDownClose = $.proxy(this._disableDropDownClose, this);
            this._selectDropDownItem = $.proxy(this._selectDropDownItem, this);
            this._closeDropDown = $.proxy(this._closeDropDown, this);

            this.element
                .on('focus', this._openDropDown)
                .on('blur', this._triggerDropDownClose)
                .on('keyup', this._matchQuery);

            this.dropDown
                .on('focus', this._disableDropDownClose)
                .on('click', this._selectDropDownItem)
                .on('blur', this._closeDropDown);
        },
        destroy: function() {
            this.element.off('focus', this._openDropDown)
				.off('blur', this._triggerDropDownClose)
				.off('keyup', this._matchQuery);
            this.dropDown.remove();
        },
        setItems: function(items) {
            this.settings.items = items;
			this._listItems();
        },
        _triggerDropDownClose: function() {
            this._dropDownCloseTimeoutId = window.setTimeout($.proxy(this._closeDropDown, this), 200);
        },
        _disableDropDownClose: function() {
            window.clearTimeout(this._dropDownCloseTimeoutId);
        },
        _positionDropDown: function() {
            var pos = this.element.offset();
            this.dropDown.css({
                top: pos.top + this.element.outerHeight(false),
                left: pos.left,
                width: this.element.outerWidth(false)
            });
        },
        _listItems: function() {
			var s = this.settings,
				list = this.dropDown.find('.items');
			list.find('.item').remove();
            if (s.items && s.items.length > 0) {
                s.items.forEach(function(item) {
                    $('<li class="item" data-value="' + item[s.idKey] + '">' + item[s.textKey] + '</li>')
                        .appendTo(list);
                });
            }
            $('<li class="item unselectable empty">No results found</li>').appendTo(list);
        },
        _createDropDown: function() {
            this.dropDown = $('<div class="easy-select"><ul class="items"></ul></div>')
				.appendTo('body');
            this._listItems();
            this._closeDropDown();
        },
        _matchQuery: function() {
            var query = this.element.val().toLowerCase(),
				visible = 0;
            this.dropDown.find('.item').each(function(index, item) {
                item = $(item);
                if (item.text().toLowerCase().indexOf(query) === 0) {
                    item.show();
                    visible ++;
                } else {
                    item.hide();
                }
            });
            if (visible === 0) {
                this.dropDown.find('.empty').show();
            } else {
                this.dropDown.find('.empty').hide();
            }
        },
        getValue: function() {
            var query = this.element.val(),
				value = null,
				items = this.dropDown.find('.item:contains(' + query + ')'),
				i, text;
            for (i = 0; i < items.length && value === null; i++) {
                text = $(items[i]).text();
                if (text === query) {
                    value = $(items[i]).data('id');
                }
            }

            return value;
        },
        _openDropDown: function() {
            this._matchQuery();
            this.element.addClass('open');
            this._positionDropDown();
            this.dropDown.show();
        },
        _closeDropDown: function() {
            var value = this.getValue(),
				onSelect = this.settings.onSelect;
            if (value === null) {
                this.element.val('').data('selectedId','');
            }
            if (onSelect && typeof onSelect === 'function') {
				onSelect(value);
            }
            this.element.removeClass('open');
            this.dropDown.hide();
        },
        _selectDropDownItem: function(event) {
            this._disableDropDownClose();
            var item = $(event.target),
				id, text;
            if (!item.hasClass('unselectable')) {
                id = item.data('id');
                text = item.text();
                this.element.val(text).data('selectedId', id);
            }
            this._closeDropDown();
        }
	};

	$.fn[pluginName] = function (options) {
		return this.each(function() {
			if (!$.data(this, pluginName)) {
				var easySelect = new EasySelect(this, options);
				$.data(this, pluginName, {
					getValue: $.proxy(easySelect.getValue, easySelect),
					setItems: $.proxy(easySelect.setItems, easySelect),
					destroy: $.proxy(easySelect.destroy, easySelect)
				});
			}
		});
	};

})(jQuery, window, document);
