$(function(){
	
	var bool = true;
	while(bool){
		var passwd = prompt('请输入管理员密码！')
		if(passwd === 'admin'){
			bool = false;
		}
	}

	$('#D').on('keyup',function(){
		if($(this).val()!==''){
			$('#submit').removeClass('disabled');
		}else{
			$('#submit').addClass('disabled');
		}
	})

	var count = 0;
	$("#submit").click(function(event) {
		count ++;
		$.post("http://127.0.0.1:3000/user/setTable",
			{
				id:$('#id').val(),
				tName: $('#name').val(),
				qid: count,
				question: $('#question').val(),
				A: $('#A').val(),
				B: $('#B').val(),
				C: $('#C').val(),
				D: $('#D').val()
			
			},'json');

		
			alert("提交成功！");
			console.log(count);
			$('#submit').addClass('disabled');
			$('#option :input,#question').val('');

			$('#question').attr('placeholder',`请设置第${count+1}题`);
		

	});
})
