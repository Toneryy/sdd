import axiosClient from "./client";

export async function getUserProfile(userId: string) {
  // сервер отдаёт { user, subscriptions, products, supportRequests }
  const { data } = await axiosClient.get(`/admin/users/${userId}`);
  return data;
}
