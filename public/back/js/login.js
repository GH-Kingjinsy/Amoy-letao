$(function () {

  // 表单校验的功能

  // 使用表单校验插件
  var $form = $("form");
  $form.bootstrapValidator({
    //配置校验时的图标
    feedbackIcons: {
      // 校驗成功的圖標
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置校驗規則
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用戶名不能為空"
          },
          callback: {
            message: "用戶名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "用戶密碼不能為空"
          },
          stringLength: {
            min: 6,
            max: 16,
            message: "密碼長度為6-16位"
          },
          callback: {
            message: "密碼錯誤"
          }
        }
      }
    }
  });

  // 需要给表单注册一个校验成功的事件 success.form.bv
  $form.on("success.form.bv", function (e) {
    // 阻止瀏覽器默認行為
    e.preventDefault();

    // 發送ajax
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $form.serialize(),
      success: function (data) {
        // 如果成功，就跳轉到首頁
        if (data.success) {
          location.href = "index.html";
        }
        if (data.error === 1000) {
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if (data.error === 1001) {
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
      }
    });
  });

  // 重置功能，重置樣式
  $("[type='reset']").on("click",function(){
    $form.data("bootstrapValidator").resetForm();
  });
});