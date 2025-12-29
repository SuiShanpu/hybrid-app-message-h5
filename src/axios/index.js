import { message } from 'ant-design-vue';
import axios from "axios";


/**
 * 创建实例对象，添加全局拦截器
 */
const $http = axios.create();
$http.interceptors.request.use(requestSuccessHandler, requestFailHandler);
$http.interceptors.response.use(responseSuccessHandler, responseFailHandler);

/**
 * 
 * @param {*} params 
 */
export default {
  request: (config) => {
    return $http.request(config);
  },
  get: (url, params, config = {}) => {
    const defaultConfig = {
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }
    }
    return $http.get( `${url}?${qsStringify(params)}`, resolveConfig(config, defaultConfig) );
  },
  post: (url, data, config = {}) => {
    const defaultConfig = {
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }
    return $http.post( url, data, resolveConfig(config, defaultConfig) );
  },
  put: (url, data, config = {}) => {
    const defaultConfig = {
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }
    return $http.put( url, data, resolveConfig(config, defaultConfig) );
  },
  delete: (url, config = {}) => {
    return $http.delete( url, config );
  },
}

/**
 * 组合请求的config
 * 
 * @param {*} config 传入的配置项
 * @param {*} defaults 默认的配置项
 * @param {*} extras 扩展的配置项
 * @returns 
 */
function resolveConfig(config = {}, defaults = {}, extras = {}) {
  return {
    ...defaults,
    ...extras, // todo 暂时不考虑
    ...config,
    // 合并 headers
    headers: {
      ...defaults.headers,
      ...extras.headers, // todo 暂时不考虑
      ...config.headers,
    }
  };
}

/**
 * 组合请求的config
 * 
 * @param {*} params 传入的参数对象
 * @returns 对象转换成的get字符串参数
 */
function qsStringify(params) {
  const parts = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (Array.isArray(value)) {
        value.forEach(arrItem => parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrItem)));
      } else {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      }
    }
  }
  return parts.join('&');
}


/* ------------------------  拦截器  ---------------------------------------------- */


/**
 * 请求成功
 */
function requestSuccessHandler(request) {
  console.info(`HTTP request [] success:`, request);
  return request;
}

/**
 * 请求失败
 */
function requestFailHandler(error) {
  console.error(`HTTP request [] error:`, error);
  return Promise.reject(error);
}

/**
 * 响应成功: 2xx 范围内的状态码都会触发该函数
 */
function responseSuccessHandler(response = {}) {
  const { 
    data, // 由服务器提供的响应
    status, // 来自服务器响应的状态码
    config = {} // 是 axios 请求的配置信息
  } = response;

  console.info(`HTTP response [] success:`, response);
  return [200].includes(status) ? data : response;
}

/**
 * 响应失败: 超出 2xx 范围的状态码都会触发该函数
 */
export function responseFailHandler(error = {}) {
  let { 
    config = {}, 
    message: errorMsg, // 请求发起异常
    response = {}, // 请求成功发起，服务器响应了状态码
    request = {} // 请求成功发起，但服务器无响应
  } = error;
  const { status, data } = response;
  message.error(data?.msg || errorMsg || `HTTP [${config?.url}] error: ${error}`);

  console.error(`HTTP response [${config?.url}] error:`, error);
  return Promise.reject(error);
}