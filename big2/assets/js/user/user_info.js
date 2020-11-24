$(function () {
    let form = layui.form;
    getInfo();
    function getInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败！");
                }
                form.val("userForm", res.data);
            }
        })
    }
    $("#resetBtn").click(function (e) {
        e.preventDefault();
        getInfo();
    })
})