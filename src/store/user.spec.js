import useStore from "../hooks/useStore";
import { setCurrentUser, setApiKey, clearCurrentUser } from "./user";

describe("User store", () => {
  afterEach(() => {
    clearCurrentUser();
  });

  it("deveria conseguir atualizar currentUser", () => {
    const store = useStore();
    setCurrentUser({ name: "Test" });
    expect(store.User.currentUser.name).toBe("Test");
  });

  it("deveria conseguir atualizar apiKey", () => {
    const store = useStore();
    setApiKey("Test");
    expect(store.User.currentUser.apiKey).toBe("Test");
  });
});
