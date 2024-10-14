import axios from "axios";
import { ModuleAux, UpdateUserInput, Activity, ShopItem, ActivityContent } from '../types';
import { useQuery, useMutation, useQueryClient } from "react-query";
import {getToken} from "./store.ts";


const baseURL =
    import.meta.env.VITE_PUBLIC_BASE_URL || 'https://api.renacentia.org';
const adminToken = getToken();

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${adminToken}`,
  }
});

api.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

const getUsers = async () => {
  const response = await api.get("/admin/user/");
  return response.data;
};


const getModule = async (id:string): Promise<ModuleAux> => {
  const response = await api.get(`/admin/module/${id}`)
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

const updateActivity = async(data: {content: ActivityContent[], activity: {id: string, title: string}}) => {
  const response =  await api.put(`/activity/modify`, data)
  return response.data
}

export const useUpdateActivity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {content: ActivityContent[], activity: {id: string, title: string}}) =>
            updateActivity(data),
        onSuccess: () => {
        queryClient.invalidateQueries("activities").then();
        },
    });
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
      queryClient.invalidateQueries("users").then();
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

export const useLogOut = async () => {
    localStorage.removeItem('token');
    console.log('Token removed');
}
export const getAllTreatments = async () => {
  const response = await api.get("/treatment");
  return response.data;
};

export const useGetAllTreatments = () => {
    return useQuery("treatments", getAllTreatments);
}

export const getTreatmentById = async (id: string) => {
    const response = await api.get(`/treatment/${id}`);
    return response.data;
}

export const useGetTreatmentById = (id: string) => {
    return useQuery("treatment", () => getTreatmentById(id));
}

const getAllQuestionnaires = async () => {
    const response = await api.get("/questionnaire");
    return response.data;
}

export const useGetAllQuestionnaires = () => {
    return useQuery("questionnaires", getAllQuestionnaires);
}

const getQuestionnaireById = async (id: string) => {
    const response = await api.get(`/questionnaire/${id}`);
    return response.data;
}

export const useGetQuestionnaireById = (id: string) => {
    return useQuery("questionnaire", () => getQuestionnaireById(id));
}

export const uploadContent = async (data: ShopItem) => {
    const response = await api.post('/shop/create-item', data)
    return response.status;
}

const updateTreatment = async (id: string, data: {name: string, description: string}) => {
    const response = await api.put(`/admin/treatment/update/${id}`, data);
    return response.data;
}

export const useUpdateTreatment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {id: string, data: {name: string, description: string}}) =>
            updateTreatment(data.id, data.data),
        onSuccess: () => {
            queryClient.invalidateQueries(["treatments", "treatment"]).then();
        },
    });
}

const createNewModule = async (id: string) => {
    const response = await api.put(`/admin/treatment/${id}/create-module`);
    return response.data;
}

export const useCreateNewModule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            createNewModule(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["treatments", "treatment"]).then();
        },
    });
}

const addQuestionnaireToTreatment = async (treatmentId: string, questionnaireId: string) => {
    const response = await api.put(`/admin/treatment/${treatmentId}/questionnaire/${questionnaireId}`);
    return response.data;
}

export const useAddQuestionnaireToTreatment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {treatmentId: string, questionnaireId: string}) =>
            addQuestionnaireToTreatment(data.treatmentId, data.questionnaireId),
        onSuccess: () => {
            queryClient.invalidateQueries(["treatments", "treatment"]).then();
        },
    });
}

const updateModule = async (id: string, data: { name: string; description: string }) => {
    const response = await api.put(`/admin/module/update/${id}`, data);
    return response.data;
}

export const useUpdateModule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: string; data: { name: string; description: string } }) =>
            updateModule(data.id, data.data),
        onSuccess: () => {
            queryClient.invalidateQueries(["modules", "module"]).then();
        },
    });
};

const createNewActivity = async (id: string) => {
    const response = await api.post(`/activity/module/${id}/`);
    return response.data;
}

export const useCreateNewActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            createNewActivity(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["activities", "module"]).then();
        },
    });
};
