export interface FormData {
  name: string;
  email: string;
  notelp?: string;
  password?: string;
  image?: File | null;
}

export interface MessageType {
  type: "success" | "error";
  text: string;
}