const scrapeIt = require('scrape-it');
var iconv = require('iconv-lite');
const cheerio = require('cheerio');

scrapeIt('http://www.chinapaper.net/news/list-8.html', {
  articles: {
    listItem: '.tit',
    data: {
      // Get the article date and convert it into a Date object
      createdAt: {
        selector: '.rtime',
        convert: (x) => new Date(x),
      },

      title: '.title-box > a > b',
      tags: {
        listItem: '.tags > span',
      },

      // Get the content
      content: {
        selector: '.introd',
        //   , how: "html"
      },

      // Get attribute value of root listItem by omitting the selector
      classes: {
        attr: 'class',
      },
    },
  },
}).then(({ data, $, response, body }) => {
  var html = iconv.decode(body, 'gb2312');
  console.log(html);

  let $$ = cheerio.load(html, {
    decodeEntities: false,
  });

  const title = $$('.tit .title-box > a > b').text();
  console.log(title);

  // console.log(data);
  // console.log($);
  // console.log(response);
  // console.log(body);
});
