// Copyright (c) 2017 Aaron Pulver

// A callback function to handle the click
function copyItemId(info, tab) {
  if (info.linkUrl.includes('webmap=')){
    copyTextToClipboard(getUrlParam('webmap',info.linkUrl));
  }
  else if (info.linkUrl.includes('opsdashboard')){
    copyTextToClipboard(getDashboardId(info.linkUrl));
  }
  else{
    copyTextToClipboard(getUrlParam('id',info.linkUrl));
  }
}

function getDashboardId(url){
  if (url.includes('/new')){
    return getUrlParam('id',url);
  }
  else{
    return url.split("#")[1].split("/")[1].split("?")[0];
  }
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

// copies some text to the clipboard by creating a DOM element,
// copying the text in it, then removing the element
function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}

// Create the context menu, allow item-details page and webmap viewer links
var contextMenu = chrome.contextMenus.create({
    "title": "Copy item-id to clipboard",
    "contexts":["link"],
    "onclick": copyItemId,
    "targetUrlPatterns": [
        "*://*.arcgis.com/home/item.html?id=*",
        "*://*.arcgis.com/home/webmap/viewer.html?webmap=*",
        "*://*.arcgis.com/apps/opsdashboard/index.html*"
    ]
});