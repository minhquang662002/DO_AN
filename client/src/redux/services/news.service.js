import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../utils/constants";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api`,
  }),
  endpoints: (builder) => ({
    getHotNews: builder.query({
      query: () => "/news/hot",
    }),
  }),
});

export const { useGetHotNewsQuery } = newsApi;
