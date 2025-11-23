

interface StatCardProps {
  title: string;
  value: number;
  bg: string;
  border: string;
  text: string;
}

export default function StatCard({ title, value, bg, border, text }: StatCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-sm border ${border} ${bg}`}>
      <h2 className="text-gray-600 text-sm">{title}</h2>
      <p className={`text-3xl font-bold ${text}`}>{value}</p>
    </div>
  );
}
