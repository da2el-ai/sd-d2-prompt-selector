import gradio as gr
import random
import re

from modules import shared
from prompt_selector.tags import TagsUtil

########################################
########################################
class D2PromptSelector:

    ############################
    # 再読み込みボタン追加
    @classmethod
    def createUi(cls, is_img2img):
        type = 'img2img' if is_img2img else 'txt2img'

        reload_button = gr.Button(
            value='🔄',
            variant='secondary',
            elem_id='d2_ps_reload_button_' + type
        )
        reload_button.style(size='sm')
        # reload_button.click(fn=cls.__reload)

        return [reload_button]


    # ############################
    # # タグファイルリロード
    # @classmethod
    # def __reload(cls):
    #     TagsUtil.load_tags()


    ############################
    # プロンプトの置き換え
    @classmethod
    def replace_template_tags(cls, p):
        prompts = [
            [p.prompt, p.all_prompts, 'Input Prompt'],
            [p.negative_prompt, p.all_negative_prompts, 'Input NegativePrompt'],
        ]
        if getattr(p, 'hr_prompt', None): prompts.append([p.hr_prompt, p.all_hr_prompts, 'Input Prompt(Hires)'])
        if getattr(p, 'hr_negative_prompt', None): prompts.append([p.hr_negative_prompt, p.all_hr_negative_prompts, 'Input NegativePrompt(Hires)'])

        for i in range(len(p.all_prompts)):
            seed = random.random()
            for [prompt, all_prompts, raw_prompt_param_name] in prompts:
                if '@' not in prompt: continue

                cls.__save_prompt_to_pnginfo(p, prompt, raw_prompt_param_name)

                replaced = "".join(cls.__replace_template(TagsUtil.tags, all_prompts[i], seed))
                all_prompts[i] = replaced


    ############################
    # プロンプトの置換
    @classmethod
    def __replace_template(cls, tags, prompt, seed = None):
        random.seed(seed)

        count = 0
        while count < 100:
            if not '@' in prompt:
                break

            for match in re.finditer(r'(@((?P<num>\d+(-\d+)?)\$\$)?(?P<ref>[^>]+?)@)', prompt):
                template = match.group()
                try:
                    try:
                        result = list(map(lambda x: int(x), match.group('num').split('-')))
                        min_count = min(result)
                        max_count = max(result)
                    except Exception as e:
                        min_count, max_count = 1, 1
                    count = random.randint(min_count, max_count)

                    values = list(map(lambda x: cls.__find_tag(tags, match.group('ref').split(':')), list(range(count))))
                    prompt = prompt.replace(template, ', '.join(values), 1)
                except Exception as e:
                    prompt = prompt.replace(template, '', 1)
            count += 1

        random.seed()
        return prompt


    ############################
    # 該当タグの検索
    @classmethod
    def __find_tag(cls, tags, location):
        if type(location) == str:
            return tags[location]

        value = ''
        if len(location) > 0:
            value = tags
            for tag in location:
                value = value[tag]

        if type(value) == dict:
            key = random.choice(list(value.keys()))
            tag = value[key]
            if type(tag) == dict:
                value = cls.__find_tag(tag, [random.choice(list(tag.keys()))])
            else:
                value = cls.__find_tag(value, key)

        if (type(value) == list):
            value = random.choice(value)

        return value

    ############################
    # PNG Infoの保存
    @classmethod
    def __save_prompt_to_pnginfo(cls, p, prompt, name):
        if shared.opts.eps_enable_save_raw_prompt_to_pnginfo == False:
            return

        p.extra_generation_params.update({name: prompt.replace('\n', ' ')})

