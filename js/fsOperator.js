function FSOperator(options) {
	this.fs = null;
	this.dataSize = 5;
	this.fileName = options.fileName || "data/data.json";
	this.hasData = null;
	this.data = null;

	window.requestFileSystem(window.TEMPORARY, this.dataSize * 1024 * 1024, this.onInit, this.onError);
}

FSOperator.prototype.onInit = function(fs) {
	console.log("opened file system: " + fs.name);
	this.fs = fs;
};

FSOperator.prototype.getData = function(callback) {
	var self = this;
	this.fs.root.getFile(this.fileName, {}, function(fileEntry) {
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				try {
					self.data = JSON.parse(this.result);
					self.hasData = true;
					callback(self.data);
				} catch(err) {
					console.error("JSON parsing error :", err);
					self.hasData = false;
				}
			};

			reader.readAsText(file);
		}, this.noData);
	}, this.noData);
	return this.hasData;
};

FSOperator.prototype.noData = function(e) {
	this.onError(e);
	this.hasData = false;
};

FSOperator.prototype.setData = function(data) {
	var self = this;
	this.data = data;
	this.hasData = false;

	this.fs.root.getFile(this.fileName, {create: true}, function(fileEntry) {
		fileEntry.createWriter(function(fileWriter) {
			fileWriter.onwriteend = function(e) {
				console.log("Write completed.");
				self.hasData = true;
			};
			fileWriter.onerror = function(e) {
				console.log("Write failed: " + e.toString());
				self.hasData = false;
			};

			var bb = new BlobBuilder();
			bb.append(JSON.stringify(data));
			fileWriter.write(bb.getBlob("text/plain"));
		}, this.onError);
	}, this.onError);
	return this.hasData;
};

FSOperator.prototype.clearData = function() {
	var self = this;
	this.fs.root.getFile(this.fileName, {create: false}, function(fileEntry) {
		fileEntry.remove(function() {
			console.log("Data removed");
		}, self.onError);
	}, this.onError);
	this.data = null;
};

FSOperator.prototype.onError = function(e) {
	var msg = "";
	switch (e.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
		msg = "QUOTA_EXCEEDED_ERR";
		break;
		case FileError.NOT_FOUND_ERR:
		msg = "NOT_FOUND_ERR";
		break;
		case FileError.SECURITY_ERR:
		msg = "SECURITY_ERR";
		break;
		case FileError.INVALID_MODIFICATION_ERR:
		msg = "INVALID_MODIFICATION_ERR";
		break;
		case FileError.INVALID_STATE_ERR:
		msg = "INVALID_STATE_ERR";
		break;
		default:
		msg = "Unknown Error";
		break;
	};
	console.log("Error: " + msg);
};