import axios from 'axios';

const getSeasonalAnime = async (year: number, season: string) => {
    return await axios.get(`https://api.jikan.moe/v4/season/${year}/${season}`);
};

export const getRandomSeasonalAnime = async (year: number, season: string) => {
    const data = await getSeasonalAnime(year, season);
    const animeData = data.data;
    const anime = animeData.anime.filter((anime: any) => anime.r18 === false );
    const randomNumber = Math.floor(Math.random() * anime.length);
    return anime[randomNumber];
}

export const getAnimeById = async (id: number) => {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
}

export const getAllSeasonsAvailable = async () => {
    return await axios.get(`https://api.jikan.moe/v4/season/archive`);
}
