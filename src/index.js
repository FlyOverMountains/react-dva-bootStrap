// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import dva from 'dva';
import router from './router';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
	throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

const app = dva();

app.router(() => router);

app.start(ICE_CONTAINER);

// ReactDOM.render(router, ICE_CONTAINER);
