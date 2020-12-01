$(function () {
     let form = layui.form;
     let layer = layui.layer;
     let state = "";
     $.ajax({
        url: "/my/article/cates",
        success: function (res) {
             let htmlStr = "";
             res.data.forEach((item) => {
                 htmlStr += `
                 <option value="${item.Id}">${item.name}</option>
                 `;
             })
            $("[name=cate_id]").append(htmlStr); 
            form.render();
        }
     })
     initEditor();
     var $image = $("#image");
     var options ={
         aspectRatio: 400 / 280,
         preview:".img-preview",
     };
     $image.cropper(options);
     $("#chooseBtn").click(function () {
          $("#file").click();
     })
     $("#file").on("change",function () {
          let file = this.files[0];
          let newImgURL = URL.createObjectURL(file);
          $image
          .cropper("destroy")
          .attr("src",newImgURL)
          .cropper(options);
     })
     $("#pubBtn").click(function () {
          state = "已发布";
     })
     $("#pubBtn2").click(function () {
          state = "草稿";
     })
     $("#form").on("submit", function (e) {
          e.preventDefault();
      
          // 把裁切的图片转成对应的文件
          $image
            .cropper("getCroppedCanvas", {
              // 创建一个 Canvas 画布
              width: 400,
              height: 280,
            })
            .toBlob((blob) => {
              // 将 Canvas 画布上的内容，转化为文件对象
              // 得到文件对象后，进行后续的操作
      
              // 收集表单数据
              // let data = $(this).serialize(); // 不行
              // 因为由于此接口涉及到文件上传的功能，因此提交的请求体，必须是 FormData 格式！
      
              let fd = new FormData(this); // 参数需要是form这个DOM对象
      
              // fd实例可以通过append方法来追加数据
              fd.append("state", state);
              // 收集封面数据
              fd.append("cover_img", blob);
      
              // fd可以使用forEach来遍历，查看存储form的数据
              fd.forEach((item) => console.log(item));
      
              // 后续写ajax发布文章
              pubArt(fd);
            });
        });
     function pubArt(fd) {
          $.ajax({
            url: "/my/article/add",
            type:"POST",
            data:fd,
            contentType: false,
            processData: false,
            success:function (res) {
                 if(res.status !== 0) {
                     return layer.msg("发布文章失败！");
                 }
                 layer.msg("发布文章成功！");
                 location.href = "/article/art_list.html";
            }
          })
     }
})