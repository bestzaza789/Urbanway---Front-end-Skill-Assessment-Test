'use client';

import { useEffect, useState, useMemo } from 'react';
import { useWithdrawal } from '@/context/WithdrawalContext';
import WithdrawalCard from '@/components/withdrawal/WithdrawalCard';
import WithdrawalFilter from '@/components/withdrawal/WithdrawalFilter';
import Pagination from '@/components/ui/Pagination';
import { TrendingUp, Clock, CheckCircle, AlertCircle, WifiOff, RefreshCw } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

export default function HomePage() {
  const { withdrawals, loading, error, stats, fetchWithStats } = useWithdrawal();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch on mount only - intentionally omitting fetchWithStats from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchWithStats();
  }, []);

  // Reset to page 1 when withdrawals change (e.g. after filter)
  useEffect(() => {
    setCurrentPage(1);
  }, [withdrawals.length]);

  const totalPages = Math.ceil(withdrawals.length / ITEMS_PER_PAGE);

  const paginatedWithdrawals = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return withdrawals.slice(start, start + ITEMS_PER_PAGE);
  }, [withdrawals, currentPage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="glass-card-static p-4 border border-red-500/30 bg-red-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WifiOff className="w-6 h-6 text-red-400" />
              <div>
                <p className="font-medium text-red-400">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                <p className="text-sm text-red-400/70">{error}</p>
              </div>
            </div>
            <button
              onClick={() => fetchWithStats()}
              className="glass-button-secondary flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              ลองใหม่
            </button>
          </div>
        </div>
      )}

      {/* Stats Section - Bento Grid Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card stat-card">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="stat-number">{stats?.total || 0}</div>
          <div className="stat-label">รายการทั้งหมด</div>
        </div>

        <div className="glass-card stat-card">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-400" />
          </div>
          <div className="stat-number">{stats?.pending || 0}</div>
          <div className="stat-label">รอดำเนินการ</div>
        </div>

        <div className="glass-card stat-card">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="stat-number">{stats?.completed || 0}</div>
          <div className="stat-label">สำเร็จ</div>
        </div>

        <div className="glass-card stat-card">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <div className="stat-number">{stats?.failed || 0}</div>
          <div className="stat-label">ล้มเหลว</div>
        </div>
      </div>

      {/* Total Amount Card */}
      {stats && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/50 uppercase tracking-wider">ยอดเบิกถอนรวม</p>
              <p className="amount-display text-3xl md:text-4xl mt-1">
                ฿{formatCurrency(stats.totalAmount)}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-foreground/60">กำลังดำเนินการ: {stats.processing}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-foreground/60">ยกเลิก: {stats.canceled}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="glass-card-static p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">ค้นหาและกรอง</h2>
        <WithdrawalFilter />
      </div>

      {/* Withdrawal List - Bento Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">รายการคำขอเบิกถอน</h2>
          <span className="text-sm text-foreground/50">
            {withdrawals.length} รายการ
            {totalPages > 1 && ` (หน้า ${currentPage}/${totalPages})`}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="spinner" />
          </div>
        ) : withdrawals.length === 0 ? (
          <div className="glass-card empty-state">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <h3 className="text-lg font-medium text-foreground/60 mb-2">ไม่พบรายการ</h3>
            <p className="text-foreground/40">ลองเปลี่ยนเงื่อนไขการค้นหาหรือกรอง</p>
          </div>
        ) : (
          <>
            <div className="bento-grid">
              {paginatedWithdrawals.map((withdrawal) => (
                <WithdrawalCard key={withdrawal.id} withdrawal={withdrawal} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
