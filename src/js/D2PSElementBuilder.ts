interface IElementParams {
    size?: string;
    color?: string;
    onClick?: (e: MouseEvent) => void;
    onRightClick?: (e: MouseEvent) => void;
    onChange?: (checked: boolean) => void;
}
// onClick: (elm: HTMLButtonElement, ev: MouseEvent) => void;

/*********************************************************
 * UI作成クラス
 */
class D2PSElementBuilder {
    /**
     * ボタン作成
     * @param {*} text ボタンに表示するテキスト
     * @param {*} param1 サイズ、色の指定
     */
    static baseButton(text: string, { size = 'sm', color = 'primary' }: IElementParams): HTMLButtonElement {
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
    static openButton({ onClick = () => {} }: IElementParams): HTMLButtonElement {
        const button = D2PSElementBuilder.baseButton('🔯タグを選択', {
            size: 'sm',
            color: 'secondary',
        });
        button.classList.add('d2ps-open-button');
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
    static negativeCheckbox(text: string, { onChange }: IElementParams): HTMLElement {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
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
    static tabButton(text: string, { onClick = () => {} }: IElementParams): HTMLButtonElement {
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
        { onClick = () => {}, onRightClick = () => {}, color = 'primary' }: IElementParams,
    ): HTMLButtonElement {
        const button = D2PSElementBuilder.baseButton(title, { color });
        button.classList.add('d2ps-tag-button');
        button.addEventListener('click', onClick);
        button.addEventListener('contextmenu', onRightClick);
        return button;
    }

    /**
     * ランダムボタン
     */
    static randomButton(
        title: string,
        { onClick = () => {}, onRightClick = () => {}, color = 'primary' }: IElementParams,
    ): HTMLButtonElement {
        const button = D2PSElementBuilder.baseButton(title, { color });
        button.classList.add('d2ps-tag-button');
        button.addEventListener('click', onClick);
        button.addEventListener('contextmenu', onRightClick);
        return button;
    }
}

export { D2PSElementBuilder };
