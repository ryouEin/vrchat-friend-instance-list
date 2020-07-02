import { Version } from '@/domains/VersionHistory/Version'

describe('constructor', () => {
  it('「major.minor.patch」の形式を満たさないと例外を吐く', () => {
    expect(() => {
      new Version('1.2.3')
    })

    expect(() => {
      new Version('')
    })

    expect(() => {
      new Version('hoge.fuga.foo')
    })

    expect(() => {
      new Version('1.2')
    })
  })
})

describe('isNewerThan', () => {
  it('1.2.3より1.2.4の方が新しいと判断される', () => {
    const result = new Version('1.2.4').isNewerThan(new Version('1.2.3'))

    expect(result).toBe(true)
  })

  it('0.0.0より0.0.1の方が新しいと判断される', () => {
    const result = new Version('0.0.1').isNewerThan(new Version('0.0.0'))

    expect(result).toBe(true)
  })

  it('0.1.0より1.0.0の方が新しいと判断される', () => {
    const result = new Version('1.0.0').isNewerThan(new Version('0.1.0'))

    expect(result).toBe(true)
  })
})

describe('isOlderThan', () => {
  it('1.2.4より1.2.3の方が古いと判断される', () => {
    const result = new Version('1.2.3').isOlderThan(new Version('1.2.4'))

    expect(result).toBe(true)
  })

  it('0.0.1より0.0.0の方が古いと判断される', () => {
    const result = new Version('0.0.0').isOlderThan(new Version('0.0.1'))

    expect(result).toBe(true)
  })

  it('1.0.0より0.1.0の方が古いと判断される', () => {
    const result = new Version('0.1.0').isOlderThan(new Version('1.0.0'))

    expect(result).toBe(true)
  })
})
