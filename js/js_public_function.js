/**
 * @files 常用js函数
 * @description 
 *  version:0.0.1 
 *	date:2017-04-10
 *  author:lx_7
 */
	
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