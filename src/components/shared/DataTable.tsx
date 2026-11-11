export function DataTable<T>({ rows }: { rows: T[] }) {
  return <table>{rows.length > 0 ? 'Tabela' : 'Sem dados'}</table>;
}
