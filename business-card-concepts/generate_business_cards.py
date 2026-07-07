#!/usr/bin/env python3
"""Generate three Adair Systems business-card concepts and studio mockups."""

from __future__ import annotations

import random
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parent
LOGO_PATH = ROOT.parent / "aurora-profile-logo-white-no-glow-seamless-center-1024.png"

CARD_W = 1050
CARD_H = 600
BOARD_W = 2400
BOARD_H = 1600

BLACK = (9, 9, 14)
PANEL = (14, 14, 21)
WHITE = (247, 248, 251)
MUTED = (146, 151, 168)
MINT = (102, 255, 204)
BLUE = (144, 178, 229)
PURPLE = (186, 102, 255)

HELVETICA = "/System/Library/Fonts/HelveticaNeue.ttc"
AVENIR = "/System/Library/Fonts/Avenir Next Condensed.ttc"
MONO = "/System/Library/Fonts/SFNSMono.ttf"
MENLO = "/System/Library/Fonts/Menlo.ttc"


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size, index=index)


def tracked_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    face: ImageFont.FreeTypeFont,
    fill: tuple[int, ...],
    tracking: int,
) -> int:
    x, y = xy
    for character in text:
        draw.text((x, y), character, font=face, fill=fill)
        bounds = draw.textbbox((x, y), character, font=face)
        x += bounds[2] - bounds[0] + tracking
    return x


