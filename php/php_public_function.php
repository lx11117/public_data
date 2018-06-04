<?php
function filter_jsonStr($document){
    $search = array ("'<script[^>]*?>.*?</script>'si",  // 去掉 javascript
08                   "'<[\/\!]*?[^<>]*?>'si",           // 去掉 HTML 标记
09                   "'([\r\n])[\s]+'",                 // 去掉空白字符
10                   "'&(quot|#34);'i",                 // 替换 HTML 实体
11                   "'&(amp|#38);'i",
12                   "'&(lt|#60);'i",
13                   "'&(gt|#62);'i",
14                   "'&(nbsp|#160);'i",
15                   "'&(iexcl|#161);'i",
16                   "'&(cent|#162);'i",
17                   "'&(pound|#163);'i",
18                   "'&(copy|#169);'i",
19                   "'&#(\d+);'e");                    // 作为 PHP 代码运行
20  
21  $replace = array ("",
22                    "",
23                    "\\1",
24                    "\"",
25                    "&",
26                    "<",
27                    ">",
28                    " ",
29                    chr(161),
30                    chr(162),
31                    chr(163),
32                    chr(169),
33                    "chr(\\1)");
34  
35  $text = preg_replace ($search, $replace, $document);
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
