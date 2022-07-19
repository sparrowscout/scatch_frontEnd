import instance from "../shared/axios";

export const userApis = {
    postApplyMK : async (postId) => await instance.post(`/api/apply/${postId}`),
    putMyProfile : async (formData) => await instance.put(`/api/user/info`, formData, {headers: { "Content-Type": "multipart/form-data" }}),
    putMyProfileReset : async () => await instance.put(`/api/user/profile/basic`),
    postBookmark: async (id) => {
    const { data } = await instance.post(`api/bookMark/${id}`);
    console.log(data);
    return data;
     },
   postApply: async (id)=> {
    const {data} = await instance.post(`api/apply/${id}`);
    return data;
    }
};

