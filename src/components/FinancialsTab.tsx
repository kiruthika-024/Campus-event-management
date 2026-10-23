import React, { useState } from 'react';
import { CollegeEvent, SponsorItem, ExpenseItem } from '../types/event';
import { Plus, ArrowUpRight, ArrowDownRight, Wallet, Receipt, DollarSign } from 'lucide-react';

interface FinancialsTabProps {
  event: CollegeEvent;
  onUpdateEvent: (updated: CollegeEvent) => void;
}

export const FinancialsTab: React.FC<FinancialsTabProps> = ({ event, onUpdateEvent }) => {
  const [showAddSponsor, setShowAddSponsor] = useState(false);
  const [newSponsor, setNewSponsor] = useState<Partial<SponsorItem>>({
    sponsor: '',
    tier: 'Associate',
    amount: 50000,
    deliverables: '',
  });

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    planned: 50000,
    actual: 50000,
    notes: '',
  });

  const totalIncome = event.budget.sponsorships.reduce((sum, item) => sum + item.amount, 0);
  const totalPlannedExpense = event.budget.expenses.reduce((sum, item) => sum + item.planned, 0);
  const totalActualExpense = event.budget.expenses.reduce((sum, item) => sum + item.actual, 0);
  const netSurplus = totalIncome - totalActualExpense;

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSponsor.sponsor || !newSponsor.amount) return;

    const sponsorObj: SponsorItem = {
      sponsor: newSponsor.sponsor,
      tier: (newSponsor.tier as any) || 'Associate',
      amount: Number(newSponsor.amount),
      deliverables: newSponsor.deliverables || '',
    };

    onUpdateEvent({
      ...event,
      budget: {
        ...event.budget,
        sponsorships: [...event.budget.sponsorships, sponsorObj],
      },
    });

    setNewSponsor({ sponsor: '', tier: 'Associate', amount: 50000, deliverables: '' });
    setShowAddSponsor(false);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.category) return;

    const expenseObj: ExpenseItem = {
      id: `exp-${Date.now()}`,
      category: newExpense.category,
      planned: Number(newExpense.planned),
      actual: Number(newExpense.actual),
      notes: newExpense.notes,
    };

    onUpdateEvent({
      ...event,
      budget: {
        ...event.budget,
        expenses: [...event.budget.expenses, expenseObj],
      },
    });

    setNewExpense({ category: '', planned: 50000, actual: 50000, notes: '' });
    setShowAddExpense(false);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Financial Overview Cards with Tabular Numerals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <span className="text-xs font-medium text-slate-500 block">Total Sponsorship &amp; Income</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              ₹{(totalIncome / 100000).toFixed(2)}L
            </span>
            <span className="text-xs text-slate-500 font-mono">₹{totalIncome.toLocaleString()}</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            {event.budget.sponsorships.length} Active corporate &amp; gate partners
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <span className="text-xs font-medium text-slate-500 block">Total Actual Production Spend</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              ₹{(totalActualExpense / 100000).toFixed(2)}L
            </span>
            <span className="text-xs text-slate-500 font-mono">₹{totalActualExpense.toLocaleString()}</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Planned: ₹{(totalPlannedExpense / 100000).toFixed(2)}L
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <span className="text-xs font-medium text-slate-500 block">Net Balance / Operating Surplus</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-mono tabular-nums ${
              netSurplus >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}>
              {netSurplus >= 0 ? '+' : ''}₹{(netSurplus / 100000).toFixed(2)}L
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ₹{netSurplus.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            {netSurplus >= 0 ? 'Surplus held in Student Society Corpus' : 'Covered by Emergency Dean Reserve'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <span className="text-xs font-medium text-slate-500 block">Budget Realization Health</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {Math.round((totalActualExpense / (totalPlannedExpense || 1)) * 100)}%
            </span>
            <span className="text-xs text-slate-500">Spend vs Plan</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Variance: ₹{(Math.abs(totalActualExpense - totalPlannedExpense)).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Sponsorship Deck & Inbound Funds */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Corporate Sponsorships &amp; Revenue Sources
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Title, Powered-by, Associate brands, and participant gate registration ledger.
            </p>
          </div>

          <button
            onClick={() => setShowAddSponsor(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Sponsor / Partner</span>
          </button>
        </div>

        {showAddSponsor && (
          <form onSubmit={handleAddSponsor} className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Add Sponsorship Record
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Sponsor Brand Name (e.g. Intel Campus)"
                value={newSponsor.sponsor}
                onChange={(e) => setNewSponsor({ ...newSponsor, sponsor: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
                required
              />
              <select
                value={newSponsor.tier}
                onChange={(e) => setNewSponsor({ ...newSponsor, tier: e.target.value as any })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
              >
                <option value="Title">Title Sponsor</option>
                <option value="Powered By">Powered By Sponsor</option>
                <option value="Associate">Associate Sponsor</option>
                <option value="In-Kind">In-Kind Sponsor</option>
              </select>
              <input
                type="number"
                placeholder="Amount in INR (e.g. 150000)"
                value={newSponsor.amount}
                onChange={(e) => setNewSponsor({ ...newSponsor, amount: parseInt(e.target.value, 10) || 0 })}
                className="text-xs border border-slate-200 rounded p-2 bg-white font-mono"
                required
              />
            </div>
            <textarea
              placeholder="Key Deliverables (e.g., Main stage backdrop logo, hackathon naming rights)"
              rows={2}
              value={newSponsor.deliverables}
              onChange={(e) => setNewSponsor({ ...newSponsor, deliverables: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded p-2 bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddSponsor(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
              >
                Save Sponsor
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Sponsor Brand</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4 text-right">Committed Amount</th>
                <th className="py-3 px-4">Deliverables &amp; Entitlements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {event.budget.sponsorships.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {s.sponsor}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="font-semibold text-xs px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {s.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                    ₹{s.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {s.deliverables}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Production & Operational Expenditure Breakdown */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Operational Expenditure Breakdown
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Planned budgets vs actual reconciled expenses across staging, sound, prizes, hospitality, and security.
            </p>
          </div>

          <button
            onClick={() => setShowAddExpense(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Expense Line</span>
          </button>
        </div>

        {showAddExpense && (
          <form onSubmit={handleAddExpense} className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Add Expense Item
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Category (e.g., High-Power Diesel Generator Rental)"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="text-xs border border-slate-200 rounded p-2 bg-white"
                required
              />
              <input
                type="number"
                placeholder="Planned Budget (INR)"
                value={newExpense.planned}
                onChange={(e) => setNewExpense({ ...newExpense, planned: parseInt(e.target.value, 10) || 0 })}
                className="text-xs border border-slate-200 rounded p-2 bg-white font-mono"
                required
              />
              <input
                type="number"
                placeholder="Actual Reconciled Spend (INR)"
                value={newExpense.actual}
                onChange={(e) => setNewExpense({ ...newExpense, actual: parseInt(e.target.value, 10) || 0 })}
                className="text-xs border border-slate-200 rounded p-2 bg-white font-mono"
                required
              />
            </div>
            <textarea
              placeholder="Vendor & invoice details or operational notes"
              rows={2}
              value={newExpense.notes}
              onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded p-2 bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddExpense(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
              >
                Save Expense
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Expense Head / Category</th>
                <th className="py-3 px-4 text-right">Planned (INR)</th>
                <th className="py-3 px-4 text-right">Actual Reconciled (INR)</th>
                <th className="py-3 px-4 text-right">Variance</th>
                <th className="py-3 px-4">Vendor &amp; Operational Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {event.budget.expenses.map((exp) => {
                const variance = exp.actual - exp.planned;
                return (
                  <tr key={exp.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {exp.category}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-600">
                      ₹{exp.planned.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                      ₹{exp.actual.toLocaleString()}
                    </td>
                    <td className={`py-3.5 px-4 text-right font-mono tabular-nums font-semibold ${
                      variance > 0 ? 'text-rose-700' : variance < 0 ? 'text-emerald-700' : 'text-slate-500'
                    }`}>
                      {variance > 0 ? `+₹${variance.toLocaleString()}` : variance < 0 ? `-₹${Math.abs(variance).toLocaleString()}` : '₹0'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {exp.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
