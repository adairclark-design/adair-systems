#!/usr/bin/env python3
"""Render the aurora workflow profile mark as a high-resolution PNG."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


BASE_SIZE = 1024
SUPERSAMPLE = 3
MINT = (102, 255, 204)
BLUE = (144, 178, 229)
PURPLE = (186, 102, 255)


def render(
    size: int = BASE_SIZE, background: tuple[int, int, int] = (9, 9, 14)
) -> Image.Image:
    work_size = size * SUPERSAMPLE
    scale = work_size / BASE_SIZE

    def s(value: float) -> int:
        return round(value * scale)

    def box(values: tuple[float, float, float, float]) -> tuple[int, int, int, int]:
        return tuple(s(value) for value in values)  # type: ignore[return-value]

    def rounded_mask(
        bounds: tuple[float, float, float, float], radius: float, width: float | None = None
    ) -> Image.Image:
        mask = Image.new("L", (work_size, work_size), 0)
        draw = ImageDraw.Draw(mask)
        kwargs = {"radius": s(radius), "fill": 255}
        if width is not None:
            kwargs = {"radius": s(radius), "outline": 255, "width": s(width)}
        draw.rounded_rectangle(box(bounds), **kwargs)
        return mask

    def line_mask(points: list[tuple[float, float]], width: float) -> Image.Image:
        mask = Image.new("L", (work_size, work_size), 0)
        draw = ImageDraw.Draw(mask)
        scaled = [(s(x), s(y)) for x, y in points]
        line_width = s(width)
        radius = line_width // 2
        draw.line(scaled, fill=255, width=line_width, joint="curve")
        for x, y in scaled:
            draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=255)
        return mask

    def merge_masks(*masks: Image.Image) -> Image.Image:
        result = Image.new("L", (work_size, work_size), 0)
        for mask in masks:
            result = ImageChops.lighter(result, mask)
        return result

    def alpha_composite_color(
        target: Image.Image, mask: Image.Image, color: tuple[int, int, int], opacity: float = 1.0
    ) -> None:
        alpha = mask if opacity == 1.0 else mask.point(lambda p: round(p * opacity))
        layer = Image.new("RGBA", target.size, (*color, 0))
        layer.putalpha(alpha)
        target.alpha_composite(layer)

    def horizontal_gradient(
        stops: list[tuple[float, tuple[int, int, int]]],
        start: float = 0,
        end: float = BASE_SIZE,
    ) -> Image.Image:
        row = Image.new("RGBA", (work_size, 1))
        pixels = row.load()
        for x in range(work_size):
            position = min(1.0, max(0.0, (x - s(start)) / max(1, s(end - start))))
            left_pos, left_color = stops[0]
            right_pos, right_color = stops[-1]
            for index in range(len(stops) - 1):
                if stops[index][0] <= position <= stops[index + 1][0]:
                    left_pos, left_color = stops[index]
                    right_pos, right_color = stops[index + 1]
                    break
            mix = 0.0 if right_pos == left_pos else (position - left_pos) / (right_pos - left_pos)
            pixels[x, 0] = tuple(
                round(left_color[channel] * (1.0 - mix) + right_color[channel] * mix)
                for channel in range(3)
            ) + (255,)
        return row.resize((work_size, work_size))

    def upper_join_gradient(
        bounds: tuple[float, float, float, float],
    ) -> Image.Image:
        left, top, right, bottom = box(bounds)
        width = right - left + 1
        height = bottom - top + 1
        local = Image.new("RGBA", (width, height))
        pixels = local.load()
        stops = [(0.0, MINT), (0.30, MINT), (0.50, BLUE), (0.70, PURPLE), (1.0, PURPLE)]
        for y in range(height):
            y_position = y / max(1, height - 1)
            for x in range(width):
                x_position = x / max(1, width - 1)
                position = (x_position + y_position) / 2
                left_pos, left_color = stops[0]
                right_pos, right_color = stops[-1]
                for index in range(len(stops) - 1):
                    if stops[index][0] <= position <= stops[index + 1][0]:
                        left_pos, left_color = stops[index]
                        right_pos, right_color = stops[index + 1]
                        break
                mix = (
                    0.0
                    if right_pos == left_pos
                    else (position - left_pos) / (right_pos - left_pos)
                )
                pixels[x, y] = tuple(
                    round(
                        left_color[channel] * (1.0 - mix)
                        + right_color[channel] * mix
                    )
                    for channel in range(3)
                ) + (255,)
        result = Image.new("RGBA", (work_size, work_size), (*BLUE, 255))
        result.paste(local, (left, top))

        stem_left = s(512 - 43 / 2)
        stem_right = s(512 + 43 / 2)
        stem_top = s(382)
        stem_bottom = s(491)
        blend_end = s(491 - 43 / 2)
        stem_height = stem_bottom - stem_top + 1
        stem = Image.new("RGBA", (stem_right - stem_left + 1, stem_height))
        stem_pixels = stem.load()
        connector_stops = [
            (0.0, MINT),
            (0.13, MINT),
            (0.50, BLUE),
            (0.87, PURPLE),
            (1.0, PURPLE),
        ]
        for y in range(stem_height):
            global_y = stem_top + y
            vertical_mix = min(
                1.0, max(0.0, (global_y - stem_top) / max(1, blend_end - stem_top))
            )
            for x in range(stem.width):
                global_x = stem_left + x
                position = min(
                    1.0,
                    max(0.0, (global_x - s(342)) / max(1, s(682 - 342))),
                )
                left_pos, left_color = connector_stops[0]
                right_pos, right_color = connector_stops[-1]
                for index in range(len(connector_stops) - 1):
                    if connector_stops[index][0] <= position <= connector_stops[index + 1][0]:
                        left_pos, left_color = connector_stops[index]
                        right_pos, right_color = connector_stops[index + 1]
                        break
                horizontal_mix = (
                    0.0
                    if right_pos == left_pos
                    else (position - left_pos) / (right_pos - left_pos)
                )
                target = tuple(
                    round(
                        left_color[channel] * (1.0 - horizontal_mix)
                        + right_color[channel] * horizontal_mix
                    )
                    for channel in range(3)
                )
                color = tuple(
                    round(
                        PURPLE[channel] * (1.0 - vertical_mix)
                        + target[channel] * vertical_mix
                    )
                    for channel in range(3)
                )
                stem_pixels[x, y] = (*color, 255)
        result.paste(stem, (stem_left, stem_top))
        return result

    def composite_gradient(target: Image.Image, mask: Image.Image, gradient: Image.Image) -> None:
        layer = gradient.copy()
        layer.putalpha(mask)
        target.alpha_composite(layer)

    def add_radial(
        target: Image.Image,
        center: tuple[float, float],
        radius: float,
        color: tuple[int, int, int],
        opacity: float,
        clip: Image.Image,
        falloff: float = 1.7,
    ) -> None:
        sample_size = 384
        radial = Image.new("L", (sample_size, sample_size), 0)
        pixels = radial.load()
        middle = (sample_size - 1) / 2
        for y in range(sample_size):
            for x in range(sample_size):
                distance = ((x - middle) ** 2 + (y - middle) ** 2) ** 0.5 / middle
                value = max(0.0, 1.0 - distance) ** falloff
                pixels[x, y] = round(255 * opacity * value)
        diameter = s(radius * 2)
        radial = radial.resize((diameter, diameter), Image.Resampling.LANCZOS)
        full_mask = Image.new("L", (work_size, work_size), 0)
        left = s(center[0] - radius)
        top = s(center[1] - radius)
        full_mask.paste(radial, (left, top))
        full_mask = ImageChops.multiply(full_mask, clip)
        alpha_composite_color(target, full_mask, color)

    canvas = Image.new("RGBA", (work_size, work_size), (0, 0, 0, 0))

    container_bounds = (16, 8, 1008, 1000)
    container = rounded_mask(container_bounds, 326)
    alpha_composite_color(canvas, container, background)

    add_radial(canvas, (210, 205), 590, MINT, 0.27, container, 1.55)
    add_radial(canvas, (845, 820), 650, PURPLE, 0.25, container, 1.6)
    add_radial(canvas, (515, 475), 430, BLUE, 0.055, container, 1.8)

    border = rounded_mask((19, 11, 1005, 997), 323, 4)
    alpha_composite_color(canvas, border, (255, 255, 255), 0.055)
    top_border = rounded_mask((23, 15, 1001, 993), 319, 3)
    fade = Image.new("L", (1, work_size), 0)
    fade_pixels = fade.load()
    for y in range(work_size):
        normalized = y / work_size
        fade_pixels[0, y] = round(255 * max(0.0, 1.0 - normalized / 0.47) ** 1.5)
    fade = fade.resize((work_size, work_size))
    top_border = ImageChops.multiply(top_border, fade)
    alpha_composite_color(canvas, top_border, (255, 255, 255), 0.15)

    stroke = 43
    top_box = rounded_mask((427, 218, 597, 382), 30, stroke)
    left_box = rounded_mask((255, 548, 430, 724), 31, stroke)
    right_box = rounded_mask((594, 548, 769, 724), 31, stroke)
    top_stem = line_mask([(512, 382), (512, 491)], stroke)
    crossbar = line_mask([(342, 491), (682, 491)], stroke)
    left_stem = line_mask([(342, 491), (342, 548)], stroke)
    right_stem = line_mask([(682, 491), (682, 548)], stroke)

    upper_mark = merge_masks(top_box, top_stem)
    lower_mark = merge_masks(left_box, left_stem, crossbar, right_stem, right_box)

    top_gradient = upper_join_gradient((427, 218, 597, 382))
    connector_gradient = horizontal_gradient(
        [
            (0.0, MINT),
            (0.13, MINT),
            (0.50, BLUE),
            (0.87, PURPLE),
            (1.0, PURPLE),
        ],
        342,
        682,
    )
    composite_gradient(canvas, upper_mark, top_gradient)
    composite_gradient(canvas, lower_mark, connector_gradient)

    canvas.putalpha(ImageChops.multiply(canvas.getchannel("A"), container))
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--size", type=int, default=BASE_SIZE)
    parser.add_argument("--background", default="#09090e")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path(__file__).with_name("aurora-profile-logo-1024.png"),
    )
    args = parser.parse_args()
    background_hex = args.background.removeprefix("#")
    if len(background_hex) != 6:
        parser.error("--background must be a six-digit hex color")
    try:
        background = tuple(
            int(background_hex[index : index + 2], 16) for index in (0, 2, 4)
        )
    except ValueError:
        parser.error("--background must be a six-digit hex color")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    render(args.size, background).save(args.output, "PNG", optimize=True)


if __name__ == "__main__":
    main()
