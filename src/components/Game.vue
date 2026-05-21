<template>
  <div class="flex flex-col items-center justify-center h-screen w-screen">
    <!-- 注意：已移除开始模态框 (Start Modal) -->

    <!-- 过关模态框 -->
    <div class="modal-overlay" :class="{ active: gameStatus === 'success' }">
      <div class="modal-content">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-3xl font-bold text-green-600 mb-2">恭喜过关</h2>
        <p class="text-gray-600 mb-6">太棒了！你完成了第 <span id="success-level-num">{{ currentLevelConfig.level }}</span> 关</p>
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95" @click="nextLevel">
          下一关
        </button>
      </div>
    </div>

    <!-- 失败模态框 -->
    <div class="modal-overlay" :class="{ active: gameStatus === 'fail' }">
      <div class="modal-content">
        <div class="text-6xl mb-4">😢</div>
        <h2 class="text-3xl font-bold text-red-500 mb-2">挑战失败</h2>
        <p class="text-gray-600 mb-6">步数耗尽，未达到目标分数。</p>
        <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95" @click="restartGame">
          重新开始
        </button>
      </div>
    </div>

    <!-- 通关全服模态框 -->
    <div class="modal-overlay" :class="{ active: gameStatus === 'victory' }">
      <div class="modal-content">
        <div class="text-6xl mb-4">🏆</div>
        <h2 class="text-3xl font-bold text-yellow-500 mb-2">通关全服！</h2>
        <p class="text-gray-600 mb-6">你是真正的消消乐大师！</p>
        <button class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95" @click="restartGame">
          再玩一次
        </button>
      </div>
    </div>

    <!-- 游戏主容器 -->
    <main class="w-full max-w-lg px-4 flex flex-col items-center" :class="{ hidden: gameStatus !== 'playing' }" id="game-container">
      <header class="w-full flex justify-between items-center mb-4 gap-2">
        <div class="stat-card">
          <div class="stat-label">关卡</div>
          <div class="stat-value text-purple-600" id="ui-level">{{ currentLevelConfig.level }}</div>
        </div>
        <div class="stat-card flex-1 mx-2">
          <div class="stat-label">目标分数</div>
          <div class="stat-value text-blue-500" id="ui-target">{{ currentLevelConfig.target }}</div>
        </div>
        <div class="stat-card flex-1 mx-2">
          <div class="stat-label">当前分数</div>
          <div class="stat-value text-green-600" id="ui-score">{{ score }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">剩余步数</div>
          <div class="stat-value text-orange-500" id="ui-steps">{{ steps }}</div>
        </div>
      </header>
      
      <div class="h-6 mb-2 text-sm font-bold text-gray-600 opacity-0 transition-opacity" :class="{ 'opacity-100': showMessage }">
        {{ messageText }}
      </div>
      
      <div class="game-grid" id="grid">
        <div 
          v-for="(row, r) in grid" 
          :key="r"
          class="flex"
        >
          <div 
            v-for="(cell, c) in row" 
            :key="c"
            class="cell"
            :class="{
              'selected': selectedCell.r === r && selectedCell.c === c,
              'matched': isMatched(r, c)
            }"
            @click="handleCellClick(r, c)"
          >
            {{ ANIMALS[cell] }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import confetti from 'canvas-confetti';

// --- 游戏配置 ---
const ANIMALS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
const GRID_SIZE = 8;

const LEVELS = [
  { level: 1, steps: 20, target: 500 },
  { level: 2, steps: 20, target: 800 },
  { level: 3, steps: 18, target: 1200 },
  { level: 4, steps: 15, target: 1800 },
  { level: 5, steps: 15, target: 2500 }
];

// --- 响应式状态 ---
// 修改初始状态为 'playing'，跳过开始界面
const gameStatus = ref('playing'); 
const currentLevelIndex = ref(0);
const score = ref(0);
const steps = ref(0);
const selectedCell = ref({ r: null, c: null });
const isProcessing = ref(false);
const matchedCells = ref(new Set()); // 用于追踪消除动画

const grid = ref([]);

// 用于显示浮动消息
const showMessage = ref(false);
const messageText = ref('');

// --- 计算属性 ---
const currentLevelConfig = computed(() => LEVELS[currentLevelIndex.value]);

// --- 核心逻辑方法 ---

// 移除原本的 startGame，直接在组件挂载时初始化
const initGame = () => {
  resetGameData();
  loadLevel(0);
};

const restartGame = () => {
  gameStatus.value = 'playing';
  initGame();
};

const nextLevel = () => {
  gameStatus.value = 'playing';
  loadLevel(currentLevelIndex.value + 1);
};

const resetGameData = () => {
  score.value = 0;
  currentLevelIndex.value = 0;
};

const loadLevel = (index) => {
  if (index >= LEVELS.length) {
    gameStatus.value = 'victory';
    fireConfetti();
    return;
  }
  
  currentLevelIndex.value = index;
  const config = LEVELS[index];
  steps.value = config.steps;
  selectedCell.value = { r: null, c: null };
  isProcessing.value = false;
  
  generateGrid();
};

const generateGrid = () => {
  let newGrid = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    let row = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      row.push(getRandomAnimal());
    }
    newGrid.push(row);
  }
  grid.value = newGrid;

  // 确保初始无匹配
  while (findMatches().length > 0) {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        grid.value[r][c] = getRandomAnimal();
      }
    }
  }
};

