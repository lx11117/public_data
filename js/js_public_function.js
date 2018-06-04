/**
 * @files 常用js函数
 * @description 
 *  version:0.0.3 
 *  date:2017-06-30
 *  author:lx_7
 */
    
    
    //js批量注册事件,循环注册 或 采用委托的方式:
    //所谓的委托就是将自己的事情委托给父元素处理，利用的是事件冒泡原理
    
    //当然，事件委托也是有一定局限性的；
    //比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；
    //mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；    
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
    
     // ============ 简单的事件委托
    function delegateEvent(interfaceEle, selector, type, fn) {
    
        if(interfaceEle.addEventListener){
        interfaceEle.addEventListener(type, eventfn);
        }else{
        interfaceEle.attachEvent("on"+type, eventfn);
        }
         
        function eventfn(e){
        var e = e || window.event;    
        var target = e.target || e.srcElement;
        //如果目标元素与选择器匹配则执行函数
        if (matchSelector(target, selector)) {
                if(fn) {
     //将fn内部的this指向target（在此之前this都是指向的绑定事件的元素即interfaceEle）
                    fn.call(target, e); 
                }
            }
        }
    }
    
     /**
     * only support #id, tagName, .className
     * and it's simple single, no combination
     */
    //比较函数：判断事件的作用目标是否与选择器匹配；匹配则返回true
    function matchSelector(ele, selector) {
        // 如果选择器为ID
        if (selector.charAt(0) === "#") {            
            return ele.id === selector.slice(1);   
        }
          //charAt(0),返回索引为0的字符
        //slice(a，b),从已有的数组或字符串返回从索引从a处开始，截取到索引b之前的子数组或子字符串；
        //如果选择器为Class
        if (selector.charAt(0) === ".") {
            return (" " + ele.className + " ").indexOf(" " + selector.slice(1) + " ") != -1;
        }
        // 如果选择器为tagName//toLowerCase()将字符串转换成小写
        return ele.tagName.toLowerCase() === selector.toLowerCase();
    }
    
    // ============ 事件委托
    function eventDelegate (parentSelector, targetSelector, events, foo) {
      // 触发执行的函数
      function triFunction (e) {
        // 兼容性处理
        var event = e || window.event;
    
        // 获取到目标阶段指向的元素
        var target = event.target || event.srcElement;
    
        // 获取到代理事件的函数
        var currentTarget = event.currentTarget;
    
        // 处理 matches 的兼容性
        if (!Element.prototype.matches) {
          Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
              var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
              while (--i >= 0 && matches.item(i) !== this) {}
              return i > -1;            
            };
        }
    
        // 遍历外层并且匹配
        while (target !== currentTarget) {
          // 判断是否匹配到我们所需要的元素上
          if (target.matches(targetSelector)) {
            var sTarget = target;
            // 执行绑定的函数，注意 this
            foo.call(sTarget, Array.prototype.slice.call(arguments))
          }
    
          target = target.parentNode;
        }
      }
    
      // 如果有多个事件的话需要全部一一绑定事件
      events.split('.').forEach(function (evt) {
        // 多个父层元素的话也需要一一绑定
        Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function ($p) {
          $p.addEventListener(evt, triFunction);
        });
      });
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
    
    //显示时间
    function showTime(time) {
        var currentTime = getLocalTime();
        var showStr = time;
        if(time.substr(0,10)==currentTime.substr(0,10)){
            //当天
            showStr = time.substr(11,5);
        }else if(time.substr(0,4)==currentTime.substr(0,4)){
            //今年
            showStr = time.substr(5,11);
        }else{
            //早些年月
            showStr = time;
        }
        return showStr;
    }

    //小于10则加0组成两位数
    function checkTime(i) {
        if (i<10) {
            i="0" + i;
        }
        return i;
    }

    //php时间戳转换为日期
    function getLocalTime() {
        if(!arguments[0]){
            var mydate = new Date();
        }else{
            var mydate = new Date(parseInt(arguments[0]) * 1000);
        }
        var y = checkTime(mydate.getFullYear());
        var m = checkTime(mydate.getMonth()+1);
        var d = checkTime(mydate.getDate());
        var hh = checkTime(mydate.getHours());
        var mm = checkTime(mydate.getMinutes());
        var ss = checkTime(mydate.getSeconds());
        var myday = y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss;
        return myday;
    }
    
    //兼容性写法,兼容IE6～8
    //indexOf()方法 返回根据给定元素找到的第一个索引值，否则返回-1
    //array.indexOf(searchElement[, fromIndex = 0])
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(ele) {
            // 获取数组长度
            var len = this.length;
            // 检查值为数字的第二个参数是否存在，默认值为0
            var fromIndex = Number(arguments[1]) || 0;
            // 当第二个参数小于0时，为倒序查找，相当于查找索引值为该索引加上数组长度后的值
            if(fromIndex < 0) {
                fromIndex += len;
            }
            // 从fromIndex起循环数组
            while(fromIndex < len) {
                // 检查fromIndex是否存在且对应的数组元素是否等于ele
                if(fromIndex in this && this[fromIndex] === ele) {
                    return fromIndex;
                }
                fromIndex++;
            }
            // 当数组长度为0时返回不存在的信号：-1
            if (len === 0) {
                return -1;
            }
        }
    }
    
    //forEach() 方法让数组的每一项都执行一次给定的函数。forEach()方法会修改原数组。
    //array.forEach(function callback(currentValue,index,arr)[, thisArg])
    if ( !Array.prototype.forEach) {
      Array.prototype.forEach = function forEach(callback) {
          // 获取数组长度
        var len = this.length;
        if(typeof callback != "function") {
            throw new TypeError();
        }
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[1];
        for(var i = 0; i < len; i++) {
            if(i in this) {
                // callback函数接收三个参数：当前项的值、当前项的索引和数组本身
                callback.call(thisArg, this[i], i, this);
            }
        }
      }
    }
    
    //map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
    //array.map(callback[, thisArg])
    if (!Array.prototype.map) {
      Array.prototype.map = function(callback) {
          // 获取数组长度
          var len = this.length;
          if(typeof callback != "function") {
              throw new TypeError();
          }
          // 创建跟原数组相同长度的新数组，用于承载经回调函数修改后的数组元素
          var newArr = new Array(len);
          // thisArg为callback 函数的执行上下文环境
          var thisArg = arguments[1];
          for(var i = 0; i < len; i++) {
              if(i in this) {
                  newArr[i] = callback.call(thisArg, this[i], i, this);
              }
          }
          return newArr;
      }    
    }
    
    //filter() 方法利用所有通过指定函数测试的元素创建一个新的数组，并返回。
    //arr.filter(callback[, thisArg])
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(callback) {
          // 获取数组长度
          var len = this.length;
          if(typeof callback != "function") {
              throw new TypeError();
          }
          // 创建新数组，用于承载经回调函数修改后的数组元素
          var newArr = new Array();
          // thisArg为callback 函数的执行上下文环境
          var thisArg = arguments[1];
          for(var i = 0; i < len; i++) {
              if(i in this) {
                  if(callback.call(thisArg, this[i], i, this)) {
                      newArr.push(val);
                  }
              }
          }
          return newArr;
      }
    }
    
    //some() 方法测试数组中的某些元素是否通过了指定函数的测试。返回布尔值。some() 被调用时不会改变数组。
    //arr.some(callback[, thisArg])
    if (!Array.prototype.some) {
      Array.prototype.some = function(callback) {
          // 获取数组长度
          var len = this.length;
          if(typeof callback != "function") {
              throw new TypeError();
          }
          // thisArg为callback 函数的执行上下文环境
          var thisArg = arguments[1];
          for(var i = 0; i < len; i++) {
              if(i in this && callback.call(thisArg, this[i], i, this)) {
                  return true;
              }
          }
          return false;
      }
    }
    
    //every() 方法测试数组的所有元素是否都通过了指定函数的测试。every() 不会改变原数组。
    //arr.every(callback[, thisArg])
    if (!Array.prototype.every) {
      Array.prototype.every = function(callback) {
          // 获取数组长度
          var len = this.length;
          if(typeof callback != "function") {
              throw new TypeError();
          }
          // thisArg为callback 函数的执行上下文环境
          var thisArg = arguments[1];
          for(var i = 0; i < len; i++) {
              if(i in this && !callback.call(thisArg, this[i], i, this)) {
                  return false;
              }
          }
          return true;
      }
    }