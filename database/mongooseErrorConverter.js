module.exports = {
	getErrors: function(errorReport) {
		var errorList = [];
		if (!errorReport) {
			return undefined;
		} 

		for (var index in errorReport.errors) {
			var failure = errorReport.errors[index];
			switch(failure.kind) 
			{
				case "required":
					errorList.push({ field: index, message: "Cannot be empty" });
					break;
				default:
					errorList.push({ field: index, message: "Validation error" });
					break;
			}
		};
		return errorList;
	}
}