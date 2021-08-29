export default (httClient) => ({
  getMe: async () => {
    const response = await httClient.get("/users/me");

    return {
      data: response.data,
    };
  },
  generateApiKey: async () => {
    const response = await httClient.post("/users/me/apiKey");

    return {
      data: response.data,
    };
  },
});
