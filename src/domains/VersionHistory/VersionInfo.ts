import { Version } from '@/domains/VersionHistory/Version'

export class VersionInfo {
  constructor(
    private readonly _version: Version,
    private readonly _contents: string[]
  ) {}

  get version() {
    return this._version
  }

  get contents() {
    return this._contents
  }
}
