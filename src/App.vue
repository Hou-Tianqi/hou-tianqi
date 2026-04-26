<script setup>
import Hello from './components/Hello.vue'
</script>

<template>
<div id="bg">
<Hello id="hi"></Hello>
<div id="th">
<p>如果你有Github账号，请给这个项目一个Star，如果star超过3个，我就加留言功能</p>
<a href="https://github.com/Hou-Tianqi/hou-tianqi" id="re" target="_blank">点此访问本网页的GitHub仓库（可能需要加速器）</a>
<p>如果你没有GitHub账号的话，就赶快去注册一个</p>
<p>😭骗你的点不到3个star也得加</p>
</div>
</div>
<!--🤫如果你是看到了源码的人（很少可能会看到）你接下来一年里都会好运爆棚-->
</template>

<style>
/*CSS写得一坨*/
#bg{
  position: relative;
  left:-10px;
  top:-20px;
  width: 102%;
  background: linear-gradient(rgb(189, 248, 159),white);
}
#th{
  font-size: 7px;
  text-align: center;
  color: grey;
}
#re{
  display: inline-block;
  color: gray;
}
#hi{
  text-align: left;
}
</style>
