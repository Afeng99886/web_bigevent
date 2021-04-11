$(function () {
   // 点击切换登录注册
   $('#link_reg').on('click', function () {
      $('.login_box').hide();
      $('.reg_box').show();
   })
   $('#link_login').on('click', function () {
      $('.login_box').show();
      $('.reg_box').hide();
   })


   // 定义layui的form对象
   var form = layui.form;
   // 通过 form.verify() 函数自定义校验规则：
   form.verify({
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      pwd: [
         /^[\S]{6,12}$/
         , '密码必须6到12位，且不能出现空格'
      ],
      //  校验两次密码是否一致的规则
      repwd: function (value) {
         // 通过形参拿到的是确认密码框中的内容
         // 还需要拿到密码框中的内容
         // 然后进行一次等于的判断
         // 如果判断失败,则return一个提示消息即可
         var pwd = $('.reg_box [name=password]').val();
         if (pwd !== value) {
            return '两次密码输入不一致'
         }
      }
   })

   //监听表单的注册事件
   var layer = layui.layer;
   $('#form_reg').on('submit', function (e) {
      // 当监听表单的注册事件后，第一时间先取消表单的默认提交行为
      e.preventDefault();
      // 发起ajax请求
      var data = {
         username: $('#form_reg [name=username]').val(),
         password: $('#form_reg [name=password]').val()
      }
      $.post('/api/reguser', data, function (res) {
         if (res.status !== 0) {
            return layer.msg(res.message);
         }
         layer.msg('注册成功，请登录！');
         // 模拟人的点击行为
         $('#link_login').click();
      })
   })
   // 监听登录表单的注册事件
   $('#form_login').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
         method: 'POST',
         url: '/api/login',
         // 快速获取表单的值
         data: $(this).serialize(),
         success: function (res) {
            if (res.status !== 0) {
               return layer.msg('登录失败！');
            }
            layer.msg('登录成功！');
            // 将登录成功后的 token字符串 保存到 localStorage
            localStorage.setItem('token',res.token);
            // 登录成功更改页面跳转到后台
            location.href = '/index.html';
         }
      })
   })

})