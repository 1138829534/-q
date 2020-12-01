$(function () {
     let layer = layui.layer;
     let form = layui.form;
     let laypage = layui.laypage;
     let query = {
         pagenum:1,
         pagesize:2,
         cate_id:"",
         state:"",
     };
     getList();
     function getList() {
          $.ajax({
            url: "/my/article/list",
            data:query,
            success: function (res) {
                 if(res.status !== 0) {
                     return layer.msg("获取文章列表失败！");
                 }
                 let htmlStr = template("trTpl",res);
                 $("tbody").html(htmlStr);
                 renderPage(res.total);
            }
          })
     }
     function renderPage(total) {
           laypage.render({
                curr:query.pagenum,
                limit:query.pagesize,
                elem:"pageBox",
                count:total,
                limits:[1,2,3,5,10],
                layout:["count","limit","prev","page","next","skip"],
                jump: function (obj,first) {
                    query.pagenum = obj.curr;
                    query.pagesize = obj.limit;
                    if(!first) {
                         getList();
                    }
                }
           })
     }
     const paddZero = n => (n < 10 ? "0" + n : n);
     template.defaults.imports.formatTime = function (time) {
          let d = new Date(time);
          let y = d.getFullYear();
          let m = paddZero(d.getMonth() + 1);
          let day = paddZero(d.getDate());
          let h = paddZero(d.getHours());
          let mm = paddZero(d.getMinutes());
          let s = paddZero(d.getSeconds());
          return `${y}-${m}-${day} ${h}:${mm}:${s}`;
     }
     $.ajax({
          url: "/my/article/cates",
          success: function (res) {
                let htmlStr = "";
                let data = res.data;
                data.forEach((item) => {
                     htmlStr += `
                         <option value="${item.Id}">${item.name}</option>
                     `;
                })
                $("[name=cate_id]").append(htmlStr);
                form.render();
          }
     });
     $("#form").on("submit",function (e) {
           e.preventDefault();
           query.cat_id = $("[name=cate_id]").val();
           query.state = $("[name=state]").val();
           getList();
     });
     $("tbody").on("click",".delBtn",function () {
           let id = $(this).attr("data-id");
           if($(".delBtn").lenght === 1) {
                if(query.pagenum === 1) {

                     query.pagenum = 1;
                } else {
                     query.pagenum = query.pagenum - 1;
                }
                }
      $.ajax({
           url: "/my/article/delete/" + id,
           success: function (res) {
                if(res.status !== 0) {
                      return layer.msg("删除失败！");
               }
                    layer.msg("删除成功！");
                getList();
           }
     })   
     })
     $("tbody").on("click",".editBtn",function () {
           let id = $(this).attr("data-id");
           location.href = "/article/art_edit.html?id=" + id;
     })
})