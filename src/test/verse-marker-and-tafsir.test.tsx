import { describe, expect, it } from "vitest";

describe("Verse Reference Formatting", () => {
  const surah = {
    number: 16,
    transliteration: "An-Nahl",
    portugueseName: "As Abelhas",
  };

  const getReference = (style: "surahName" | "generic" | "compact", ayahNumber: number) => {
    switch (style) {
      case "generic":
        return `Versículo ${surah.number}:${ayahNumber}`;
      case "compact":
        return `${surah.number}:${ayahNumber}`;
      case "surahName":
      default:
        return `${surah.transliteration} · ${surah.number}:${ayahNumber}`;
    }
  };

  it("formats verse reference in editorial style by default", () => {
    expect(getReference("surahName", 7)).toBe("An-Nahl · 16:7");
  });

  it("formats verse reference in classic generic style when requested", () => {
    expect(getReference("generic", 7)).toBe("Versículo 16:7");
  });

  it("formats verse reference in compact style when requested", () => {
    expect(getReference("compact", 7)).toBe("16:7");
  });
});

describe("Ayah Ornamental Marker Number Scaling", () => {
  const getMarkerFontSize = (num: number) => {
    const s = String(num);
    return s.length >= 3 ? "0.44em" : s.length === 2 ? "0.54em" : "0.64em";
  };

  it("scales single digit versicle numbers for maximum central legibility", () => {
    expect(getMarkerFontSize(7)).toBe("0.64em");
  });

  it("scales double digit versicle numbers to stay safely within the ornament circle", () => {
    expect(getMarkerFontSize(45)).toBe("0.54em");
  });

  it("scales triple digit versicle numbers without border overflow", () => {
    expect(getMarkerFontSize(286)).toBe("0.44em");
  });
});

import { render } from "@testing-library/react";
import { AyahOrnamentalMarker } from "@/legacy/components/AyahOrnamentalMarker";

describe("AyahOrnamentalMarker Component", () => {
  it("renders with unified SVG coordinates, center (18, 18), and central baseline", () => {
    const { container } = render(<AyahOrnamentalMarker ayahNumber={7} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 36 36");

    const text = container.querySelector("text");
    expect(text).toBeInTheDocument();
    expect(text?.textContent).toBe("7");
    expect(text?.getAttribute("x")).toBe("18");
    expect(text?.getAttribute("y")).toBe("18");
    expect(text?.getAttribute("dominant-baseline")).toBe("central");
    expect(text?.getAttribute("text-anchor")).toBe("middle");
  });

  it("handles double and triple digit numbers cleanly", () => {
    const { container } = render(<AyahOrnamentalMarker ayahNumber={286} />);
    const text = container.querySelector("text");
    expect(text?.textContent).toBe("286");
    expect(text?.getAttribute("x")).toBe("18");
    expect(text?.getAttribute("y")).toBe("18");
    expect(text?.getAttribute("font-size")).toBe("10.5");
  });
});
