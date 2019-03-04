### gitbook-plugin-charts

    在gitbook中使用图表插件，目前支持`echarts`

### 使用

要在Gitbook项目中使用练习插件，请将`charts`插件添加到`book.json`文件中，然后使用安装插件`gitbook install`

```json
{
    "plugins": ["gitbook-plugin-charts"],
    "pluginsConfig": {
        "charts": {
            "type": "echarts"
        }
    }
}
```
然后(*注意: key和value都要使用双引号，不要使用单引号*)

```js
{% chart %}
{
    "xAxis": {
        "type": "category",
        "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    "tooltip": "{}",
    "yAxis": {
        "type": "value"
    },
    "series": [{
        "data": [820, 932, 901, 934, 1290, 1330, 1320],
        "type": "line"
    }]
}
{% endchart %}
```

