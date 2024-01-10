(function () {
  //根据某个仓库的目录树，生对应的UL结构的列表

  var isMdRe = /\.md$/;

  var userMap = {
    beile: '贝勒',
    tusi: '菟丝',
    rufeng: '如风',
    tianming: '天明',
    buji: '布吉',
    lanpang: '蓝胖',
    yefei: '叶菲',
    yuwan: '鱼丸',
    baicao: '百草',
    nanxing: '南星',
    qixing: '七星',
    nanzhu: '南烛',
    longer: '龙二',
    lanpang_Dragon18: '蓝胖小书包',
  };

  //拼凑UL的起始标签
  var str = stdout.split(/[\r\n]/).map(function (line) {
    var data = line.split(/[\t]/);
    var info = data[0].split(/\s+/);
    //命令行输出的格式为：100644 blob a945aa9c17b4b14ed90afd2a36fb178a7b932c58	lanpang/2014-01-17.md
    //文件名前方是制表符，前3项（id，type，hash）用空格隔开
    //因此下方用此特征来排除“非法”的行
    //注意，如果要对文件名进行过滤，比如只对md文档处理，不要在这里做判断
    //这会造成目录树混乱，应该在生成后的DOM进行操作
    if (data.length !== 2 || info.length !== 3) return;
    //path
    var file = data[1];
    //type,blob or tree
    var type = info[1];
    //num代表了当前目录的层级
    var num = file.split(/\//);
    //当前路径是否为目录
    var isTree = type === 'tree';
    //有多少层级，就生成多少个制表符，通过制表符数量来决定文件的嵌套规则
    var space = new Array(num.length).join('\t');
    //获取文件名，由于担心文件名中存在双引号，这里统统删除掉
    //所以markdown文件名中不要包含双引号
    var fileName = deOctal(num[num.length - 1].replace(/['"]/g, ''));

    //如果是第一层目录，则查询map
    if (num.length === 1) {
      if (userMap[fileName]) fileName = userMap[fileName];
    }

    var href = '/weekly/' + deOctal(file.replace(/['"]/g, ''));
    if (isTree) {
      return (
        space +
        '<li><a class="tree" href="javascript:;"><i class="icon icon-xiangyou"></i>' +
        fileName +
        '</a><ul class="sub-list hidden">'
      );
    } else {
      return (
        space +
        '<li class="link"><a class="blob J-pjax" href="' +
        href +
        '">' +
        fileName +
        '</a></li>'
      );
    }
  });

  //生成ul的闭合标签
  str.forEach(function (line, index) {
    if (!line) return;
    if (str[index + 1]) {
      var nextTab = str[index + 1].split('\t').length;
    } else {
      nextTab = 0;
    }
    var currentTab = str[index].split('\t').length;
    //如果下一行的缩进，小于当前行，并且还没有到最后一行的时候，则开始闭合ul标签
    if (nextTab - currentTab < 0 && str[index + 1]) {
      str[index] += new Array(Math.abs(nextTab - currentTab) + 1).join('</ul></li>');
    }
  });

  //将八进制转换成汉字
  function deOctal(file) {
    file = file.replace(/(\\\d{3})/g, function (a, b) {
      //首先需要将8进制转换成16进制
      var num = parseInt(b.substring(1), 8).toString(16);
      return '%' + num.toUpperCase();
    });
    //将16进制转换为汉字
    return decodeURIComponent(file);
  }

  var ul = '<ul>' + str.join('\r\n') + '</ul></li></ul>';
  var $post = $('#posts-list');
  $post
    .html(ul)
    //过滤掉不包含任何md文件的节点
    .find('li')
    .each(function (index, $li) {
      $li = $($li);
      var $a = $li.find('a:first');
      if ($a.length < 1) return;
      //如果是非目录文件且又不是markdown文档，或者后辈元素中不存在任何md文件，则认为是无效文件夹，予以删除
      if (($a.hasClass('blob') && !isMdRe.test($a.attr('href'))) || $li.html().indexOf('.md') < 0) {
        $li.remove();
      }
    });

  //删除第一级目录下的README.md
  $post.find('>ul>li>a[href*=README]').parents('li').remove();
})();
