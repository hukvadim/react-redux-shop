import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from '../api/getData';

// Отримуємо дані каталогу продуктів
export const fetchCatalog = createAsyncThunk(
	'catalog/fetchCatalog',
	async function(url = apiUrl.catalog, {rejectWithValue}) {
		try {
			const response = await fetch(url);
			// console.log("Catalog response!");
			
			if (!response.ok)
				throw new Error('При отриманні товарів з сервера, отримали помилку!')

			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Отримуємо дані категорій каталогу
export const fetchCatalogCategories = createAsyncThunk(
	'catalog/fetchCatalogCategories',
	async function() {
		const response = await fetch(apiUrl.category);
		const data = await response.json();
		return data;
	}
);


// Формуємо сховище для каталогу
const catalogSlice = createSlice({
	name: 'catalog',
	initialState: {
		products: [],
		categories: [],
		loading: true,
		error: null
	},
	reducers: { },
	extraReducers: (builder) => {
		builder
			.addCase(fetchCatalog.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCatalog.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchCatalog.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCatalogCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
	},
})

export const { setLoading } = catalogSlice.actions;

export default catalogSlice.reducer;