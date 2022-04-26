(function(root, factory) {
  /* CommonJS */
  if (typeof exports == "object") module.exports = factory();
  /* AMD module */
  else if (typeof define == "function" && define.amd) define(factory);

  /* 修改: 将 wwclassName 改为元素标识 */
  else root.wwtemplate = factory();
}(this, function() {
  "use strict";

  /* 修改: 将 wwclassName 改为元素标识 */
  var wwclassName = /*INSBEGIN:WWCLSNAME*/
    "idle"
    /*INSEND:WWCLSNAME*/
  ;

  // BEGIN: 加载依赖部分
  // 无依赖资源请使用本函数
  //当加载依赖库时可将下面代码注释
  // function loadDependence(fncallback) {
  //   if (typeof fncallback === "function") {
  //     fncallback();
  //   }
  // }

  // 有依赖资源使用本函数
  // 使用方式:
  //  - 将"插件名"设置为具体插件标识, 通常就是插件名称, 不可为中文. 如: swiper
  //  - 如libs中无该插件, 则申请添加该插件
  //  - 将"插件路径"设置为具体插件路径, 通常为js文件, 省略路径中, 开头的"/"和结尾的".js". 如: "/libs/qrcodejs/qrcode.js" 应写为 "libs/qrcodejs/qrcode"
  //  - require 函数第一个参数, 传入依赖资源数组. 通常为config中配置的`插件名`. 可能还包括css文件
  //   - css文件的格式, 以"css!"开头, 省略路径开头的"/"和路径结尾的".css". 如: "/libs/noty/lib/noty.css" 应写为 ""css!libs/noty/lib/noty""
  //  - require 函数第二个参数是个回调函数, 该函数可能会传入参数. 参数与前面数组位置对应. 如不清楚, 自行查阅 (requirejs)[http://requirejs.org/] 文档
  
  var loadDependence = function(fncallback) {
    // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
    if (!window.wwload.idle) {
      window.wwload.idle = "wait";

      // requirejs.config({
      //   paths: {
      //     "idle": "libs/Idle.Js/build/idle.min" // 示例: libs/qrcodejs/qrcode
      //   }
      // });
      
      //如果不注释上边代码可将下边的路径改为插件名

      require(["libs/Idle.Js/build/idle.min"], function() {
        window.wwload.idle = true;
        replace();
        fncallback();
      });
    } else if (window.wwload.idle === "wait") {
      setTimeout(function () {
        loadDependence(fncallback);
      }, 100);
    } else {
      replace();
      fncallback();
    }

    function replace() {
      loadDependence = function(fncallback) {
        fncallback();
      };
    }
  };
  //
  // END: 加载依赖部分 


  // BEGIN: 元素首次初始化处理
  var init = function() {
    // 重写初始化函数
    init = function() {
      return true;
    };
    $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

    // 如有初始化动作, 请在下方添加
  };
  // END: 元素首次初始化处理


function resetAway($ele,newValue){

  try{

  var config = {};
    //console.log($ele.attr("data--awayTimeout"))
    config.awayTimeout = $ele.attr("data--awayTimeout") || 5000;

  var idle;

    var awayCallback  = function(){
      //console.log(new Date().toTimeString() + ":" + "离开了");
      // console.log(idle);
      // console.log($ele);
      $.wwclass.helper.anijsTrigger($ele,"idle",{});
      $.wwclass.helper.updateProp($ele,"data-x-state","idle")

    };

    var awayBackCallback = function(){
      //console.log(new Date().toTimeString() + ":" + "回来了");

     
      $.wwclass.helper.anijsTrigger($ele,"idle.back",{});
      $.wwclass.helper.updateProp($ele,"data-x-state","busy")

    };

    var onVisibleCallback = function(){
      //console.log(new Date().toTimeString() + ":" + "现在正在看页面");


      $.wwclass.helper.updateProp($ele,"data-x-state","shown")
    };

    var onHidenCallback = function(){
      //console.log(new Date().toTimeString() + ":" + "现在没有看页面了");
    
      $.wwclass.helper.updateProp($ele,"data-x-state","invisble")

    };

    var oldIdle = $ele.data("idleobj");
    if(oldIdle){
      
      if(typeof oldIdle.stop === "function")
      oldIdle.stop();
      $.removeData($ele,"idleobj");
    }



    idle = new Idle({
      onHidden : onHidenCallback,
      onVisible : onVisibleCallback,
      onAway : awayCallback,
      onAwayBack : awayBackCallback,
      awayTimeout : config.awayTimeout

    }).start();

    $ele.data("idleobj",idle);

    //console.log(config.awayTimeout);

}catch(e){
  console.log(e);
}

};
  /*
   * @description 初始化每个元素
   * @param {jQuery object} $ele - 需要初始化的元素
   */
  function processElement($ele) {
    // 对 $ele 元素做对应处理

    resetAway($ele);
    
  };

  /*
   * @description 析构每个元素, 也就是该元素该删除时的处理代码
   * @param {jQuery object} $ele - 需要处理的元素
   */
  function finalizeElement($ele) {
    // 对 $ele 元素做对应处理

    var oldIdle = $ele.data("idleobj");
    if(oldIdle){
      if(typeof oldIdle.stop === "Function")
        oldIdle.stop();
        $ele.data("idleobj",null);
    }
  };

  // BEGIN: 监听属性处理
  /*
   * @description 监听函数, 元素的控制属性(data--)改变时处理
   * @param {jQuery object} $ele - 控制属性改变的元素
   * @param {string} attribute - 控制属性的名称
   * @param {string} value - 控制属性改变为何值
   */
  var evtInHandler = function($ele, attribute, value) {
    switch (attribute) {
      case "data--awaytimeout":

        console.log("data--awaytimeout changed to ",value);
        resetAway($ele,value);

        // 处理动作
        break;
      case "finalize":
        finalizeElement($ele);
        break;
      default:
        console.info("监听到 " + attribute + " 属性值改变为 " + value + ", 但是没找到对应处理动作.");
    }
  };
  // END: 监听属性处理

  // 以下部分不需要修改
  if (!$.wwclass) {
    console.error("Can not use without wwclass.js");
    return false;
  }

  var ret = /*INSBEGIN:WWCLSHANDLER*/
    function(set) {
      if (set.length > 0) {
        loadDependence(function() {
          init();
          $(set).each(function(index, targetDom) {
            processElement($(targetDom));
          });
        });
      }
    }
    /*INSEND:WWCLSHANDLER*/
  ;

  return ret;

}));
