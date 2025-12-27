export interface CountResponse {
  lost: number;
  found: number;
  user: number;
}

export interface StatItem {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  bgGradient: string;
  iconColor: string;
}

export interface ChartItem {
  name: string;
  jumlah: number;
  fill: string;
}
