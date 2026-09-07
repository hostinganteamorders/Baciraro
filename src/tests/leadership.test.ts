import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Leadership page presence', () => {
  it('creates src/app/leadership/page.tsx containing CEO and CBD names', () => {
    const filePath = path.join(process.cwd(), 'src/app/leadership/page.tsx')
    const exists = fs.existsSync(filePath)
    expect(exists).toBe(true)
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('Marlon')
    expect(content).toContain('Nobel')
  })
})
