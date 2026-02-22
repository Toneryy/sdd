import axiosClient from "./client";

export async function getStaffMembers() {
  const { data } = await axiosClient.get(`/staff-members`);
  return data;
}
