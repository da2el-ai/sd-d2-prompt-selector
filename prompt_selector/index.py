import modules.scripts as scripts
from modules.scripts import AlwaysVisible

from prompt_selector.D2PromptSelector import D2PromptSelector


class Script(scripts.Script):
    def title(self):
        return "D2 Prompt Selector"

    def show(self, is_img2img):
        return AlwaysVisible

    def ui(self, is_img2img):
        return D2PromptSelector.createUi(is_img2img)

    def process(self, p, *args):
        D2PromptSelector.replace_template_tags(p)
