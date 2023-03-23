import { create, StateCreator } from 'zustand'
import { persist, devtools } from "zustand/middleware";

export interface User {
    id: string;
    fullName: string;
    position: string;
    role: string;
    startDate: string;
    email: string;
}

type Store = {
    user: User;
    setUser: (data: any) => void
    reset: () => void
}

const initialState = {
    user: {} as User
}

const userSlice: StateCreator<Store> = (set) => ({
    user: {} as User,
    setUser: (data: any) => set((state) => ({ ...state, user: data })),
    reset: () => set(initialState)
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