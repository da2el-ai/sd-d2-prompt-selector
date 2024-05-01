from modules import shared

def on_ui_settings():
    section = "d2_prompt_selector", "D2 Prompt Selector"

    shared.opts.add_option(
        key="d2_ps_tags_dir",
        info=shared.OptionInfo(
            "",
            label="タグフォルダ（無指定の時は機能拡張フォルダの tags フォルダ）",
            section=section,
        ),
    )

    shared.opts.add_option(
        key = "d2_ps_enable_realtime_search",
        info = shared.OptionInfo(
            False,
            label = "検索結果をリアルタイムに表示する",
            section = section
        ),
    )

    shared.opts.add_option(
        key = "d2_ps_enable_tooltip",
        info = shared.OptionInfo(
            True,
            label = "タグボタンにマウスが乗ったら画面下端にプロンプトを表示する",
            section = section
        ),
    )


    shared.opts.add_option(
        key = "d2_ps_enable_save_raw_prompt_to_pnginfo",
        info = shared.OptionInfo(
            False,
            label = "元プロンプトを pngInfo に保存する",
            section = section
        ),
    )

