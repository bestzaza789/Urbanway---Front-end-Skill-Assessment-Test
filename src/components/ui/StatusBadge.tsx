'use client';

import { WithdrawalStatus, STATUS_CONFIG } from '@/types/withdrawal';
import { Clock, Loader2, CheckCircle2, XCircle, Ban } from 'lucide-react';

interface StatusBadgeProps {
    status: WithdrawalStatus;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

const statusIcons = {
    pending: Clock,
    processing: Loader2,
    completed: CheckCircle2,
    failed: XCircle,
    canceled: Ban,
};

export default function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
    const config = STATUS_CONFIG[status];
    const Icon = statusIcons[status];

    const sizeClasses = {
        sm: 'text-[10px] px-2 py-1',
        md: 'text-xs px-3 py-1.5',
        lg: 'text-sm px-4 py-2',
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-3.5 h-3.5',
        lg: 'w-4 h-4',
    };

    return (
        <span
            className={`status-badge ${status} ${sizeClasses[size]}`}
            style={{
                background: config.bgColor,
                color: config.color,
                borderColor: `${config.color}30`
            }}
        >
            {showIcon && (
                <Icon
                    className={`${iconSizes[size]} ${status === 'processing' ? 'animate-spin' : ''}`}
                />
            )}
            {config.label}
        </span>
    );
}
