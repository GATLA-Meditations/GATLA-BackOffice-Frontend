import axios from "axios";
import {UpdateUserInput} from "../types";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {ADMIN_TOKEN} from "../util/constants.ts";


const baseUrl = "http://localhost:3001";
const  adminToken = ADMIN_TOKEN

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${adminToken}`,
  },
});

const getUsers = async () => {
  const response = await api.get("/admin/user/");
  return response.data;
};

const updateUser = async (id: string, data: UpdateUserInput) => {
  const response = await api.put(`/admin/user/${id}`, data);
  return response.data;
};

export const useGetUsers = () => {
  return useQuery("users", getUsers);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; data: UpdateUserInput }) =>
      updateUser(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const createUser = async (data: any) => {
  const response = await api.post("/admin/user/create", data);
  return response.data;
};
