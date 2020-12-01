$(function () {
     let layer = layui.layer;
     let form = layui.form;
     getCate();
     function getCate() {
          $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                 let htmlStr = template("trTpl",res);
                 $("tbody").html(htmlStr);
            }
          })
     }
     let index;
     $("#btnAdd").click(function () {
          index = layer.open({
              type: 1,
              area:"500px",
              title:"添加文章分类",
              content:$("#addForm").html(),
          })
     })
     $("body").on("submit","#form",function (e) {
          e.preventDefault();
          let data = $(this).serialize();
          $.ajax({
            url: "/my/article/addcates",
            type:"POST",
            data,
            success: function (res) {
                 if(res.status !== 0) {
                     return layer.msg("新增文章分类失败！");
                 }
                 layer.msg("新增文章分类成功！");
                 layer.close(index);
                 getCate();
            }
          })
     })
     let editIndex;
     $("tbody").on("click",".editBtn",function () {
          let id = $(this).attr("data-id");
          editIndex = layer.open({
            type: 1,
            area:"500px",
            title:"修改文章分类",
            content:$("#editFormTpl").html()
          });
          $.ajax({
            url: "/my/article/cates/" + id,
            success: function (res) {
                 if(res.status !== 0) {
                     return layer.msg("获取文章分类数据失败！");
                 }
                 form.val("editForm",res.data);
            }
          })
     })
     $("body").on("submit","#editForm",function (e) {
          e.preventDefault();
          let data = $(this).serialize();
          $.ajax({
            url: "/my/article/updatecate",
            type:"POST",
            data,
            success: function (res) {
                 if(res.status !== 0) {
                     return layer.msg("更新分类信息失败！");
                 }
                 layer.msg("更新分类信息成功！");
                 layer.close(editIndex);
                 getCate();
            }
          })
     })
     $("tbody").on("click",".delBtn",function () {
          let id = $(this).attr("data-id");
          $.ajax({
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                 if(res.status !== 0) {
                     return layer.msg("删除文章分类失败！");
                 }
                 layer.msg("删除文章分类成功！");
                 getCate();
            }
          })
     })
})