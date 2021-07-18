$('#login').click(function() {
    let sID = $("#Account").val();
    let pwd = $("#password").val();

    $.ajax({
        type: "post",
        dataType: 'json',
        async: true,
        data: { 'sID': sID, 'password': pwd },
        url: 'http://127.0.0.1:3000/api/user/login',
        success: function(data_in) {
            console.log(data_in);
            if (data_in.result) {
                alert("登入成功");
                document.location.href = `./change.html?sID=${sID}`;
            } else {
                alert("帳號或密碼輸入錯誤");
            }
        }
    })
});