const axios = require('axios');
const app = require('express')();
const cheerio = require('cheerio');

app.get('/', (req, res) => {
    let site = req.query.site;
    if (!site) {
        console.log('Site not specified!');
    }
    site && axios.get(site).then(res2 => {
        const removeAds = (body) => {
            const $ = cheerio.load(body);
            $('.desktop-top').remove();
            $('a').each((idx,el) => {
                var x = $(el);
                let src = x.attr('href');
                if (src === site) {
                    x.attr('href', '#');
                }
            });
            let ret = $.html();
            return ret;
        }

        var body = res2.data;
        body = removeAds(body);
        res.send(body);
    }).catch((err) => {
        res.send('Error! ' + err)
    });
})
.listen(80, () => console.log('Listening on 80!'));
