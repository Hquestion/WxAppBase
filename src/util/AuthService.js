/**
 * Created by 贺小雷 on 2017-07-24.
 */
import api from '../api';
let isAuth;
export default {
    isAuth : function(id){
        let that = this;
        return new Promise(function(resolve, reject){
            if(typeof isAuth !== 'undefined') {
                if(isAuth === 'pause') {
                    reject({
                        status: false,
                        type: true
                    });
                }else {
                    isAuth ? resolve(true) : reject(false);
                }
            }else {
                api.login(id).then(function(res){
                    isAuth = true;
                    that.cacheUserInfo(res).then(function(){
                        resolve(true);
                    });
                }, function(res){
                    isAuth = false;
                    reject(false);
                });
            }
        });
    },
    updateAuth: function(boo){
        isAuth = boo;
    },
    cacheUserInfo: function(data, forceUpdate){
        if(forceUpdate) {
            return api.login(window.openId).then(function(res){
                window.userInfo = res;
                window.isUserVip = (res.isVip !== '');
                window.userId = res.sfid;
                window.relations = res.relations;
                window.vips = res.isVip;
            });
        }else {
            return new Promise(function(resolve, reject){
                window.userInfo = data;
                window.isUserVip = (data.isVip !== '');
                window.userId = data.sfid;
                window.relations = data.relations;
                window.vips = data.isVip;
                document.title = data.schoolName;
                resolve(data);
            });
        }
    },
    unifiedBind(data){
        return new Promise((resolve, reject) => {
            api.unifiedBind(data).then((res) => {
                api.login(data.wxid).then((res)=> {
                    isAuth = true;
                    this.cacheUserInfo(res).then(function () {
                        resolve(true);
                    });
                }, reject);
            }, reject);
        });
    }
}
