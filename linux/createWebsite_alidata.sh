#!/bin/bash
# Description: create website for nginx_phpMultiVersionIMG iso
# Date: 2018-12-06

websiteDir='/alidata/www/'
nginxDir='/alidata/server/nginx/conf/'
nginxLog='/alidata/log/nginx/access/default.log'

createDirFun(){

    if [ ! -d $1 ]; then
        mkdir $1
    else
       echo $1 'already exists'
    fi

    if [ $# -gt 1 ]; then
        chown $2:$2 $1
        chmod 755 $1
    fi
}

createYKTRewriteFun(){
   rewriteFile=$1'rewrite/ykt.conf'
   if [ ! -f $rewriteFile ]; then
       createDirFun $1'rewrite'
       cat>$rewriteFile<<-EOF
          location /{
              if (!-e \$request_filename){
                   rewrite ^(.*) /index.php?\$1;
              }
          }
	EOF
   else
       echo $rewriteFile 'already exists'
   fi 
}

createWebsiteConfFun(){
   webConfFile=$1'vhosts/'$2'.conf'
   rewriteFile=$1'rewrite/ykt.conf'
   if [ ! -f $webConfFile ]; then
       cat>$webConfFile<<-EOF
server {
  listen 80;
  server_name $2;
  access_log $nginxLog combined;
  index index.html index.htm index.php;
  root $websiteDir$2;

  include $rewriteFile;
  #error_page 404 /404.html;
  #error_page 502 /502.html;

  location ~ [^/]\.php(/|\$) {
    #fastcgi_pass unix:/tmp/php-cgi.sock;
    #fastcgi_pass 127.0.0.1:9000;
    fastcgi_index index.php;
    include fastcgi.conf;
  }

  location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|flv|mp4|ico)\$ {
    expires 30d;
    access_log off;
  }
  location ~ .*\.(js|css)?\$ {
    expires 7d;
    access_log off;
  }
  location ~ /\.ht {
    deny all;
  }
}
	EOF
   else
       echo $rewriteFie 'already exists'
   fi 
}

while getopts ":n:N:C" opt
do
    case $opt in
        n)
            createDirFun $websiteDir$OPTARG".wanxikeji.cn" www
            createYKTRewriteFun $nginxDir
            createWebsiteConfFun $nginxDir $OPTARG".wanxikeji.cn"
	    ;;
        N)
            createDirfun $websiteDir$OPTARG www
            createYKTRewriteFun $nginxDir
            createWebsiteConfFun $nginxDir $OPTARG
	    ;;
        ?)
            echo 'use -n websitename|-N websitefullname'
            exit 1
	    ;;
    esac
done

if [ $# -eq 0 ]; then
    echo 'use -n websitename|-N websitefullname'
fi

exit 1
