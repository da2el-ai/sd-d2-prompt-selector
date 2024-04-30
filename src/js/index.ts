declare var onOptionsChanged: any;
declare var onUiLoaded: any;

/*********************************************************
 * webui callback
 */

import { D2PSPromptSelector } from './D2PSPromptSelector';
import { D2PSToolTip } from './D2PSToolTip';

const promptSelector = new D2PSPromptSelector();

// 設定変更したらタグ読み直し
onOptionsChanged(() => {
    // console.log('------ onOptionsChanged');
    promptSelector.init();
});

// UI表示したら作成
onUiLoaded(() => {
    promptSelector.createControl();
    promptSelector.init();
    D2PSToolTip.init();
});
