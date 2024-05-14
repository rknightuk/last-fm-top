# Top albums and artists CSV parser for Last.fm

1. Use [this tool](https://benjaminbenben.com/lastfm-to-csv/) to get your export - add the headings to the CSV as well: `Artist`, `Album`, `Track`, and `Date`
2. Close this repository and name your CSV `export.csv` and put it in the root of the project
3. Run `npm install`
4. Then run `node index.js` and the script will output two files - `albums.txt` and `artists.txt`
5. You can optionally pass a limit if you want more than 50 entries like so `node index.js 100`

This also has some checks in it to clean up some albums and artists that were reported wrong, or the artist changed (like Hamilton).