export default {
	iconfont (val) {
		val = val.toLowerCase();
		switch(val) {
			case 'radio':
				return '&#xe71e;';
				break;
			case 'checkbox':
				return '&#xe71a;';
				break;
			case 'textarea':
				return '&#xe600;';
				break;
		}
	},
	typeContent (val) {
		val = val.toLowerCase();
		switch(val) {
			case 'radio':
				return '单选题';
				break;
			case 'checkbox':
				return '多选题';
				break;
			case 'textarea':
				return '文本题';
				break;
		}
	},
	hintContent (hint) {
		switch(hint) {
			case 'save': 
				return '问卷已保存';
				break;
			case 'error':
				return '请合理填写问卷';
				break;
			case 'publish':
				return '是否发布问卷？';
				break;
			case 'delete':
				return '确认删除问卷？';
				break;
		}
	},
	
}