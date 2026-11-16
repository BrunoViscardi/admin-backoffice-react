import type { Commission } from '../types/commission';

export async function getCommissions() {
  const response = await fetch('data/commissions.json');
  if (!response.ok) {
    throw new Error('Não foi possível buscar as comissões');
  }

  const commissions: Commission[] = await response.json();
  return commissions;
}


export async function getCommissionTotals() {
  const commissions = await getCommissions();

  const total = commissions.reduce(
    (sum, commission) => sum + commission.amount,
    0
  );

  const paid = commissions
    .filter((commission) => commission.status === "paid")
    .reduce((sum, commission) => sum + commission.amount, 0);

  const pending = commissions
    .filter((commission) => commission.status === "pending")
    .reduce((sum, commission) => sum + commission.amount, 0);

  return { total, paid, pending };
}
