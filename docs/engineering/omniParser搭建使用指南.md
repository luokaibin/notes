# OmniParser 搭建使用完整手册（自包含版）

> 对应项目：`~/Documents/work/omniParser`（微软 OmniParser 开源项目的本地克隆 + 自研「UI 还原度交叉验证」工作流）
> 定位：把 UI 截图解析成结构化元素（可交互区域检测 + 图标描述 + OCR），并用它做**设计稿 vs 实现截图的还原度对比评分**。
> 本文档为**自包含整合版**，已收录项目内 README 的安装/权重说明、本地工作流脚本（setup_mac.sh / test_omniparser.py / validate_restoration.py）的全部使用细节与内部机制，无需再查阅项目内其他文档。
> 整合时间：2026-09-01。

---

# 第一部分 · 它是什么

两条能力线：

## 1.1 上游能力：OmniParser v2（微软开源）

把 UI 截图解析成结构化、易于理解的元素，显著增强视觉模型（GPT-4V 等）把动作准确 grounding 到界面区域的能力。内部三个模型协作：

```
UI 截图
  ├─ YOLO 图标检测（icon_detect，v3 为 YOLOv9-E 架构）──► 可交互元素候选框
  ├─ EasyOCR 文本识别 ────────────────────────────────► 文本框 + 文字内容
  │      （两者按 IoU 阈值 0.7 合并去重）
  └─ Florence2 图标描述（icon_caption_florence）──────► 为每个图标生成语义描述
  ▼
元素列表：bbox（0~1 归一化 xyxy）+ type + content + interactivity
```

- V2 在 ScreenSpot Pro grounding 基准取得当时 SOTA（39.5%）。
- 项目背景：OmniParser 曾登顶 HuggingFace 模型榜；配套 OmniTool 可用 OmniParser + 任意视觉模型控制 Windows 11 VM。
- 上游模型权重均托管在 HuggingFace：`microsoft/OmniParser-v2.0`（V2）、`microsoft/OmniParser`（V1.5）。
- 许可证：`icon_detect_v3` 基于 MIT 许可的 YOLOv9 实现；更早的 Ultralytics 系图标检测保留其原 AGPL 许可；caption 模型为 MIT。商用需注意检测模型代际。

## 1.2 本地工作流：UI 还原度交叉验证（本仓库新增）

```
design.jpeg（设计稿截图）──► test_omniparser.py ──► output_design/parsed_elements.json
impl.jpeg（实现截图）    ──► test_omniparser.py ──► output_impl/parsed_elements.json
                                        │
                    validate_restoration.py（IoU + 文本相似度 + 匈牙利算法最优匹配）
                                        │
                    restore_report/：report.md + report.json + comparison.png
```

两图像素尺寸不同也没关系——OmniParser 输出 0~1 归一化 bbox，元素在归一化空间直接可比。

已有产出示例：`restore_report/`、`restore_report_news/`、`restore_report_article/`、`restore_report_briefcard/`、`restore_report_goal/`，对应 `output_design|impl`、`output_news_design|impl`、`output_article_design|impl`、`output_goal_design|impl` 等解析产物目录。

---

# 第二部分 · 环境搭建（macOS，手把手）

## 2.1 方式 A：一键脚本（推荐，本机已验证）

```bash
cd ~/Documents/work/omniParser
bash setup_mac.sh
```

脚本幂等（可安全重复跑），依次完成 5 步：

1. **修复 Homebrew Python pyexpat → brewed expat**：macOS 26 (Tahoe) 上 Homebrew Python 的 pyexpat 链接系统 `/usr/lib/libexpat.1.dylib` 会破坏 pip/poetry/ensurepip。脚本用 `install_name_tool` 把相关 `.so` 重链到 `/opt/homebrew/opt/expat/lib/libexpat.1.dylib` 并重新 ad-hoc 签名。已 patch 过的不会重复处理。
2. **创建 Python 3.12 venv（`.venv`）**：默认用 `/opt/homebrew/bin/python3.12`，可用环境变量覆盖：`PYTHON312=/path/to/python3.12 bash setup_mac.sh`。已有 `.venv` 则跳过。
3. **安装 poetry 并装依赖**：在 venv 内 `pip install poetry`，`poetry config virtualenvs.create false`（依赖直接进 `.venv`），按 `pyproject.toml` 安装 torch/torchvision/easyocr/supervision 0.18.0/transformers 4.46.3/ultralytics 8.3.70/numpy 1.26.4/opencv<5/einops 0.8.0/scipy 等。
4. **下载 OmniParser-v2.0 权重 → `weights/`**：通过 `huggingface_hub.snapshot_download` 拉 `icon_detect/model.pt` + `icon_caption/*`；权重已存在则跳过。
5. **生成合成测试截图**（若缺）：`generate_test_images.py` 产出 `design.jpeg` / `impl.jpeg`。

### 激活环境

```bash
source .venv/bin/activate
```

## 2.2 方式 B：上游原始方式（conda）

```bash
conda create -n "omni" python==3.12
conda activate omni
pip install -r requirements.txt
```