const getRandomAnimal = () => {
  return Math.floor(Math.random() * ANIMALS.length);
};

// 处理点击逻辑
const handleCellClick = (r, c) => {
  if (isProcessing.value || steps.value <= 0) return;

  // 取消选中
  if (selectedCell.value.r === r && selectedCell.value.c === c) {
    selectedCell.value = { r: null, c: null };
    return;
  }

  // 选中第一个
  if (selectedCell.value.r === null) {
    selectedCell.value = { r, c };
    return;
  }

  // 尝试交换
  const r1 = selectedCell.value.r;
  const c1 = selectedCell.value.c;
  const isAdjacent = (Math.abs(r1 - r) === 1 && c1 === c) || (Math.abs(c1 - c) === 1 && r1 === r);

  if (isAdjacent) {
    attemptSwap(r1, c1, r, c);
  } else {
    // 选中新的作为第一个
    selectedCell.value = { r, c };
  }
};

const attemptSwap = async (r1, c1, r2, c2) => {
  isProcessing.value = true;
  selectedCell.value = { r: null, c: null };

  // 1. 交换数据
  swapData(r1, c1, r2, c2);

  // 2. 等待视觉更新
  await new Promise(resolve => setTimeout(resolve, 200));

  // 3. 检查匹配
  const matches = findMatches();
  if (matches.length > 0) {
    // 有效移动
    steps.value--;
    await processMatches(matches);
  } else {
    // 无效移动，回退
    swapData(r1, c1, r2, c2);
    showMessage.value = true;
    messageText.value = "无效交换！扣除步数";
    setTimeout(() => showMessage.value = false, 1500);
    steps.value--;
    checkGameStatus();
  }
  isProcessing.value = false;
};

const swapData = (r1, c1, r2, c2) => {
  const temp = grid.value[r1][c1];
  grid.value[r1][c1] = grid.value[r2][c2];
  grid.value[r2][c2] = temp;
};

// 消除与下落逻辑
const findMatches = () => {
  const matchedSet = new Set();
  
  // 水平检查
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 2; c++) {
      const type = grid.value[r][c];
      if (type === grid.value[r][c+1] && type === grid.value[r][c+2]) {
        matchedSet.add(`${r},${c}`);
        matchedSet.add(`${r},${c+1}`);
        matchedSet.add(`${r},${c+2}`);
      }
    }
  }
  
  // 垂直检查
  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE - 2; r++) {
      const type = grid.value[r][c];
      if (type === grid.value[r+1][c] && type === grid.value[r+2][c]) {
        matchedSet.add(`${r},${c}`);
        matchedSet.add(`${r+1},${c}`);
        matchedSet.add(`${r+2},${c}`);
      }
    }
  }
  
  return Array.from(matchedSet).map(str => {
    const [r, c] = str.split(',').map(Number);
    return { r, c };
  });
};

