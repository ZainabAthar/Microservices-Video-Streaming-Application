import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  userData:{
    userId: "",
    username: "",
    email: "",
    gallery: {
      videos: [],
    },
    storage: {
      totalStorage: 50000,
      UsedStorage: 0,
      FreeStorage: 50000,
    },
    usage: {
      bandwidthTotalUsage: 0,
      bandwidthDailyUsage: 0,
      dailyLimit: 100000,
    },
  }
}

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData:(state,action)=>{
      state.userData=action.payload.data
    },
    setVideosData: (state, action) => {
      const { gallery} = action.payload.data;
    
      state.userData.gallery = {
        ...state.userData.gallery,
        videos: [...gallery.videos]
      };
    
      state.userData.storage = {
        ...state.userData.storage,
        UsedStorage: 50000 - gallery.freeStorage,
        FreeStorage: gallery.freeStorage,
      };
    
      state.userData.usage = {
        ...state.userData.usage,
        bandwidthDailyUsage: 100000 - gallery.freeBandwidth,
      };
    }
  },
     
    
})

export const { setUserData,setVideosData } = UserSlice.actions

export default UserSlice.reducer