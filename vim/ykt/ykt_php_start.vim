"快速载入
if !exists("s:did_load")
        echo 'yktFun_load'
        command! -nargs=* Ykttest :call s:Ykt_Test(<f-args>)
        command! -nargs=* Yktphp :call s:Ykt_Start(<f-args>)
        command! -nargs=* Yktcut :call s:Ykt_Cut(<f-args>)
        let s:did_load = 1
        exe 'au FuncUndefined Ykt_* source ' . expand('<sfile>')
        finish
endif

function! s:Ykt_Test(...)
    unlet yktFun_load
    if exists("s:did_load")
        unlet s:did_load
    endif
    echo 'clean: s:did_load'
endfunction

function! s:Ykt_Start(...)
    let l:type = 'web'
    if exists("a:1")
        let l:type=a:1
    endif

    :args *.php
    exe 'argdo %s/href="css/href="\/'.l:type.'\/css/ge | update'
    exe 'argdo %s/src="images/src="\/'.l:type.'\/images/ge | update'
    exe 'argdo %s/href="\(.\{-}\).html"/href="\/\1"/ge | update'
    exe 'argdo %s/background:url(images/background:url(\/'.l:type.'\/images/ge | update'
    exe 'argdo %s/src="js/src="\/'.l:type.'\/js/ge | update'
    :argdo set fileencoding=utf-8 | update
    :argdo set nobomb | update
endfunction

function! s:Ykt_Cut(...)
    zR/class="nav-other"
    ditdggO<?php
        $dbc = $GLOBALS['dbc'];
        $cssStr = '';
        $headerArr = array('seo'=>'', 'seoStr'=>'', 'cssStr'=>$cssStr);
        load_view('/web/inc/header', $headerArr);
    ?>
    /class="foot-last"
    datO<?php load_view('/web/inc/footer'); ?>

endfunction

" 文件保存后配置立即生效
"autocmd! BufWritePost E:\ZhangTao\personalgit\public_data\vim\ykt\ source %
