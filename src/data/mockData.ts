import { Withdrawal } from '@/types/withdrawal';

export const mockWithdrawals: Withdrawal[] = [
    {
        id: 'WD_001',
        userName: 'Somchai',
        accountNumber: '123-456-7890',
        bank: 'BBL',
        amount: 2500,
        currency: 'THB',
        status: 'pending',
        createdAt: '2025-11-26T09:10:00Z',
        history: [
            { status: 'pending', at: '2025-11-26T09:10:00Z' }
        ],
        attachments: [],
        note: 'เบิกค่าเครื่องใช้สำนักงาน'
    },
    {
        id: 'WD_002',
        userName: 'Wirat',
        accountNumber: '987-654-3210',
        bank: 'KBANK',
        amount: 1200,
        currency: 'THB',
        status: 'processing',
        createdAt: '2025-11-25T13:30:00Z',
        history: [
            { status: 'pending', at: '2025-11-25T13:36:00Z' },
            { status: 'processing', at: '2025-11-25T14:00:00Z' }
        ],
        attachments: [
            { id: 'att_01', type: 'image', name: 'slip.jpg', url: '/images/slip-placeholder.jpg' }
        ],
        note: ''
    },
    {
        id: 'WD_003',
        userName: 'Naphat',
        accountNumber: '555-333-1111',
        bank: 'SCB',
        amount: 5000,
        currency: 'THB',
        status: 'completed',
        createdAt: '2025-11-20T08:00:00Z',
        history: [
            { status: 'pending', at: '2025-11-20T08:00:00Z' },
            { status: 'processing', at: '2025-11-20T09:00:00Z' },
            { status: 'completed', at: '2025-11-20T11:00:00Z' }
        ],
        attachments: [],
        note: 'คืนเงินลูกค้า'
    },
    {
        id: 'WD_004',
        userName: 'Sarayut',
        accountNumber: '222-888-4444',
        bank: 'KTB',
        amount: 15000,
        currency: 'THB',
        status: 'failed',
        createdAt: '2025-11-18T15:45:00Z',
        history: [
            { status: 'pending', at: '2025-11-18T15:45:00Z' },
            { status: 'processing', at: '2025-11-18T16:00:00Z' },
            { status: 'failed', at: '2025-11-18T16:30:00Z' }
        ],
        attachments: [
            { id: 'att_02', type: 'document', name: 'invoice.pdf', url: '/docs/invoice.pdf' }
        ],
        note: 'บัญชีปลายทางไม่ถูกต้อง'
    },
    {
        id: 'WD_005',
        userName: 'Kittipong',
        accountNumber: '111-222-3333',
        bank: 'TMB',
        amount: 8500,
        currency: 'THB',
        status: 'canceled',
        createdAt: '2025-11-15T10:20:00Z',
        history: [
            { status: 'pending', at: '2025-11-15T10:20:00Z' },
            { status: 'canceled', at: '2025-11-15T11:00:00Z' }
        ],
        attachments: [],
        note: 'ผู้ใช้ยกเลิกคำขอ'
    },
    {
        id: 'WD_006',
        userName: 'Pranee',
        accountNumber: '444-555-6666',
        bank: 'BAY',
        amount: 3200,
        currency: 'THB',
        status: 'pending',
        createdAt: '2025-11-27T08:30:00Z',
        history: [
            { status: 'pending', at: '2025-11-27T08:30:00Z' }
        ],
        attachments: [
            { id: 'att_03', type: 'image', name: 'receipt.png', url: '/images/receipt-placeholder.png' }
        ],
        note: 'คืนเงินค่าสินค้า'
    },
    {
        id: 'WD_007',
        userName: 'Thanapon',
        accountNumber: '777-888-9999',
        bank: 'GSB',
        amount: 45000,
        currency: 'THB',
        status: 'processing',
        createdAt: '2025-11-26T14:00:00Z',
        history: [
            { status: 'pending', at: '2025-11-26T14:00:00Z' },
            { status: 'processing', at: '2025-11-26T15:30:00Z' }
        ],
        attachments: [
            { id: 'att_04', type: 'video', name: 'proof.mp4', url: '/videos/proof.mp4' },
            { id: 'att_05', type: 'image', name: 'id-card.jpg', url: '/images/id-placeholder.jpg' }
        ],
        note: 'โอนเงินเดือนพนักงาน'
    },
    {
        id: 'WD_008',
        userName: 'Siriporn',
        accountNumber: '333-444-5555',
        bank: 'KBANK',
        amount: 7800,
        currency: 'THB',
        status: 'completed',
        createdAt: '2025-11-22T09:15:00Z',
        history: [
            { status: 'pending', at: '2025-11-22T09:15:00Z' },
            { status: 'processing', at: '2025-11-22T10:00:00Z' },
            { status: 'completed', at: '2025-11-22T14:00:00Z' }
        ],
        attachments: [],
        note: 'เบิกค่าใช้จ่ายเดินทาง'
    }
];
