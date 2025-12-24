'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Withdrawal, FilterOptions, WithdrawalStatus, CreateWithdrawalRequest } from '@/types/withdrawal';
import { getWithdrawals, filterWithdrawals, createWithdrawal, getWithdrawalStats } from '@/services/mockApi';

interface WithdrawalStats {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
    canceled: number;
    totalAmount: number;
}

interface WithdrawalContextType {
    withdrawals: Withdrawal[];
    loading: boolean;
    error: string | null;
    stats: WithdrawalStats | null;
    filters: FilterOptions;
    fetchWithdrawals: () => Promise<void>;
    fetchWithStats: () => Promise<void>;
    setStatusFilter: (status: WithdrawalStatus | 'all') => void;
    setSearchQuery: (query: string) => void;
    addWithdrawal: (request: CreateWithdrawalRequest) => Promise<{ success: boolean; message?: string }>;
}

const WithdrawalContext = createContext<WithdrawalContextType | undefined>(undefined);

export function WithdrawalProvider({ children }: { children: ReactNode }) {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<WithdrawalStats | null>(null);
    const [filters, setFilters] = useState<FilterOptions>({ status: 'all', searchQuery: '' });

    const fetchWithdrawals = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWithdrawals();
            setWithdrawals(data);
        } catch (err) {
            setError('Failed to fetch withdrawals');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWithStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [data, statsData] = await Promise.all([
                filterWithdrawals(filters.status, filters.searchQuery),
                getWithdrawalStats()
            ]);
            setWithdrawals(data);
            setStats(statsData);
        } catch (err) {
            setError('Failed to fetch data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const setStatusFilter = useCallback((status: WithdrawalStatus | 'all') => {
        setFilters(prev => ({ ...prev, status }));
    }, []);

    const setSearchQuery = useCallback((query: string) => {
        setFilters(prev => ({ ...prev, searchQuery: query }));
    }, []);

    const addWithdrawal = useCallback(async (request: CreateWithdrawalRequest) => {
        setLoading(true);
        try {
            const response = await createWithdrawal(request);
            if (response.success) {
                await fetchWithStats();
                return { success: true };
            }
            return { success: false, message: response.message };
        } catch (err) {
            console.error(err);
            return { success: false, message: 'Network error' };
        } finally {
            setLoading(false);
        }
    }, [fetchWithStats]);

    return (
        <WithdrawalContext.Provider
            value={{
                withdrawals,
                loading,
                error,
                stats,
                filters,
                fetchWithdrawals,
                fetchWithStats,
                setStatusFilter,
                setSearchQuery,
                addWithdrawal
            }}
        >
            {children}
        </WithdrawalContext.Provider>
    );
}

export function useWithdrawal() {
    const context = useContext(WithdrawalContext);
    if (context === undefined) {
        throw new Error('useWithdrawal must be used within a WithdrawalProvider');
    }
    return context;
}
