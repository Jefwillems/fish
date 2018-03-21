function TextUtil(delimiter, text = "") {
  this.delimiter = delimiter;
  this.text = text;
}

TextUtil.prototype.append = function(text) {
  this.text += text + this.delimiter;
  return this;
};

TextUtil.prototype.build = function() {
  return this.text;
};
