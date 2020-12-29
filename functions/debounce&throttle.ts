/**
 * 节流
 * excute 目标函数
 * delay 延迟时间
 */
function debounce(excute: Function, delay: number): Function {
  let timer: any;
  return function (this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      excute.call(this, args);
    }, delay);
  };
}

/**
 * 防抖
 * excute 目标函数
 * delay 延迟时间
 */
function throttle(func: Function, delay: number): Function {
  let timer: any = null;
  let startTime = Date.now();
  return function () {
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    let context = this;
    // let args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, arguments);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
}
