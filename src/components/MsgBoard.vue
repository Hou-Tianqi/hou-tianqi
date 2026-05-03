<template>
  <div class="message-board">
    <h2 style="font-size:40px;">💬 留言板</h2>

    <!-- 留言表单 -->
    <form @submit.prevent="submitMessage" class="msg-form">
      <input
        v-model="nickname"
        type="text"
        placeholder="你的昵称（最多20字）"
        maxlength="20"
        required
        class="nickname-input"
      />
      <textarea
        v-model="content"
        placeholder="说点什么吧（最多500字）"
        maxlength="500"
        rows="4"
        required
        class="content-input"
      ></textarea>
      <button type="submit" :disabled="submitting" class="submit-btn">
        {{ submitting ? '提交中...' : '发布留言' }}
      </button>
    </form>

    <!-- 错误提示 -->
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

    <!-- 留言列表 -->
    <div class="msg-list">
      <div v-for="msg in messages" :key="msg.id" class="msg-item">
        <div class="msg-header">
          <span class="msg-nickname">{{ msg.nickname }}</span>
          <span class="msg-time">{{ formatTime(msg.created_at) }}</span>
        </div>
        <p class="msg-content">{{ msg.content }}</p>
      </div>
      <p v-if="messages.length === 0 && !loading" class="empty-tip">
        还没有留言，来抢沙发吧～
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 根据你的部署地址改这里
const API_BASE = '/api/msg'

const messages = ref([])
const nickname = ref('')
const content = ref('')
const errorMsg = ref('')
const submitting = ref(false)
const loading = ref(false)

// 获取留言列表
async function fetchMessages() {
  loading.value = true
  try {
    const res = await fetch(API_BASE)
    console.log('API 响应状态:', res.status)  // 👈 加这行
    const data = await res.json()
    console.log('拿到的数据:', data)  // 👈 加这行
    messages.value = data
  } catch (e) {
    console.error('请求出错:', e)  // 👈 加这行
    errorMsg.value = '加载留言失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

// 提交留言
async function submitMessage() {
  errorMsg.value = ''
  submitting.value = true
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: nickname.value.trim(),
        content: content.value.trim()
      })
    })
    const data = await res.json()
    
    if (!res.ok) {
      errorMsg.value = data.error || '提交失败'
      return
    }

    // 提交成功，清空表单，重新拉取列表
    content.value = ''
    await fetchMessages()
  } catch (e) {
    errorMsg.value = '网络错误，请稍后再试'
  } finally {
    submitting.value = false
  }
}

// 格式化时间
function formatTime(dateStr) {
  const d = new Date(dateStr)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

onMounted(fetchMessages)
</script>

<style scoped>
.message-board {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
}

.msg-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.nickname-input {
  padding: 10px;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.content-input {
  padding: 10px;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  font-family: inherit;
}

.submit-btn {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
}

.submit-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.error-msg {
  color: #ef4444;
  margin-bottom: 12px;
}

.msg-list {
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.msg-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.msg-nickname {
  font-weight: bold;
  color: #3b82f6;
}

.msg-time {
  color: #999;
  font-size: 12px;
}

.msg-content {
  color: #333;
  line-height: 1.6;
  word-break: break-all;
}

.empty-tip {
  text-align: center;
  color: #999;
  padding: 30px 0;
}
</style>