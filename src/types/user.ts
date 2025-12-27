export interface User {
  id: number;
  name: string;
  email: string;
  notelp?: string;
  role: "Admin" | "User";
}

export interface UserResponse {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  items: User[];
  links: {
    prev: string | null;
    next: string | null;
  };
}

export interface UsersTableProps {
  data: User[] | undefined;
  error: unknown;
  isLoading: boolean;
}
