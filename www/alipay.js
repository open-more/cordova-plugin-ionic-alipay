var exec = require('cordova/exec');
module.exports = {
    payment: function(payInfo, success, error) {
        exec(success, error, "Alipay", "payment", [payInfo]);
    },
}; 
