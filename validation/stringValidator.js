module.export = {
	isEmpty: function (text) {
		text = text ? text.trim() : text;
		if(text) {
			return false;
		} else {
			return true;
		}
	}
};