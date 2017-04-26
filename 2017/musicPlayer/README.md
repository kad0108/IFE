## MusicPlayer [demo](https://kad0108.github.io/IFE/2017/musicPlayer/)

请求网易云音乐API，但受CORS跨域资源请求限制，获取音频资源用于可视化之后，资源无法播放，所以将音频资源放在了本地。

但是！放本地的音频文件就无法修改currentTime，网上说是和服务器的response header有关，还在找解决办法。


### Tips

* 获取网易云音乐歌单信息
```
http://music.163.com/api/playlist/detail?id=448822993
```

* [textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)

* Audio对象
```
方法：

load 加载

play 播放

pause 暂停

属性：

currentTime 获取和设置已播放的事件，以s秒为单位

autoplay 是否自动播放

loop 是否循环播放

controls 是否显示控制面板

muted 是否静音

paused 是否暂停，只读属性

volume 调节音量，0~1

duration 获取媒体文件总时长，以s秒为单位

ended 媒体文件播放完毕返回true

startTime 起始播放时间
```

