const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
// const FormData = require('form-data');
const axios = require('axios');

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
            // if (newLink) {
            //   content = content.replace(link, newLink);
            // }
        }
        // fs.writeFileSync(filePath, content, 'utf-8');
    }
}
let i = 10000358;
// let initNum = 10000000;
const KB = 1024;
const MB = 1024 * 1024;
async function uploadContent(url) {
  i++
  if (i > 10000361) return;
  try {
    const response = await fetch(url);
    const blob = await response.arrayBuffer();
    const size = blob.byteLength / MB < 1 ? (blob.byteLength / KB).toFixed(2) + "KB" : (blob.byteLength / MB).toFixed(2) + "MB";
    const img = sharp(blob).avif({quality: 50})
    // const metadata = await img.metadata()
    const buff = await img.toBuffer();
    // const base64DataUrl = `${buff.toString("base64")}`;
    const buffSize = buff.length / MB < 1 ? (buff.length / KB).toFixed(2) + "KB" : (buff.length / MB).toFixed(2) + "MB";
    console.log(i, ":", size, ":", buffSize)
    const newBlob = new Blob([buff], { type: 'application/octet-stream' });
    const newUrl = await uploadToNewLocation(newBlob, i);
    return newUrl;
  } catch (error) {
    console.log(i, ":", url, ":", error);
    return '';
  }
  
}

async function uploadToNewLocation(buff, fileName) {
  const form = new FormData();
  form.append('source', buff, {
    filename: `${fileName}.avif`, // 指定文件名
    contentType: 'application/octet-stream' // 指定 MIME 类型
  })
  // form.append('source', buff)
  form.append('format', 'json')
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.picgo.net/api/1/upload',
    headers: { 
      'X-API-Key': '<YOUR_PICGO_API_KEY>', 
      // ...form.getHeaders()
    },
    data : form
  };
  if (!buff.size) return
  const result = await fetch('https://www.picgo.net/api/1/upload',{method: 'POST', body: form, maxBodyLength: Infinity, headers: { 'X-API-Key': '<YOUR_PICGO_API_KEY>' }})
  const json = await result.json()
  console.log(await result.json())
  const imgUrl = json?.image?.url
    // 这里实现上传逻辑，返回新链接
    // 示例：假设上传返回一个新的URL
  return imgUrl;
}

async function main() {
    const directory = '.'; // 当前目录
    const markdownFiles = findMarkdownFiles(directory);

    for (const filePath of markdownFiles) {
        await replaceLinksInFile(filePath);
    }
}

main().catch(console.error);