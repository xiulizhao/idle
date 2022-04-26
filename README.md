# idle
用于监测页面在规定的时间内无操作发生的事件<br>
控制属性<br>
data--awaytimeout	可以自定义设置页面无操作的时间	如：6000代表页面无操作6秒处理动作<br>
输出属性<br>
data-x-state	监测页面无操作的处理的动作	data-x-state:idle离开了、busy回来了、shown现在正在看页面、invisble现在没有看页面<br>
发出事件<br>
idle	在无页面操作离开所出发的动画效果	事件带着的数据
