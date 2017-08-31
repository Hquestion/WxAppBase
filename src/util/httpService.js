/**
 * Created by 贺小雷 on 2017-07-21.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import {httpInterceptor} from './httpInterceptor';

Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;
Vue.http.interceptors.push(httpInterceptor);

export default {
    post: function(url, data, ignoreLoading){
        if(typeof data === 'boolean') {
            ignoreLoading = data;
            data = {}
        }
        let that = this;
        return new Promise(function(resolve, reject){
            Vue.http({
                url: url,
                method: 'POST',
                body: JSON.stringify(data),
                ignore: !!ignoreLoading
            }).then(function(res){
                that.handleResponse(res, resolve, reject);
            }, function(res){
                reject(res.data);
            });
        });
    },
    get: function(url, data, ignoreLoading){
        if(typeof data === 'boolean') {
            ignoreLoading = data;
            data = {}
        }
        let that = this;
        return new Promise(function(resolve, reject){
            Vue.http({
                url: url,
                method: 'GET',
                params: data,
                ignore: !!ignoreLoading
            }).then(function(res){
                that.handleResponse(res, resolve, reject);
            }, function(res){
                reject(res.data);
            });
        });
    },
    jsonp: function(url, data){
        return Vue.http.jsonp(url);
    },
    handleResponse: function(res, resolve, reject){
        if(res.ok && !res.data) {
            resolve();
        }else if(res.ok){
            try{
                if(typeof res.data === 'string') {
                    res.data = JSON.parse(res.data);
                }
                if(typeof res.data.code !== 'undefined') {
                    if(res.data.code === 0) {
                        resolve(res.data);
                    }else {
                        reject(res.data);
                    }
                }else {
                    resolve(res.data);
                }
            }catch(e) {
                reject(res.data);
                console.error('JSON字符串解析错误！');
            }
        }else {
            reject(res.data);
        }
    }
}
