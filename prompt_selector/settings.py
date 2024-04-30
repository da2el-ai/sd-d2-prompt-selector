from modules import shared

def on_ui_settings():
    section = "d2_prompt_selector", "D2 Prompt Selector"

    shared.opts.add_option(
        key = "d2_ps_enable_save_raw_prompt_to_pnginfo",
        info = shared.OptionInfo(
            False,
            label = "元プロンプトを pngninfo に保存する",
            section = section
        ),
    )

    shared.opts.add_option(
        key="d2_ps_tags_dir",
        info=shared.OptionInfo(
            "",
            label="タグファイルを置いたフォルダ。無指定の時は機能拡張フォルダの tags フォルダ",
            section=section,
        ),
    )
