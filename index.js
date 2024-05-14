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
        let artistKey = row['Artist']

        let albumKey = `${row['Album']} - ${row['Artist']}`
        if (row['Album'].startsWith('Hamilton: An American Musical')) {
            albumKey = 'Hamilton: An American Musical - Original Broadway Cast'
            artistKey = 'Original Broadway Cast of Hamilton'
        }

        if (row['Album'].startsWith('Meteora')) {
            albumKey = 'Meteora - Linkin Park'
        }

        if (row['Album'].startsWith('The Eminem Show')) {
            albumKey = 'The Eminem Show - Eminem'
        }

        if (row['Album'].startsWith('Love Sux')) {
            albumKey = 'Love Sux - Avril Lavigne'
        }

        if (row['Album'].toLowerCase().startsWith('single and famous')) {
            albumKey = 'Single And Famous - MC Lars & K.Flay'
            artistKey = 'MC Lars & K.Flay'
        }

        // this was reported as Goldfinger and Biffy Clyro?
        if (row['Album'].startsWith('Never Look Back (Deluxe)')) {
            albumKey = 'Never Look Back (Deluxe) - Goldfinger'
            artistKey = 'Goldfinger'
        }

        if (row['Album'].startsWith('Hybrid Theory')) {
            albumKey = 'Hybrid Theory - Linkin Park'
        }

        if (!raw.artists[artistKey]) {
            raw.artists[artistKey] = 0
        }

        raw.artists[artistKey]++

        if (!raw.albums[albumKey]) {
            raw.albums[albumKey] = 0
        }

        raw.albums[albumKey]++
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