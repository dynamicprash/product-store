//Using zustand to create a  globall state i.e the state variable usable in every component
import {create} from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("preferred-theme") || "dark",
    setTheme: (theme) => {
        localStorage.setItem("preferred-theme",theme);
        set({theme});
    },
}))