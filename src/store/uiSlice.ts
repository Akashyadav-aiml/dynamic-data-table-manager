import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '@/types';

const initialState: UIState = {
  themeMode: 'light',
  manageColumnsOpen: false,
  importDialogOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeMode = action.payload;
    },
    setManageColumnsOpen: (state, action: PayloadAction<boolean>) => {
      state.manageColumnsOpen = action.payload;
    },
    setImportDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.importDialogOpen = action.payload;
    },
  },
});

export const { toggleTheme, setThemeMode, setManageColumnsOpen, setImportDialogOpen } = uiSlice.actions;

export default uiSlice.reducer;
