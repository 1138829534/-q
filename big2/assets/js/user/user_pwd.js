$(function () {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        newPwd: function (value) {
            let oldPwd = $("[name=oldPwd").val();
            if (value === oldPwd) {
                return "新密码不能和原密码一样";
            }
        },
        samePwd: function (value) {
            let newPwd = $("[name=newPwd").val();
            if (value !== newPwd) {
                return "两次输入的新密码不一致";
            }
        }
    })
    let $form = $("pwdForm");
    $form.on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("重置密码失败" + res.message);
                }
                layer.msg("重置密码成功！");
                $form.get(0).reset();
            }
        })
    })
})