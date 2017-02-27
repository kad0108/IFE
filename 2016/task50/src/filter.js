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
			case 'draft': 
				return '问卷已保存';
				break;
			case 'error':
				return '请合理填写问卷';
				break;
			case 'publish':
				return '是否发布问卷？发布后不可修改';
				break;
			case 'delete':
				return '确认删除问卷？';
				break;
			case 'fill':
				return '确认提交问卷？';
				break;
		}
	},
	stateContent (state) {
		switch(state) {
			case 'draft':
				return '未发布';
				break;
			case 'publish':
				return '已发布';
				break;
			case 'end':
				return '已结束';
				break;
			case '':
				return '未设置';
				break;
		}
	}
}