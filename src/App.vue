<script setup>
import Hello from './components/Hello.vue';
import ShowMsgBoard from './components/ShowMsgBoard.vue';
import Music from './components/Music.vue';

</script>

<template>

<Hello/>
<ShowMsgBoard/>
<Music/>
<br>
<footer>
  <p style="font-size: 10px;">之所以上面的字体那么大是因为要照顾移动端而我不会写自动缩放之类的</p>
  太好啦我们已经完成了留言板的开发，但是DeepSeek写的
</footer>
<ul>
  <h1 style="font-size: 100px;">以防你不知道：</h1>
  <li><table>
    <th>阿默斯特学院有核弹掩体吗？</th>
    <tr>
      <td>你所期望的答案：</td>
      <td>没有</td>
    </tr>
    <tr>
      <td>实际上：</td>
      <td>有</td>
    </tr>
  </table></li>
  <li><table>
    <th>维基百科中文网能在中国直接访问吗？</th>
    <tr>
      <td>你所期望的答案：</td>
      <td>能</td>
    </tr>
    <tr>
      <td>实际上：</td>
      <td>不能</td>
    </tr>
    </table></li>
</ul>
</template>

<style scoped>
footer{
  font-size: 7px;
  text-align: center;
  color: grey;
}
td,
th{
  font-size: 30px;
}
</style>
