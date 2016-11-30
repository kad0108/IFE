/*
* 尝试用vue实现了表单验证，这是自己用vue实现的第一个任务，应该有很多可以改进的地方。
* @author kad0108
* @date 2016-11-30
*/
var form = new Vue({
	el: '#form',
	data: {
		list: [ 
			{label: '姓名', type: 'text', name: 'name', info: '', val: '', cls:'', color:'', pass: false},
			{label: '密码', type: 'password', name: 'password', info: '', val: '', cls:'', color:'', pass: false},
			{label: '密码确认', type: 'password', name: 'confirm', info: '', val: '', cls:'', color:'', pass: false},
			{label: '邮箱', type: 'text', name: 'email', info: '', val: '', cls:'', color:'', pass: false},
			{label: '手机', type: 'text', name: 'tel', info: '', val: '', cls:'', color:'', pass: false},
		],
		infos: [
			{hint: '必填，长度为4~16位字符', correct: '姓名格式正确', error: '姓名格式有误'},
			{hint: '必填，长度为6~16位字符', correct: '密码可用', error: '密码不可用'},
			{hint: '再次输入相同密码', correct: '密码输入一致', error: '密码不一致'},
			{hint: 'example@gmail.com', correct: '邮箱格式正确', error: '邮箱格式错误'},
			{hint: '请输入11位手机号码', correct: '手机号格式正确', error: '手机号格式错误'},
		],
	},
	methods: {
		showHint: function(index){
			this.list[index].info = this.infos[index].hint;
			this.list[index].color = 'grey';
		},
		validate: function(index){
			var ulen = this.cotLen(this.list[index].val);
			if(ulen == 0){
				this.list[index].info = this.list[index].label + '不能为空';
				this.list[index].color = 'red';
				this.list[index].cls = 'error';
				return;
			}
			switch(index){
				case 0:// name
					this.list[index].pass = /^\w{4,16}$/.test(this.list[index].val);
					break;
				case 1:// password
					this.list[index].pass = /^\S{6,16}$/.test(this.list[index].val);
					break;
				case 2:// confirm
					this.list[index].pass = this.list[index-1].pass && this.list[index].val === this.list[index-1].val;
					break;
				case 3:// email
					var apos = this.list[index].val.indexOf('@');
					var dotpos = this.list[index].val.lastIndexOf('.');
					this.list[index].pass = apos > 0 && dotpos - apos > 1 && dotpos != this.list[index].val.length-1;
					break;
				case 4:// tel
					this.list[index].pass = /^[1][0-9]{10}$/.test(this.list[index].val);
					break;
			}
			if(this.list[index].pass){
				this.list[index].info = this.infos[index].correct;
				this.list[index].color = 'green';
				this.list[index].cls = 'correct';
			}else{
				this.list[index].info = this.infos[index].error;
				this.list[index].color = 'red';
				this.list[index].cls = 'error';
			}
		},
		cotLen: function(str){
			var len = 0;
			for(var i = 0; i < str.length; i++){
				var ucode = str.charCodeAt(i);
				if(ucode >= 0 && ucode <= 128) len += 1;
				else len += 2;
			}
			return len;
		},
		submit: function(){
			var flag = true;
			this.list.forEach(function(item){
				flag &= item.pass;
			})
			if(flag) alert('提交正确');
			else alert('提交有误');
		}
	}
})