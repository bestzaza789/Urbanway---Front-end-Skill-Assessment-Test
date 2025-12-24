import { Withdrawal, CreateWithdrawalRequest, ApiResponse, WithdrawalStatus } from '@/types/withdrawal';
import { mockWithdrawals } from '@/data/mockData';

// Simulated delay for realistic API feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage (simulates database)
let withdrawals: Withdrawal[] = [...mockWithdrawals];

// Generate unique ID
const generateId = (): string => {
    const num = withdrawals.length + 1;
    return `WD_${String(num).padStart(3, '0')}`;
};

// GET /api/withdrawals
export async function getWithdrawals(): Promise<Withdrawal[]> {
    await delay(500);
    return [...withdrawals].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

// GET /api/withdrawals/:id
export async function getWithdrawalById(id: string): Promise<Withdrawal | null> {
    await delay(300);
    return withdrawals.find(w => w.id === id) || null;
}

// POST /api/withdrawals
export async function createWithdrawal(
    request: CreateWithdrawalRequest
): Promise<ApiResponse<Withdrawal>> {
    await delay(800);

    // Validation
    if (!request.userName || request.userName.trim() === '') {
        return { success: false, data: null as unknown as Withdrawal, message: 'กรุณากรอกชื่อผู้ใช้' };
    }
    if (!request.accountNumber || request.accountNumber.trim() === '') {
        return { success: false, data: null as unknown as Withdrawal, message: 'กรุณากรอกเลขบัญชี' };
    }
    if (!request.bank) {
        return { success: false, data: null as unknown as Withdrawal, message: 'กรุณาเลือกธนาคาร' };
    }
    if (!request.amount || request.amount <= 0) {
        return { success: false, data: null as unknown as Withdrawal, message: 'จำนวนเงินต้องมากกว่า 0' };
    }

    const now = new Date().toISOString();
    const newWithdrawal: Withdrawal = {
        id: generateId(),
        userName: request.userName.trim(),
        accountNumber: request.accountNumber.trim(),
        bank: request.bank,
        amount: request.amount,
        currency: 'THB',
        status: 'pending',
        createdAt: now,
        history: [{ status: 'pending', at: now }],
        attachments: [],
        note: request.note || ''
    };

    withdrawals = [newWithdrawal, ...withdrawals];

    return { success: true, data: newWithdrawal };
}

// Filter and search withdrawals
export async function filterWithdrawals(
    status?: WithdrawalStatus | 'all',
    searchQuery?: string
): Promise<Withdrawal[]> {
    await delay(300);

    let result = [...withdrawals];

    // Filter by status
    if (status && status !== 'all') {
        result = result.filter(w => w.status === status);
    }

    // Search by name, account number, or transaction ID
    if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        result = result.filter(w =>
            w.userName.toLowerCase().includes(query) ||
            w.accountNumber.toLowerCase().includes(query) ||
            w.id.toLowerCase().includes(query)
        );
    }

    return result.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

// Simulate processing a file upload (returns a mock URL)
export async function uploadFile(file: File): Promise<{ id: string; url: string; type: 'image' | 'video' | 'document' }> {
    await delay(500);

    const id = `att_${Date.now()}`;
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    let type: 'image' | 'video' | 'document' = 'document';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
        type = 'image';
    } else if (['mp4', 'mov', 'webm', 'avi'].includes(extension)) {
        type = 'video';
    }

    // Create object URL for preview (in real app, this would be uploaded to server)
    const url = URL.createObjectURL(file);

    return { id, url, type };
}

// Get statistics
export async function getWithdrawalStats() {
    await delay(200);

    const stats = {
        total: withdrawals.length,
        pending: withdrawals.filter(w => w.status === 'pending').length,
        processing: withdrawals.filter(w => w.status === 'processing').length,
        completed: withdrawals.filter(w => w.status === 'completed').length,
        failed: withdrawals.filter(w => w.status === 'failed').length,
        canceled: withdrawals.filter(w => w.status === 'canceled').length,
        totalAmount: withdrawals.reduce((sum, w) => sum + w.amount, 0)
    };

    return stats;
}
