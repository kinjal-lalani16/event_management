odoo.define("event_management.peli", function(require) {
    "use strict";

    var ajax = require("web.ajax");
    var core=require("web.core");
    var Widget = require("web.Widget");
    var rpc = require("web.rpc");
    var Dialog = require('web.Dialog');
    var _t = core._t;


    $(document).ready(function() {

            // For eidting the student record
            $(".button-edit").click(function(event) {
                $("#des_pop_up_new").modal("show");
                $('#button-common').html('Edit')
                var request_id = parseInt(
                    $(event.target).parents("tr").find("td:nth-child(1) span").html(),10
                );
                get_data(request_id);
                action();
            });

            // For creating the new student record
            $(".button-create").click(function(event) {
                  $('#button-common').html('Create');
                  $("#des_pop_up_new").modal("show");
                  $('#student_form')[0].reset();

                  action();

                return false
            });

            // (Edit & Create(Common btn) btn logic)Function for validation and passing
            //  the data to controller using ajax
            function action(){
                $("#button-common").click(function(event) {
                    var self = $(this);
                    var name = $('#student_name').val();
                    var dob = $('#student_dob').val();
                    var email = $('#student_email').val();
                    var id = $("#st_id").val();
                    console.log("Joi lo",name,dob,email);
                    if (dob.length > 0 && name.length > 0 && email.length >0 ){
                        $.ajax({
                            url:"/substu/",
                            method:"POST",
                            dataType: 'json',
                            contentType: "application/json; charset=utf-8",

                            cache: true,
                            async:false,
                            data: JSON.stringify({
                                                    'jsonrpc': "2.0",
                                                    'method': "call",
                                                    "params":{
                                                        'id': id,
                                                        'name': name,
                                                        'dob': dob,
                                                        'email':email,
                                                    }
                                                }),
                            success: function () {
                                $("#des_pop_up_new").modal("hide");
                                // setInterval('location.reload()',3000)

                            },
                            error: function (data) {
                                console.error("ERROR ", data);
                            },
                        }).then(function (data){
                             window.location.href = '/student/'

                        });
                        return true
                    }
                    else if (name.length <= 0 ){
                       Dialog.alert(self, _t("Please Enter the name."), {
                            title: _t('Name Alert'),
                       });
                       return false
                    }
                    else if (dob.length <= 0 ){
                       Dialog.alert(self, _t("Please Enter the dob."), {
                            title: _t('DOB Alert'),
                       });
                       return false
                    }
                    else if (email.length <= 0 ){
                       Dialog.alert(self, _t("Please Enter the email."), {
                            title: _t('Email Alert'),
                       });
                       return false
                    }



                 });
            }

            // For fetching the data from backend and fill the data to popup fields
            function get_data(request_id){
                rpc.query({
                    model: "student.record",
                    method: "search_read",
                    args: [
                        [["id", "=", request_id]],
                        [
                            "id",
                            "roll_no",
                            "name",
                            "dob",
                            "email"
                        ],
                    ],
                }).then(function(data) {
                    console.log("java script",data);
                    $("#student_name").val(data[0]['name']);
                    $("#student_dob").val(data[0]['dob']);
                    $("#st_id").val(data[0]['id']);
                    $("#student_email").val(data[0]['email']);


                });
            }


    });
});
