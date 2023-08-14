import axios from 'axios';

const getSeasonalAnime = async (year: number, season: string) => {
    return await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}`);
};

export const getRandomSeasonalAnime = async (year: number, season: string) => {
    const { data } = await getSeasonalAnime(year, season);
    const animeData = data.data;
    const randomNumber = Math.floor(Math.random() * animeData.length);
    return animeData[randomNumber];
}

export const getAnimeById = async (id: number) => {
    return await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
}

export const getAllSeasonsAvailable = async () => {
    return await axios.get(`https://api.jikan.moe/v4/seasons`);
}
