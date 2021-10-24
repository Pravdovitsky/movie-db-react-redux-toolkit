export const dataSelector = state => state.filmList;

export const filmsSelector = state => state.filmList.films;

export const totalPageSelector = state => state.filmList.totalPages;

export const favoriteSelector = state => state.filmList.favorite;