from pathlib import Path
from fastapi import FastAPI, Body
import yaml
import gradio as gr
from modules import shared
from modules.api import api
from modules.scripts import basedir
import modules.script_callbacks as script_callbacks
# from scripts.setup import TAGS_DIR

class TagsUtil:
    BASE_DIR = Path(basedir())
    TAGS_DIR = BASE_DIR.joinpath('tags')
    tags = {}

    @classmethod
    def tag_files(cls):
        opt_dir = shared.opts.d2_ps_tags_dir
        dir = Path(opt_dir) if opt_dir != "" else cls.TAGS_DIR
        return dir.rglob("*.yml")

    @classmethod
    def load_tags(cls):
        cls.tags = {}
        for filepath in cls.tag_files():
            with open(filepath, "r", encoding="utf-8") as file:
                yml = yaml.safe_load(file)
                cls.tags[filepath.stem] = yml


# /eps/tags にアクセスすると
# タグファイルの中身をjsonで返す
def d2ps_api(_: gr.Blocks, app: FastAPI):
    @app.get("/d2ps/tags")
    async def tags_json():
        TagsUtil.load_tags()
        return TagsUtil.tags


