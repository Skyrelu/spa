/**
 * spa.shell.js
 * shell module for SPA
 */
/*jslint browser:true, continue:true,
  devel:true,indent:2,maxerr:50,
  newcap:true,nomen:true,plusplus:true,
  regexp:true,sloppy:true,vars:false,
  white:true
 */
/*global $,spa */

spa.shell = (function(){
	//------begin module scope variables
	var configMap = {
		//配置一些变量
		main_html:String()
		+'<div class="spa-shell-head">'
			+'<div class="spa-shell-head-logo"></div>'
			+'<div class="spa-shell-head-acct"></div>'
			+'<div class="spa-shell-head-search"></div>'
		+'</div>'
		+'<div class="spa-shell-main">'
			+'<div class="spa-shell-main-nav"></div>'
			+'<div class="spa-shell-main-content"></div>'
		+'</div>'
		+'<div class="spa-shell-foot"></div>'
		+'<div class="spa-shell-chat"></div>'
		+'<div class="spa-shell-modal"></div>',
		//配置滑块运动的速度和高度
		chat_extend_time:1000,
		chat_retract_time:300,
		chat_extend_height:450,
		chat_retract_height:15,
		chat_extend_title:'Click to retract',
		chat_retract_title:'Click to extend'
	},
	stateMap = { 
		$container:null,
		is_chat_retract:true
	},//整个模块中共享的动态信息
	jqueryMap = {},
	setJqueryMap,initModule,toggleChat,onClickChat;
	//------end module scope variables

	//begin utility methods 不和页面元素交互的函数

	//end utility methods

	//begin dom methods
	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = { 
			$container : $container,
			$chat : $container.find('.spa-shell-chat')
		 };
	};
	toggleChat = function  (do_extend,callback) {
		var px_chat_ht = jqueryMap.$chat.height(),
		is_open = px_chat_ht===configMap.chat_extend_height,
		is_close = px_chat_ht===configMap.chat_retract_height,
		is_sliding = !is_open&&!is_close;
		if(is_sliding){ return false ;}
		if(do_extend){
			jqueryMap.$chat.animate({height:configMap.chat_extend_height},
				configMap.chat_extend_time,
				function  () {
					jqueryMap.$chat.attr('title',configMap.chat_extend_title);
					stateMap.is_chat_retract = false;
					if(callback) {callback(jqueryMap.$chat);}
				}
			);
			return true;
		}
		jqueryMap.$chat.animate({height:configMap.chat_retract_height},
			configMap.chat_retract_time,
			function () {
				jqueryMap.$chat.attr('title',configMap.chat_retract_title);
				stateMap.is_chat_retract = true;
				if(callback){callback(jqueryMap.$chat);}
			}
		);
		return true;
	};
	//end dom methods

	//begin event handlers
	onClickChat = function (event) {
		toggleChat(stateMap.is_chat_retract);
		return false;
	}
	//end event handlers

	//begin public methods
	initModule = function  ($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();
		stateMap.is_chat_retract = true;
		jqueryMap.$chat
			.attr('title',configMap.chat_retract_title)
			.click( onClickChat );
	};

	return { initModule:initModule };
	//end public methods

}());












