export const TMDB_IMAGE_PATH = "https://image.tmdb.org/t/p/";
import axios from "axios";

export const genreList = [
  { id: 12, name: "Adventure" },
  { id: 14, name: "Fantasy" },
  { id: 16, name: "Animation" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 36, name: "History" },
  { id: 37, name: "Western" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 878, name: "Science Fiction" },
  { id: 9648, name: "Mystery" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 10751, name: "Family" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10762, name: "Kids" },
  { id: 10763, name: "News" },
  { id: 10770, name: "TV Movie" },
  { id: 10752, name: "War" },
  { id: 10768, name: "War & Politics" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
];

export const movieGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const tvGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://localhost:7274"
    : "https://unisocial-api.onrender.com";

export const TMDB_imageResize = (value, path) => {
  return `${TMDB_IMAGE_PATH}${value}${path}`;
};

const client = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: "b8c8de7f468b18958d3a0d6fbf09b2ed" },
});

export const getHomePage = async () => {
  const routes = {
    "Trending Movies": { url: "/trending/movie/week", media_type: "movie" },
    "Popular Movies": { url: "/movie/popular", media_type: "movie" },
    "Top Rated Movies": { url: "/movie/top_rated", media_type: "movie" },
    "Trending TV": { url: "/trending/tv/week", media_type: "tv" },
    "Popular TV": { url: "/tv/popular", media_type: "tv" },
    "Top Rated TV": { url: "/tv/top_rated", media_type: "tv" },
  };

  const allRouteData = await Promise.all(
    Object.keys(routes).map((item) => client.get(routes[item].url))
  );

  const combinedData = allRouteData.reduce((final, current, index) => {
    final[Object.keys(routes)[index]] = current.data.results.map((item) => ({
      ...item,
      media_type: routes[Object.keys(routes)[index]].media_type,
    }));
    return final;
  }, {});

  const carouselFetch = (await client.get(`discover/movie`)).data.results;
  const carouselData = await Promise.all(
    carouselFetch.map(async (item) => {
      const runtime = (await client.get(`movie/${item.id}`)).data.runtime;
      return { ...item, runtime: runtime };
    })
  );
  const trendingData = (await client.get(`trending/all/day`)).data.results;

  return { combinedData, carouselData: carouselData.slice(0, 5), trendingData };
};

export const getFilmDetail = async (mediaType, id) => {
  const filmData = await client.get(`${mediaType}/${id}`);
  const castData = await client.get(`${mediaType}/${id}/credits`);
  return {
    props: {
      filmData: filmData.data,
      castData: castData.data.cast
        .filter((item) => item.profile_path)
        .slice(0, 20),
    },
  };
};

export const getFilmByGenre = async (mediaType, id, pageNumber) => {
  const response = await client.get(
    `discover/${mediaType}?api_key=b8c8de7f468b18958d3a0d6fbf09b2ed&with_genres=${id}&page=${pageNumber}`
  );

  return response.data;
};

export const getSimiliar = async (mediaType, id) => {
  const response = (await client.get(`${mediaType}/${id}/similar`)).data;
  return response;
};

export const getReviews = async (mediaType, id) => {
  const response = (await client.get(`${mediaType}/${id}/reviews`)).data;
  const reviews = response.results.reduce((total, cur) => {
    if (cur.author_details.avatar_path && cur.author_details.rating) {
      total.push(cur);
    }
    return total;
  }, []);
  return reviews;
};

export const basicSearch = async (query, page) => {
  try {
    const res = await client.get(
      `search/multi?api_key=b8c8de7f468b18958d3a0d6fbf09b2ed&query=${query}&page=${page}`
    );

    const filmList = res.data.results.reduce((total, cur) => {
      if (cur.media_type !== "person") {
        total.push(cur);
      }
      return total;
    }, []);

    const finalData = { ...res.data, results: filmList };

    return finalData;
  } catch (error) {
    alert(error);
  }
};

export const getTVSeasons = async (seasons, id) => {
  try {
    const seasonsList = await Promise.all(
      seasons.map(
        async (se) =>
          (
            await client.get(`tv/${id}/season/${se.season_number}`)
          ).data
      )
    );
    const filteredSeasonList = seasonsList.filter((item) =>
      item.episodes.every((ep) => ep.still_path)
    );
    return filteredSeasonList;
  } catch (error) {
    alert(error);
  }
};

export const getGenreName = (list) => {
  const nameList = list
    ? list?.reduce((total, cur) => {
        total.push(genreList.filter((item) => item.id == cur)[0]);
        return total;
      }, [])
    : [];
  return nameList;
};
