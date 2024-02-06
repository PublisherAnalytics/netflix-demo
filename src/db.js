const API_KEY = '3fe8b1192a8a5c651cf274edc942e245'; // PublisherAnalytics API Key
const API_BASE = 'https://api.themoviedb.org/3';
// API Read Access Token (publisher Analytics): eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmU4YjExOTJhOGE1YzY1MWNmMjc0ZWRjOTQyZTI0NSIsInN1YiI6IjY1YzEwNzA3YmE0ODAyMDE4MjZlZGE5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESTFPPr_5YzkuEonSZxLhlk5Nl55SMyy3prFT7gsFBw

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originals Netflix',
                items: await basicFetch(`/discover/tv?with_networks=213&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'sci-fi',
                title: 'Science Fiction',
                items: await basicFetch(`/discover/movie?with_genres=878&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'fantasy',
                title: 'Fantasy',
                items: await basicFetch(`/discover/movie?with_genres=14&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFetch(`/discover/movie?with_genres=28&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedy',
                items: await basicFetch(`/discover/movie?with_genres=35&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Thriller',
                items: await basicFetch(`/discover/movie?with_genres=27&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentary',
                items: await basicFetch(`/discover/movie?with_genres=99&language=en-US&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=en-US&api_key=${API_KEY}`)
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=en-US&api_key=${API_KEY}`)
                    break;
                default:
                    info = null;
                    break;
            }
        }
        return info;
    }
}