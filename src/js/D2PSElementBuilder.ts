// onClick: (elm: HTMLButtonElement, ev: MouseEvent) => void;

import { TElementParams } from './types';
import { D2PSSearch } from './D2PSSearch';

/*********************************************************
 * UI作成クラス
 */
class D2PSElementBuilder {
    /**
     * ボタン作成
     * @param {*} text ボタンに表示するテキスト
     * @param {*} param1 サイズ、色の指定
     */
    static baseButton(text: string, { size = 'sm', color = 'primary' }: TElementParams): HTMLButtonElement {
        const button = document.createElement('button');
        button.classList.add(
            // gradio 3.16
            `gr-button-${size}`,
            `gr-button-${color}`,
            // gradio 3.22
            size,
            color,
        );
        button.textContent = text;

        return button;
    }

    /**
     * タグリストを開くボタン
     */
    static openButton({ onClick = () => {} }: TElementParams): HTMLButtonElement {
        const button = D2PSElementBuilder.baseButton('🔯タグを選択', {
            size: 'sm',
            color: 'secondary',
        });
        button.classList.add('d2ps-button', 'd2ps-button--open');
        button.addEventListener('click', onClick);
        return button;
    }

    /**
     * 全体を覆うコンテナ
     */
    static psContainer(id: string = ''): HTMLElement {
        const container = document.createElement('div');
        container.id = id;
        container.classList.add('d2ps-ps-container', 'tabs', 'gradio-tabs');
        return container;
    }

    /**
     * ネガティブ送信チェックボックス
     */
    static negativeCheckbox(text: string, { onChange }: TElementParams): HTMLElement {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('d2ps-checkbox');
        checkbox.addEventListener('change', () => {
            onChange!(checkbox.checked);
        });

        const labelText = document.createElement('span');
        labelText.classList.add('d2ps-label__text');
        labelText.textContent = text;

        const label = document.createElement('label');
        label.classList.add('d2ps-label');
        label.appendChild(checkbox);
        label.appendChild(labelText);
        return label;
    }

    /**
     * タブコンテナ
     */
    static tabContainer(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('d2ps-tab-nav', 'tab-nav');
        return container;
    }

    /**
     * タブボタン
     */
    static tabButton(text: string, { onClick = () => {} }: TElementParams): HTMLButtonElement {
        const button = D2PSElementBuilder.baseButton(text, {});
        button.addEventListener('click', onClick);
        button.classList.add('d2ps-tab-button');
        return button;
    }

    // /**
    //  * タグのカテゴリ（ファイル単位）を覆うコンテナ
    //  */
    // static categoryContainer(id: string = ''): HTMLElement {
    //     const container = document.createElement('div');
    //     container.id = id;
    //     container.classList.add('d2ps-category-container', 'tabitem', 'gradio-tabitem');
    //     return container;
    // }

    // /**
    //  * グループボタン（ランダムボタン）とタグフィールドを格納する枠
    //  */
    // static groupContainer(): HTMLElement {
    //     const container = document.createElement('div');
    //     container.classList.add('d2ps-group-container');
    //     return container;
    // }

    /**
     * タグボタン、グループを格納する枠
     */
    static tagField(): HTMLElement {
        const field = document.createElement('div');
        field.classList.add('d2ps-tag-field');
        return field;
    }

    /**
     * タグボタン
     */
    static tagButton(
        title: string,
        {
            onClick = () => {},
            onRightClick = () => {},
            onMouseEnter = () => {},
            onMouseLeave = () => {},
            color = 'primary',
        }: TElementParams,
    ): HTMLButtonElement {
        const button = D2PSElementBuilder.baseButton(title, { color });
        button.classList.add('d2ps-button', 'd2ps-button--tag');
        button.addEventListener('click', onClick);
        button.addEventListener('contextmenu', onRightClick);
        button.addEventListener('mouseenter', onMouseEnter);
        button.addEventListener('mouseleave', onMouseLeave);
        return button;
    }

    /**
     * ランダムボタン
     */
    static randomButton(
        title: string,
        { onClick = () => {}, onRightClick = () => {}, color = 'primary' }: TElementParams,
    ): HTMLButtonElement {
        const button = D2PSElementBuilder.baseButton(title, { color });
        button.classList.add('d2ps-button', 'd2ps-button--random');
        button.addEventListener('click', onClick);
        button.addEventListener('contextmenu', onRightClick);
        return button;
    }

    /**
     * ツールチップ
     */
    static toolTipContainer() {
        const container = document.createElement('div');
        container.classList.add('d2ps-tooltip-container');
        return container;
    }

    /**
     * 検索入力エリア
     */
    static searchContainer(input: HTMLInputElement, { onClick = () => {} }: TElementParams) {
        const container = document.createElement('div');
        container.classList.add('d2ps-search-container');
        container.appendChild(input);

        const button = D2PSElementBuilder.baseButton(`${D2PSSearch.ICON}検索`, {
            size: 'sm',
            color: 'secondary',
        });
        button.classList.add('d2ps-button');
        button.addEventListener('click', onClick);
        container.appendChild(button);

        return container;
    }

    static searchInput(): HTMLInputElement {
        const input = document.createElement('input');
        input.classList.add('d2ps-search-input');
        return input;
    }
}

export { D2PSElementBuilder };
