import axios from "axios";
import {ModuleAux, UpdateUserInput, Activity} from "../types";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {getToken} from "./store.ts";


const baseUrl = "http://localhost:3001";
const adminToken = getToken();

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${adminToken}`,
  }
});

const getUsers = async () => {
  const response = await api.get("/admin/user/");
  return response.data;
};


const getModule = async (id:string): Promise<ModuleAux> => {
  const response = await api.get(`/module/${id}`)
  return response.data
}


const updateUser = async (id: string, data: UpdateUserInput) => {
  const response = await api.put(`/admin/user/${id}`, data);
  return response.data;
};

export const useGetUsers = () => {
  return useQuery("users", getUsers);
};


const getActivity = async (activityId:string): Promise<Activity> => {
  const response = await api.get(`activity/${activityId}`)
  return response.data
}

const updateActivity = async(id:string, data: Activity) => {
  const response =  await api.put(`/activity/modify/${id}`, data)
  return response.data
}

export const useGetActivity = (activityId:string) => {
  return useQuery<Activity, Error>(["activities", activityId], () => getActivity(activityId));
}


export const useGetModule = (moduleId: string) => {
  return useQuery<ModuleAux, Error>(["module", moduleId] , () => getModule(moduleId) )
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

export const createUser = async (data: any) => {
  const response = await api.post("/admin/user/create", data);
  return response.data;
};

export const deleteUser = async (patient_code: string) => {
  const response = await api.delete(`admin/user/delete/${patient_code}`);
  return response.data;
};

export const login = async (data: any) => {
  try {
    const response = await api.post('/auth/admin/login', data);
    return response.data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; data: Activity }) =>
        updateActivity(data.id, data.data),
    onSuccess: () => {
      queryClient.invalidateQueries("activities");
    },
  });

}

export const getAllTreatments = async () => {
  const response = await api.get("/treatment");
  return response.data;
};

