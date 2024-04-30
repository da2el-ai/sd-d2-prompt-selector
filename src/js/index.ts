declare var onOptionsChanged: any;
declare var onUiLoaded: any;

/*********************************************************
 * webui callback
 */

import { D2PSPromptSelector } from './D2PSPromptSelector';

const promptSelector = new D2PSPromptSelector();

// 設定変更したらタグ読み直し
onOptionsChanged(() => {
    promptSelector.init();
});

// UI表示したら作成
onUiLoaded(() => {
    promptSelector.createControl();
    promptSelector.init();
});
