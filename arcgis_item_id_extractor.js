// Copyright (c) 2017 Aaron Pulver

// A callback function to handle the click
function copyItemId(info, tab) {
  copyTextToClipboard(getUrlParam('id',info.linkUrl));
}

// extract a parameter from a url
// http://www.netlobo.com/url_query_string_javascript.html
function getUrlParam( name, url ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

// copies some text to the clipboard
// https://stackoverflow.com/a/18455088
function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}

// Create the context menu
var contextMenu = chrome.contextMenus.create({
    "title": "Copy item-id",
    "contexts":["link"],
    "onclick": copyItemId,
    "targetUrlPatterns": [
        "http://*.arcgis.com/home/item.html?id=*",
        "https://*.arcgis.com/home/item.html?id=*"
    ]
});