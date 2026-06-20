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
<h2 style="font-size: 35px;">这是我刚学Blender做出来的一个红温表情包动画，感觉挺有意思的，就放这了</h2><br>
<img src="../public/我已红温.gif" alt="啊哦，加载失败">
</div>

<h1 style="text-align: center;font-size: 60px;">下面是我做的一些其它网站，也可以看看……</h1>
<div id="a_card">
<a href="https://tianqi-wall.pages.dev" class="better_a card" id="wall">？！墙墙！？</a>
<a href="https://mc-card.pages.dev" class="better_a card">MC玩家的居民身份证</a>
</div>
</template>

<style scoped>
#a_card{
    display: flex;
    justify-content: space-around;
}
</style>
