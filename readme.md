# Top albums and artists CSV parser for Last.fm

1. Use [this tool](https://benjaminbenben.com/lastfm-to-csv/) to get your export
2. Close this repository and name your CSV `export.csv` and put it in the root of the project
3. Run `npm install`
4. Then run `node index.js` and the script will output two files - `albums.txt` and `artists.txt`
5. You can optionally pass a limit if you want more than 50 entries like so `node index.js 100`