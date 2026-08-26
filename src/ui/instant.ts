const RFC_3339 = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d{1,9}))?(Z|[+-]\d{2}:\d{2})$/;
const NS_PER_SECOND = 1_000_000_000n;
const NS_PER_MILLISECOND = 1_000_000n;
const NS_PER_MICROSECOND = 1_000n;

export function parseRfc3339Nanoseconds(value: string): bigint | undefined {
  const match = RFC_3339.exec(value);
  if (!match) return undefined;
  const milliseconds = Date.parse(`${match[1]}${match[3]}`);
  if (!Number.isFinite(milliseconds)) return undefined;
  const fraction = BigInt((match[2] ?? "").padEnd(9, "0") || "0");
  return BigInt(milliseconds) * NS_PER_MILLISECOND + fraction;
}

export function durationNanoseconds(start: string, end: string): bigint {
  const parsedStart = parseRfc3339Nanoseconds(start);
  const parsedEnd = parseRfc3339Nanoseconds(end);
  if (parsedStart === undefined || parsedEnd === undefined || parsedEnd <= parsedStart) return 0n;
  return parsedEnd - parsedStart;
}

export function formatDurationNanoseconds(nanoseconds: bigint): string {
  if (nanoseconds <= 0n) return "0s";
  if (nanoseconds < NS_PER_SECOND) {
    if (nanoseconds >= NS_PER_MILLISECOND) {
      return `${decimal(nanoseconds, NS_PER_MILLISECOND, 6)}ms`;
    }
    if (nanoseconds >= NS_PER_MICROSECOND) {
      return `${decimal(nanoseconds, NS_PER_MICROSECOND, 3)}µs`;
    }
    return `${nanoseconds}ns`;
  }

  let remaining = nanoseconds;
  const day = 86_400n * NS_PER_SECOND;
  const hour = 3_600n * NS_PER_SECOND;
  const minute = 60n * NS_PER_SECOND;
  const days = remaining / day;
  remaining %= day;
  const hours = remaining / hour;
  remaining %= hour;
  const minutes = remaining / minute;
  remaining %= minute;
  const parts = [
    days > 0n ? `${days}d` : "",
    hours > 0n ? `${hours}h` : "",
    minutes > 0n ? `${minutes}m` : "",
    remaining > 0n ? `${decimal(remaining, NS_PER_SECOND, 9)}s` : "",
  ].filter(Boolean);
  return parts.join(" ");
}

export function percentage(numerator: bigint, denominator: bigint): number {
  if (denominator <= 0n) return 0;
  const scale = 1_000_000n;
  return Number((numerator * 100n * scale) / denominator) / Number(scale);
}

export function epochMilliseconds(nanoseconds: bigint): number {
  return Number(nanoseconds / NS_PER_MILLISECOND);
}

function decimal(value: bigint, unit: bigint, precision: number): string {
  const whole = value / unit;
  const remainder = value % unit;
  if (remainder === 0n) return String(whole);
  const fraction = remainder.toString().padStart(precision, "0").replace(/0+$/, "");
  return `${whole}.${fraction}`;
}
