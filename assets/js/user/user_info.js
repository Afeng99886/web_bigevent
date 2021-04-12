$(function () {
   var form = layui.form;
   var layer = layui.layer;
   form.verify({
      nickname: function (value) {
         if (value.length > 6) {
            return '昵称长度必须在1~6个字符之间！'
         }
      }
   })

   initUserInfo();
   // 获取用户信息，将获取的登录名称写入只读的表单
   function initUserInfo() {
      $.ajax({
         method: 'GET',
         url: '/my/userinfo',
         success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
               return layer.msg('获取用户信息失败！');
            }

            // form.val方法快速为表单赋值，
            form.val('formUserInfo', res.data);
         }
      })
   }

   // 实现表单的重置效果
   $('#btnReset').on('click', function (e) {
      // 阻止按钮的默认重置行为
      e.preventDefault();

      initUserInfo();
   });

   // 监听表单的提交事件
   $('.layui-form').on('submit', function (e) {
      // 阻止表单的默认提交行为
      e.preventDefault();
      // 发起ajax请求，更新用户信息
      $.ajax({
         method: 'POST',
         url: '/my/userinfo',
         data: $(this).serialize(),
         success: function (res) {  
            // console.log(res);
            if (res.status !== 0) {
               return layer.msg('用户信息修改失败！');
            }
            layer.msg('用户信息修改成功！');
            // 调用父页面中的方法，重新渲染用户信息
            window.parent.getUserInfo();
         }
      })
   })
})