'use client';

import Link from 'next/link';
import { Withdrawal, BANK_OPTIONS } from '@/types/withdrawal';
import StatusBadge from '@/components/ui/StatusBadge';
import { ArrowRight, Calendar, Building2, User } from 'lucide-react';

interface WithdrawalCardProps {
    withdrawal: Withdrawal;
    variant?: 'default' | 'compact';
}

export default function WithdrawalCard({ withdrawal, variant = 'default' }: WithdrawalCardProps) {
    const bankLabel = BANK_OPTIONS.find(b => b.value === withdrawal.bank)?.label || withdrawal.bank;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    if (variant === 'compact') {
        return (
            <Link href={`/${withdrawal.id}`} className="block">
                <div className="glass-card p-4 group cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">{withdrawal.userName}</p>
                                <p className="text-xs text-foreground/50">{withdrawal.id}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="amount-display text-lg">฿{formatAmount(withdrawal.amount)}</p>
                            <StatusBadge status={withdrawal.status} size="sm" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/${withdrawal.id}`} className="block">
            <div className="glass-card bento-item p-6 group cursor-pointer h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                            <User className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground text-lg">{withdrawal.userName}</h3>
                            <p className="text-xs text-foreground/40 font-mono">{withdrawal.id}</p>
                        </div>
                    </div>
                    <StatusBadge status={withdrawal.status} />
                </div>

                {/* Amount */}
                <div className="mb-4">
                    <p className="text-xs text-foreground/40 uppercase tracking-wider mb-1">จำนวนเงิน</p>
                    <p className="amount-display text-2xl">฿{formatAmount(withdrawal.amount)}</p>
                </div>

                {/* Details */}
                <div className="space-y-2 grow">
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Building2 className="w-4 h-4" />
                        <span>{bankLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <span className="font-mono text-foreground/40">{withdrawal.accountNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/50">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(withdrawal.createdAt)}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-foreground/5 flex items-center justify-between">
                    {withdrawal.note && (
                        <p className="text-xs text-foreground/40 truncate flex-1 mr-2">{withdrawal.note}</p>
                    )}
                    <div className="flex items-center gap-1 text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        ดูรายละเอียด
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Attachments indicator */}
                {withdrawal.attachments.length > 0 && (
                    <div className="absolute top-4 right-4">
                        <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center">
                            {withdrawal.attachments.length}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}
