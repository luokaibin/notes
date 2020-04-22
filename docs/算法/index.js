// 第一题
function flatten(arr) {
  let resultArr = [];
  const _flatten = (arr) => {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        const newItem = item.flat();
        _flatten(newItem);
      } else {
        resultArr.push(item);
      }
    });
  }
  _flatten(arr)
  return resultArr
}

function flatten(arr) {
  if(!Array.isArray(arr)) throw new Error('不是数组');
  const result = [];
  const _flatten = (childArr) => {
    const item = childArr.pop();
    if(Array.isArray(item) && item.length) {
      _flatten(item);
    } else {
      result.unshift(item);
    }
    if(childArr.length) {
      _flatten(childArr);
    }
  }
  _flatten(arr);
  return result;
}
console.log(flatten([1, [2, [3, 4], 5], 6]));

// 第二题
function addComma(num) {
  let numstr = `${num}`;
  let newStr = numstr.replace(/(\d{3})/g, '$1,'); // '123,4'
  let list = newStr.split(','); // ['123', '4']
  let lastLength = list[list.length - 1].length; // 1
  newStr = numstr.slice(lastLength).replace(/(\d{3})/g, ',$1');
  newStr = numstr.slice(0,lastLength) + newStr
  if(newStr.startsWith(',')) {
    return newStr.slice(1);
  }
  return newStr;
}
console.log(addComma(1234)); // 1,234

// 第三题
function sum(...args){
  const paramsList = [...args];
  function add(...rest) {
    paramsList.push(...rest);
    return add;
  }
  add.toString = function() {
    const res = paramsList.reduce((a,b) => a + b);
    return res;
  }
  return add;
}

console.log(sum(1)(2)(3)) // 6
console.log(sum(1, 2, 3)) // 6

// 第四题


function buildLocationTree(arr) {
  const newArr = new Map();

  return newArr;
}

var locationList = [
  { id: 2, pid: 1, name: "深圳市" },
  { id: 0, name: "中国" },
  { id: 1, pid: 0, name: "广东省" },
  { id: 3, pid: 1, name: "广州市" },
  { id: 4, pid: 2, name: "南山区" },
  { id: 5, pid: 3, name: "天河区" },
  { id: 'M', name: "美国" },
]

buildLocationTree(locationList);

// 
class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = this.right = null;
  }
}
let root = new TreeNode('root');
const createTree = (node,index = 0) => {
  if (index > 5) {
    return
  }
  node.left = new TreeNode(`left${index}`);
  node.right = new TreeNode(`right${index}`);
  createTree(node.left, index + 1);
  createTree(node.right, index + 1);
}
createTree(root);

const preorder = node => {
  if (!node) {
    return
  }
  console.log(node.value);
  preorder(node.left);
  preorder(node.right);
}
preorder(root);

// nums = [2, 7, 11, 15], target = 9

const twoSum = (arr,target) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const item = target - arr[i];
    const key = map.get(item);
    if(key !== undefined) {
      return [key, i]
    }
    map.set(arr[i],i);
  }
}

var merge = function(nums1, m, nums2, n) {
  let i = m -1 , j = n - 1, k = m + n -1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--
      k--
    } else {
      nums1[k] = nums2[i];
      j--
      k--
    }
  }
  while (j >= 0) {
    nums1[k] = nums2[j];
    j--
    k--
  }
  return nums1
};

// 三数求和
// [-1, 0, 1, 2, -1, -4, -2, 9, -5, 7, -8, 10]

var threeSum = function(nums,target = 0) {
  nums = nums.sort((a,b) => a - b); // [-8, -5, -4, -2, -1, -1, 0, 1, 2, 7, 9, 10]
  let len = nums.length,res = [];
  for(let i = 0; i < len; i ++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    // 定义左指针
    let l = i + 1;
    // 定义右指针
    let r = len - 1;
    while (l < r) {
      let sum = nums[i] + (nums[l] + nums[r]); // 左右指针的数 加上 固定数 的结果
      if(sum < target) {
        l++
        while(l < r && nums[l] === nums[l - 1]) {
          l++
        }
      }
      if (sum > target) {
        r--
        while(l < r && nums[r] === nums[r + 1]) {
          r--
        }
      }
      if (sum === target) {
        res.push([nums[i],nums[l],nums[r]]);
        l++
        r--
        while(l < r && nums[r] === nums[r + 1]) {
          r--
        }
        while(l < r && nums[l] === nums[l - 1]) {
          l++
        }
      }
    }
  }
  return res;
};

threeSum([-1, 0, 1, 2, -1, -4, -2, 9, -5, 7, -8, 10]);
const map = new Map();
for (let i = -17; i < 27; i++) {
  const res = threeSum([-1, 0, 1, 2, -1, -4, -2, 9, -5, 7, -8, 10], i);
  res.length && map.set(res.length,[i,res]);
}
console.log(map);

// 验证回文串
var validPalindrome = function(s) {
  let i = 0,j = s.length-1,list = s.split('');
  const isPalindrome = (s,e) => {
    let startStr = list[s],endStr = list[e],str;
    list.splice(s,1);
    if (list.join() === list.reverse().join()) {
      return true
    }
    list.reverse()
    list.splice(s,1,startStr);
    list.splice(e,1);
    if (list.join() === list.reverse().join()) {
      return true
    }
    return false;
  }
  while (i < j) {
    if (list[i] === list[j]) {
      i++,j--;
    } else {
      return isPalindrome(i,j);
    }
  }
  return true
};


function buildLocationTree(locationList) {
  let result = [];
  const forEach = (arr,parent = {id:undefined}) => {
    arr.forEach((item,index) => {
      if (item.pid === null || item.pid === undefined) {
        result.push(item);
        arr.splice(index,1);
        forEach(arr,item);
      }
      if (item.pid === parent.id) {
        if (parent.subLocations) {
          parent.subLocations.push(item)
        } else {
          parent.subLocations = [item];
        }
        arr.splice(index,1);
        forEach(arr,item);
      }
    })
  }
  forEach(locationList)
  return result;
}