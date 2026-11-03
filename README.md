# claude-orange · dsh web GUI 主题

DeepSeek Harness (dsh) Web GUI 的 Claude 暖光羊皮纸主题：陶土橙强调
#DA7756、奶油纸面亮色 / 暖炭黑暗色双模式、UI 思源宋体、代码 SF Mono。
链接、焦点环等 DeepSeek 蓝元素全部重映射为暗金色，聊天栏自适应加宽。

| 项目 | 值 |
| --- | --- |
| 主题 id | claude-orange |
| 包名 | claude-orange |
| 强调色 | #DA7756 |
| 亮色 | 奶油纸面 #F5F3EE / #F1EEE8，正文 #1D1B16 |
| 暗色 | 暖炭底 #1D1B16 / #262119，正文 #F5F3EE |
| 字体 | UI 思源宋体 / 代码 SF Mono, Consolas |

## 特性

- **亮暗双模式**：跟随 dsh 深色模式开关自动切换（`data-ds-dark-theme`），
  暗色变量带 `!important`，稳定压过宿主默认暗色调色板。
- **去蓝化**：`--dsw-static-deepseek-*` 全色阶重映射为赤陶橙-暗金。
- **聊天栏加宽**：`--dsh-chat-user-width: min(calc(100% - 200px), 1500px)`，
  两侧各留 100px、上限 1500px，可按需改 `src/client/claude-orange.module.css`。
- **确定性注入**：样式表由主题自己注入 `<style id="dsh-claude-orange-skin-css">`，
  dispose 时撤除，不依赖 CSS-modules tree-shaking。

## 安装（dsh profile 手动接线）

1. 克隆本仓库到本地，例如 `D:\Install\claude-orange`。
2. 在 profile 的 `package.json`（`~/.dsh/profiles/<profile>/package.json`）里加依赖并加入 bundles：

   ```json
   {
     "dependencies": {
       "claude-orange": "link:D:/Install/claude-orange"
     },
     "dsh": {
       "profile": {
         "bundles": ["claude-orange"]
       }
     }
   }
   ```

3. 在 profile 目录为依赖建 junction：

   ```powershell
   New-Item -ItemType Junction -Path node_modules\claude-orange -Target D:\Install\claude-orange
   ```

4. 重启 dsh。主题亮暗随系统/界面深色模式自动切换。

### 字体

正文字体另需在 dsh 设置（或 ui-theme 配置 `config.fontFamily.text`）里指定
`Source Han Serif CN`（思源宋体），代码字体推荐 `Cascadia Code` / `SF Mono`。

## 开发

```powershell
corepack pnpm install
corepack pnpm run build   # 产物 lib/index.js + lib/client.js
corepack pnpm run watch
```

改 `src/client/claude-orange.module.css` 后重新 build、刷新页面即可生效。

## License

MIT（基于 [le-soleil-se-couche/dsh-appearance](https://github.com/le-soleil-se-couche/dsh-appearance) 的 claude-code 皮肤改编）。
