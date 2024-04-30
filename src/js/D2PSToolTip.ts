/**
プロンプトの内容を画面下部に表示
 */

import { D2PSElementBuilder } from './D2PSElementBuilder';
import { TOpts } from './types';

declare var opts: TOpts;

class D2PSToolTip {
    static CONTAINER_CLASS = 'd2ps-tooltip-container';
    static container: HTMLElement;
    static toHide = false;

    /**
     * 初期化
     */
    static init() {
        const self = D2PSToolTip;

        if (document.querySelector(self.CONTAINER_CLASS)) return;

        self.container = D2PSElementBuilder.toolTipContainer();
        self.container.addEventListener('animationend', () => {
            self.container.setAttribute('data-show', '');
        });
        document.body.appendChild(self.container);
    }

    /**
     * ツールチップの表示は有効か
     */
    static get isEnabled(): boolean {
        return opts.d2_ps_enable_tooltip;
    }

    /**
     * タグを表示
     */
    static showTip(tag: string) {
        const self = D2PSToolTip;
        if (!self.isEnabled) return;

        self.toHide = false;
        self.container.textContent = tag;
        self.container.setAttribute('data-show', 'true');
    }

    /**
     * 非表示
     */
    static hideTip() {
        const self = D2PSToolTip;
        if (!self.isEnabled) return;

        self.toHide = true;

        setTimeout(() => {
            if (!self.toHide) return;

            self.container.setAttribute('data-show', 'false');
        }, 500);
    }
}

export { D2PSToolTip };
