import { D2PSElementBuilder } from './D2PSElementBuilder';
import { D2PSToolTip } from './D2PSToolTip';
import { D2PSSearch } from './D2PSSearch';
import { TTags, TTagButtonClick, TElementParams } from './types';

///////////////////
class D2PSCategory {
    onClick: TTagButtonClick;
    onRightClick: TTagButtonClick;
    categoryId: string = '';
    container: HTMLElement;

    constructor(categoryId: string, onClick: TTagButtonClick, onRightClick: TTagButtonClick) {
        this.categoryId = categoryId;
        this.onClick = onClick;
        this.onRightClick = onRightClick;
        this.container = D2PSElementBuilder.tagField();
        this.container.style.display = 'none';
    }

    /**
     * 検索を作る
     */
    createSearch(): HTMLElement {
        this.container.classList.add('d2ps-tag-field--with-random');

        // 検索入力
        const search = new D2PSSearch();
        const searchContainer = search.createSearchContainer((filtered: TTags) => {
            // 過去の検索結果を削除
            const children = this.container.children;
            if (children.length >= 2) {
                children[1].remove();
            }
            const buttonField = D2PSElementBuilder.tagField();
            this.container.appendChild(buttonField);

            // 検索結果のボタンを作る
            this.$_createButtons(filtered, '').forEach((button) => {
                buttonField.appendChild(button);
            });
        });
        this.container.appendChild(searchContainer);

        return this.container;
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
    private $_createButtons(tags: TTags, prefix = ''): HTMLElement[] {
        // 配列ならボタンテキスト無しのタグが並んでいるだけ
        if (Array.isArray(tags)) {
            return tags.map((tag) => {
                return this.$_createTagButton('tag', tag, tag, 'secondary');
            });
        }

        // 以下は連想配列の処理
        return Object.keys(tags).map((key) => {
            const values = tags[key];
            const randomKey = `${prefix}:${key}`;

            // 内容が文字列ならタグ
            if (typeof values === 'string') {
                return this.$_createTagButton('tag', key, values, 'secondary');
            }

            // 以下は内容が配列 or 連想配列だった時
            // ランダムボタンを作成してフィールドに格納
            const field = D2PSElementBuilder.tagField();
            field.classList.add('d2ps-tag-field--with-random');

            field.appendChild(this.$_createTagButton('random', key, `@${randomKey}@`));

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
        type: 'tag' | 'random',
        title: string,
        value: string,
        color = 'primary',
    ): HTMLButtonElement {
        const param: TElementParams = {
            onClick: (e: MouseEvent) => {
                e.preventDefault();
                this.onClick(value, e.metaKey || e.ctrlKey);
            },
            onRightClick: (e: MouseEvent) => {
                e.preventDefault();
                this.onRightClick(value, e.metaKey || e.ctrlKey);
            },
            onMouseEnter: () => {
                D2PSToolTip.showTip(value);
            },
            onMouseLeave: () => {
                D2PSToolTip.hideTip();
            },
            color,
        };

        if (type === 'random') {
            return D2PSElementBuilder.randomButton(title, param);
        } else {
            return D2PSElementBuilder.tagButton(title, param);
        }
    }
}

export { D2PSCategory };
