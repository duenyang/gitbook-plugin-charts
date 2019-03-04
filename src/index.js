
import { uuid } from './util';
import * as chartFns from './chart';

let chartScriptFn = () => {};

module.exports = {
    book: {
        assets: './assets',
    },
    hooks: {
        init: function () {
            const { type } = this.config.get('pluginsConfig.chart');
            chartScriptFn = chartFns[type];
        }
    },
    blocks: {
        chart: {
            process: function (blk) {
                const id = uuid();

                const bodyString = blk.body.trim();

                let scripts = chartScriptFn(id, bodyString);
                return `<div>
                    <div id="${id}"></div>
                    <script>${scripts}</script>
                </div>`;
            }
        }
    }
};