注意：`requirements.txt` 是上游全家桶（gradio、streamlit、pyautogui、paddleocr、anthropic[bedrock,vertex]、boto3 等），比本地工作流实际需要的重得多；macOS 上优先方式 A。

## 2.3 权重手动下载（备用）

一键脚本权重下载的等价手动命令（上游 README 原生方式）：

```bash
# 检测权重（本地工作流用的 V2 标准路径）
huggingface-cli download microsoft/OmniParser-v2.0 icon_detect/model.pt --local-dir weights

# 描述权重（下载后改名为 icon_caption_florence 是上游 demo 的目录惯例；
# 本仓库 test_omniparser.py 默认读 weights/icon_caption，无需改名）
for f in icon_caption/{config.json,generation_config.json,model.safetensors}; do
  huggingface-cli download microsoft/OmniParser-v2.0 "$f" --local-dir weights
done
```

`.gitignore` 已排除权重目录与所有产物（`.venv/`、`weights/`、`output_*/`、`restore_report*/`、`design.jpeg`、`impl.jpeg`），换机后重跑脚本即可全部补齐。

## 2.4 硬件说明

- CPU 可跑：`util/omniparser.py` 自动选设备（`cuda` if available else `cpu`），Mac 上即 CPU/MPS 路径，首次初始化与推理较慢属正常。
- 完整 GPU 环境下推理显著更快；本地验证工作流单图几十秒内可完成。

---

# 第三部分 · 日常使用（手把手）

先激活虚拟环境：

```bash
cd ~/Documents/work/omniParser
source .venv/bin/activate
```

## 3.1 用法 1：解析单张 UI 截图

```bash
python test_omniparser.py <图片路径> <输出目录> [--box-threshold 0.05]
# 例：
python test_omniparser.py design.jpeg output_design
```

参数：

| 参数 | 默认 | 说明 |
|---|---|---|
| `image` | 必填 | UI 截图路径（png/jpg/jpeg） |
| `output_dir` | 必填 | 结果输出目录（自动创建） |
| `--box-threshold` | 0.05 | YOLO 置信度阈值，越低检出越多（误检也越多） |
| `--som-model` | `weights/icon_detect/model.pt` | 检测模型路径 |
| `--caption-model` | `weights/icon_caption` | 描述模型路径 |
| `--caption-name` | `florence2` | 描述模型类型 |

输出到 `<输出目录>`：

- **`parsed_elements.json`**——结构化结果：

```json
{
  "source_image": "design.jpeg",
  "image_size": { "width": 1170, "height": 2532 },
  "box_threshold": 0.05,
  "elements": [
    {
      "id": 0,
      "type": "text | icon | ...",
      "bbox": [0.0421, 0.1035, 0.4312, 0.1508],   // 0~1 归一化 xyxy
      "content": "Login",
      "interactivity": true,
      "source": "ocr | icon | caption"
    }
  ]
}
```

- **`annotated.png`**——带编号标注的可视化图（SOM 标注，标注框线宽/字号按 `max(图像边长)/3200` 比例自适应）。

## 3.2 用法 2：设计稿 vs 实现还原度对比（核心）

```bash
python validate_restoration.py \
  --design-json output_design/parsed_elements.json --design-img design.jpeg \
  --impl-json   output_impl/parsed_elements.json   --impl-img   impl.jpeg \
  --out restore_report
```

| 参数 | 默认 | 说明 |
|---|---|---|
| `--design-json` | 必填 | 设计稿解析结果 |
| `--design-img` | 必填 | 设计稿原图（用于渲染对比图） |
| `--impl-json` | 必填 | 实现截图解析结果 |
| `--impl-img` | 必填 | 实现原图 |
| `--out` | `restore_report` | 报告输出目录 |

输出三件：

- **`report.md` / `report.json`**——还原度报告（summary + 逐对明细）；
- **`comparison.png`**——左右并排对比图，按类别彩色框出问题元素（绿=matched、橙=text_mismatch、黄=misaligned、红=missing、蓝=extra）。

### 匹配算法（内部机制）

1. 设计稿元素 × 实现元素构建代价矩阵：相似度 = `0.5 × IoU + 0.5 × 文本相似度`（仅双侧都有文字时计入文本项，`SequenceMatcher` 比值，忽略大小写与首尾空白）；
2. `scipy.optimize.linear_sum_assignment`（匈牙利算法）求全局最优指派；
3. 综合相似度低于 0.25 的配对丢弃（计入 missing/extra，不算凑数匹配）。

### 判定阈值（脚本顶部常量，可调）

| 常量 | 值 | 含义 |
|---|---|---|
| `IOU_OK` | 0.50 | IoU ≥ 此值算空间对齐 |
| `CONTENT_OK` | 0.70 | 文本相似度 ≥ 此值算文案一致 |
| `MIN_SIM` | 0.25 | 综合相似度下限，低于即不配对 |
| `W_CONTENT` | 0.5 | 双侧有文字时文本项权重 |

### 五类结果

