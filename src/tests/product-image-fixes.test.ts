import { describe, it, expect } from 'vitest'
import { applyProductImageFixes, hasImageFix } from '../lib/product-image-fixes'

describe('applyProductImageFixes', () => {
  it('repoints broken main photo to an existing file', () => {
    const out = applyProductImageFixes({
      slug: '3d-keychain-nama',
      image_url: '/produk/3d/keychain-nama.jpeg',
      gallery: [],
    })
    expect(out.image_url).toBe('/produk/3d/mw-b2/3d-name-keychain-1.png')
  })

  it('clears image_url for products without a photo', () => {
    const out = applyProductImageFixes({ slug: '3d-classic-clicker', image_url: '/produk/3d/classic-clicker.jpeg' })
    expect(out.image_url).toBe('')
  })

  it('trims broken gallery entries', () => {
    const frog = applyProductImageFixes({
      slug: '3d-frog',
      image_url: '/produk/3d/mw/frog-2.jpg',
      gallery: ['/produk/3d/mw/frog-3.jpeg', '/produk/3d/mw/frog-4.jpeg'],
    })
    expect(frog.gallery).toEqual([])
    expect(frog.image_url).toBe('/produk/3d/mw/frog-2.jpg')

    const fox = applyProductImageFixes({ slug: '3d-flexi-fox', image_url: '/produk/3d/mw/flexi-fox-2.jpeg', gallery: [] })
    expect(fox.image_url).toBe('')
    expect(fox.gallery).toEqual([])
  })

  it('keeps healthy gallery when repointing', () => {
    const out = applyProductImageFixes({
      slug: '3d-whale-shark',
      image_url: '/produk/3d/mw-b2/3d-whale-shark-1.png',
      gallery: ['/produk/3d/mw-b2/3d-whale-shark-3.jpeg'],
    })
    expect(out.gallery).toEqual(['/produk/3d/mw-b2/3d-whale-shark-2.png'])
    expect(out.image_url).toBe('/produk/3d/mw-b2/3d-whale-shark-1.png')
  })

  it('returns untouched products as-is', () => {
    const product = { slug: '3d-frog-2', image_url: '/produk/3d/mw/frog-2.jpg', gallery: ['/a.png'] }
    expect(applyProductImageFixes(product)).toBe(product)
  })

  it('is idempotent', () => {
    const once = applyProductImageFixes({ slug: '3d-keychain-nama', image_url: '/produk/3d/keychain-nama.jpeg' })
    const twice = applyProductImageFixes(once)
    expect(twice).toEqual(once)
  })
})

describe('hasImageFix', () => {
  it('flags the fixed slugs only', () => {
    expect(hasImageFix('3d-keychain-nama')).toBe(true)
    expect(hasImageFix('3d-switch-clicker')).toBe(true)
    expect(hasImageFix('3d-frog')).toBe(true)
    expect(hasImageFix('sofa-puff-ecobrick')).toBe(false)
  })
})
