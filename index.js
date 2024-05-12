const csv = require('csvtojson/v2')
const fs = require('fs')

const run = async () => {
    const limit = process.argv[2] || 50
    const csvFilePath = './export.csv'
    const rawData = await csv().fromFile(csvFilePath)
    
    const raw = {
        artists: {},
        albums: {}
    }

    rawData.forEach(row => {
        if (!raw.artists[row['Artist']]) {
            raw.artists[row['Artist']] = 0
        }

        raw.artists[row['Artist']]++

        if (!raw.albums[`${row['Album']} - ${row['Artist']}`]) {
            raw.albums[`${row['Album']} - ${row['Artist']}`] = 0
        }

        raw.albums[`${row['Album']} - ${row['Artist']}`]++
    });

    const data = {
        artists: [],
        albums: [],
    }

    Object.keys(raw.artists).forEach(key => {
        data.artists.push({
            artist: key,
            count: raw.artists[key]
        })
    })

    Object.keys(raw.albums).forEach(key => {
        data.albums.push({
            album: key,
            count: raw.albums[key]
        })
    })

    data.artists = data.artists.sort((a, b) => b.count - a.count)
    data.albums = data.albums.sort((a, b) => b.count - a.count)

    const artistContent = `${data.artists.slice(0, limit).map(row => `- ${row.artist} (${row.count} plays)`).join('\n')}`

    fs.writeFileSync('artists.txt', artistContent)

    const albumContent = `${data.albums.slice(0, limit).map(row => `- ${row.album} (${row.count} plays)`).join('\n')}`

    fs.writeFileSync('albums.txt', albumContent)
}

run()