const fs = require('fs')
const semver = require('semver')
const axios = require('axios')
const Base64 = require('js-base64').Base64

const readJsonFile = path => {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}

const getNewestVersionFromVersionHistory = versionHistory => {
  return versionHistory.sort((a, b) => {
    return semver.gt(a.version, b.version) ? -1 : 1
  })[0].version
}

const getVersionHistoryFromGitHub = async () => {
  const url = 'https://api.github.com/repos/ryouEin/vrchat-friend-instance-list/contents/public/versions.json'
  const response = await axios.get(url)

  return JSON.parse(Base64.decode(response.data.content))
}

const main = async () => {
  const currentVersionHistory = readJsonFile('./public/versions.json')
  const currentVersion = getNewestVersionFromVersionHistory(currentVersionHistory)
  const manifestVersion = readJsonFile('./public/manifest.json').version

  if (currentVersion !== manifestVersion) {
    console.error('manifest.jsonのversionとversions.jsonの最新versionが異なっています')
    process.exit(-1)
  }

  const githubVersionHistory = await getVersionHistoryFromGitHub()
  const githubVersion = getNewestVersionFromVersionHistory(githubVersionHistory)

  if (semver.gt(currentVersion, githubVersion) === false) {
    console.error('バージョン情報が更新されていません')
    process.exit(-1)
  }
}

main()
