import { describe, it, expect } from 'vitest'
import {
  variantPrice,
  formatRupiah,
  formatMinutes,
  parseVariants,
  PRICE_PER_GRAM,
} from '../lib/pricing'

describe('pricing', () => {
  describe('PRICE_PER_GRAM', () => {
    it('equals Rp 2,500', () => {
      expect(PRICE_PER_GRAM).toBe(2500)
    })
  })

  describe('variantPrice', () => {
    it('calculates price correctly', () => {
      expect(variantPrice(37)).toBe(92500)
      expect(variantPrice(100)).toBe(250000)
    })

    it('calculates price for heavier model: 227g = Rp 567,500', () => {
      expect(variantPrice(227)).toBe(567500)
    })
  })

  describe('formatRupiah', () => {
    it('formats with Indonesian locale', () => {
      expect(formatRupiah(2500)).toContain('2.500')
      expect(formatRupiah(100000)).toContain('100.000')
    })

    it('prepends Rp', () => {
      expect(formatRupiah(1000)).toMatch(/^Rp/)
    })
  })

  describe('formatMinutes', () => {
    it('formats minutes only', () => {
      expect(formatMinutes(45)).toBe('45 min')
    })

    it('formats hours and minutes', () => {
      expect(formatMinutes(90)).toBe('1h 30m')
    })

    it('formats exact hours', () => {
      expect(formatMinutes(120)).toBe('2h')
    })

    it('returns empty for 0 or negative', () => {
      expect(formatMinutes(0)).toBe('')
      expect(formatMinutes(-10)).toBe('')
    })
  })

  describe('parseVariants', () => {
    it('parses array of variants', () => {
      const input = [{ label: 'Standar', weight_g: 37, minutes: 120 }]
      expect(parseVariants(input)).toEqual(input)
    })

    it('parses JSON string', () => {
      const input = JSON.stringify([{ label: 'Standar', weight_g: 37, minutes: 120 }])
      expect(parseVariants(input)).toEqual([{ label: 'Standar', weight_g: 37, minutes: 120 }])
    })

    it('returns empty array for null/undefined', () => {
      expect(parseVariants(null)).toEqual([])
      expect(parseVariants(undefined)).toEqual([])
    })

    it('returns empty array for invalid JSON', () => {
      expect(parseVariants('invalid')).toEqual([])
    })
  })
})
