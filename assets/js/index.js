$(function () {
   getUserInfo();
})

// 封装获取用户基本信息  getUserInfo 函数
function getUserInfo() {
   $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      // headers是请求头配置对象
      // headers: {
      //    Authorization: localStorage.getItem('token') || ''
      // },
      success: function (res) {
         // console.log(res);
         if (res.status !== 0) {
            return layui.layer.msg('获取用户基本信息失败！');
         }

         // 调用 renderAvatar 渲染用户头像和用户信息
         renderAvatar(res.data);
      },
      //  控制用户的访问权限,除了登录注册页面，其他的页面都需要控制用户访问其他页面的权利，
      // 所以在每次发送ajax请求的时候，先调用ajaxprefilter()函数，预过滤
      // 不论成功还是失败，最终都会调用 complete 回调函数
      /* complete: function (res) {
         // console.log(res);
         // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
         if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.强制(清空)本地存储的token，  以防假token
            localStorage.removeItem('token');
            // 2.强制跳转到登录页面
            location.href = '/login.html';
         }
      } */
   })
}


// 渲染用户头像/用户名
function renderAvatar(userData) {
   // 1.获取用户名
   var name = userData.nickname || userData.username;
   // 2.设置欢迎文本
   $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
   // 按需渲染用户的头像
   if (userData.user_pic !== null) {
      // 设置用户图片头像
      $('.layui-nav-img').attr('src', userData.user_pic).show();
      $('.text-avatar').hide();
   } else {
      // 设置文本头像
      $('.layui-nav-img').hide();
      // console.log(name[0]);  // w
      var first = name[0].toUpperCase();
      $('.text-avatar').html(first).show();

   }
}

//实现退出功能
// 监听点击事件
$('#btnLogout').on('click', function () {
   layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      // 1.删除(清空)用户登录时在本地存储的token
      localStorage.removeItem('token');
      // 2.跳转到登录页面
      location.href = '/login.html';

      // 关闭confirm询问框
      layer.close(index);
   });
})