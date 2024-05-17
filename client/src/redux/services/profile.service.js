import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../utils/constants";

export const profileApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/User`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (id) => `/${id}`,
      providesTags: () => ["User"],
    }),
    searchUser: builder.query({
      query: (params) =>
        `/search?searchString=${params.q}&limit=${params.limit}`,
    }),

    updateUser: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          body: data,
        };
      },

      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetProfileQuery, useSearchUserQuery, useUpdateUserMutation } =
  profileApi;
