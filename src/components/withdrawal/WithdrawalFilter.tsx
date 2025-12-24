'use client';

import { useWithdrawal } from '@/context/WithdrawalContext';
import { WithdrawalStatus, STATUS_CONFIG } from '@/types/withdrawal';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const statusOptions: { value: WithdrawalStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'pending', label: 'รอดำเนินการ' },
    { value: 'processing', label: 'กำลังดำเนินการ' },
    { value: 'completed', label: 'สำเร็จ' },
    { value: 'failed', label: 'ล้มเหลว' },
    { value: 'canceled', label: 'ยกเลิก' },
];

export default function WithdrawalFilter() {
    const { filters, setStatusFilter, setSearchQuery, fetchWithStats } = useWithdrawal();
    const [searchInput, setSearchInput] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(searchInput);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput, setSearchQuery]);

    // Fetch when filters change
    useEffect(() => {
        fetchWithStats();
    }, [filters, fetchWithStats]);

    const getChipColor = (status: WithdrawalStatus | 'all') => {
        if (status === 'all') return '#6366f1';
        return STATUS_CONFIG[status].color;
    };

    return (
        <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                    type="text"
                    placeholder="ค้นหาด้วยชื่อ, เลขบัญชี หรือ Transaction ID..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="glass-input w-full pl-12 pr-10 py-3 text-sm"
                />
                {searchInput && (
                    <button
                        onClick={() => setSearchInput('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-foreground/40" />
                    </button>
                )}
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
                {statusOptions.map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setStatusFilter(value)}
                        className={`filter-chip ${filters.status === value ? 'active' : ''}`}
                        style={filters.status === value ? {
                            background: getChipColor(value),
                            borderColor: getChipColor(value)
                        } : {}}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
