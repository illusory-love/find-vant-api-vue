import _ from 'lodash';
import { normalComponments, globalComponments } from './vant';

// var content = chrome.extension.getURL('js/content.js')
// var script = document.createElement('script')
// script.setAttribute('type', 'text/javascript')
// script.setAttribute('src', content)
// document.body.appendChild(script)

// 锚点输出的名称
const anchorName = {
    props    : 'Props',
    events   : 'Events',
    slots    : 'Slots',
    'fang-fa': 'Methods'
};

/**
 * 将组件列表转换为页面输出使用的数据
 * @param {object} data 组件列表
 */
function convertPageData(data, origin = normalComponments){
    // 统计每一项的出现次数
    const countBy       = _.countBy(data);
    // 去重后的数组
    const deduplication = Object.keys(countBy);

    // 待输出的项
    return deduplication
        .sort((x, y) => countBy[x] - countBy[y])
        .filter(item => !!origin[item])
        .map(item => {
            // 获取输出对象
            const out = origin[item];
            // 计算处理跳转锚点信息
            out.anchorText = out.anchor.map(n => anchorName[typeof n === 'string' ? n : n.name]);
            // 当前组件使用次数
            out.times = countBy[item];

            return out;
        });
}

chrome.extension.onMessage.addListener((query, sender, sendMessage) => {
    // 获取页面可能存在的 vant 组件
    const components = document.body.innerHTML.match(/van-[^\s"']+/g);

    // 当前页面使用过的组件列表
    let page = [];
    // 所有组件
    const full   = convertPageData(Object.keys(normalComponments));
    // 脚本调用
    const script = convertPageData(Object.keys(globalComponments), globalComponments);

    if (components && components.length){
        // 待输出的项
        page = convertPageData(components);
    }
    
    sendMessage({
        full,
        page,
        script
    });
});