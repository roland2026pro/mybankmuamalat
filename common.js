/**
 * @fileoverview
 * 
 * Utility functions with no other dependencies; that is also loaded with every page.
 */

var myRIB = {
	// ============= Popup Management
	popups: {},
	/**
	 * <p>
	 * Open a receipt window for printing.
	 * </p>
	 * @param url
	 * @return
	 */
	openReceiptPopup: function(url) {
		return this.openPopup(url, 'receipt', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=810,height=500');
	},
	/**
	 * <p>
	 * Open a popup window for View Sample.
	 * </p>
	 * @param url
	 * @return
	 */
	openViewSample: function(url) {
		return this.openPopup(url, 'sample', 'scrollbars=1,height=150,width=500,statusbar=0,location=0,resizable=0');
	},
	/**
	 * <p>
	 * Open a tac window.
	 * @param url
	 * @return
	 */
	openTacPopup:function(url) {
		return this.openPopup(url, 'tacWin', 'resizable,height=180,width=550');
	},
	openPopup: function(url, name, settings) {
		this.popups[name] = window.open(url, name, settings);
		return this.popups[name];
	},
	/**
	 * <p>
	 * Open a popup window for footer links.
	 * </p>
	 * @param url
	 * @return
	 */
	openContents: function(url) {
		return this.openPopup(url, 'contents', 'scrollbars=1,height=600,width=600,statusbar=0,location=0,resizable=0');
	},
	/**
	 * <p>
	 * Open a popup window for Contact Us.
	 * </p>
	 * @param url
	 * @return
	 */
	openContactUs: function(url) {
		return this.openPopup(url, 'contents', 'scrollbars=1,height=300,width=700,statusbar=0,location=0,resizable=0');
	},
	/**
	 * <p>
	 * Close all opened popups.
	 * </p>
	 */
	closePopups: function() {
		for(f in this.popups) {
			var p = this.popups[f];
			if (p && !p.closed) {
				p.close();
			}
		}
		this.popups = {};
	},
	// ================ form helpers
	/**
	 * <p>
	 * Simulate a click of the button "btnId" when user presses the ENTER key on
	 * any child <input>, <textarea>, and <select> elements of the form
	 * "formId".
	 * </p>
	 */
	bindDefaultButton: function(formId, btnId) {
		var f = $(formId);
		var e = f.getElement(btnId);
		if (!$type(e)) {
			return;
		}
		f.getElements('input, select, textarea').addEvent("keydown", function(event) {
			if (event.key == 'enter') {
				event.preventDefault();
				e.click();
			}
		});
	}
};
