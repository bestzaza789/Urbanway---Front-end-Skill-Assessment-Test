// Withdrawal status types
export type WithdrawalStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';

// Attachment types
export type AttachmentType = 'image' | 'video' | 'document';

// Status history entry
export interface StatusHistory {
  status: WithdrawalStatus;
  at: string;
}

// Attachment interface
export interface Attachment {
  id: string;
  type: AttachmentType;
  name: string;
  url: string;
}

// Main withdrawal interface
export interface Withdrawal {
  id: string;
  userName: string;
  accountNumber: string;
  bank: string;
  amount: number;
  currency: string;
  status: WithdrawalStatus;
  createdAt: string;
  history: StatusHistory[];
  attachments: Attachment[];
  note: string;
}

// Create withdrawal request
export interface CreateWithdrawalRequest {
  userName: string;
  accountNumber: string;
  bank: string;
  amount: number;
  note?: string;
  attachments?: File[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Filter options
export interface FilterOptions {
  status?: WithdrawalStatus | 'all';
  searchQuery?: string;
}

// Bank options
export const BANK_OPTIONS = [
  { value: 'BBL', label: 'ธนาคารกรุงเทพ (BBL)' },
  { value: 'KBANK', label: 'ธนาคารกสิกรไทย (KBANK)' },
  { value: 'SCB', label: 'ธนาคารไทยพาณิชย์ (SCB)' },
  { value: 'KTB', label: 'ธนาคารกรุงไทย (KTB)' },
  { value: 'TMB', label: 'ธนาคารทหารไทยธนชาต (TTB)' },
  { value: 'BAY', label: 'ธนาคารกรุงศรีอยุธยา (BAY)' },
  { value: 'GSB', label: 'ธนาคารออมสิน (GSB)' },
] as const;

// Status display config
export const STATUS_CONFIG: Record<WithdrawalStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'รอดำเนินการ', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.15)' },
  processing: { label: 'กำลังดำเนินการ', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.15)' },
  completed: { label: 'สำเร็จ', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.15)' },
  failed: { label: 'ล้มเหลว', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.15)' },
  canceled: { label: 'ยกเลิก', color: '#6B7280', bgColor: 'rgba(107, 114, 128, 0.15)' },
};
