import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Product artist credit feature', () => {
  it('shows the artist section on the product detail page', () => {
    const filePath = path.join(process.cwd(), 'src/app/products/[slug]/page.tsx')
    const exists = fs.existsSync(filePath)
    expect(exists).toBe(true)
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('products.tentangSeniman')
    expect(content).toContain('artists')
  })

  it('exposes artist fields in the admin product form', () => {
    const filePath = path.join(process.cwd(), 'src/app/creative-studio/page.tsx')
    const exists = fs.existsSync(filePath)
    expect(exists).toBe(true)
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('creativeStudio.tambahSeniman')
    expect(content).toContain('handleAddArtist')
  })

  it('supports the Baciraro Art Series category', () => {
    const filePath = path.join(process.cwd(), 'src/app/products/page.tsx')
    const exists = fs.existsSync(filePath)
    expect(exists).toBe(true)
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('"art"')
    expect(content).toContain('Paintbrush')
  })
})
