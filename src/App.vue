<script setup>
import Hello from './components/Hello.vue';
import ShowMsgBoard from './components/ShowMsgBoard.vue';

import DidYouKnow from './components/DidYouKnow.vue';
</script>

<template>

<Hello/>
<DidYouKnow/>
<ShowMsgBoard/>

<div style="text-align: center;">
<h2>这是我刚学Blender做出来的一个红温表情包动画，感觉挺有意思的，就放这了</h2><br>
<img src="../public/我已红温.gif" alt="啊哦，加载失败">
</div>

<br>
<footer>
  <p style="font-size: 10px;">之所以上面的字体那么大是因为要照顾移动端而我不会写自动缩放之类的</p>
  太好啦我们已经完成了留言板的开发，但是DeepSeek写的
</footer>
</template>

<style scoped>
footer{
  font-size: 7px;
  text-align: center;
  color: grey;
}
</style>
