import { describe, it, expect } from 'vitest'
import { parseMaterials, buildCatalogCards, type RawProduct } from '../lib/product-curation'

describe('parseMaterials', () => {
  it('parses standard name/amount format', () => {
    const out = parseMaterials([{ name: 'HDPE daur ulang', amount: 0.085, unit: 'kg' }])
    expect(out).toEqual([{ name: 'HDPE daur ulang', amount: 0.085, unit: 'kg' }])
  })

  it('accepts JSON string input', () => {
    const out = parseMaterials('[{"name":"Plastik","amount":0.03,"unit":"kg"}]')
    expect(out).toHaveLength(1)
    expect(out[0].amount).toBe(0.03)
  })

  it('converts legacy percentage format using total_plastic_kg', () => {
    const raw =
      '[{"material":"HDPE daur ulang","percentage":80},{"material":"Ring dan rantai logam","percentage":20}]'
    const out = parseMaterials(raw, 0.005)
    expect(out).toEqual([
      { name: 'HDPE daur ulang', amount: 0.004, unit: 'kg' },
      { name: 'Ring dan rantai logam', amount: 0.001, unit: 'kg' },
    ])
    expect(out.reduce((s, m) => s + m.amount, 0)).toBeCloseTo(0.005, 4)
  })

  it('skips legacy rows when total_plastic_kg is missing', () => {
    expect(parseMaterials([{ material: 'HDPE', percentage: 100 }], 0)).toEqual([])
    expect(parseMaterials([{ material: 'HDPE', percentage: 100 }])).toEqual([])
  })

  it('defaults missing unit to kg', () => {
    expect(parseMaterials([{ name: 'PLA', amount: 12 }])[0].unit).toBe('kg')
  })

  it('returns empty array for invalid input', () => {
    expect(parseMaterials('not json')).toEqual([])
    expect(parseMaterials(null)).toEqual([])
    expect(parseMaterials('[]')).toEqual([])
  })
})

describe('buildCatalogCards', () => {
  it('computes totalKg from materials', () => {
    const products: RawProduct[] = [
      {
        id: 1,
        slug: 'medali-test',
        title: 'Medali',
        category: 'plastic',
        materials: [{ name: 'HDPE', amount: 0.085, unit: 'kg' }],
        total_plastic_kg: 0.085,
      },
    ]
    const card = buildCatalogCards(products).find((c) => c.slug === 'medali-test')
    expect(card?.totalKg).toBe(0.085)
  })

  it('falls back to total_plastic_kg when materials are empty', () => {
    const products: RawProduct[] = [
      {
        id: 2,
        slug: 'tatakan-test',
        title: 'Tatakan',
        category: 'plastic',
        materials: [],
        total_plastic_kg: 0.01,
      },
    ]
    const card = buildCatalogCards(products).find((c) => c.slug === 'tatakan-test')
    expect(card?.totalKg).toBe(0.01)
  })

  it('never produces NaN for legacy percentage rows', () => {
    const products: RawProduct[] = [
      {
        id: 3,
        slug: 'beruang-test',
        title: 'Beruang',
        category: 'plastic',
        materials: '[{"material":"HDPE daur ulang","percentage":80}]',
        total_plastic_kg: 0.005,
      },
    ]
    const card = buildCatalogCards(products).find((c) => c.slug === 'beruang-test')
    expect(card?.totalKg).toBe(0.004)
    expect(Number.isNaN(card?.totalKg)).toBe(false)
  })
})