def add_radial(
    image: Image.Image,
    center: tuple[int, int],
    radius: int,
    color: tuple[int, int, int],
    opacity: int,
) -> None:
    layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    x, y = center
    draw.ellipse(
        (x - radius // 3, y - radius // 3, x + radius // 3, y + radius // 3),
        fill=(*color, opacity),
    )
    layer = layer.filter(ImageFilter.GaussianBlur(radius // 2))
    image.alpha_composite(layer)


def base_card(
    mint_center: tuple[int, int] = (30, 30),
    purple_center: tuple[int, int] = (1020, 590),
    intensity: int = 34,
) -> Image.Image:
    image = Image.new("RGBA", (CARD_W, CARD_H), (*BLACK, 255))
    add_radial(image, mint_center, 500, MINT, intensity)
    add_radial(image, purple_center, 520, PURPLE, intensity)
    return image


def horizontal_gradient(width: int, height: int, stops: list[tuple[float, tuple[int, int, int]]]) -> Image.Image:
    row = Image.new("RGBA", (width, 1))
    pixels = row.load()
    for x in range(width):
        position = x / max(1, width - 1)
        left_pos, left_color = stops[0]
        right_pos, right_color = stops[-1]
        for index in range(len(stops) - 1):
            if stops[index][0] <= position <= stops[index + 1][0]:
                left_pos, left_color = stops[index]
                right_pos, right_color = stops[index + 1]
                break
        mix = 0 if right_pos == left_pos else (position - left_pos) / (right_pos - left_pos)
        pixels[x, 0] = tuple(
            round(left_color[channel] * (1 - mix) + right_color[channel] * mix)
            for channel in range(3)
        ) + (255,)
    return row.resize((width, height))


def draw_gradient_rule(image: Image.Image, bounds: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = bounds
    gradient = horizontal_gradient(x1 - x0, y1 - y0, [(0, MINT), (0.5, BLUE), (1, PURPLE)])
    image.alpha_composite(gradient, (x0, y0))


def logo_badge(size: int) -> Image.Image:
    source = Image.open(LOGO_PATH).convert("RGBA")
    return source.resize((size, size), Image.Resampling.LANCZOS)


def draw_mark(image: Image.Image, bounds: tuple[int, int, int, int], opacity: int = 255) -> None:
    x0, y0, x1, y1 = bounds
    width = x1 - x0
    height = y1 - y0
    mark = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    mask_upper = Image.new("L", (width, height), 0)
    mask_lower = Image.new("L", (width, height), 0)
    upper = ImageDraw.Draw(mask_upper)
    lower = ImageDraw.Draw(mask_lower)

    scale_x = width / 100
    scale_y = height / 90

    def p(x: float, y: float) -> tuple[int, int]:
        return round(x * scale_x), round(y * scale_y)

    stroke = max(2, round(5.5 * min(scale_x, scale_y)))
    radius = max(2, round(4 * min(scale_x, scale_y)))

    upper.rounded_rectangle((*p(39, 4), *p(61, 26)), radius=radius, outline=255, width=stroke)
    upper.line((p(50, 26), p(50, 49)), fill=255, width=stroke)
    lower.line((p(22, 49), p(78, 49)), fill=255, width=stroke)
    lower.line((p(22, 49), p(22, 61)), fill=255, width=stroke)
    lower.line((p(78, 49), p(78, 61)), fill=255, width=stroke)
    lower.rounded_rectangle((*p(11, 61), *p(33, 83)), radius=radius, outline=255, width=stroke)
    lower.rounded_rectangle((*p(67, 61), *p(89, 83)), radius=radius, outline=255, width=stroke)

    for point in (p(50, 26), p(50, 49)):
        r = stroke // 2
        upper.ellipse((point[0] - r, point[1] - r, point[0] + r, point[1] + r), fill=255)
    for point in (p(22, 49), p(78, 49), p(22, 61), p(78, 61)):
        r = stroke // 2
        lower.ellipse((point[0] - r, point[1] - r, point[0] + r, point[1] + r), fill=255)

    upper_gradient = Image.new("RGBA", (width, height), (*BLUE, 255))
    upper_pixels = upper_gradient.load()
    for y in range(height):
        for x in range(width):
            position = ((x / max(1, width - 1)) + (y / max(1, height - 1))) / 2
            if position <= 0.30:
                color = MINT
            elif position >= 0.70:
                color = PURPLE
            elif position <= 0.50:
                mix = (position - 0.30) / 0.20
                color = tuple(round(MINT[i] * (1 - mix) + BLUE[i] * mix) for i in range(3))
            else:
                mix = (position - 0.50) / 0.20
                color = tuple(round(BLUE[i] * (1 - mix) + PURPLE[i] * mix) for i in range(3))
            upper_pixels[x, y] = (*color, opacity)

    lower_gradient = horizontal_gradient(width, height, [(0, MINT), (0.5, BLUE), (1, PURPLE)])
    if opacity != 255:
        lower_gradient.putalpha(opacity)
    upper_gradient.putalpha(ImageChops.multiply(mask_upper, Image.new("L", mask_upper.size, opacity)))
    lower_gradient.putalpha(ImageChops.multiply(mask_lower, Image.new("L", mask_lower.size, opacity)))
    mark.alpha_composite(upper_gradient)
    mark.alpha_composite(lower_gradient)
    image.alpha_composite(mark, (x0, y0))


def qr_placeholder(
    image: Image.Image,
    xy: tuple[int, int],
    size: int,
    foreground: tuple[int, int, int] = WHITE,
    background: tuple[int, int, int] = BLACK,
    accent: tuple[int, int, int] = MINT,
) -> None:
    x0, y0 = xy
    modules = 25
    quiet = 3
    cell = max(2, size // (modules + quiet * 2))
    actual = cell * (modules + quiet * 2)
    panel = Image.new("RGBA", (actual, actual), (*background, 245))
    draw = ImageDraw.Draw(panel)
    randomizer = random.Random(20260619)
    reserved: set[tuple[int, int]] = set()

    def finder(mx: int, my: int, color: tuple[int, int, int]) -> None:
        for yy in range(7):
            for xx in range(7):
                reserved.add((mx + xx, my + yy))
                if xx in (0, 6) or yy in (0, 6) or (2 <= xx <= 4 and 2 <= yy <= 4):
                    px = (quiet + mx + xx) * cell
                    py = (quiet + my + yy) * cell
                    draw.rectangle((px, py, px + cell - 1, py + cell - 1), fill=(*color, 255))

    finder(0, 0, accent)
    finder(modules - 7, 0, foreground)
    finder(0, modules - 7, foreground)
    for my in range(modules):
        for mx in range(modules):
            if (mx, my) in reserved:
                continue
            if randomizer.random() > 0.54:
                px = (quiet + mx) * cell
                py = (quiet + my) * cell
                color = accent if (mx + my) % 17 == 0 else foreground
                draw.rectangle((px, py, px + cell - 1, py + cell - 1), fill=(*color, 255))
    image.alpha_composite(panel, (x0, y0))


def wordmark(draw: ImageDraw.ImageDraw, xy: tuple[int, int], size: int = 22) -> None:
    tracked_text(draw, xy, "ADAIR SYSTEMS", font(HELVETICA, size), WHITE, max(2, size // 5))


def contact_block(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    align: str = "left",
    color: tuple[int, int, int] = WHITE,
) -> None:
    x, y = xy
    face = font(MONO, 17)
    lines = ["hello@adair.systems", "adair.systems"]
    for index, line in enumerate(lines):
        draw.text((x, y + index * 34), line, font=face, fill=color, anchor="ra" if align == "right" else None)


def concept_one() -> tuple[Image.Image, Image.Image]:
    front = base_card((80, 20), (1020, 590), 34)
    draw = ImageDraw.Draw(front)
    front.alpha_composite(logo_badge(126), (58, 50))
    wordmark(draw, (220, 78), 21)
    tracked_text(draw, (220, 112), "BESPOKE SOFTWARE / AI", font(MONO, 13), (*MUTED, 255), 2)
    draw_gradient_rule(front, (60, 290, 990, 294))
    draw.text((60, 360), "Adair Clark", font=font(HELVETICA, 53), fill=WHITE)
    draw.text((64, 431), "Founder & Lead Engineer", font=font(MONO, 17), fill=MUTED)
    tracked_text(draw, (64, 522), "ADAIR.SYSTEMS  /  01", font(MONO, 12), (*MUTED, 220), 2)

    back = base_card((0, 20), (1000, 580), 30)
    draw = ImageDraw.Draw(back)
    tracked_text(draw, (62, 58), "SIGNAL / 01", font(MONO, 12), (*MINT, 255), 2)
    draw.text((60, 160), "Precision AI.", font=font(HELVETICA, 48), fill=WHITE)
    draw.text((60, 219), "Exceptional Software.", font=font(HELVETICA, 48), fill=WHITE)
    draw_gradient_rule(back, (60, 322, 630, 326))
    contact_block(draw, (60, 425))
    qr_placeholder(back, (786, 340), 210, WHITE, BLACK, MINT)
    draw.text((891, 558), "SCAN", font=font(MONO, 11), fill=MUTED, anchor="mm")
    return front, back


def concept_two() -> tuple[Image.Image, Image.Image]:
    front = base_card((950, 80), (70, 580), 24)
    draw = ImageDraw.Draw(front)
    for x in range(60, CARD_W, 60):
        draw.line((x, 0, x, CARD_H), fill=(74, 82, 103, 25), width=1)
    for y in range(60, CARD_H, 60):
        draw.line((0, y, CARD_W, y), fill=(74, 82, 103, 25), width=1)
    draw_mark(front, (515, 48, 1010, 525), opacity=42)
    tracked_text(draw, (57, 55), "ADAIR SYSTEMS", font(AVENIR, 27), WHITE, 5)
    draw.text((60, 274), "ADAIR", font=font(AVENIR, 68), fill=WHITE)
    draw.text((60, 339), "CLARK", font=font(AVENIR, 68), fill=WHITE)
    draw.text((63, 432), "FOUNDER / LEAD ENGINEER", font=font(MONO, 15), fill=MINT)
    draw.line((60, 505, 410, 505), fill=(102, 255, 204, 150), width=2)
    draw.text((60, 530), "SYSTEM NODE 01", font=font(MONO, 12), fill=MUTED)

    back = base_card((1040, 0), (20, 600), 22)
    draw = ImageDraw.Draw(back)
    for x in range(0, CARD_W, 50):
        draw.line((x, 0, x, CARD_H), fill=(106, 116, 148, 22), width=1)
    for y in range(0, CARD_H, 50):
        draw.line((0, y, CARD_W, y), fill=(106, 116, 148, 22), width=1)
    draw.rectangle((44, 42, 1006, 558), outline=(144, 178, 229, 75), width=1)
    tracked_text(draw, (68, 65), "CAPABILITY INDEX", font(MONO, 12), (*PURPLE, 255), 2)
    draw.text((66, 140), "Bespoke Systems.", font=font(AVENIR, 46), fill=WHITE)
    draw.text((66, 194), "Intelligent by Design.", font=font(AVENIR, 46), fill=WHITE)
    contact_block(draw, (68, 387), color=WHITE)
    qr_placeholder(back, (750, 280), 228, WHITE, PANEL, PURPLE)
    draw.text((68, 524), "SOFTWARE  /  AI  /  WEB", font=font(MONO, 12), fill=MUTED)
    draw.text((956, 528), "02", font=font(MONO, 14), fill=MINT, anchor="ra")
    return front, back


def concept_three() -> tuple[Image.Image, Image.Image]:
    front = base_card((0, 0), (1050, 600), 38)
    draw = ImageDraw.Draw(front)
    draw_gradient_rule(front, (0, 0, CARD_W, 8))
    draw_gradient_rule(front, (0, 0, 8, CARD_H))
    front.alpha_composite(logo_badge(142), (63, 64))
    tracked_text(draw, (236, 92), "ADAIR SYSTEMS", font(HELVETICA, 19), WHITE, 4)
    draw.text((64, 382), "Adair Clark", font=font(HELVETICA, 56), fill=WHITE)
    draw.text((68, 456), "Founder & Lead Engineer", font=font(MENLO, 15), fill=MUTED)
    draw.text((988, 528), "03", font=font(MONO, 13), fill=PURPLE, anchor="ra")

    back = base_card((0, 0), (1000, 600), 40)
    draw = ImageDraw.Draw(back)
    draw_mark(back, (-85, -125, 445, 385), opacity=66)
    draw.text((490, 82), "Engineering the", font=font(HELVETICA, 42), fill=WHITE)
    draw.text((490, 133), "Intelligent Advantage", font=font(HELVETICA, 42), fill=WHITE)
    draw_gradient_rule(back, (491, 217, 978, 221))
    contact_block(draw, (978, 294), align="right")
    qr_placeholder(back, (64, 355), 188, WHITE, BLACK, MINT)
    tracked_text(draw, (490, 500), "PREMIUM AI & SOFTWARE ENGINEERING", font(MONO, 12), (*MUTED, 255), 2)
    return front, back


def surface() -> Image.Image:
    image = Image.new("RGBA", (BOARD_W, BOARD_H), (8, 8, 12, 255))
    add_radial(image, (160, 200), 900, MINT, 24)
    add_radial(image, (2220, 1410), 1000, PURPLE, 30)
    pixels = image.load()
    randomizer = random.Random(77)
    for y in range(BOARD_H):
        for x in range(BOARD_W):
            noise = randomizer.choice((-2, -1, 0, 0, 0, 1, 2))
            red, green, blue, alpha = pixels[x, y]
            pixels[x, y] = (
                max(0, min(255, red + noise)),
                max(0, min(255, green + noise)),
                max(0, min(255, blue + noise)),
                alpha,
            )
    return image


def paste_physical_card(
    board: Image.Image,
    card: Image.Image,
    center: tuple[int, int],
    angle: float,
) -> tuple[int, int, int, int]:
    edge = ImageOps.expand(card.convert("RGBA"), border=(5, 5, 5, 11), fill=(187, 188, 194, 255))
    rotated = edge.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    x = center[0] - rotated.width // 2
    y = center[1] - rotated.height // 2
    shadow_alpha = rotated.getchannel("A").filter(ImageFilter.GaussianBlur(34))
    shadow = Image.new("RGBA", rotated.size, (0, 0, 0, 0))
    shadow.putalpha(shadow_alpha.point(lambda value: round(value * 0.60)))
    board.alpha_composite(shadow, (x + 28, y + 35))
    board.alpha_composite(rotated, (x, y))
    return x, y, x + rotated.width, y + rotated.height


def mockup(
    front: Image.Image,
    back: Image.Image,
    number: str,
    title: str,
    description: str,
    typography: str,
    arrangement: int,
) -> Image.Image:
    board = surface()
    draw = ImageDraw.Draw(board)
    tracked_text(draw, (110, 86), f"CONCEPT {number} / {title.upper()}", font(MONO, 18), (*MINT, 255), 3)
    draw.text((110, 135), description, font=font(HELVETICA, 27), fill=WHITE)
    draw.text((110, 181), f"TYPE: {typography}", font=font(MONO, 15), fill=MUTED)

    arrangements = {
        1: ((740, 700, -5.0), (1655, 1000, 4.0)),
        2: ((790, 905, 5.5), (1630, 680, -4.0)),
        3: ((720, 760, -2.5), (1680, 850, 6.0)),
    }
    first, second = arrangements[arrangement]
    front_box = paste_physical_card(board, front, (first[0], first[1]), first[2])
    back_box = paste_physical_card(board, back, (second[0], second[1]), second[2])
    draw = ImageDraw.Draw(board)
    draw.rounded_rectangle(
        (front_box[0] + 40, front_box[1] - 42, front_box[0] + 137, front_box[1] - 10),
        radius=16,
        fill=(20, 20, 29, 230),
    )
    draw.text((front_box[0] + 88, front_box[1] - 26), "FRONT", font=font(MONO, 11), fill=MINT, anchor="mm")
    draw.rounded_rectangle(
        (back_box[2] - 137, back_box[1] - 42, back_box[2] - 40, back_box[1] - 10),
        radius=16,
        fill=(20, 20, 29, 230),
    )
    draw.text((back_box[2] - 88, back_box[1] - 26), "BACK", font=font(MONO, 11), fill=PURPLE, anchor="mm")
    draw.text((2288, 1510), "ADAIR SYSTEMS / BUSINESS CARD STUDY", font=font(MONO, 13), fill=(115, 120, 138), anchor="ra")
    return board.convert("RGB")


def save_concept(
    index: int,
    slug: str,
    title: str,
    description: str,
    typography: str,
    cards: tuple[Image.Image, Image.Image],
) -> None:
    front, back = cards
    front.convert("RGB").save(ROOT / f"concept-{index}-{slug}-front.png", quality=95)
    back.convert("RGB").save(ROOT / f"concept-{index}-{slug}-back.png", quality=95)
    board = mockup(front, back, f"0{index}", title, description, typography, index)
    board.save(ROOT / f"concept-{index}-{slug}-mockup.png", quality=95)


def main() -> None:
    save_concept(
        1,
        "signal-field",
        "Signal Field",
        "A razor-thin signal line divides identity from contact within controlled aurora light.",
        "Helvetica Neue + SF Mono",
        concept_one(),
    )
    save_concept(
        2,
        "system-blueprint",
        "System Blueprint",
        "The logo becomes architecture: technical indexing, grid logic, and engineered spacing.",
        "Avenir Next Condensed + SF Mono",
        concept_two(),
    )
    save_concept(
        3,
        "aurora-edge",
        "Aurora Edge",
        "A luminous edge and floating badge create an editorial card with almost no visual noise.",
        "Helvetica Neue + Menlo",
        concept_three(),
    )


if __name__ == "__main__":
    main()