| 类别 | 含义 |
|---|---|
| matched | 位置与文案均匹配 |
| text_mismatch | 位置对齐但文案不符 |
| misaligned | 文案一致但位置错位 |
| missing | 漏实现（设计稿有、实现无） |
| extra | 多余实现（实现有、设计稿无） |

总分为 **`restoration_score = matched / (matched + text_mismatch + misaligned + missing)`**（extra 不计入分母）。直接看 report.md 的「概览」得分 + 「问题分类统计」表 + 「问题明细」定位漏实现/错位/文案差异。

## 3.3 用法 3：Gradio 可视化 Demo（上游）

```bash
python gradio_demo.py    # 起本地 Web 界面，上传截图交互式查看解析标注结果
```

另有 `demo.ipynb`（上游示例 notebook，含 V1.5/V2 用法与 interactive 属性预测示例）。

## 3.4 Python API 直接调用

不经过脚本、在自己的代码里用 Omniparser：

```python
import base64
from util.omniparser import Omniparser

config = {
    "som_model_path": "weights/icon_detect/model.pt",
    "caption_model_name": "florence2",
    "caption_model_path": "weights/icon_caption",
    "BOX_TRESHOLD": 0.05,                    # 注意：历史拼写，参数名就是如此
}
parser = Omniparser(config)                  # 自动选 cuda/cpu 设备

with open("screenshot.png", "rb") as f:
    image_b64 = base64.b64encode(f.read()).decode("ascii")

annotated_b64, parsed_content_list = parser.parse(image_b64)
# parsed_content_list: [{ "type": ..., "bbox": [x1,y1,x2,y2] 归一化, "content": ..., "interactivity": ... }, ...]
# annotated_b64: base64 编码的标注图
```

内部流程：OCR（EasyOCR，`text_threshold 0.8`）与 YOLO 检测框按 `iou_threshold 0.7` 合并 → Florence2 为图标生成语义描述 → 输出归一化坐标。

## 3.5 完整演练（首次跑通验证）

```bash
source .venv/bin/activate
python test_omniparser.py design.jpeg output_design     # 1. 解析设计稿
python test_omniparser.py impl.jpeg output_impl         # 2. 解析实现
python validate_restoration.py \
  --design-json output_design/parsed_elements.json --design-img design.jpeg \
  --impl-json output_impl/parsed_elements.json --impl-img impl.jpeg \
  --out restore_report                                   # 3. 生成对比报告
open restore_report/comparison.png restore_report/report.md
```

用自己的真实截图时：设计稿导出为 `design.jpeg`、对应页面实现截图存为 `impl.jpeg`，重跑三步。输出目录按业务命名（沿用现有 `output_news_design` / `restore_report_news` 惯例）。

---

# 第四部分 · 常见问题与调优

| 问题 | 原因 / 解法 |
|---|---|
| 首次解析卡在模型加载 | 正常，CPU 初始化 Florence2 + YOLO 需要时间 |
| 检出元素太少 | 降低 `--box-threshold`（如 0.03）；截图文字过小影响 OCR，尽量原始分辨率截图 |
| 误把背景装饰识别为元素 | 提高阈值；或后处理 `parsed_elements.json` 按 type/面积过滤 |
| 文本识别质量差 | 当前 OCR 为 EasyOCR（`use_paddleocr=False`）；上游 requirements 含 paddleocr 可选路线 |
| macOS 升级后 pip 坏了 | 重跑 `bash setup_mac.sh`，脚本会重新 patch pyexpat（幂等） |
| 换机重建 | clone 后 `bash setup_mac.sh` 一条命令（venv、依赖、权重、测试图全部自动补齐） |
| 两图分辨率差异大导致视觉对比图失真 | comparison.png 会把两图 resize 到统一画布尺寸，bbox 按归一化坐标绘制，判定不受影响 |

---

# 第五部分 · 目录速览

```
omniParser/
├── setup_mac.sh              # 一键环境搭建（幂等，含 macOS 26 pyexpat 修复）
├── test_omniparser.py        # 单图解析 → parsed_elements.json + annotated.png
├── validate_restoration.py   # 设计 vs 实现 还原度对比 → report.json/md + comparison.png
├── generate_test_images.py   # 合成测试截图（design.jpeg / impl.jpeg）
├── gradio_demo.py            # 上游可视化 Demo
├── demo.ipynb                # 上游示例 notebook
├── pyproject.toml            # 本地工作流精简依赖（poetry）
├── requirements.txt          # 上游全家桶依赖（conda 路线用）
├── util/
│   ├── omniparser.py         # Omniparser 封装（YOLO + Florence2 + OCR 合并）
│   ├── utils.py              # 模型加载/OCR/SOM 标注实现
│   ├── box_annotator.py      # 标注绘制
│   └── yolov9.py             # YOLOv9 推理实现
├── weights/                  # 模型权重（gitignored）
│   ├── icon_detect/model.pt
│   └── icon_caption/         # Florence2 描述模型
├── docs/Evaluation.md        # 上游 ScreenSpot 基准评测说明
├── eval/                     # 上游评测脚本
├── output_*/                 # 各业务解析产物（gitignored）
└── restore_report*/          # 各业务还原度报告（gitignored）
```
