export interface Chat {
  id: string
  title: string
  updateAt: number
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}
