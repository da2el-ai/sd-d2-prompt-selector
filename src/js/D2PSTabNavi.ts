import { D2PSElementBuilder } from './D2PSElementBuilder';
import { TConfig, TTags } from './types';

class D2PSTabButton {
    button: HTMLButtonElement;
    id: string;

    constructor(id: string, onClick: (id: string) => void) {
        this.id = id;
        this.button = D2PSElementBuilder.tabButton(id, {
            onClick: () => {
                onClick(this.id);
            },
        });
    }

    setActive(bool: boolean) {
        this.button.setAttribute('data-active', bool ? 'true' : 'false');
    }
}

///////////////////
class D2PSTabNavi {
    tabButtons: D2PSTabButton[];
    activeCategory: string;
    onChange: () => void;

    constructor(onChange: () => void) {
        this.onChange = onChange;
        this.tabButtons = [];
        this.activeCategory = '';
    }

    /**
     * タブ切り替えボタンを作る
     */
    createTabNavi(config: TConfig, tags: TTags): HTMLElement {
        const idList = Object.keys(tags);
        const sortItems: string[] = Array.from(new Set([...config.sort, ...idList]));
        const container = D2PSElementBuilder.tabContainer();

        sortItems.forEach((id: string) => {
            const tabButton = new D2PSTabButton(id, () => {
                this.$_clickTabButton(id);
            });
            this.tabButtons.push(tabButton);
            container.appendChild(tabButton.button);
        });
        this.$_clickTabButton(sortItems[0]);
        return container;
    }

    /**
     * タブボタンがクリックされた
     */
    private $_clickTabButton(id: string) {
        this.activeCategory = id;

        this.tabButtons.forEach((tabButton) => {
            tabButton.setActive(tabButton.id === id);
        });

        this.onChange();
    }
}

export { D2PSTabNavi };
