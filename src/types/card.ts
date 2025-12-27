export interface StatCard {
  title: string;
  value: number;
  icon: any;
  gradient: string;
  bgGradient: string;
  iconColor: string;
}

export interface StatsCardsProps {
  statsData: StatCard[];
}

export interface SummaryCardProps {
  totalReports: number;
  foundReports: number;
}

export interface ReportsChartProps {
  chartData: { name: string; jumlah: number; fill: string }[];
}