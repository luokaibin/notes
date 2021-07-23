const path = require('path');
const fs = require('fs');
const day = require('dayjs');
const fm = require('front-matter');
const mark = require('marked');
const { execSync } = require('child_process');
const targetDir = path.resolve(__dirname, 'source/_posts');
const docsDir = path.resolve(__dirname, 'docs')
const ignoreDir = ['work'];
const renderer = new mark.Renderer();
const CMDMap = {
  server: 'npx hexo server',
  build: 'npx hexo generate'
}
// 复制之前先清空
const delDir = (path) => {
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
  }
  return true
}

const wreiteFile = (params) => {
  const content = fs.readFileSync(params.fullpath, {encoding: 'utf-8'});
  const {attributes, body} = fm(content)
  let description = [];
  renderer.text = (text, level) => {
    description.push(text)
  };
  mark(body, { renderer: renderer });
  description = description.reduce((prev,curr) => {
    if (prev.length > 140) {
      return prev;
    }
    return `${prev}${curr.replace(/[\n:]/,' ')}`
  }, '')
  const {categories, title} = params;
  categories.reduce((prev,curr) => {
    const dirPath = path.resolve(targetDir, ...prev, curr);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
    prev.push(curr);
    return prev;
  }, []);
  const meta = {...params, ...attributes, description: attributes.attributes || description};
  // 新meta
  const metaStr = Object.entries(meta).reduce((prev,[key,value], currindex, arr) => {
    let valueStr = '';
    if (Array.isArray(value) && value.length) {
      value.forEach(item => {
        valueStr += `\n  - ${item}`
      })
    }
    if (typeof value === 'string') {
      valueStr = value || '   ';
    }
    if (!prev) {
      prev = `---\n${key}: ${valueStr}`
    } else {
      prev = `${prev}\n${key}: ${valueStr}`
    }
    if (currindex === arr.length - 1) {
      prev = `${prev}\n---`
    }
    return prev
  }, '')
  let word;
  if (attributes && Object.keys(attributes) && Object.keys(attributes).length) {
    const reg = /(---(\n|.)*(---))/;
    reg.test(content);
    const contentMeta = RegExp.$1.split('---')[1]
    word = content.replace(`---${contentMeta}---`, metaStr)
  } else {
    word = `${metaStr}\n${content}`
  }
  fs.writeFileSync(path.resolve(targetDir, ...categories, `${title}.md`), word, {encoding: 'utf-8'})
}
const listFile = (dir) => {
  let arr = fs.readdirSync(dir, {encoding: 'utf-8', withFileTypes: false});
  arr = arr.filter(item => !item.startsWith('.') && !ignoreDir.includes(item))
  arr.forEach(item => {
    const fullpath = path.join(dir, item);
    const stats = fs.statSync(fullpath);
    if (stats.isDirectory()) {
      listFile(fullpath)
    } else if (fullpath.endsWith('.md')) {
      const updated = day(stats.mtime).format('YYYY/MM/DD HH:mm:ss'); // 更新日期
      const date = day(stats.ctime).format('YYYY/MM/DD HH:mm:ss'); // 创建日期
      const fileInfo = fullpath.replace(docsDir,'').split('/').reduce((prev, curr) => {
        if (!curr) {
          return prev;
        }
        if (!curr.endsWith('.md')) {
          prev.categories.push(curr);
          return prev;
        }
        prev.title = curr.replace('.md','')
        return prev;
      }, {categories: [], title: ''})
      wreiteFile({updated, date, ...fileInfo, comments: 'true', fullpath});
    }
  });
}
const run = () => {
  delDir(targetDir);
  listFile(docsDir);
  const cmdstr = CMDMap[process.argv[2]];
  execSync(cmdstr, {stdio: 'inherit'})
}
run()
