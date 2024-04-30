/* global gradioApp */

import { D2PSPromptSelectorUnit } from './D2PSPromptSelectorUnit';
import { D2PSSearch } from './D2PSSearch';
import { TConfig, TTags } from './types';

class D2PSPromptSelector {
    tags: TTags;
    config: TConfig | undefined;
    t2iPromptSelector: D2PSPromptSelectorUnit;
    i2iPromptSelector: D2PSPromptSelectorUnit;

    /**
     * コンストラクタ
     */
    constructor() {
        this.t2iPromptSelector = new D2PSPromptSelectorUnit('txt2img');
        this.i2iPromptSelector = new D2PSPromptSelectorUnit('img2img');
        this.tags = {};
    }

    /**
     * 表示切り替えボタンなどを作成
     * 再読み込みボタンの動作も指定
     */
    createControl() {
        this.t2iPromptSelector.createControl(() => {
            this.init();
        });
        this.i2iPromptSelector.createControl(() => {
            this.init();
        });
    }

    /**
     * 初期化
     */
    async init() {
        await this.getTags();
        this.t2iPromptSelector.init(this.tags, this.config as TConfig);
        this.i2iPromptSelector.init(this.tags, this.config as TConfig);
    }

    /**
     * 表示状態切り替え
     */
    changeVisible() {
        this.t2iPromptSelector.changeVisible();
        this.i2iPromptSelector.changeVisible();
    }

    /**
     * タグファイルをjsonで取得
     * @returns object タグリスト
     */
    async getTags() {
        const response = await fetch(`/d2ps/tags?${new Date().getTime()}`);
        const tags = await response.json();

        // 設定を取り出す
        this.config = tags.__config__;
        delete tags['__config__'];
        this.tags = tags;

        // 検索用に設定
        D2PSSearch.setTags(tags);
    }
}

export { D2PSPromptSelector };
