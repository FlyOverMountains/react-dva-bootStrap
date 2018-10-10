import axios from 'axios';
import qs from 'querystring';

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};

const checkStatus = response => {
	if(response.status >200 && response.status<300) {
		return response;
	}
	const errorText = codeMessage[response.codeMessage];
	alert(errorText);
	const error = new Error(errorText);
	error.name = response.status;
	error.response = response;
	throw error;
};

const request = (url,option) => {
	const defaultOption = {
		method: 'get'
	};
	const { method } = option;
	let { data } = option;
	if(method === 'post' && data) {
		data = qs.stringify(data,{ arrayFormat: 'repeat' });
	}
	const newOption = { ...defaultOption,...option,url,data };
	return axios(newOption)
		.then(checkStatus)
		.catch((e) => {
			console.error(e.name, e.message);
			if (e.response) {
				console.error(e.response.data);
			}
			return { error: 50000, message: e.message };
		});
};


const post = (url,data) => {
	const option = {
		method : 'post',
		data,
	};
	return request(url,option);
};


const get = (url,data) => {
	const option = {
		method : 'get',
		data,
	};
	return request(url,option);
};


export default { request,post,get };