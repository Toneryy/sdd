// src/api/staffRights.ts
import axiosClient from "./client";
import { FeatureKey } from "../config/features";

export type RightRecord = {
  id: string;
  staff_member_id: string | null;
  role: "administrator" | "operator" | null;
  component_name: FeatureKey | string;
  can_access: boolean; // для персональных банов будет false
};

// права текущего сотрудника (используется в PermissionsContext)
export async function getMyRights(): Promise<RightRecord[]> {
  const { data } = await axiosClient.get<RightRecord[]>("/staff-rights/me");
  return data;
}

// права конкретного сотрудника
export async function getRightsForStaff(
  staffId: string
): Promise<RightRecord[]> {
  const { data } = await axiosClient.get<RightRecord[]>(
    `/staff-rights/staff/${staffId}`
  );
  return data;
}

// поставить персональный запрет (ban = can_access=false)
export async function banFeature(payload: {
  staff_member_id: string;
  component_name: FeatureKey;
}): Promise<RightRecord> {
  const { data } = await axiosClient.post<RightRecord>(
    "/staff-rights/ban",
    payload
  );
  return data;
}

// снять персональный запрет (удалить запись)
export async function deleteRight(id: string): Promise<void> {
  await axiosClient.delete(`/staff-rights/${id}`);
}
