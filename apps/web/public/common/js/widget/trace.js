/**
 * @desc 打点统计
 * @document http://gitlab.mogujie.org/buji/moneyback-doc/blob/master/trace/README.md
 */
var trace = function(traceName) {

    if (traceName && traceName.split(',').length === 4) {
        var img = new Image(),
            src = '//f.mogujie.com/pay/api/trace?';

        src += 'trace=' + encodeURIComponent(traceName);
        img.src = src;
    }
};

$(document).on('click', '.__trace__', function() {
    var traceName = $(this).attr('data-trace');
    trace(traceName);
});

module.exports = trace;
