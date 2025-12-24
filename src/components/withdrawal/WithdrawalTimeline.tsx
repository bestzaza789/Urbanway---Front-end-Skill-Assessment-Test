'use client';

import { StatusHistory, STATUS_CONFIG, WithdrawalStatus } from '@/types/withdrawal';
import { Clock, Loader2, CheckCircle2, XCircle, Ban } from 'lucide-react';

interface WithdrawalTimelineProps {
    history: StatusHistory[];
}

const statusIcons = {
    pending: Clock,
    processing: Loader2,
    completed: CheckCircle2,
    failed: XCircle,
    canceled: Ban,
};

export default function WithdrawalTimeline({ history }: WithdrawalTimelineProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    // Sort history by date descending (most recent first)
    const sortedHistory = [...history].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
    );

    return (
        <div className="timeline">
            {sortedHistory.map((item, index) => {
                const status = item.status as WithdrawalStatus;
                const config = STATUS_CONFIG[status];
                const Icon = statusIcons[status];

                return (
                    <div key={index} className="timeline-item">
                        <div
                            className="absolute -left-[24px] top-1 w-3 h-3 rounded-full"
                            style={{
                                background: config.color,
                                boxShadow: `0 0 0 4px ${config.bgColor}`
                            }}
                        />
                        <div className="glass-card-static p-4 ml-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Icon
                                    className="w-4 h-4"
                                    style={{ color: config.color }}
                                />
                                <span
                                    className="font-semibold text-sm"
                                    style={{ color: config.color }}
                                >
                                    {config.label}
                                </span>
                            </div>
                            <p className="text-xs text-foreground/50">
                                {formatDate(item.at)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
