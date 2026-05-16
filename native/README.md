# Cory Receipt CV — 原生移动 App

独立 Expo React Native 应用，在 **iOS / Android** 上以原生视图渲染小票简历（非 WebView、非 PWA）。

数据与 Web 版共用仓库根目录 [`src/cvData.js`](../src/cvData.js)。

## 环境要求

- Node.js 18+
- 手机安装 **Expo Go**（[iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)）
- Windows 可开发；**打 iOS 正式包**需 Apple Developer + EAS 云构建（无需本地 Mac 编译）

## 本地预览（推荐 · 局域网）

**不要用 `--tunnel`**，除非 ngrok 已配置好；在 Windows 上 tunnel 经常报 `Cannot read properties of undefined (reading 'body')`。

```bash
cd native
npm install
npm run start
```

等价于 `npx expo start --lan`。

1. iPhone 与电脑连接 **同一 Wi-Fi**（不要用蜂窝数据）。
2. 终端出现二维码后，用 **Expo Go** 扫码。
3. 若扫不出，在 Expo Go 里选 **Enter URL manually**，输入（把 IP 换成你电脑局域网地址）：

```text
exp://192.168.124.26:8081
```

在 Windows 上查看本机 IP：`ipconfig`，使用 **192.168.x.x** 那一行，不要用 `100.64.x.x`（多为 VPN）。

### 扫不出 / tunnel 失败时

| 现象 | 处理 |
|------|------|
| `Port 8081 is being used` | 关掉其他终端里的 `expo start`，只保留一个 |
| `--tunnel` + ngrok 报错 | 改用 `npm run start`（局域网） |
| 有二维码但手机连不上 | Windows 防火墙允许 Node.js「专用网络」 |
| 终端写 `Networking has been disabled` | 关闭离线：PowerShell 执行 `$env:EXPO_OFFLINE="0"` 后再 `npm run start` |

### 仍需要 tunnel（不同 Wi-Fi）

```bash
cd native
npm install
npm run start:tunnel
```

已在项目内安装 `@expo/ngrok`。若仍失败，优先用局域网 + 手动 URL。

## 项目结构

| 文件 | 说明 |
|------|------|
| `App.js` | 入口，SafeArea + StatusBar |
| `src/ReceiptScreen.js` | 小票 UI（ScrollView + 原生 Text/Pressable） |
| `src/data.js` | 读取 `../src/cvData.js` 并生成展示数据 |
| `src/styles.js` | 视觉样式 |
| `metro.config.js` | 允许引用上级目录 `cvData.js` |
| `eas.json` | EAS 云构建配置 |

## 正式安装包（EAS Build）

首次需登录 Expo 并初始化项目：

```bash
npm install -g eas-cli
eas login
cd native
eas init
```

### Android APK（内测分发）

```bash
eas build -p android --profile preview
```

构建完成后在 Expo 网站下载 APK，传到手机安装。

### iOS（TestFlight / 内测）

```bash
eas build -p ios --profile production
```

- 需要 **Apple Developer Program**（约 $99/年）。
- 构建在 Expo 云端完成，无需 Windows 上装 Xcode。
- 完成后可用 `eas submit -p ios` 提交 TestFlight，或下载 `.ipa` 按 Expo 文档安装到已注册设备。

### 生产环境

```bash
eas build -p android --profile production
eas build -p ios --profile production
```

## 与 Web 版关系

| 版本 | 入口 | 用途 |
|------|------|------|
| 桌面 CV | `/` → `index.html` | 完整矩阵简历 + 编辑面板 |
| 移动 Web 小票 | `/mobile.html` | 浏览器 / PWA |
| **本 App** | `native/` | iPhone / Android 原生壳 + 原生 UI |

修改简历内容时，请编辑根目录 [`src/cvData.js`](../src/cvData.js)，Web 与 App 会同步（App 通过 Metro 引用该文件）。

## 常见问题

**Q: 扫码后一直 Loading？**  
同一 Wi-Fi，或改用 `npx expo start --tunnel`。

**Q: 能否上架 App Store？**  
可以。用 `eas build` + `eas submit`，并准备图标（替换 `assets/icon.png` 为 1024×1024）、隐私说明等。

**Q: 和「添加到主屏幕」有什么区别？**  
本目录是 **React Native 原生应用**，由系统以 App 形式安装；不是 Safari 里的网页快捷方式。
