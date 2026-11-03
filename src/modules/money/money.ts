/**
 * Exact decimal-string helpers for monetary values.
 *
 * These helpers deliberately avoid JavaScript floating-point arithmetic.
 * Persist monetary amounts as PostgreSQL NUMERIC and keep currency explicit.
 */

export function parseMinorUnits(value: string, fractionDigits = 2): bigint {
  assertFractionDigits(fractionDigits);

  const input = value.trim();
  const match = /^([+-]?)(\d+)(?:\.(\d+))?$/.exec(input);

  if (!match) {
    throw new Error("Amount must be a plain decimal string.");
  }

  const [, sign, wholePart, fractionPart = ""] = match;

  if (fractionPart.length > fractionDigits) {
    throw new Error(`Amount supports at most ${fractionDigits} decimal places.`);
  }

  const scale = 10n ** BigInt(fractionDigits);
  const whole = BigInt(wholePart);
  const fraction = fractionDigits === 0
    ? 0n
    : BigInt(fractionPart.padEnd(fractionDigits, "0") || "0");
  const amount = whole * scale + fraction;

  return sign === "-" ? -amount : amount;
}

export function formatMinorUnits(amount: bigint, fractionDigits = 2): string {
  assertFractionDigits(fractionDigits);

  const negative = amount < 0n;
  const absolute = negative ? -amount : amount;
  const scale = 10n ** BigInt(fractionDigits);
  const whole = absolute / scale;

  if (fractionDigits === 0) {
    return `${negative ? "-" : ""}${whole.toString()}`;
  }

  const fraction = (absolute % scale).toString().padStart(fractionDigits, "0");
  return `${negative ? "-" : ""}${whole.toString()}.${fraction}`;
}

function assertFractionDigits(fractionDigits: number): void {
  if (!Number.isInteger(fractionDigits) || fractionDigits < 0 || fractionDigits > 9) {
    throw new Error("fractionDigits must be an integer between 0 and 9.");
  }
}
