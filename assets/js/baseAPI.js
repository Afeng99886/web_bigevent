// 注意：每次调用$.get()、$.post() 或者 $.ajax()的时候
// 会首先调用ajaxPrefilter()函数
// 在这个函数中 我们可以拿到Ajax({})中的所有配置对象/选项
$.ajaxPrefilter(function (options) {
   options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})