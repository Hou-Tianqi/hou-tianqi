<template>
<div id="music">
<p>来两首首我最喜欢的歌吧 </p>
<p>1、河南<span class="onshow">焦作</span></p>
<audio controls>
  <source src="../../public/3.mp3" type="audio/mpeg">
  啊哦，播放失败了
</audio>
<p>2、河南<span class="onshow">说唱之神</span></p>
<audio controls>
  <source src="../../public/4.mp3" type="audio/mpeg">
  啊哦，播放失败了
</audio>
</div>
</template>

<style scoped>
#music{
  text-align: center;
  font-size: 28px;
}
.onshow{
  background: black;
  color: black;
  border-radius: 10px;
}
.onshow:hover{
  color: white;
  cursor: pointer;
}
</style>