

const BASE_URL = 'https://watchlist-price-compairesion-server.onrender.com/api';

export const fetchResult = async (url) => {
    try {
        const res =  await fetch(`${BASE_URL}/scraper/compair?productURL=${url}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

