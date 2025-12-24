import { describe, it, expect } from 'vitest'
import {
    getWithdrawals,
    getWithdrawalById,
    createWithdrawal,
    filterWithdrawals,
    getWithdrawalStats
} from '@/services/mockApi'

describe('Mock API Service', () => {
    describe('getWithdrawals', () => {
        it('should return all withdrawals', async () => {
            const withdrawals = await getWithdrawals()
            expect(withdrawals).toBeDefined()
            expect(Array.isArray(withdrawals)).toBe(true)
            expect(withdrawals.length).toBeGreaterThan(0)
        })

        it('should return withdrawals sorted by date descending', async () => {
            const withdrawals = await getWithdrawals()
            for (let i = 0; i < withdrawals.length - 1; i++) {
                const current = new Date(withdrawals[i].createdAt).getTime()
                const next = new Date(withdrawals[i + 1].createdAt).getTime()
                expect(current).toBeGreaterThanOrEqual(next)
            }
        })
    })

    describe('getWithdrawalById', () => {
        it('should return a withdrawal by ID', async () => {
            const withdrawal = await getWithdrawalById('WD_001')
            expect(withdrawal).toBeDefined()
            expect(withdrawal?.id).toBe('WD_001')
        })

        it('should return null for non-existent ID', async () => {
            const withdrawal = await getWithdrawalById('INVALID_ID')
            expect(withdrawal).toBeNull()
        })
    })

    describe('createWithdrawal', () => {
        it('should create a new withdrawal successfully', async () => {
            const request = {
                userName: 'Test User',
                accountNumber: '999-888-7777',
                bank: 'KBANK',
                amount: 1000,
                note: 'Test withdrawal'
            }

            const response = await createWithdrawal(request)
            expect(response.success).toBe(true)
            expect(response.data).toBeDefined()
            expect(response.data.userName).toBe('Test User')
            expect(response.data.status).toBe('pending')
        })

        it('should fail when userName is empty', async () => {
            const request = {
                userName: '',
                accountNumber: '123-456-7890',
                bank: 'BBL',
                amount: 1000
            }

            const response = await createWithdrawal(request)
            expect(response.success).toBe(false)
            expect(response.message).toBeDefined()
        })

        it('should fail when amount is 0 or negative', async () => {
            const request = {
                userName: 'Test',
                accountNumber: '123-456-7890',
                bank: 'BBL',
                amount: 0
            }

            const response = await createWithdrawal(request)
            expect(response.success).toBe(false)
        })
    })

    describe('filterWithdrawals', () => {
        it('should filter by status', async () => {
            const pending = await filterWithdrawals('pending')
            expect(pending.every(w => w.status === 'pending')).toBe(true)
        })

        it('should search by userName', async () => {
            const results = await filterWithdrawals('all', 'Somchai')
            expect(results.some(w => w.userName.toLowerCase().includes('somchai'))).toBe(true)
        })

        it('should search by transaction ID', async () => {
            const results = await filterWithdrawals('all', 'WD_001')
            expect(results.some(w => w.id === 'WD_001')).toBe(true)
        })

        it('should return all when status is "all"', async () => {
            const all = await filterWithdrawals('all')
            const total = await getWithdrawals()
            expect(all.length).toBe(total.length)
        })
    })

    describe('getWithdrawalStats', () => {
        it('should return correct stats structure', async () => {
            const stats = await getWithdrawalStats()
            expect(stats).toHaveProperty('total')
            expect(stats).toHaveProperty('pending')
            expect(stats).toHaveProperty('processing')
            expect(stats).toHaveProperty('completed')
            expect(stats).toHaveProperty('failed')
            expect(stats).toHaveProperty('canceled')
            expect(stats).toHaveProperty('totalAmount')
        })

        it('should have total equal to sum of statuses', async () => {
            const stats = await getWithdrawalStats()
            const sum = stats.pending + stats.processing + stats.completed + stats.failed + stats.canceled
            expect(stats.total).toBe(sum)
        })
    })
})
