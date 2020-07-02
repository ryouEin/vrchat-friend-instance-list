import semver from 'semver'

export class Version {
  constructor(private readonly _value: string) {
    if (semver.valid(_value) === null) {
      throw new Error('version string is invalid.')
    }
  }

  get value() {
    return this._value
  }

  isNewerThan(comparison: Version) {
    return semver.gt(this._value, comparison.value)
  }

  isOlderThan(comparison: Version) {
    return semver.lt(this._value, comparison.value)
  }
}
