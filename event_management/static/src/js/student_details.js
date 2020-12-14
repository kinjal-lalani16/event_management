odoo.define("school.popupjs", function(require) {
    "use strict";

    var ajax = require("web.ajax");
    var core=require("web.core");
    var Widget = require("web.Widget");
    var rpc = require("web.rpc");
    var Dialog = require('web.Dialog');
    var _t = core._t;


    $(document).ready(function() {
        console.log("aagaaya");

        $(".edit").click(function(event) {
            $("#des_pop_up_new").modal("show");
             var request_id = parseInt(
                $(event.target)
                    .parents("tr")
                    .find("td:nth-child(1) span")
                    .html(),
                10
            );
            console.log("Hello this is id of current block",request_id);
            rpc.query({
                model: "job.application",
                method: "search_read",
                args: [
                    [["id", "=", request_id]],
                    [
                        "id",
                        "name",
                        "dob",
                        "email",
                    ],
                ],
            }).then(function(data) {
                console.log("THis is the gender",data[0]['gender'])
                $(".name").val(data[0]['name']);
                $(".dob").val(data[0]['dob']);
                $(".email").val(data[0]['email']);
                $("#gender").val(data[0]['gender']);
                $("#application_id").val(data[0]['id']);

            });
        });
        $(".submit-student").click(function(event) {
            var self = $(this);
            var name = $('.name').val();
            var dob = $('.dob').val();
            var age = $('.age').val();
            var gender = $('#gender').val();
            // console.log("name len",name.length)
            // console.log("name",name)
            // console.log("dob len",dob.length)
            // console.log("dob",dob)
            console.log("gen len",gender.length);
            var cols = [{'name': 'kinjal'}];

            if (dob.length > 0 && name.length > 0 && gender.length >0 ){
                 console.log("--------In the if statement-------")
                $.ajax({
                    url:"/create-student/",
                    method:"POST",
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",

                    cache: true,
                    async:false,
                    data: JSON.stringify({
                                            'jsonrpc': "2.0",
                                            'method': "call",
                                            "params":{
                                                'name': name,
                                                'student_dob': dob,
                                                'gender':gender,
                                                'email':'hello@xyz.com',
                                            }
                                        }),
                    success: function () {
                        console.error("SUCCESS");
                    },
                    error: function (data) {
                        console.error("ERROR ", data);
                    },
                }).then(function (data){
                        alert('you are in ajax')
                        // window.location.href = '/shop/address'
                });

                return false
            }
            else if (name.length <= 0 ) {
                Dialog.alert(self, _t("Please Enter the name."), {
                    title: _t('Name Alert'),
                });
                return false
            }
            else if (dob.length <= 0 ) {
                Dialog.alert(self, _t("Please Enter Date of Birth."), {
                    title: _t('Date Alert'),
                });
                return false
            }
            else if (gender.length <= 0 ) {
                Dialog.alert(self, _t("Please select the gender."), {
                    title: _t('Gender Alert'),
                });
                return false
            }
            return false
        });



    });
});



// Ye wala rpc hai
// rpc.query({
//         model: "student.student",
//         method: "create",
//         args: [
//             [
//                 {
//                     "name":name,
//                     "student_dob":dob,
//                     "age":age,
//                     "gender":gender,
//                     "email":'jaarahi@gmail.com',
//                 }
//             ],
//         ],
//     }).then(function(data) {
//         console.log("jake dekho record");
//         console.log(data);
//     });
