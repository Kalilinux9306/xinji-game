#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动将 chapter1.js 中的背景替换为 AI 生成图片的路径
"""

import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
CHAPTER_PATH = PROJECT_ROOT / "js" / "data" / "chapters" / "chapter1.js"

# 场景 ID 到图片文件的映射
SCENE_IMAGE_MAP = {
    # 男生视角
    "m_00": "ch1_classroom.png",
    "m_01": "ch1_classroom.png",
    "m_02": "ch1_miss.png",
    "m_03": "ch1_classroom.png",
    "m_04": "ch1_classroom.png",
    "m_05": "ch1_hallway.png",
    "m_06": "ch1_miss.png",
    "m_07": "ch1_phone.png",
    "m_08": "ch1_phone.png",
    "m_09": "ch1_hallway.png",
    "m_10": "ch1_phone.png",
    "m_11": "ch1_ending.png",
    # 女生视角
    "f_00": "ch1_library.png",
    "f_01": "ch1_library.png",
    "f_02": "ch1_library.png",
    "f_03": "ch1_library.png",
    "f_04": "ch1_miss.png",
    "f_05": "ch1_phone.png",
    "f_06": "ch1_miss.png",
    "f_07": "ch1_miss.png",
    "f_08": "ch1_hallway.png",
    "f_09": "ch1_hallway.png",
    "f_10": "ch1_phone.png",
    "f_11": "ch1_phone.png",
    "f_12": "ch1_phone.png",
    "f_13": "ch1_ending.png",
}


def update_backgrounds():
    with open(CHAPTER_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    updated = 0
    for scene_id, filename in SCENE_IMAGE_MAP.items():
        # 匹配当前场景的背景行，替换为图片路径
        # 支持替换 gradient 或已有的 url(...)
        pattern = rf"(id: '{scene_id}',\s+visual: \{{\s+background: )'[^']*'"
        replacement = rf"\1'url(assets/images/{filename})'"

        new_content, count = re.subn(pattern, replacement, content, count=1)
        if count == 0:
            # 尝试宽松匹配
            pattern2 = rf"(id: '{scene_id}',\n\s+visual: \{{\n\s+background: )'[^']*'"
            new_content, count = re.subn(pattern2, replacement, content, count=1)

        if count > 0:
            updated += 1
            content = new_content
        else:
            print(f"⚠️  未找到场景: {scene_id}")

    with open(CHAPTER_PATH, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ 已更新 {updated} 个场景的背景路径")
    print(f"📁 文件已保存: {CHAPTER_PATH}")


if __name__ == "__main__":
    update_backgrounds()
