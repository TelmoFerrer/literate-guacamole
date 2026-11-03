import { describe, expect, it } from "vitest";
import { formatMinorUnits, parseMinorUnits } from "./money";

describe("parseMinorUnits", () => {
  it("parses positive and negative decimal strings exactly", () => {
    expect(parseMinorUnits("1234.56")).toBe(123456n);
    expect(parseMinorUnits("-0.09")).toBe(-9n);
    expect(parseMinorUnits("+12.3")).toBe(1230n);
  });

  it("supports currencies with zero or three fractional digits", () => {
    expect(parseMinorUnits("2500", 0)).toBe(2500n);
    expect(parseMinorUnits("1.234", 3)).toBe(1234n);
  });

  it("rejects excess precision and non-decimal input", () => {
    expect(() => parseMinorUnits("1.234")).toThrow(/at most 2/);
    expect(() => parseMinorUnits("1,234.56")).toThrow(/plain decimal/);
    expect(() => parseMinorUnits("1e3")).toThrow(/plain decimal/);
  });
});

describe("formatMinorUnits", () => {
  it("formats exact values without floating-point conversion", () => {
    expect(formatMinorUnits(123456n)).toBe("1234.56");
    expect(formatMinorUnits(-9n)).toBe("-0.09");
    expect(formatMinorUnits(2500n, 0)).toBe("2500");
    expect(formatMinorUnits(1234n, 3)).toBe("1.234");
  });

  it("round-trips supported decimal strings", () => {
    const values = ["0.00", "1.20", "-99.99", "123456789012345.67"];
    for (const value of values) {
      expect(formatMinorUnits(parseMinorUnits(value))).toBe(value);
    }
  });
});
