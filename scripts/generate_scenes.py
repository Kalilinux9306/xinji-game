#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
心迹 - 场景插画批量生成脚本
使用阿里云百炼通义万相 API
"""

import os
import sys
import time
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from http import HTTPStatus
import requests

try:
    import dashscope
    from dashscope import ImageSynthesis
except ImportError:
    print("❌ 请先安装 dashscope: pip install dashscope")
    sys.exit(1)

API_KEY = os.getenv("DASHSCOPE_API_KEY", "")
OUTPUT_DIR = PROJECT_ROOT / "assets" / "images"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ==================== 场景配置 ====================
# 核心画风参考：LoveChoice 拣爱
# - 简易清新的水彩画
# - 饱和度低，色彩数量少
# - 宛若少儿简笔画，不幼稚，舒服简明
# - 无五官细节，人物极简
# - 使用 <watercolor> 风格

SCENES = [
    {
        "filename": "ch1_classroom.png",
        "prompt": (
            "Simple and fresh watercolor painting of a classroom corner, "
            "sunlight through windows, wooden desks and chairs, "
            "very simple shapes, children's drawing style, "
            "low saturation, only 3-4 soft colors, cream and pale orange, "
            "no detailed facial features, no complex textures, "
            "minimalist composition, comfortable and clean, "
            "visual novel game background, LoveChoice art style, no text"
        ),
        "style": "<watercolor>",
        "size": "720*1280",
        "desc": "教室场景（男生视角）"
    },
    {
        "filename": "ch1_library.png",
        "prompt": (
            "Simple and fresh watercolor painting of a library by the window, "
            "bookshelves, a girl reading at desk, soft afternoon light, "
            "very simple shapes, children's drawing style, "
            "low saturation, only 3-4 soft colors, pale yellow and beige, "
            "no detailed facial features, no complex textures, "
            "minimalist composition, peaceful and dreamy, "
            "visual novel game background, LoveChoice art style, no text"
        ),
        "style": "<watercolor>",
        "size": "720*1280",
        "desc": "图书馆场景（女生视角）"
    },
    {
        "filename": "ch1_hallway.png",
        "prompt": (
            "Simple and fresh watercolor painting of a school hallway, "
            "classroom doors, sunset light through windows, "
            "very simple shapes, children's drawing style, "
            "low saturation, only 3-4 soft colors, pale orange and pink, "
            "no detailed facial features, no complex textures, "
            "minimalist composition, nostalgic and warm, "
            "visual novel game background, LoveChoice art style, no text"
        ),
        "style": "<watercolor>",
        "size": "720*1280",
        "desc": "走廊场景（下课后）"
    },
    {
        "filename": "ch1_phone.png",
        "prompt": (
            "Simple and fresh watercolor painting of a hand holding smartphone, "
            "chat bubbles on screen, soft warm glow, "
            "very simple shapes, children's drawing style, "
            "low saturation, only 3-4 soft colors, pale green and white, "
            "no detailed facial features, no complex textures, "
            "minimalist composition, cozy and romantic, "
            "visual novel game background, LoveChoice art style, no text"
        ),
        "style": "<watercolor>",
        "size": "720*1280",
        "desc": "手机聊天场景"
    },
    {
        "filename": "ch1_miss.png",
        "prompt": (
            "Simple and fresh watercolor painting of two small figures walking apart, "
            "grey cloudy sky, falling petals, "
            "very simple shapes, children's drawing style, "
            "low saturation, only 3-4 soft colors, pale grey and blue, "
            "no detailed facial features, no complex textures, "
            "minimalist composition, sad but poetic, "
            "visual novel game background, LoveChoice art style, no text"
        ),
        "style": "<watercolor>",
        "size": "720*1280",
        "desc": "错过/灰暗场景"
    },
    {
        "filename": "ch1_ending.png",
        "prompt": (
            "Simple and fresh watercolor painting of two small figures walking together, "
            "sunset sky with simple round sun, "
            "very simple shapes, children's drawing style, "
            "low saturation, only 3-4 soft colors, pale orange and pink, "
            "no detailed facial features, no complex textures, "
            "minimalist composition, heartwarming and hopeful, "
            "visual novel game background, LoveChoice art style, no text"
        ),
        "style": "<watercolor>",
        "size": "720*1280",
        "desc": "温馨结局场景"
    },
]

# ==================== 生成逻辑 ====================

def generate_image(scene: dict, api_key: str) -> Path | None:
    print(f"\n🎨 正在生成: {scene['desc']}")
    print(f"   风格: {scene['style']} | 尺寸: {scene['size']}")

    try:
        rsp = ImageSynthesis.call(
            api_key=api_key,
            model=ImageSynthesis.Models.wanx_v1,
            prompt=scene["prompt"],
            n=1,
            style=scene["style"],
            size=scene["size"]
        )

        if rsp.status_code != HTTPStatus.OK:
            print(f"   ❌ API 调用失败: {rsp.status_code} - {rsp.message}")
            return None

        for result in rsp.output.results:
            image_url = result.url
            file_path = OUTPUT_DIR / scene["filename"]

            img_data = requests.get(image_url, timeout=60).content
            file_path.write_bytes(img_data)

            print(f"   ✅ 已保存: {file_path}")
            return file_path

    except Exception as e:
        print(f"   ❌ 生成异常: {e}")
        return None


def main():
    if not API_KEY:
        print("❌ 未检测到 DASHSCOPE_API_KEY")
        print("   export DASHSCOPE_API_KEY=你的key")
        sys.exit(1)

    print("=" * 60)
    print("🎮 心迹 - 场景插画批量生成（水彩简笔画风格）")
    print(f"📁 输出目录: {OUTPUT_DIR}")
    print(f"🖼️  共 {len(SCENES)} 个场景")
    print("=" * 60)

    success_count = 0
    failed_scenes = []

    for i, scene in enumerate(SCENES, 1):
        print(f"\n[{i}/{len(SCENES)}]", end="")
        result = generate_image(scene, API_KEY)
        if result:
            success_count += 1
        else:
            failed_scenes.append(scene["desc"])
        if i < len(SCENES):
            time.sleep(2)

    print("\n" + "=" * 60)
    print(f"✅ 成功: {success_count}/{len(SCENES)}")
    if failed_scenes:
        print(f"❌ 失败: {', '.join(failed_scenes)}")
    print("=" * 60)


if __name__ == "__main__":
    main()
