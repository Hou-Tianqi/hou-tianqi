<script setup>
import Hello from './components/Hello.vue';
import MsgBoard from './components/MsgBoard.vue';
import Music from './components/Music.vue';
import { ref } from 'vue'

const agreed = ref(false)

function agreeLocation() {
  agreed.value = true
}
</script>

<template>

<Hello></Hello>


    <!-- 同意按钮区域 -->
    <div v-if="!agreed" class="consent-box">
      <div class="consent-card">
        <p>📍 本留言板会收集您的大致网络位置（城市级别,虽然也不一定准就是了），用于在留言中显示“来自哪里”。</p>
        <p class="consent-hint">我们不会存储您的精确位置或 IP 地址。</p>
        <button @click="agreeLocation" class="consent-btn">我知道了，同意展示大致位置</button>
      </div>
    </div>

    <!-- 留言板：仅当 agreed === true 时才存在 -->
    <MsgBoard v-if="agreed" />



<Music></Music>
<br>
<footer>
  <p style="font-size: 10px;">之所以上面的字体那么大是因为要照顾移动端而我不会写自动缩放之类的</p>
  太好啦我们已经完成了留言板的开发，但是DeepSeek写的
  <a href="https://github.com/hou-tianqi/hou-tianqi" style="display: block; color: gray;">如果你有GitHub账号的话，点此支持一下这个网站</a>
  <p style="margin: 0px;">一个star就可以让我加一个新功能！</p>
</footer>

</template>

<style scoped>
footer{
  font-size: 7px;
  text-align: center;
  color: grey;
}
.consent-box {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.consent-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.consent-card p {
  margin-bottom: 8px;
  font-size: 16px;
  color: #4b5563;
}
.consent-hint {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 16px;
}
.consent-btn {
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}
.consent-btn:hover {
  background: #2563eb;
}
</style>
