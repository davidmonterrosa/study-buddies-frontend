'use client'

import { ICommunityData } from "@/utils/Interfaces/UserInterfaces"
import { createContext, useContext, useState } from "react";

interface Context {
    communityGroups: ICommunityData[];
    setCommunityGroups: (communities: ICommunityData[] ) => void
}

const AppContext = createContext<Context>({
    communityGroups: [],
    setCommunityGroups: () => {}
});

export function AppWrapper({children} : {children: React.ReactNode}) {
    const [communityGroups, setCommunityGroups] = useState<ICommunityData[]>([]);
    return (
        <AppContext.Provider value={{communityGroups, setCommunityGroups }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}