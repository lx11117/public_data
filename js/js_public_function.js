/**
 * @files 常用js函数
 * @description 
 *  version:0.0.2 
 *	date:2017-05-17
 *  author:lx_7
 */
 	
	
	//js批量注册事件,循环注册 或 采用委托的方式:
	//所谓的委托就是将自己的事情委托给父元素处理，利用的是事件冒泡原理	
	window.onload=function(){
	  var obox=document.getElementById("box");
	  var odiv=document.getElementById("show");
	  obox.onclick=function(ev){
		  //IE8及以下,事件处理函数中使用的事件对象是window.event
		  //IE8+既可以使用window.event也可以使用传递的事件对象,不过火狐浏览器只能够使用传递的事件对象
		var ev=window.event||ev;
			//IE9+ event.target此事件属性可以返回触发事件的对象
			// event.srcElement:此事件属性可以返回触发事件的对象的引用。
			var target=ev.target||ev.srcElement;
			//tagName属性返回元素的标签名称。返回值是大写形式。
			if(target.tagName="LI"){
			  odiv.innerHTML=target.innerHTML;
		}
	  }
	}
	
	/**
	 * @description js移除class
	 * @param {Element} el - 文档元素;
	 * @param {String} classname - 移除类名;
	 */
	function js_removeClass(el, classname) {
		var reg = new RegExp("(\\s|^)" + classname + "(\\s|$)");
		el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g, "");
	
	}
	
	/**
	 * @description js添加class
	 * @param {Element} el - 文档元素;
	 * @param {String} classname - 添加类名;
	 */
	function js_addClass(el, classname) {
		if(el.classList) {
			el.classList.add(classname);
		} else {
			el.className += ' ' + classname;
		}
	
	}
	
	/**
	 * @description js事件绑定
	 * @param {Element} element - 文档元素;
	 * @param {String} eType - 事件类型;
	 * @param {function} handle - 操作;
	 * @param {Boolean} bol - 捕获阶段;
	 */
	function js_addEvent(element, eType, handle, bol) {
		if(element.addEventListener){           //如果支持addEventListener
			element.addEventListener(eType, handle, bol);
		}else if(element.attachEvent){          //如果支持attachEvent
			element.attachEvent("on"+eType, handle);
		}else{                                  //否则使用兼容的onclick绑定
			element["on"+eType] = handle;
		}
	}
	
	/**
	 * @description js事件解绑
	 * @param {Element} element - 文档元素;
	 * @param {String} eType - 事件类型;
	 * @param {function} handle - 操作;
	 * @param {Boolean} bol - 捕获阶段;
	 */
	function js_removeEvent(element, eType, handle, bol) {
		if(element.addEventListener){
			element.removeEventListener(eType, handle, bol);
		}else if(element.attachEvent){
			element.detachEvent("on"+eType, handle);
		}else{
			element["on"+eType] = null;
		}
	}
	
	/**
	 * - chrome为了安全考虑，设计的不支持js操作加入收藏夹，
	 * - 火狐23之后开始废止window.sidebar因为不是w3c标注 https://bugzilla.mozilla.org/show_bug.cgi?id=691647
	 * - document.all 判断IE不够靠谱，因为现在许多浏览器也实现了document.all吗，并且IE11以后(document.all)为falsy
	 * - 参考 http://stackoverflow.com/questions/10033215/add-to-favorites-button
	 * - IE 中typeof window.external.addFavorite 为'unknown' [http://www.xdarui.com/archives/203.html];
	 */
  	//定义加入收藏夹函数
	function join_favorite(siteUrl, siteName){  
		var siteUrl = siteUrl || window.location;
		var siteName = siteName || document.title;
		
		if(window.external && 'addFavorite' in window.external){ // IE
			window.external.addFavorite(siteUrl, siteName);
		} else if(window.sidebar && window.sidebar.addPanel) { // Firefox23后被弃用
			window.sidebar.addPanel(siteUrl, siteName);
		} else if(window.opera && window.print) { // rel=sidebar，读取a链接的href，title 注：opera也转战webkit内核了
			this.title = siteName;
			return true;
		} else { // webkit - safari/chrome
			alert('浏览器不支持，请 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D 手动添加到收藏夹！');
		}
	}
	
	// 获取url中的参数
	function getUrlParam (name) {
		 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		 var r = window.location.search.substr(1).match(reg);
		 if (r!= null) {
			return decodeURI(r[2]);
		 }else{
			return null;
		 }
	} 