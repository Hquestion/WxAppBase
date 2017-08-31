/**
 * Created by Administrator on 2016/7/1.
 */
import { Indicator, Toast } from 'mint-ui';

let loadingTimer = null;
let timeoutTimer = null;

export function httpInterceptor(req, next){
    req.timeout = 30000;
    clearTimeout(loadingTimer);
    if(!req.ignore) {
        Indicator.open({
            text: '拼命加载中...',
            spinnerType: 'fading-circle'
        });
    }
    clearTimeout(timeoutTimer);
    timeoutTimer = setTimeout(function(){
        Indicator.close();
        Toast({
            message: '请求超时，请重试！',
            position: 'bottom'
        });
    }, req.timeout);
    next(function(res) {
        clearTimeout(loadingTimer);
        clearTimeout(timeoutTimer);
        loadingTimer = setTimeout(()=>{
            Indicator.close();
        }, 300);
        if(res.status >= 500) {
            Toast({
                message: '请求失败，服务器异常',
                position: 'bottom'
            });
        }
    });
}
