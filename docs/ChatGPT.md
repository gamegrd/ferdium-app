请给我写一个bash,功能是把build目录复制到一批目标。，具体如下
1. 接收一个列表，discord github google-voice instagram linkedin telegram tiktok tweetdeck twitter-dm wetalk zalo facebook gmail hangoutschat line messenger textrteam tinder twitter wechat whatsapp 
2. 循环把列表中的每一项目拼接到 ./recipes/recipes/ 之后，得复制target路径 
3. 使用 cp -rp 把 ./build 的内容复制到刚刚拼接出来的目录之内