import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getFavorites} from '../../common/utils';

const initialState = {
    films: [],
    totalPages: 0,
    favorite: getFavorites(),
    status: null,
    error: null,
};

export const fetchList = createAsyncThunk(
    'filmList/fetchList',
    async (page, {rejectWithValue}) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru&page=${page}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

const filmReducer = createSlice({
        name: 'filmList',
        initialState,
        reducers: {
            pushFavorite(state, action) {
                state.favorite.push(action.payload);
            },
            deleteFavorite(state, action) {
                state.favorite = action.payload;
            }
        },
        extraReducers: {
            [fetchList.pending]: (state) => {
                state.status = 'loading';
                state.error = null;
            },
            [fetchList.fulfilled]: (state, action) => {
                state.status = 'resolved';
                state.films = action.payload.results;
                state.totalPages = action.payload.total_pages;
            },
            [fetchList.rejected]: (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            },
        },
    }
);

export default filmReducer.reducer;
export const {pushFavorite, deleteFavorite} = filmReducer.actions;