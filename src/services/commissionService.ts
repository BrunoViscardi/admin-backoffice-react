import type { Commission } from '../types/commission';

export async function getCommissions() {
  const response = await fetch('data/commissions.json');
  if (!response.ok) {
    throw new Error('Não foi possível buscar as comissões');
  }

  const commissions: Commission[] = await response.json();
  return commissions;
}

export async function editCommissionStatusById(id: number, status: Commission['status']): Promise<Commission> {
  const commissions = await getCommissions();
  const commission = commissions.find((commission) => commission.id === id);
  const updatedCommission = { ...commission, status } as Commission;
  return updatedCommission;  
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
