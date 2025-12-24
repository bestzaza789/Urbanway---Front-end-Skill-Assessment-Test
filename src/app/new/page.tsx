'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useWithdrawal } from '@/context/WithdrawalContext';
import { BANK_OPTIONS } from '@/types/withdrawal';
import FileUpload, { FileWithPreview } from '@/components/ui/FileUpload';
import { ArrowLeft, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface FormData {
    userName: string;
    accountNumber: string;
    bank: string;
    amount: string;
    note: string;
}

interface FormErrors {
    userName?: string;
    accountNumber?: string;
    bank?: string;
    amount?: string;
}

export default function NewWithdrawalPage() {
    const router = useRouter();
    const { addWithdrawal, loading } = useWithdrawal();

    const [formData, setFormData] = useState<FormData>({
        userName: '',
        accountNumber: '',
        bank: '',
        amount: '',
        note: ''
    });

    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.userName.trim()) {
            newErrors.userName = 'กรุณากรอกชื่อผู้ใช้';
        }

        if (!formData.accountNumber.trim()) {
            newErrors.accountNumber = 'กรุณากรอกเลขบัญชี';
        } else if (!/^[\d-]+$/.test(formData.accountNumber)) {
            newErrors.accountNumber = 'เลขบัญชีไม่ถูกต้อง';
        }

        if (!formData.bank) {
            newErrors.bank = 'กรุณาเลือกธนาคาร';
        }

        const amount = parseFloat(formData.amount);
        if (!formData.amount || isNaN(amount)) {
            newErrors.amount = 'กรุณากรอกจำนวนเงิน';
        } else if (amount <= 0) {
            newErrors.amount = 'จำนวนเงินต้องมากกว่า 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitStatus('idle');

        const result = await addWithdrawal({
            userName: formData.userName.trim(),
            accountNumber: formData.accountNumber.trim(),
            bank: formData.bank,
            amount: parseFloat(formData.amount),
            note: formData.note.trim()
        });

        if (result.success) {
            setSubmitStatus('success');
            setSubmitMessage('สร้างคำขอเบิกถอนสำเร็จ!');

            // Redirect after delay
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } else {
            setSubmitStatus('error');
            setSubmitMessage(result.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/"
                    className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">สร้างคำขอเบิกถอนใหม่</h1>
                    <p className="text-foreground/50 text-sm mt-1">กรอกข้อมูลเพื่อส่งคำขอเบิกถอนเงิน</p>
                </div>
            </div>

            {/* Success/Error Toast */}
            {submitStatus !== 'idle' && (
                <div className={`toast ${submitStatus === 'error' ? 'error' : ''}`}>
                    <div className="flex items-center gap-2">
                        {submitStatus === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        {submitMessage}
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-card-static p-6 space-y-6">
                    {/* User Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            ชื่อผู้ใช้ <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.userName}
                            onChange={(e) => handleInputChange('userName', e.target.value)}
                            placeholder="กรอกชื่อผู้ใช้"
                            className={`glass-input w-full px-4 py-3 ${errors.userName ? 'border-red-500' : ''}`}
                        />
                        {errors.userName && (
                            <p className="mt-1 text-sm text-red-400">{errors.userName}</p>
                        )}
                    </div>

                    {/* Bank Selection */}
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            ธนาคาร <span className="text-red-400">*</span>
                        </label>
                        <select
                            value={formData.bank}
                            onChange={(e) => handleInputChange('bank', e.target.value)}
                            className={`glass-input w-full px-4 py-3 ${errors.bank ? 'border-red-500' : ''}`}
                        >
                            <option value="" className="bg-background text-foreground">เลือกธนาคาร</option>
                            {BANK_OPTIONS.map(bank => (
                                <option key={bank.value} value={bank.value} className="bg-background text-foreground">
                                    {bank.label}
                                </option>
                            ))}
                        </select>
                        {errors.bank && (
                            <p className="mt-1 text-sm text-red-400">{errors.bank}</p>
                        )}
                    </div>

                    {/* Account Number */}
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            เลขบัญชี <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.accountNumber}
                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                            placeholder="xxx-xxx-xxxx"
                            className={`glass-input w-full px-4 py-3 ${errors.accountNumber ? 'border-red-500' : ''}`}
                        />
                        {errors.accountNumber && (
                            <p className="mt-1 text-sm text-red-400">{errors.accountNumber}</p>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            จำนวนเงิน (บาท) <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">฿</span>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                placeholder="0.00"
                                className={`glass-input w-full pl-8 pr-4 py-3 ${errors.amount ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {errors.amount && (
                            <p className="mt-1 text-sm text-red-400">{errors.amount}</p>
                        )}
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                            หมายเหตุ
                        </label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => handleInputChange('note', e.target.value)}
                            placeholder="ระบุรายละเอียดเพิ่มเติม (ถ้ามี)"
                            rows={3}
                            className="glass-input w-full px-4 py-3 resize-none"
                        />
                    </div>
                </div>

                {/* File Upload */}
                <div className="glass-card-static p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">ไฟล์แนบ</h3>
                    <FileUpload files={files} onFilesChange={setFiles} />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                    <Link href="/" className="glass-button-secondary flex-1 text-center">
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="glass-button flex-1 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                กำลังส่ง...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                ส่งคำขอเบิกถอน
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
