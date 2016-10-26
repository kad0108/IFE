/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-09-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "大连": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "厦门": randomBuildData(100),
  "太原": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

var time = $("#form-gra-time");
var radio = $("input[name='gra-time']");//getElementsByName
var city = $("#city-select");
var wrap = $("#aqi-chart-wrap");

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

//随机颜色
function randomColor(){
	var rand = Math.floor(Math.random() * 0x00ffffff).toString(16);
	if(rand.length !== 6) return randomColor();
	return '#' + rand;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
	// 确定是否选项发生了变化 
	for(var i = 0; i < radio.length; i++){
		if(radio[i].checked && pageState.nowGraTime !== radio[i].value){
			pageState.nowGraTime = radio[i].value;
			// 设置对应数据
			initAqiChartData();
		}
	}
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 确定是否选项发生了变化 
	if(city.value !== pageState.nowSelectCity){
		pageState.nowSelectCity = city.value;
		// 设置对应数据
		initAqiChartData();
	}
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	addEvent(time, 'click', graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  	for(var i in aqiSourceData){
  		var option = document.createElement('option');
  		option.value = i;
  		option.innerHTML = i;
  		city.appendChild(option);
  	}
  	pageState.nowSelectCity = city.value;
  	// 给select设置事件，当选项发生变化时调用函数citySelectChange
  	addEvent(city, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中
	chartData = {};
	switch(pageState.nowGraTime){
		case 'day':
			chartData = aqiSourceData[pageState.nowSelectCity];
			break;
		case 'week':
			var sumAQI = 0, sumWeek = 0, nowMon = 0;
			var cot = 0;//计算这一周有几天
			for(var i in aqiSourceData[pageState.nowSelectCity]){
				var date = new Date(i);
				var m = date.getMonth() + 1;//0~11
				var weekday = date.getDay();//0~6
				if(m != nowMon){
					if(cot){//月初，上个月末的需要计入
						chartData[m-1 + '月第' + sumWeek + '周'] = parseInt(sumAQI/cot);
					}
					nowMon = m;
					sumAQI = 0;
					sumWeek = 0;
					cot = 0;
					sumAQI += aqiSourceData[pageState.nowSelectCity][i];
					cot++;
					sumWeek++;
				}else{
					sumAQI += aqiSourceData[pageState.nowSelectCity][i];
					cot++;
					if(weekday == 0) {//到周日了
						chartData[m + '月第' + sumWeek + '周'] = parseInt(sumAQI/cot);
						cot = 0;
						sumAQI = 0;
						sumWeek++;
					}
				}
			}
			chartData[m + '月第' + sumWeek + '周'] = parseInt(sumAQI/cot);
			break;
		case 'month':
			var nowMon = 0, sumAQI = 0, cot = 0, m;
			for(var i in aqiSourceData[pageState.nowSelectCity]){
				var date = new Date(i);
				m = date.getMonth() + 1;
				if(nowMon != m){
					if(cot) chartData[m-1 + '月'] = parseInt(sumAQI/cot);
					nowMon = m;
					sumAQI = 0;
					cot = 0;
				}
				sumAQI += aqiSourceData[pageState.nowSelectCity][i];
				cot++;
			}
			chartData[m+1 + '月'] = parseInt(sumAQI/cot);
			break;
	}
	// 调用图表渲染函数
	renderChart();
}

/**
 * 渲染图表
 */
function renderChart() {
	wrap.innerHTML = "";
	for(var i in chartData){
		var div = document.createElement('div');
		div.className = 'item ' + pageState.nowGraTime;
		div.style.height = chartData[i] + 'px';
		div.style.backgroundColor = randomColor();
		div.title = 'Date:' + i + ' AQI:' + chartData[i];
		wrap.appendChild(div);
	}
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();