'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const STORAGE_KEY = 'artistComparisonList';
const ComparisonContext = createContext();

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const ComparisonProvider = ({ children }) => {
    const [comparisonList, setComparisonList] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const storedList = loadFromLocalStorage();
        setComparisonList(storedList);
    }, []);

    const addToComparison = (artist) => {
        if (comparisonList.length < 2 && !comparisonList.some(a => a.id === artist.id)) {
            setComparisonList(prevList => {
                const newList = [...prevList, artist];
                saveToLocalStorage(newList);
                return newList;
            });
            toast.success('Artist added to comparison');
        } else if (comparisonList.some(a => a.id === artist.id)) {
            toast.warning('Artist already added to comparison');
        } else {
            toast.error('You can only compare up to 2 artists');
        }
    };

    const removeFromComparison = (artistId) => {
        setComparisonList(prevList => {
            const newList = prevList.filter(a => a.id !== artistId);
            saveToLocalStorage(newList);
            return newList;
        });
    };

    const loadFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
            try {
                const storedData = localStorage.getItem(STORAGE_KEY);
                if (storedData) {
                    const { list, timestamp } = JSON.parse(storedData);
                    const now = new Date().getTime();
                    if (now - timestamp > ONE_DAY_IN_MS) {
                        // More than a day has passed, clear the data
                        localStorage.removeItem(STORAGE_KEY);
                        return [];
                    }
                    return list;
                }
            } catch (error) {
                console.log('Error loading comparison list from local storage:', error);
            }
        }
        return [];
    };

    const saveToLocalStorage = (list) => {
        if (typeof window !== 'undefined') {
            try {
                const data = {
                    list,
                    timestamp: new Date().getTime()
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.log('Error saving comparison list to local storage:', error);
            }
        }
    };

    if (!isClient) {
        return null; // or a loading spinner
    }

    return (
        <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison }}>
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = () => useContext(ComparisonContext);