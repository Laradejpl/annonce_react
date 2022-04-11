import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    annonce:[],
};

export const annonceSlice = createSlice({
    name: "annonce",
    initialState,
    reducers: {
        setInfos: (state, action) => {
            state.annonce = action.payload;
        }
    }
});

export const { setInfos } = annonceSlice.actions;
//selectors
export const selectAnnonce = state => state.annonce


export default annonceSlice.reducer;