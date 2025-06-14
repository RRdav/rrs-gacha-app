'use client';

import { createContext } from "react";
import { Character } from "@/app/utils/types/Character";
import { useState, Dispatch, SetStateAction } from "react";


export const CollectionContext = createContext({
  acquiredCharacters: [] as Character[],
  setAcquiredCharacters: (() => {}) as Dispatch<SetStateAction<Character[]>>,
});

export function CollectionProvider({children} : {children: React.ReactNode}) {
    const [acquiredCharacters, setAcquiredCharacters] = useState<Character[]>([]);

    return (
        <CollectionContext.Provider value={{ acquiredCharacters, setAcquiredCharacters }}>
            {children}
        </CollectionContext.Provider>
    );
}