/**
 * @files js表单项验证
 * @description 
 *  version:0.0.0 
 *	date:2017-06-02
 *  author:lx_7
 */
 	
	
	//验证固定电话的正则表达式：`/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/`，所以具体JS代码如下所示：
    function checkPhone(phone) {
        if (phone != '') {
            var pattern=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            if(pattern.test(phone) == false) {
                alert("请正确填写办公电话!");
                return false;
            } else{
                return true;
            }
        }
    }
	
	//验证手机号码的正则表达式：`/^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/`，具体JS代码如下所示：
    function checkMobile(mobile) {
        if (mobile != '') {
            var pattern=/^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
            if(pattern.test(mobile) == false) {
                alert("请正确填写手机号码!");
                return false;
            } else{
                return true;
            }
        }
    }
	
	//身份证验证
	function checkIdCard(idcard) {
		if(!!idcard){
			//var tex = this; 
			var num = idcard; 
			//alert("您输入的身份证号码是：\n" + num); 
			num = num.toUpperCase();   
			//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。    
			if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)))    
			{  
				alert('输入的身份证号长度不对，或者号码不符合规定！\n身份证号码为15位时，应全为数字，\n身份证号码为18位时，末位可以为数字或X。'); 
			//  tex.value=''; 
			//	tex.focus(); 
				return false;  
			}  
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。  
			//下面分别分析出生日期和校验位  
			var len, re;  
			len = num.length; 
			 
			//当身份证为15位时的验证出生日期。 
			if (len == 15)  
			{  
				re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);  
				var arrSplit = num.match(re);  
	
				//检查生日日期是否正确  
				var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);  
				var bGoodDay;  
				bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));  
				if (!bGoodDay){  
					alert('输入的15位身份证号里出生日期不对！');    
				   // tex.value=''; 
					//tex.focus(); 
					return false;  
				}  
				else{ 
				//将15位身份证转成18位  
				//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。  
					//var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);  
					//var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  
					//var nTemp = 0, i;    
					//num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);  
					//for(i = 0; i < 17; i ++){  
					//  nTemp += num.substr(i, 1) * arrInt[i];  
					//}  
					//num += arrCh[nTemp % 11];  
					//alert("该15位身份证对应的18位是：" + num); 
					//return num;    
				}    
			}  
			 
			//当身份证号为18位时，校验出生日期和校验位。 
			if (len == 18)  
			{  
				var year = num.substr(6,4); 
				//alert("year是：" + year); 
				var nowDate = new Date(); 
				var nowYear = nowDate.getYear(); 
				if((nowYear - year) > 112){ 
					alert("依照输入的身份证出生日期截止到当前，你已经超过112岁！"); 
				   // tex.value=''; 
					//tex.focus(); 
					return false; 
				} 
	
				re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);  
				var arrSplit = num.match(re);  
	
				//检查生日日期是否正确  
				var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);  
				var bGoodDay;  
				bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));  
				if (!bGoodDay){  
					//alert(dtmBirth.getYear());  
					//alert(arrSplit[2]);  
					alert('输入的18位身份证号里出生日期不对！');  
				   // tex.value=''; 
					//tex.focus(); 
					return false;  
				}  
				else{  
					//检验18位身份证的校验码是否正确。  
					//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。  
					var valnum;  
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);  
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  
					var nTemp = 0, i;  
					for(i = 0; i < 17; i ++){  
						nTemp += num.substr(i, 1) * arrInt[i];  
					}  
					valnum = arrCh[nTemp % 11];  
					if (valnum != num.substr(17, 1)){  
						alert('18位身份证的最后一位校验码不正确！'); //应该为：' + valnum 
					   // tex.value=''; 
						//tex.focus(); 
						return false;  
					}  
					//return num;  
				}  
			}  
			 
			//验证地区是否有效 
			var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "} 
			if(aCity[parseInt(num.substr(0,2))] == null){ 
				alert("输入的身份证号前两位地区不对！"); 
				//tex.value=''; 
				//tex.focus(); 
				return false; 
			}
			
			return true; 
			
		}
	}
	
	