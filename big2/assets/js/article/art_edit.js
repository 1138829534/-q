$(function () {
     let form = layui.form;
     let layer = layui.layer;
     let state = "";
     let id = location.search.split("?id=")[1];
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
             getArtInfo();
        }
     })
     function getArtInfo() {
          $.ajax({
               url: "/my/article/" + id,
              success: function (res) {
                    initEditor();
                    state = res.data.state;
                    form.val("form",res.data);
                    $image
                    .attr("src","http://ajax.frontend.itheima.net" + res.data.cover_img)
                    .cropper(options);
              }
          })
     }
     var $image = $("#image");
     var options = {
          aspectRatio: 400 / 280,
          preview:".img-preview",
     };
     $("#chooseBtn").click(function () {
           $("#file").click();
     });
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
     $("#pubBtn").click(function () {
           state = "草稿";
     })
     $("#form").on("submit",function (e) {
           e.preventDefault();
           $image
           .cropper("getCroppedCanvas",{
                width:400,
                height:280,
           })
           .toBlob((blob) => {
                let fd = new FormData(this);
                fd.append("state",state);
                fd.append("cover_img",blob);
                fd.append("Id",id);
                fd.forEach((item) => console.log(item));
                pubArt(fd);
           })
     })
     function pubArt(fd) {
           $.ajax({
               url: "/my/article/edit",
               type:"POST",
               data:fd,
               contentType: false,
               processData: false,
               success: function (res) {
                     if(res.status !== 0) {
                          return layer.msg("修改文章失败！");
                     }
                     layer.msg("修改文章成功！");
                     location.href = "/article/art_list.html";
               }
           })
     }


})