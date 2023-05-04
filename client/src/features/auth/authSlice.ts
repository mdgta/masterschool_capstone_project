import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


const user = JSON.parse(localStorage.getItem("user") || "null");

interface authState {
    user: string | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: authState = {
    user: user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: state => {
            state.user = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: () => {
        return "foobar";
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;