export interface Props {
  lost: number;
  found: number;
  user: number;
}

export interface NavUserProps {
  user: {
    name: string
    email: string
    imageUrl?: string
    role?: string
  }
}

export interface AppSidebarProps {
  role: string;
  user?: {
    name: string;
    email: string;
    imageUrl?: string;
  } | null;  // ⬅️ tambahkan null
}