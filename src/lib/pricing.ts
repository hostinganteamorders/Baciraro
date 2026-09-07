export type PrintVariant = {
  label: string;
  weight_g: number;
  minutes: number;
};

export const PRICE_PER_GRAM = 2500;

export function formatRupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}

export function parseVariants(raw: unknown): PrintVariant[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as PrintVariant[];
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as PrintVariant[];
    } catch {
      return [];
    }
  }
  return [];
}

export function variantPrice(weightG: number): number {
  return weightG * PRICE_PER_GRAM;
}

export function formatMinutes(min: number): string {
  if (min <= 0) return "";
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}