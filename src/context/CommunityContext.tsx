'use client'

import { ICommunityData } from "@/utils/Interfaces/UserInterfaces"
import { createContext, useState } from "react";

interface Context {
    communityGroups: ICommunityData[];
    setCommunityGroups: () => void
}

const AppContext = createContext<Context>({
    communityGroups: [],
    setCommunityGroups: () => []
});

export function AppWrapper({children} : {children: React.ReactNode}) {
    const [communityGroups, setCommunityGroups] = useState([]);
}

