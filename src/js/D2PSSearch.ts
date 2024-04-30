/** 検索機能 */

import { D2PSElementBuilder } from './D2PSElementBuilder';
import { TTags, TTagsDict, TOpts } from './types';

declare var opts: TOpts;

type TConvedTags = {
    ___: string[];
    [key: string]: string | string[];
};

/**
 * タグの階層を１階層のみにする
 */
const tagConvert = (orgTags: TTags): TConvedTags => {
    const conved: TConvedTags = { ___: [] };

    function traverse(tags: TTags) {
        if (Array.isArray(tags)) {
            conved.___.push(...tags);
            return;
        }
        Object.keys(tags).forEach((key) => {
            const value = tags[key];

            if (typeof value === 'string') {
                conved[key] = value;
                return;
            }

            traverse(value);
        });
    }

    traverse(orgTags);
    return conved;
};

/**
 * 変換済みのタグ一覧から検索して連想配列にして返す
 */
const tagSearch = (convedTags: TConvedTags, keyword: string): TTagsDict => {
    const filtered: TTagsDict = {};

    // 配列から探す
    convedTags.___.filter((value) => {
        return value.includes(keyword);
    }).forEach((value) => {
        filtered[value] = value;
    });

    // 連想配列から探す
    Object.keys(convedTags).forEach((key) => {
        if (key === '___') return;

        const value = convedTags[key];
        if (value.includes(keyword)) {
            filtered[key] = value;
        }
    });

    return filtered;
};

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
class D2PSSearch {
    static ICON = '🔍';
    static convedTags: TConvedTags = { ___: [] };

    container: HTMLElement | undefined;
    input: HTMLInputElement | undefined;

    /**
     * タグ一覧を受け取って検索用に変換
     */
    static setTags(tags: TTags) {
        D2PSSearch.convedTags = tagConvert(tags);
    }

    /**
     * タグ入力コンテナ作成
     */
    createSearchContainer(onSearch: (filterdTags: TTags) => void): HTMLElement {
        // リアルタイム検索するか
        const isRealTime = opts.d2_ps_enable_realtime_search;

        // 入力フォーム
        this.input = D2PSElementBuilder.searchInput();

        this.input.addEventListener('keydown', (ev: KeyboardEvent) => {
            if (isRealTime || ev.key === 'Enter' || ev.key === 'NumpadEnter') {
                onSearch(tagSearch(D2PSSearch.convedTags, this.input?.value || ''));
            }
        });

        // 検索ボタンと枠
        this.container = D2PSElementBuilder.searchContainer(this.input, {
            onClick: () => {
                onSearch(tagSearch(D2PSSearch.convedTags, this.input?.value || ''));
            },
        });

        return this.container;
    }
}

export { D2PSSearch };
