$(document).ready(function() {
    let url = location.href;
    let ary1, ary2, ary3, sID;

    if (url.indexOf('?') != -1) {
        ary1 = url.split('?');
        ary2 = ary1[1].split('&');
        ary3 = ary2[0].split('=');
        sID = ary3[1];
    }

    $.ajax({
        type: "get",
        dataType: 'json',
        async: true,
        // data: { 'sID': acc },
        // data: { 'sID': sID },
        url: 'http://127.0.0.1:4000/api/member/fetch/all',
        success: function(data_in) {
            console.log(data_in);
        }
    })
});

$('#change').click(function() {
    alert("修改成功");
});