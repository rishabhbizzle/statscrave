const fs = require('fs').promises

const spotifyApiDistPath = './node_modules/@spotify/web-api-ts-sdk/dist'
const spotifyApiMjsPath = `${spotifyApiDistPath}/mjs/auth/ClientCredentialsStrategy.js`
const spotifyApiCjsPath = `${spotifyApiDistPath}/cjs/auth/ClientCredentialsStrategy.js`
const paths = [spotifyApiMjsPath, spotifyApiCjsPath]

const patch = async path => {
    const content = await fs.readFile(path, 'utf-8')
    await fs.writeFile(path, content.replace(/body: bodyAsString\s/g, `body: bodyAsString, cache: 'no-store'`))
}

paths.forEach(patch)

console.log('Patched Spotify API')