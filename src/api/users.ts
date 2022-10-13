import { User } from '../types/User'
import { client } from '../utils/fetchClient'

export const getUser = async (login: string, password: string): Promise<User> => {
  const users = await client.get<User[]>(`/users?login=${login}&password=${password}`)

  return users[0] || null
}

export const addUser = async (login: string, password: string): Promise<User> => {
  return await client.post<User>('/users', { login, password })
}

export const isLoginFree = async (login: string): Promise<boolean> => {
  const users = await client.get<User[]>(`/users?login=${login}`)

  if (users.length > 0) {
    return false
  }

  return true
}
