// 注意：每次调用$.get()、$.post() 或者 $.ajax()的时候
// 会首先调用ajaxPrefilter()函数
// 在这个函数中 我们可以拿到Ajax({})中的所有配置对象/选项
$.ajaxPrefilter(function (options) {
   options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

   // 统一为有权限的接口，设置 headers 请求头
   if (options.url.indexOf('/my/') !== -1) {
      options.headers = {
         Authorization: localStorage.getItem('token') || ''
      }

      // 优化权限控制的代码   
      // 控制用户的访问权限,除了登录注册页面，其他的页面都需要控制用户访问其他页面的权利，
      // 所以在每次发送ajax请求的时候，先调用ajaxprefilter()函数，预过滤
      // 不论成功还是失败，最终都会调用 complete 回调函数
      options.complete = function (res) {
         // console.log(res);
         // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
         if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.强制(清空)本地存储的token，  以防假token
            localStorage.removeItem('token');
            // 2.强制跳转到登录页面
            location.href = '/login.html';
         }
      }
   }
})