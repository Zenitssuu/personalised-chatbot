import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  decoded?: DecodedToken | null;
}

interface DecodedToken {
  userId: string;
  email: string;
}

const initialState: UserState = {
  token: null,
  isAuthenticated: false,
  decoded: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      try {
        // console.log(action.payload);
        const decoded = jwtDecode<DecodedToken>(action.payload);
        state.token = action.payload;
        state.isAuthenticated = true;
        state.decoded = decoded;
      } catch (err) {
        console.error("Failed to decode token:", err);
        state.token = null;
        state.isAuthenticated = false;
        state.decoded = null;
      }
    },
    clearToken: (state) => {
      (state.token = null),
        (state.isAuthenticated = false),
        (state.decoded = null);
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
