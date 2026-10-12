import { useMutation, useQuery } from "@tanstack/react-query";

import type { LoginInput, LoginResponse } from "../schemas/auth";
import { useServices } from "../provider";
import { queryKeys } from "./query-keys";

export const useLogin = (onSuccess: (data: LoginResponse) => void) => {
  const { auth } = useServices();
  return useMutation({
    mutationFn: (input: LoginInput) => auth.login(input),
    onSuccess,
  });
};

export const useMe = (enabled: boolean) => {
  const { auth } = useServices();
  return useQuery({ queryKey: queryKeys.me, queryFn: auth.me, enabled });
};
