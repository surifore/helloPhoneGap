/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var users;

document.addEventListener("deviceready", function(){
        getUsers();
});

function create(){
	var user_id=$('#user_id').val();
	var age=$('#age').val();
	var password=$('#password').val();
	
	if(user_id==''||password==''){
        if(user_id==''){$('#user_id').css('background-color','rgba(255, 0, 0, 0.49)')}
        if(password==''){$('#password').css('background-color','rgba(255, 0, 0, 0.49)')}
		$('#creationError').text('Please fill the highlighted fields');
        $('#creationError').css('display','block')
		return;
	}else{
		$.ajax( { url: "https://api.mongolab.com/api/1/databases/sirris-withme/collections/users?apiKey=AOeduyB0geKpzvSMkJYLH3BhrMKWuVrp",
		  data: JSON.stringify( { "user_id" : user_id , "age" : age , "password" : password } ),
		  type: "POST",
		  contentType: "application/json" })
        .complete(function(){
                $('#creationComplete').text('User created');
                $('#creationComplete').css('display','block')
                $('#user_id').val('');
                $('#age').val('');
                $('#password').val('');
        })
        .fail(function(e){
            $('#creationError').text('Error '+e);
            $('#creationError').css('display','block')
        });
	}
}

function getUsers(){
        $.get("https://api.mongolab.com/api/1/databases/sirris-withme/collections/users?apiKey=AOeduyB0geKpzvSMkJYLH3BhrMKWuVrp", function(data){
                users=data;
                var tbody = $('#usersTable').find('tbody');
                tbody.html('');
                $.each(data,function(idx,row){
                        var tr='<tr>';
                        $.each(row,function(id_name,elt){
                                if(id_name!='_id'){
                                        tr=tr+'<td>'+elt+'</td>';
                                }
                        });
                        tr=tr+'<td>'+'<a href="#" class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext" onclick="deleteUser('+"'"+row._id.$oid+"'"+')">delete</a>'+'</td>';
                        tr=tr+'</tr>';
                        tbody.append(tr);
                })
        });
}

function deleteUser(id){
    $.ajax( { url: "https://api.mongolab.com/api/1/databases/sirris-withme/collections/users/"+id+"?apiKey=AOeduyB0geKpzvSMkJYLH3BhrMKWuVrp",
		  type: "DELETE",
		  async: true,
		  timeout: 300000,
		  success: function (data) { },
		  error: function (xhr, status, err) { } } )
	  .complete(function(){
	    getUsers();
	  })
	  .fail(function(e){
	    alert(e);
	  });

}
