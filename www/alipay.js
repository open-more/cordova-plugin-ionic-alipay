cordova.define("ionic-cordova-plugin-alipay.Alipay", function(require, exports, module) {
    var exec = require('cordova/exec');
    
    module.exports.payment = function(payInfo, success, error) {
        exec(success, error, "Alipay", "payment", [payInfo]);
    };
    
});
    