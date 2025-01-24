const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function findMarkdownFiles(directory) {
    let markdownFiles = [];
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            markdownFiles = markdownFiles.concat(findMarkdownFiles(fullPath));
        } else if (file.endsWith('.md')) {
            markdownFiles.push(fullPath);
        }
    });

    return markdownFiles;
}

async function replaceLinksInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const regex = /(https:\/\/static\.jiabanmoyu\.com[^\s)]+)/g;
    const links = content.match(regex);

    if (links) {
        for (let link of links) {
            link = link.replace(/\"/g, '')
            const newLink = await uploadContent(link);
            // content = content.replace(link, newLink);
        }
        // fs.writeFileSync(filePath, content, 'utf-8');
    }
}
let i = 0;
const KB = 1024;
const MB = 1024 * 1024;
async function uploadContent(url) {
  i++
  console.log(i, ":", url)
  // const response = await fetch(url);
  // const blob = await response.arrayBuffer();
  // const size = blob.byteLength / MB < 1 ? (blob.byteLength / KB).toFixed(2) + "KB" : (blob.byteLength / MB).toFixed(2) + "MB";
  // const img = sharp(blob).avif({quality: 50})
  // const buff = await img.toBuffer();
  // const buffSize = buff.length / MB < 1 ? (buff.length / KB).toFixed(2) + "KB" : (buff.length / MB).toFixed(2) + "MB";
  // console.log(i, ":", size, ":", buffSize)
  // console.log(i, ":", response)
    // const newUrl = await uploadToNewLocation(response.data);
    // return newUrl;
}

async function uploadToNewLocation(buff) {
  const form = new FormData();
  form.append('source', buff, {
    filename: `${dayjs().format('YYYY-MM-DD')}.avif`, // 指定文件名
    contentType: 'application/octet-stream' // 指定 MIME 类型
  })
  form.append('format', 'json')
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.picgo.net/api/1/upload',
    headers: { 
      'X-API-Key': 'chv_Kiai_fa008b4ad7d75085cdd13b90cc5a385c9a352d9583e59bba2d50b4f0957bd515e7e792bb814681be41a8b9a393f3e28541db07ceb8fea3d8f85f8e1c58a1b52b', 
      ...form.getHeaders()
    },
    data : form
  };
  if (!screenshot.length) return
  const result = await axios.request(config)
  const imgUrl = result?.data?.image?.url
    // 这里实现上传逻辑，返回新链接
    // 示例：假设上传返回一个新的URL
    return "https://new.location.com/uploaded_content";
}

async function main() {
    const directory = '.'; // 当前目录
    const markdownFiles = findMarkdownFiles(directory);

    for (const filePath of markdownFiles) {
        await replaceLinksInFile(filePath);
    }
}

main().catch(console.error);