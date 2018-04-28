/*	Copyright (c) 2017 Jean-Marc VIGLINO, 
	released under the CeCILL-B license (French BSD license)
	(http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/
/** Control overlay for OL3
 * The overlay control is a control that display an overlay over the map
 *
 * @constructor
 * @extends {ol.control.Control}
 * @fire change:visible
 * @param {Object=} opt_options Control options.
 *	- className {String} class of the control
 *	- hideOnClick {bool} hide the control on click, default false
 *	- closeBox {bool} add a closeBox to the control, default false
 */
ol.control.Overlay = function(options) 
{	if (!options) options={};
	
	var element = $("<div>").addClass('ol-unselectable ol-overlay');
	if (options.className) element.addClass(options.className);
	
	ol.control.Control.call(this, 
	{	element: element.get(0),
		target: options.target
	});
	
	var self = this;
	if (options.hideOnClick) element.click(function(){self.hide();});

	this.set("closeBox", options.closeBox);

	this._timeout = false;
	this.setContent (options.content);
};
ol.inherits(ol.control.Overlay, ol.control.Control);

/** Set the content of the overlay
* @param {string} html the html to display in the control (or a jQuery object) 
*/
ol.control.Overlay.prototype.setContent = function (html) 
{	var self = this;
	if (html) 
	{	var elt = $(this.element);
		elt.html(html);
		if (this.get("closeBox")) 
		{	var cb = $("<div>").addClass("ol-closebox")
						.click(function(){self.hide();});
			elt.prepend(cb);
		}
	};
};

/** Set the control visibility
* @param {string} html the html to display in the control (or a jQuery object) 
* @param {ol.coordinate} coord coordinate of the top left corner of the control to start from
*/
ol.control.Overlay.prototype.show = function (html, coord) 
{	var self = this;
	var elt = $(this.element).show();
	if (coord)
	{	this.center_ = this.getMap().getPixelFromCoordinate(coord);
		elt.css({"top":this.center_[1], "left":this.center_[0] });
	}
	else 
	{	this.center_ = false;
		elt.css({"top":"", "left":"" });
	}
	this.setContent(html);
	if (this._timeout) clearTimeout(this._timeout);
	this._timeout = setTimeout(function()
		{	elt.addClass("ol-visible")
				.css({ "top":"", "left":"" });
			self.dispatchEvent({ type:'change:visible', visible:true, element: self.element });
		}, 10);
	self.dispatchEvent({ type:'change:visible', visible:false, element: self.element });
};

/** Set the control visibility hidden
*/
ol.control.Overlay.prototype.hide = function () 
{	var elt = $(this.element).removeClass("ol-visible");
	if (this.center_)
	{	elt.css({"top":this.center_[1], "left":this.center_[0] })
		this.center_ = false;
	}
	if (this._timeout) clearTimeout(this._timeout);
	this._timeout = setTimeout(function(){ elt.hide(); }, 500);
	this.dispatchEvent({ type:'change:visible', visible:false, element: this.element });
};

/** Toggle control visibility
*/
ol.control.Overlay.prototype.toggle = function () 
{	if (this.getVisible()) this.hide();
	else this.show();
}

/** Get the control visibility
* @return {boolean} b 
*/
ol.control.Overlay.prototype.getVisible = function () 
{	return ($(this.element).css('display') != 'none');
};

/** Change class name
* @param {String} className 
*/
ol.control.Overlay.prototype.setClass = function (className) 
{	var vis = $(this.element).hasClass("ol-visible");
	$(this.element).removeClass().addClass('ol-unselectable ol-overlay'+(vis?" ol-visible ":" ")+className);
};
