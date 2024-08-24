import axios from "axios";
import {ActivityInput, UpdateUserInput} from "../types";
import { useQuery, useMutation, useQueryClient } from "react-query";

const baseUrl = "http://localhost:3001";
const adminToken = process.env.ADMIN_TOKEN;

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


const getActivity = async (activityId:string) => {
  const response = await api.get(`admin/modules/activity/${activityId}`)
  return response.data
}

const updateActivity = async(id:string, data: ActivityInput) => {
  const response =  await api.put(`/admin/module/update/activities/${id}`, data)
  return response.data
}

export const useGetActivity = (activityId:string) => {
  return useQuery(["activities", activityId], () => getActivity(activityId));
}

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

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; data: ActivityInput }) =>
        updateActivity(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
    },
  });

}

