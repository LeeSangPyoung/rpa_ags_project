import { useEffect, useState } from "react";
import axios from "../config/axios.config";
import { BASE_URL } from "../constants/constants";

export interface Options {
  value: number;
  label: string;
}

const roleLabelMap: Record<string, string> = {
  ADMIN: "관리자",
  USER: "일반 사용자",
  GUEST: "게스트",
};

export function useStatusOptions() {
  const [statusOptions, setStatusOptions] = useState<Options[]>([]);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  useEffect(() => {
    setStatusLoading(true);
    axios
      .get(`${BASE_URL}status/combobox`)
      .then((res) => setStatusOptions(res.data))
      .catch(() => setStatusOptions([]))
      .finally(() => setStatusLoading(false));
  }, []);

  return { statusOptions, statusLoading };
}

export function useRoleOptions() {
  const [roleOptions, setRoleOptions] = useState<Options[]>([]);
  const [roleLoading, setRoleLoading] = useState<boolean>(false);

  useEffect(() => {
    setRoleLoading(true);
    axios
      .get(`${BASE_URL}role/combobox`)
      .then((res) => {
        const translated = res.data.map((opt: Options) => ({
          value: opt.value,
          label: roleLabelMap[opt.label] || opt.label,
        }));
        setRoleOptions(translated);
      })
      .catch(() => setRoleOptions([]))
      .finally(() => setRoleLoading(false));
  }, []);
  return { roleOptions, roleLoading };
}
