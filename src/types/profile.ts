export interface FormData {
  name: string;
  email: string;
  notelp?: string;
  password?: string;
}

export interface MessageType {
  type: "success" | "error";
  text: string;
}