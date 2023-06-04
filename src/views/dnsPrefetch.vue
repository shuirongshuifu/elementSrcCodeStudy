<template>
  <div>
    <h3>dns预解析的node脚本</h3>
    <br />
    <img
      class="img1"
      src="https://pica.zhimg.com/v2-1f445f7f9ca286084495aef1e790c454_xl.jpg"
      alt=""
    />
    <img
      src="https://p1.ssl.qhimg.com/dr/270_500_/t0173b711ab8cede20c.png?size=480x240"
      alt=""
    />
    <h4>参见：dnsPrefech.js文件</h4>
    <h5>代码具体实现不重要，思路最重要</h5>
    <pre>
      <code>
        const fs = require('fs') // 读取文件模块
        const urlRegex = require('url-regex'); // 非常好用的包，能取出字符串中的域名url
        const { parse } = require('node-html-parser') // 非常好用的包，把字符串解析成html格式

        const path = './dist/js/' // 去操作打包好的dist文件夹的js文件
        const domainArrSet = new Set() // 使用Set集合自带去重

        // 域名url的后边的path不要
        function splitWithSlash(str) {
            let count = 0
            let lastIndex;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == '/') {
                    count = count + 1
                    if (count == 3) {
                        lastIndex = i
                        break
                    }
                }
            }
            return str.slice(0, lastIndex)
        }

        // 统计有个/ or :
        function countChar(str, char) {
            let count = 0;
            for (let i = 0; i < str.length; i++) {
                if (str[i] == char) {
                    count++;
                }
            }
            return count;
        }

        // 提取域名
        function extractDomain(str) {
            const regex = /(https?:\/\/[^\s]+\.[a-zA-Z]{2,})/g;
            const matches = str.match(regex);
            const urls = [];
            if (matches) {
                for (let i = 0; i < matches.length; i++) {
                    urls.push(matches[i].trim());
                }
            }
            return urls[0];
        }

        // 根据文件后缀名判断是否是js文件
        function isJsFile(str) {
            return str.slice(-2) === 'js'
        }

        // 每一个文件都做读取操作
        function readEachFile(url) {
            fs.readFile(url, { encoding: "utf-8" }, function (err, content) {
                if (err) {
                    throw err
                }
                const matchArr = content.match(urlRegex({ strict: true }))
                if (matchArr) {
                    for (const item of matchArr) {
                        let domain = extractDomain(item)
                        if (domain) {
                            let count = countChar(domain, '/')
                            if (count == 2) {
                                domainArrSet.add(domain)
                            } else {
                                let domain2 = splitWithSlash(domain)
                                let num = countChar(domain2, ':')
                                if (num == 1) {
                                    domainArrSet.add(domain2)
                                } else {
                                    domainArrSet.add(domain2.slice(0, -6))
                                }
                            }
                        }
                    }
                }
            })
        }

        // 读取文件夹中的js文件
        fs.readdir(path, (err, files) => {
            if (err) {
                throw err
            }
            for (let file of files) {
                if (isJsFile(file)) {
                    readEachFile(path + file)
                }
            }
            process.nextTick(showDomainArrSet)
        })

        // 看看有多少域名
        function showDomainArrSet() {
            setTimeout(() => {
                for (const domain of domainArrSet) {
                    addLink(domain)
                }
            }, 170);
        }

        // 一个域名就加入一个link的dns-prefetch
        function addLink(domain) {
            const link = `<link href="${domain}" rel="dns-prefetch">\n`
            const html = fs.readFileSync('./dist/index.html', 'utf-8')
            const root = parse(html)
            const head = root.querySelector('head')
            head.insertAdjacentHTML('afterbegin', link)
            fs.writeFileSync('./dist/index.html',root.toString())

        }
      </code>
    </pre>
  </div>
</template>

<style>
.img1 {
  width: 360px;
  height: 360px;
}
pre {
  border: 1px solid #999;
  background-color: #e9e9e9;
}
</style>