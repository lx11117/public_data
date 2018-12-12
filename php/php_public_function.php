<?php
function filter_jsonStr($document){
    $search = array ("'<script[^>]*?>.*?</script>'si",  // 去掉 javascript
                  "'<[\/\!]*?[^<>]*?>'si",           // 去掉 HTML 标记
                  "'([\r\n])[\s]+'",                 // 去掉空白字符
                  "'&(quot|#34);'i",                 // 替换 HTML 实体
                  "'&(amp|#38);'i",
                   "'&(lt|#60);'i",
                   "'&(gt|#62);'i",
                  "'&(nbsp|#160);'i",
                  "'&(iexcl|#161);'i",
                  "'&(cent|#162);'i",
                   "'&(pound|#163);'i",
                 "'&(copy|#169);'i",
                  "'&#(\d+);'e");                    // 作为 PHP 代码运行
 
 $replace = array ("",
                    "",
                    "\\1",
                  "\"",
                   "&",
                   "<",
                   ">",
                    " ",
                  chr(161),
                   chr(162),
                   chr(163),
                    chr(169),
                    "chr(\\1)");
 
  $text = preg_replace ($search, $replace, $document);
    return $text;
}

/**
  * 对数据进行编码转换
  * @param array/string $data 数组/字符串
  * @param string $output 转换后的编码
  */
function array_iconv($data, $output = 'utf-8') {
    $encode_arr = array('ASCII','GB2312','GBK','BIG5','JIS','eucjp-win','sjis-win','EUC-JP','UTF-8');
    $encoded = mb_detect_encoding($data, $encode_arr);
    if (!is_array($data)) {
        return mb_convert_encoding($data, $output, $encoded);
    }  else {
        foreach ($data as $key=>$val) {
            $key = array_iconv($key, $output);
            if(is_array($val)) {
                $data[$key] = array_iconv($val, $output);
            } else {
                $data[$key] = mb_convert_encoding($data, $output, $encoded);
            }
        }
        return $data;
    }
}

/**
 * remove control characters (for json)
 * @param $str
 * @return mixed
 */
function strip_control_characters($str){
	return preg_replace('/[\x00-\x1F\x7F-\x9F]/u', '', $str);
}
