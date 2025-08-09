// src/api/staff.ts
import axiosClient from "./client";

export type Staff = {
  id: string;
  username: string;
  email: string;
  role: "administrator" | "operator";
  created_at: string;
  updated_at: string;
};

export type NewStaff = {
  username: string;
  email: string;
  role: "administrator" | "operator";
  password: string;
};

export async function getStaffMembers(): Promise<Staff[]> {
  const { data } = await axiosClient.get<Staff[]>("/staff-members");
  return data;
}

export async function addStaffMember(payload: NewStaff): Promise<Staff> {
  const { data } = await axiosClient.post<Staff>("/staff-members", payload);
  return data;
}

export async function updateStaffMember(
  id: string,
  payload: Pick<Staff, "username" | "email" | "role">
): Promise<Staff> {
  const { data } = await axiosClient.put<Staff>(
    `/staff-members/${id}`,
    payload
  );
  return data;
}

export async function deleteStaffMember(id: string): Promise<void> {
  await axiosClient.delete(`/staff-members/${id}`);
}
