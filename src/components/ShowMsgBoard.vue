<script setup>
import MsgBoard from './MsgBoard.vue';
import { ref } from 'vue'

const agreed = ref(false)

function agreeLocation() {
  agreed.value = true
}
</script>

<template>
    <div v-if="!agreed" class="consent-box">
      <div class="consent-card">
        <p>📍 本留言板会收集您的大致网络位置（城市级别,虽然也不一定准就是了），用于在留言中显示“来自哪里”。</p>
        <p class="consent-hint">我们不会存储您的精确位置或 IP 地址。</p>
        <button @click="agreeLocation" class="consent-btn">我知道了，同意展示大致位置</button>
      </div>
    </div>
    <MsgBoard v-if="agreed" />
</template>

<style scoped>
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