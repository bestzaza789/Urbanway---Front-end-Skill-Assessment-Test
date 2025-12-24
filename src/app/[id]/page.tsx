'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Withdrawal, BANK_OPTIONS } from '@/types/withdrawal';
import { getWithdrawalById } from '@/services/mockApi';
import StatusBadge from '@/components/ui/StatusBadge';
import WithdrawalTimeline from '@/components/withdrawal/WithdrawalTimeline';
import AttachmentGallery from '@/components/withdrawal/AttachmentGallery';
import {
    ArrowLeft,
    Copy,
    CheckCircle,
    User,
    Building2,
    CreditCard,
    FileText,
    History,
    Paperclip
} from 'lucide-react';

export default function WithdrawalDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [withdrawal, setWithdrawal] = useState<Withdrawal | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchWithdrawal = async () => {
            setLoading(true);
            const data = await getWithdrawalById(id);
            setWithdrawal(data);
            setLoading(false);
        };

        if (id) {
            fetchWithdrawal();
        }
    }, [id]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const getBankLabel = (bankCode: string) => {
        return BANK_OPTIONS.find(b => b.value === bankCode)?.label || bankCode;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="spinner" />
            </div>
        );
    }

    if (!withdrawal) {
        return (
            <div className="text-center py-20">
                <div className="glass-card inline-block p-8">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
                    <h2 className="text-xl font-semibold text-foreground mb-2">ไม่พบรายการ</h2>
                    <p className="text-foreground/50 mb-6">รายการที่คุณค้นหาไม่มีอยู่ในระบบ</p>
                    <Link href="/" className="glass-button inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        กลับหน้าหลัก
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <Link
                    href="/"
                    className="p-2 rounded-lg hover:bg-foreground/10 transition-colors w-fit"
                >
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </Link>
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-bold text-foreground">{withdrawal.id}</h1>
                        <StatusBadge status={withdrawal.status} size="lg" />
                    </div>
                    <p className="text-foreground/50 text-sm mt-1">
                        สร้างเมื่อ {formatDate(withdrawal.createdAt)}
                    </p>
                </div>
                <button
                    onClick={() => copyToClipboard(withdrawal.id)}
                    className="glass-button-secondary flex items-center gap-2 w-fit"
                >
                    {copied ? (
                        <>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">คัดลอกแล้ว!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            คัดลอก ID
                        </>
                    )}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Main Info Card */}
                <div className="glass-card-static p-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-indigo-400" />
                            ข้อมูลผู้ขอเบิกถอน
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                    <User className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-foreground/50">ชื่อผู้ใช้</p>
                                    <p className="font-medium text-foreground">{withdrawal.userName}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-foreground/50">ธนาคาร</p>
                                    <p className="font-medium text-foreground">{getBankLabel(withdrawal.bank)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-pink-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-foreground/50">เลขบัญชี</p>
                                    <p className="font-medium text-foreground font-mono">{withdrawal.accountNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="pt-4 border-t border-foreground/10">
                        <p className="text-sm text-foreground/50 mb-2">จำนวนเงินที่เบิกถอน</p>
                        <p className="amount-display text-4xl">฿{formatCurrency(withdrawal.amount)}</p>
                        <p className="text-sm text-foreground/40 mt-1">{withdrawal.currency}</p>
                    </div>

                    {/* Note */}
                    {withdrawal.note && (
                        <div className="pt-4 border-t border-foreground/10">
                            <p className="text-sm text-foreground/50 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                หมายเหตุ
                            </p>
                            <p className="text-foreground/80 text-sm bg-foreground/5 p-3 rounded-lg">
                                {withdrawal.note}
                            </p>
                        </div>
                    )}
                </div>

                {/* Timeline */}
                <div className="glass-card-static p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                        <History className="w-5 h-5 text-indigo-400" />
                        ประวัติการเปลี่ยนสถานะ
                    </h2>
                    <WithdrawalTimeline history={withdrawal.history} />
                </div>
            </div>

            {/* Attachments */}
            <div className="glass-card-static p-6 mt-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Paperclip className="w-5 h-5 text-indigo-400" />
                    ไฟล์แนบ ({withdrawal.attachments.length})
                </h2>
                <AttachmentGallery attachments={withdrawal.attachments} />
            </div>

            {/* Actions */}
            <div className="flex justify-center mt-8">
                <Link href="/" className="glass-button-secondary flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    กลับหน้ารายการ
                </Link>
            </div>
        </div>
    );
}
