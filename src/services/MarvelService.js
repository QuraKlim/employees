class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '0edd54a6f4c61bdedbc4bf6b5e85b209';
    _privKey = '27d9f4b73b21ccc958a43053c627305080a87f9c';
    _baseOffset = 82;
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharecters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharecter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])

    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'Sorry, there is no description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    comicsArr = (arr) => {
        let comicsArr = [];

        arr.forEach((item, i) => {
            const obj = {
                name: item.title,
                url: item.urls[0].url
            }
            comicsArr[i] = obj;
        })
        return comicsArr
    }

    _getComics = async (id) => {
        const res = await this.getResource(`${this._apiBase}comics?characters=${id}&apikey=0edd54a6f4c61bdedbc4bf6b5e85b209`)
        return this.comicsArr(res.data.results)
    }
}

export default MarvelService;