## JS正则匹配

[正则表达式30分钟入门教程](http://deerchao.net/tutorials/regex/regex-1.htm)

### 创建方式

1. ```var reg = new RegExp(/are/, "i");```

2. ```var reg = /are/i;```

### 匹配查询：

1. ```str.search(reg)```，返回值为str中第一个与reg匹配的位置，不匹配返回-1

2. ```str.match(reg)```，返回匹配数组，依赖全局标志g

2. ```reg.exec(str)```，返回一个数组，数组里存储的是第一个匹配项的相关信息

3. ```reg.test(str)```，返回值Boolean