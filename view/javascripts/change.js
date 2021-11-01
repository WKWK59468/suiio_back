$(document).ready(function () {
  let url = location.href;
  let ary1, ary2, ary3, sID;

  if (url.indexOf("?") != -1) {
    ary1 = url.split("?");
    ary2 = ary1[1].split("&");
    ary3 = ary2[0].split("=");
    sID = ary3[1];
  }

  $.ajax({
    type: "get",
    dataType: "json",
    async: true,
    // data: { 'sID': acc },
    // data: { 'sID': sID },
    url: "http://127.0.0.1:4000/api/member/fetch/all",
    success: function (data_in) {
      console.log(data_in);
    },
  });
});

$("#change").click(function () {
  alert("修改成功");
});

$("#check").click(() => {
  const sID = 1110634025;
  $.ajax({
    type: "post",
    dataType: "json",
    async: true,
    data: { sID: sID },
    url: "http://127.0.0.1:4000/api/member/check",
    success: function (data_in) {
      console.log(data_in);
    },
  });
});

$("#logout").click(() => {
  $.ajax({
    type: "post",
    dataType: "json",
    async: true,
    data: {},
    url: "http://127.0.0.1:4000/api/member/logout",
    success: function (data_in) {
      console.log(data_in);
    },
  });
});

$("#reg").click(() => {
  $.ajax({
    type: "post",
    dataType: "json",
    async: true,
    data: { sID: "1110634007" },
    url: "http://127.0.0.1:4000/api/member/add",
    success: function (data_in) {
      console.log(data_in);
    },
  });
});

$("#del").click(() => {
  $.ajax({
    type: "post",
    dataType: "json",
    async: true,
    data: { sID: "1110634007" },
    url: "http://127.0.0.1:4000/api/member/delete",
    success: function (data_in) {
      console.log(data_in);
    },
  });
});
