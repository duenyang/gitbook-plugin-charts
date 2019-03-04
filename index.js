'use strict';

var _uuidCounter = 0;
function uuid() {
  return "plugin-chart-".concat(++_uuidCounter);
}

function c3(id, bodyString) {
  // bind to element
  // body.bindto = '#' + id;
  bodyString = bodyString.replace(/^\{/, "{\"bindto\":\"#".concat(id, "\","));
  return "c3.generate(".concat(bodyString, ");");
}
function highcharts(id, bodyString) {
  try {
    var body = JSON.parse(bodyString); // http://www.highcharts.com/docs/getting-started/your-first-chart
    body.chart = body.chart || {};
    body.chart.renderTo = id;
    return "new Highcharts.Chart(".concat(JSON.stringify(body), ");");
  } catch (e) {
    console.error(e);
  }
}

function echarts (id, bodyString) {
  try {
      var body = bodyString || "{}";
      return `echarts.init(document.getElementById(${JSON.stringify(id)})).setOption(${body})`;
  } catch (e) {
      console.error(e);
  }
};

var chartFns = /*#__PURE__*/Object.freeze({
    c3: c3,
    highcharts: highcharts,
    echarts: echarts
});

var chartScriptFn = function chartScriptFn() {};

module.exports = {
  book: {
    assets: './assets'
  },
  hooks: {
    init: function init() {
      var _this$config$get = this.config.get('pluginsConfig.charts'),
          type = _this$config$get.type;

      chartScriptFn = chartFns[type];
    }
  },
  blocks: {
    chart: {
      process: function process(blk) {
        var id = uuid();

        var bodyString = blk.body.trim();
        var scripts = chartScriptFn(id, bodyString);
        return `<div>
                    <div class="plugin-chart" id="${id}"></div>
                    <script>${scripts}</script>
                </div>`;
      }
    }
  }
};
