$(function () {
  $("#gotoRegi").click(function () {
    $(".regiBox").show();
    $(".loginBox").hide();
  });
  $("#gotoLogin").click(function () {
    $(".regiBox").hide();
    $(".loginBox").show();
  });
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value) {
      let pwd = $(".regiBox input[name=password]").val();
      if (value !== pwd) {
        return "两次输入的密码不一致";
      }
    }
  });
  $("#regiForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("注册失败！" + res.message);
        }
        layer.msg("注册成功!");
        $("#gotoLogin").click();
      }
    })
  });
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败！");
        }
        localStorage.setItem("token", res.token);
        layer.msg(
          "登录成功，即将去后台主页",
          {
            time: 2000,
          }, function () {
            location.href = "login.html";
          }
        )
      }
    })
  })
})  