const API_KEY = '38986046-b9c5577e52cca94c56fe7a79b';

export const fetchImagesFromAPI = async (query, page) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    if (!response.ok) {
      throw new Error('Not possible to load images');
    }

    const data = await response.json();
    const { hits, totalHits } = data;

    return { images: hits, loadMore: page < Math.ceil(totalHits / 12) };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { images: [], loadMore: false };
  }
};
