/**
 * Created by 贺小雷 on 2017-09-01.
 */
const hasClass = (function(){
    const div = document.createElement("div") ;
    if( "classList" in div && typeof div.classList.contains === "function" ) {
        return function(elem, className){
            return elem.classList.contains(className) ;
        } ;
    } else {
        return function(elem, className){
            let classes = elem.className.split(/\s+/) ;
            for(let i= 0 ; i < classes.length ; i ++) {
                if( classes[i] === className ) {
                    return true ;
                }
            }
            return false ;
        } ;
    }
})() ;

const removeClass = function(el, className) {
    let classes = el.className.split(/\s+/);
    let index = classes.indexOf(className);
    if(index >= 0) {
        classes.splice(index, 1);
        el.className = classes.join(' ');
    }
};

export default {
    directives: {
        scrollToggle: {
            bind(el, binding, vNode){
                let ctx = vNode.context;
                let lastY = 0;
                let currentY = 0;
                let holder = document.createElement('div');
                holder.style.display = 'none';
                let holderPlaced = false;
                window.EventBus.$on('main-swiper-move', (swiper, e)=>{
                    currentY = swiper.translate;
                    if(lastY > currentY) {
                        if(hasClass(el, 'fixed-nav')) {
                            removeClass(el, 'fixed-nav');
                            holder.style.display = 'none';
                            el.style.transform = 'translate3d(0px, 0px, 0px)'
                        }
                    }else if(lastY < currentY){
                        if(!hasClass(el, 'fixed-nav')) {
                            el.className += 'fixed-nav';
                            if(!holderPlaced) {
                                el.parentNode.insertBefore(holder, el);
                                holder.style.height = el.offsetHeight + 'px';
                            }
                            holder.style.display = 'block';
                        }
                        el.style.transform = 'translate3d(0px, ' + (-1 * swiper.translate) + 'px, 0px)';
                    }
                    lastY = currentY;
                })
            }
        }
    }
}
