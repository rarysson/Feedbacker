import mockAxios from "axios";
import authService from "./authService";

jest.mock("axios");

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deveria retornar token ao logar com usuário", async () => {
    const token = "123456789";

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } });
    });

    const response = await authService(mockAxios).login({
      email: "a@a.com",
      password: "123",
    });

    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot();
  });

  it("deveria retornar um usuário ao usuário se cadastrar", async () => {
    const user = { name: "test", email: "test@test.com", password: "test" };

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user });
    });

    const response = await authService(mockAxios).register(user);

    expect(response.data).toHaveProperty("name");
    expect(response.data).toHaveProperty("email");
    expect(response.data).toHaveProperty("password");
    expect(response).toMatchSnapshot();
  });

  it("deveria dar erro quando não possui rede", async () => {
    const errors = { status: 404, statusText: "Not found" };

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors });
    });

    const response = await authService(mockAxios).login({
      email: "a@a.com",
      password: "123",
    });

    expect(response.errors).toHaveProperty("status");
    expect(response.errors).toHaveProperty("statusText");
  });
});
