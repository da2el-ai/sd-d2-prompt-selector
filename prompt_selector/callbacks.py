from modules import script_callbacks
from modules.shared import opts


from prompt_selector.settings import on_ui_settings
from prompt_selector.tags import d2ps_api

# 設定画面登録
def register_settings():
    script_callbacks.on_ui_settings(on_ui_settings)

# api登録
def register_apis():
    script_callbacks.on_app_started(d2ps_api)

