import { client } from '../utils/app/fetchClient';
import { PasswordData } from '../types/PasswordData';

export const getPasswords = async (userId: number): Promise<PasswordData[]> => {
  return await client.get<PasswordData[]>(`/passwords?userId=${userId}`);
};

export const createPassword = async (data: {}): Promise<PasswordData> => {
  return await client.post('/passwords', data);
};

export const deletePassword = async (passwordItemId: number): Promise<unknown> => {
  return await client.delete(`/passwords/${passwordItemId}`);
};

export const updatePassword = async (passwordItemId: number, data: {}): Promise<PasswordData[]> => {
  return await client.patch(`/passwords/${passwordItemId}`, data);
};
