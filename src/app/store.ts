import { configureStore, } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import companyReducer from "../features/slices/companySlice";
import departmentReducer from "../features/slices/departmentSlice";
import memoTypeReducer from "../features/slices/memoTypeSlice";
// import memoTypeReducer from "../features/api/memoTypeSlice";
// import projectReducer from "../features/api/projectSlice";
import projectReducer from "../features/slices/projectSlice";
// import companyReducer from "../features/api/companySlice";
// import departmentReducer from "../features/api/departmentSlice";
import memoAttachmentReducer from "../features/slices/memoAttachmentSlice";
import groupReducer from "../features/slices/groupSlice";
import userReducer from "../features/slices/userSlice";
// import eMemoSliceReducer from "../features/slices/ememoSlice";
import { projectApi } from "../features/api/projectApi";
import { companyApi } from "../features/api/companyApi";
import { departmentApi } from "../features/api/departmentApi";
import { pokemonApi } from "../slices/pokemon";
import { memoTypeApi } from "../features/api/memoTypeApi";
import { memoAttachmentApi } from "../features/api/memoAttachmentApi";
import { groupApi } from "../features/api/groupApi";
import { userApi } from "../features/api/userApi";
import { createMemoLoopSlice } from "../features/slices/create-memo-loop.slice";
import { memoApprovalListSlice } from "../features/slices/memoApprovalListSlice";
import { memoApprovalApi } from "../features/api/memoApprovalApi";
import { EMemoSlice } from "../features/slices/ememoSlice";
import { memoAttachmentListSlice } from "../features/slices/memoAttachmentListSlice";
import { EmemoApi } from "../features/api/eMemoApi";
import { MemoLoopSlice } from "../features/slices/memoLoopSlice";
import { authSlice } from "../features/slices/authSlice";

export const store = configureStore({
    reducer: {
        company: companyReducer,
        department: departmentReducer,
        memoType: memoTypeReducer,
        project: projectReducer,
        memoAttachment: memoAttachmentReducer,
        group: groupReducer,
        user: userReducer,
        // ememo: eMemoSliceReducer,
        createMemoLoopDialog: createMemoLoopSlice.reducer,
        memoApprovalSlice: memoApprovalListSlice.reducer,
        ememo: EMemoSlice.reducer,
        memoAttachmentSlice: memoAttachmentListSlice.reducer,
        memoLoop: MemoLoopSlice.reducer,
        auth: authSlice.reducer,
        // approval
        // [pokemonApi.reducerPath]: pokemonApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [memoTypeApi.reducerPath]: memoTypeApi.reducer,
        [memoAttachmentApi.reducerPath]: memoAttachmentApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [memoApprovalApi.reducerPath]: memoApprovalApi.reducer,
        [EmemoApi.reducerPath]: EmemoApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware()
        .concat([
            projectApi.middleware,
            companyApi.middleware,
            departmentApi.middleware,
            memoTypeApi.middleware,
            memoAttachmentApi.middleware,
            groupApi.middleware,
            userApi.middleware,
            EmemoApi.middleware,
        ])
        // getDefaultMiddleware().concat(projectApi.middleware).concat(companyApi.middleware).concat(departmentApi.middleware)
        // getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
setupListeners(store.dispatch)

