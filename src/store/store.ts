import { create, StateCreator } from 'zustand'
import { persist, devtools } from "zustand/middleware";

export interface User {
    idUser: string;
    fullName: string;
    position: string;
    role: string;
    startDate: string;
}

type Store = {
    user: {};
    setUser: (data: any) => void
}

const userSlice: StateCreator<Store> = (set) => ({
    user: {},
    setUser: (data: any) => set((state) => ({ ...state, user: data })),
});

const useStore = create<Store>()(
    persist(
        devtools((...a) => ({
            ...userSlice(...a)
        })),
        { name: "user-persist" }
    )
)


export default useStore;