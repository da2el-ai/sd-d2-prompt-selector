# D2 Prompt Selector

[[日本語](README_ja.md)]

## About

This is an extension of the Stable Diffusion webui AUTOMATIC1111 version (hereinafter referred to as webui).

I have redesigned [Easy Prompt Selector](https://github.com/blue-pen5805/sdweb-easy-prompt-selector) by Blue Pen to my liking.

Currently, only Japanese is supported.

<img src="./img/screen_about.jpg">

### Basic Functions
- Clicking on a tag button inserts the tag into the prompt input field.
- Clicking on an orange button (group name) inserts a random tag.
- Pressing Ctrl (or Command on Mac) while clicking inserts a negative prompt.
- Right-clicking removes the prompt (may fail sometimes).

### Differences from the original Easy Prompt Selector
- You can place tag files anywhere you want (including OneDrive / Dropbox).
- Hovering over tag buttons displays their contents at the bottom of the screen (requires configuration).
- You can search by tag or button name.
- You can specify the order of tag files.



## Installation

1. Open the "Extensions" tab.
2. Open "Install from URL".
3. Enter `https://github.com/da2el-ai/sd-d2-prompt-selector` in the "URL of the extension repository" field.
4. Click "Install" and wait for the installation to complete.
5. Open "Installed" and click "Apply and restart the UI".


## Edit Tag file

The tag files are located in `{webui installation folder}/extensions/sd-d2-prompt-selector/tags`.

You can specify any location for the tag files in the `タグファイルを置いたフォルダ` setting.

Please edit them with a text editor (Visual Studio Code recommended) as they are in YAML format.


### Sample tag files
```yaml
髪色:
  単色:
    - black hair
    - blonde hair
    - brown hair
  複数色:
    マルチカラー: multicolored hair
    メッシュ: streaked hair
    グラデーション: gradient hair
    インナーカラー: colored inner hair
    スプリットカラー: split-color hair
```

The above YAML will be reflected as follows.

<img src="./img/screen_yaml.png">

```yaml
group:
  - tag
group:
  name: tag
```

Both array and dictionary formats are available. You can also use nested structures.

### Edited tag file no longer appearing?

It's likely due to a YAML formatting error. Please try checking the formatting using tools like [Online YAML Parser](https://qiita.com/YumaInaura/items/8e4c08821b6940299a27).

### I want to reflect the changes I made

They will be applied by clicking the reload button.

<img src="./img/screen_reload.png">

### I want to set the order of tabs (tag file switch buttons)

You can specify the order in the __config__.yml file in the tag folder.


```yaml
sort:
  - 人
  - 人_顔
  - 人_髪
```

Files not listed here will be sorted alphabetically by filename.


## Settings

You can configure it from `Settings > D2 Prompt Selector` in the webui.

### タグフォルダ / Tag Folder

Specify the folder where tag files are located with the full path.

When left blank, it defaults to `{webui installation folder}/extensions/sd-d2-prompt-selector/tags`.

### 検索結果をリアルタイムに表示する / Display search results in real-time

By default, the search results are displayed when you click the search button or press the Enter key. However, turning on this setting will display the search results in real-time as you type.


### タグボタンにマウスが乗ったら画面下端にプロンプトを表示する / Display prompt at the bottom of the screen when hovering over tag buttons

You can quickly check the contents of the tags.

### 元プロンプトを pngInfo に保存する / Save the original prompt to pngInfo

When using random tags, the result of the random selection is usually recorded in pnginfo. With this setting enabled, random prompts will also be recorded.

## Update

- 2024.05.02
  - 1st release

## Licence

MIT
