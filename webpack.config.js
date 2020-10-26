const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/filter.js",
    "./js/debounce.js",
    "./js/data.js",
    "./js/utils.js",
    "./js/comments.js",
    "./js/preview.js",
    "./js/main.js",
    "./js/effect.js",
    "./js/slider.js",
    "./js/handlers.js",
    "./js/form.js",
    "./js/validation.js"
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
