var myconfig_js = document.createElement('script');
var config_js = document.createElement('script');
var editor_js = document.createElement('script');
var editor_css = document.createElement('link');
myconfig_js.innerText = 'window.UEDITOR_CONFIG.UEDITOR_HOME_URL = "' + chrome.extension.getURL("libs/editor/") + '";';
config_js.src = chrome.extension.getURL("libs/editor/editor_config.js");
editor_js.src = chrome.extension.getURL("libs/editor/editor_all_min.js");
editor_css.href=chrome.extension.getURL("libs/editor/themes/default/ueditor.css");
editor_css.rel = "stylesheet";
editor_css.type = "text/css";
document.head.appendChild(editor_css);

config_js.onload = function(){
	document.head.appendChild(myconfig_js);
	document.head.appendChild(editor_js);
}
editor_js.onload = function(){
	return;
	document.getElementsByName('post_detail')[0].id = 'text-editor';
	var editor = new baidu.editor.ui.Editor();
    editor.render("text-editor");
}
myconfig_js.onload = function() {
}
document.head.appendChild(config_js);
