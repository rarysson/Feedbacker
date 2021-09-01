import { validateEmptyAndEmail, validateEmptyAndLength3 } from "./validators";

describe("Validator service", () => {
  it("deveria dar erro caso não passe valor", () => {
    expect(validateEmptyAndLength3()).toBe("*Este campo é obrigatório");
  });

  it("deveria dar erro caso o tamanho da string seja menor do que 3", () => {
    expect(validateEmptyAndLength3("12")).toBe(
      "*Este campo precisa de no mínimo 3 caracteres"
    );
  });

  it("não deveria dar erro caso o valor seja válido", () => {
    expect(validateEmptyAndLength3("123")).toBe(true);
  });

  it("deveria dar erro caso não passe valor", () => {
    expect(validateEmptyAndEmail()).toBe("*Este campo é obrigatório");
  });

  it("deveria dar erro caso seja um email inválido", () => {
    expect(validateEmptyAndEmail("aaa")).toBe(
      "*Este campo precisa ser um email"
    );
  });

  it("não deveria dar erro caso um email seja válido", () => {
    expect(validateEmptyAndEmail("a@a.com")).toBe(true);
  });
});
