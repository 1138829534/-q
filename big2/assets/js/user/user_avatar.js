$(function () {
    let layer = layui.layer;
    var $image = $("#image");
    const options = {
        aspectRatio: 1,
        preview: ".img-preview",
    }
    $image.cropper(options);
    $("#uploadBtn").click(function () {
        $("#file").click();
    })
    $("#file").on("change", function () {
        let file = this.files[0];
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper("destory")
            .attr("src", newImgURL)
            .cropper(options);
    })
    $("#sureBtn").click(function () {
        let dataURL = $image.cropper("getCroppedCanvas", {
            width: 100,
            height: 100,
        }).toDataURL("image/png");
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更换头像失败！");
                }
                layer.msg("更换头像成功！");
                window.parent.getAvatarAndName();
            }
        })
    })
})