const isMatched = (r, c) => {
  return matchedCells.value.has(`${r},${c}`);
};

const processMatches = async (matches) => {
  // 添加到消除集合以触发动画
  matches.forEach(({r, c}) => {
    matchedCells.value.add(`${r},${c}`);
  });

  // 计算分数
  const points = matches.length * 10;
  score.value += points;

  // 等待动画完成
  await new Promise(resolve => setTimeout(resolve, 300));

  // 从数据中移除 (-1 表示空)
  matches.forEach(({r, c}) => {
    grid.value[r][c] = -1;
  });

  // 应用重力（下落）
  applyGravity();
  matchedCells.value.clear(); // 清除动画状态

  // 检查连消
  const newMatches = findMatches();
  if (newMatches.length > 0) {
    await processMatches(newMatches);
  } else {
    checkGameStatus();
  }
};

const applyGravity = () => {
  for (let c = 0; c < GRID_SIZE; c++) {
    let emptySlots = 0;
    // 从底部向上扫描
    for (let r = GRID_SIZE - 1; r >= 0; r--) {
      if (grid.value[r][c] === -1) {
        emptySlots++;
      } else if (emptySlots > 0) {
        grid.value[r + emptySlots][c] = grid.value[r][c];
        grid.value[r][c] = -1;
      }
    }
    // 填充顶部
    for (let r = 0; r < emptySlots; r++) {
      grid.value[r][c] = getRandomAnimal();
    }
  }
};

// 游戏状态检查
const checkGameStatus = () => {
  const config = LEVELS[currentLevelIndex.value];
  if (score.value >= config.target) {
    // 过关
    setTimeout(() => {
      if (currentLevelIndex.value === LEVELS.length - 1) {
        gameStatus.value = 'victory';
        fireConfetti();
      } else {
        gameStatus.value = 'success';
        fireConfetti();
      }
    }, 500);
  } else if (steps.value <= 0) {
    // 失败
    setTimeout(() => {
      gameStatus.value = 'fail';
    }, 500);
  }
};

// 庆祝特效
const fireConfetti = () => {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };
  const fire = (particleRatio, opts) => {
    confetti(Object.assign({}, defaults, opts, { 
      particleCount: Math.floor(count * particleRatio) 
    }));
  };
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

// --- 生命周期 ---
onMounted(() => {
  // 组件挂载后直接初始化游戏，不再显示开始弹窗
  initGame();
});
</script>

<style scoped>
/* 自定义样式 & 动画 */
:root {
  /* 还原为原始尺寸 */
  --cell-size: clamp(35px, 10vmin, 60px);
  --gap-size: 4px;
  --board-padding: 10px;
  --anim-speed: 0.3s;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  height: 100vh;
  overflow: hidden;
  touch-action: manipulation;
  user-select: none;
}

/* 游戏板网格 */
.game-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: var(--gap-size);
  width: fit-content;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.5);
  padding: var(--board-padding);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}

.cell {
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--cell-size) * 0.65); 
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s, opacity 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
}

.cell:hover {
  transform: scale(1.05);
}

.cell.selected {
  background-color: #bfdbfe;
  box-shadow: 0 0 0 3px #3b82f6;
  transform: scale(1.1);
  z-index: 10;
}

.cell.matched {
  animation: popOut 0.3s forwards;
}

@keyframes popOut {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(0); opacity: 0; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* 模态框样式 (保持不变) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(20px);
  transition: transform 0.3s;
}

.modal-overlay.active .modal-content {
  transform: translateY(0);
}

/* 浮动文字 */
.floating-text {
  position: absolute;
  font-weight: bold;
  font-size: 1.2rem;
  color: #ef4444;
  pointer-events: none;
  animation: floatUp 1s forwards;
  z-index: 20;
  text-shadow: 1px 1px 0 #fff;
}

@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-30px) scale(1.2); opacity: 0; }
}

/* 工具类 */
.hidden {
  display: none !important;
}

.stat-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  text-align: center;
  min-width: 80px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #334155;
}
</style>