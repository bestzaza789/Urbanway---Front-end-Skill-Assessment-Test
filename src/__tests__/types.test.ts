import { describe, it, expect } from 'vitest'
import { STATUS_CONFIG, BANK_OPTIONS, WithdrawalStatus } from '@/types/withdrawal'

describe('Withdrawal Types', () => {
    describe('STATUS_CONFIG', () => {
        const statuses: WithdrawalStatus[] = ['pending', 'processing', 'completed', 'failed', 'canceled']

        it('should have config for all statuses', () => {
            statuses.forEach(status => {
                expect(STATUS_CONFIG[status]).toBeDefined()
            })
        })

        it('should have label, color, and bgColor for each status', () => {
            statuses.forEach(status => {
                expect(STATUS_CONFIG[status].label).toBeDefined()
                expect(STATUS_CONFIG[status].color).toMatch(/^#[0-9A-Fa-f]{6}$/)
                expect(STATUS_CONFIG[status].bgColor).toBeDefined()
            })
        })
    })

    describe('BANK_OPTIONS', () => {
        it('should have at least 5 banks', () => {
            expect(BANK_OPTIONS.length).toBeGreaterThanOrEqual(5)
        })

        it('should have value and label for each bank', () => {
            BANK_OPTIONS.forEach(bank => {
                expect(bank.value).toBeDefined()
                expect(bank.label).toBeDefined()
            })
        })

        it('should include common Thai banks', () => {
            const bankCodes = BANK_OPTIONS.map(b => b.value)
            expect(bankCodes).toContain('BBL')
            expect(bankCodes).toContain('KBANK')
            expect(bankCodes).toContain('SCB')
        })
    })
})
