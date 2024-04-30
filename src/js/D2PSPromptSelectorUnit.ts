/* global gradioApp */

import { D2PSElementBuilder } from './D2PSElementBuilder';
import { D2PSTabNavi } from './D2PSTabNavi';
import { D2PSCategory } from './D2PSCategory';
import { TConfig, TTags, TTagsDict } from './types';

declare var gradioApp: any;
declare var updateInput: any;

/*********************************************************
 * プロンプトセレクター本体
 * txt2img / img2img それぞれで作成する
 */
class D2PSPromptSelectorUnit {
    AREA_ID_BASE = 'd2-prompt-selector-';

    type: string;
    visible: boolean;
    toNegative: boolean;
    tags: TTags;
    config: TConfig | undefined;
    categories: D2PSCategory[];
    tabNavi: D2PSTabNavi | undefined;

    /**
     * コンストラクタ
     */
    constructor(type = 'txt2img') {
        console.log('D2PSPromptSelectorUnit constructor', type);
        this.type = type;
        this.visible = false;
        this.toNegative = false;
        this.tags = {};
        this.categories = [];
    }

    createControl(reloadClick: () => void) {
        // 表示切り替えボタン
        const button = D2PSElementBuilder.openButton({
            onClick: () => {
                this.changeVisible();
            },
        });

        // タグ再読み込みボタン
        const reloadButton = gradioApp().getElementById(`d2_ps_reload_button_${this.type}`);
        reloadButton.addEventListener('click', async () => {
            await reloadClick();
        });

        // 機能拡張エリアの枠を生成ボタンの下に移動しちゃう
        const actionColumn = gradioApp().getElementById(`${this.type}_actions_column`);
        const container = document.createElement('div');
        container.classList.add('d2ps-action-container');
        container.appendChild(button);
        container.appendChild(reloadButton);
        actionColumn.appendChild(container);
    }

    /**
     * 初期化
     */
    init(tags: TTags, config: TConfig) {
        console.log('init', this.type);
        this.tags = tags;
        this.config = config;

        // タグボタンを消して作り直す
        const container = this.$_getContainer();
        if (container != null) {
            container.remove();
            this.categories = [];
        }
        gradioApp().getElementById(`${this.type}_toprow`).after(this.$_render());
    }

    /**
     * 表示状態切り替え
     */
    changeVisible() {
        this.visible = !this.visible;
        this.$_getContainer().style.display = this.visible ? 'block' : 'none';
    }

    /**
     * タグ全体を格納したコンテナ
     */
    private $_getContainer(): HTMLElement {
        console.log(`#${this.AREA_ID_BASE}${this.type}`);
        console.log(gradioApp().querySelector(`#${this.AREA_ID_BASE}${this.type}`));
        return gradioApp().querySelector(`#${this.AREA_ID_BASE}${this.type}`);
    }

    /**
     * タグエリア全体を作る
     */
    private $_render() {
        // 全体を覆うコンテナ
        const container = D2PSElementBuilder.psContainer(`${this.AREA_ID_BASE}${this.type}`);

        // ネガティブ送信チェックボックス
        const negativeCheckbox = D2PSElementBuilder.negativeCheckbox(
            'ネガティブプロンプトに入力（ctrl + クリックでも可）',
            {
                onChange: (checked) => {
                    this.toNegative = checked;
                },
            },
        );
        container.appendChild(negativeCheckbox);
        // タブ切り替えボタン
        container.appendChild(this.$_renderTabNavi());
        // タグカテゴリ作成
        this.$_renderCategory(container);

        this.$_changeCategory();

        return container;
    }

    /**
     * タブ切り替えを作る
     */
    private $_renderTabNavi(): HTMLElement {
        this.tabNavi = new D2PSTabNavi(() => {
            this.$_changeCategory();
        });
        return this.tabNavi.createTabNavi(this.config as TConfig, this.tags);
    }

    /**
     * アクティブカテゴリーを切り替える
     */
    private $_changeCategory() {
        this.categories.forEach((category: D2PSCategory) => {
            if (this.tabNavi!.activeCategory === category.categoryId) {
                category.container.style.display = 'block';
            } else {
                category.container.style.display = 'none';
            }
        });
    }

    /**
     * タグカテゴリを作る
     */
    private $_renderCategory(psContainer: HTMLElement) {
        Object.keys(this.tags).forEach((categoryId: string) => {
            const category = new D2PSCategory(
                categoryId,
                (tag: string, toNegative: boolean = false) => {
                    this.$_addTag(tag, toNegative);
                },
                (tag: string, toNegative: boolean = false) => {
                    this.$_removeTag(tag, toNegative);
                },
            );
            const categoryContainer = category.createCategory((this.tags as TTagsDict)[categoryId]);
            psContainer.appendChild(categoryContainer);
            this.categories.push(category);
        });
    }

    private $_addTag(tag: string, toNegative: boolean = false) {
        const id = toNegative || this.toNegative ? `${this.type}_neg_prompt` : `${this.type}_prompt`;
        console.log('add tag', id);
        console.log(gradioApp().getElementById(id));
        const textarea = gradioApp().getElementById(id).querySelector('textarea');

        if (textarea.value.trim() === '') {
            textarea.value = tag;
        } else if (textarea.value.trim().endsWith(',')) {
            textarea.value += ' ' + tag;
        } else {
            textarea.value += ', ' + tag;
        }

        updateInput(textarea);
    }

    private $_removeTag(tag: string, toNegative: boolean = false) {
        const id = toNegative || this.toNegative ? `${this.type}_neg_prompt` : `${this.type}_prompt`;
        const textarea = gradioApp().getElementById(id).querySelector('textarea');

        if (textarea.value.trimStart().startsWith(tag)) {
            const matched = textarea.value.match(new RegExp(`${tag.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&')},*`));
            textarea.value = textarea.value.replace(matched[0], '').trimStart();
        } else {
            textarea.value = textarea.value.replace(`, ${tag}`, '');
        }

        updateInput(textarea);
    }
}

export { D2PSPromptSelectorUnit };
