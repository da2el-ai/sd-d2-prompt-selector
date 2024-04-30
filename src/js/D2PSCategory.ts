import { D2PSElementBuilder } from "./D2PSElementBuilder";
import { TTags, TTagButtonClick } from "./types";

///////////////////
class D2PSCategory {
  onClick: TTagButtonClick;
  onRightClick: TTagButtonClick;
  categoryId: string = "";
  container: HTMLElement;

  constructor(
    categoryId: string,
    onClick: TTagButtonClick,
    onRightClick: TTagButtonClick
  ) {
    this.categoryId = categoryId;
    this.onClick = onClick;
    this.onRightClick = onRightClick;
    this.container = D2PSElementBuilder.tagField();
    this.container.style.display = "none";
  }

  /**
   * カテゴリーを作る
   */
  createCategory(tags: TTags): HTMLElement {
    this.$_createButtons(tags, this.categoryId).forEach((button) => {
      this.container.appendChild(button);
    });
    return this.container;
  }

  /**
   * ボタンかフィールドを配列で受け取る
   * @param tags
   * @param prefix 階層テキスト
   * @returns
   */
  private $_createButtons(tags: TTags, prefix = ""): HTMLElement[] {
    // 配列ならボタンテキスト無しのタグが並んでいるだけ
    if (Array.isArray(tags)) {
      return tags.map((tag) => {
        return this.$_createTagButton(tag, tag, "secondary");
      });
    }

    // 以下は連想配列の処理
    return Object.keys(tags).map((key) => {
      const values = tags[key];
      const randomKey = `${prefix}:${key}`;

      // 内容が文字列ならタグ
      if (typeof values === "string") {
        return this.$_createTagButton(key, values, "secondary");
      }

      // 以下は内容が配列 or 連想配列だった時
      // ランダムボタンを作成してフィールドに格納
      const field = D2PSElementBuilder.tagField();
      field.classList.add("d2ps-tag-field--with-random");

      field.appendChild(this.$_createTagButton(key, `@${randomKey}@`));

      // ボタンだけのフィールドを作成
      const buttonField = D2PSElementBuilder.tagField();
      field.appendChild(buttonField);

      // 下層またはボタンを作成
      this.$_createButtons(values, randomKey).forEach((button: HTMLElement) => {
        buttonField.appendChild(button);
      });

      return field;
    });
  }

  /**
   * タグボタンを作成
   * @param title ボタンに表示するテキスト
   * @param value プロンプトタグ
   * @param color ボタン色
   * @returns ボタン
   */
  private $_createTagButton(
    title: string,
    value: string,
    color = "primary"
  ): HTMLButtonElement {
    const button = D2PSElementBuilder.tagButton(title, {
      onClick: (e) => {
        e.preventDefault();
        this.onClick(value, e.metaKey || e.ctrlKey);
      },
      onRightClick: (e) => {
        e.preventDefault();
        this.onRightClick(value, e.metaKey || e.ctrlKey);
      },
      color,
    });
    return button;
  }
}

export { D2PSCategory };
