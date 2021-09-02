const APP_URL = process.env.APP_URl || "http://localhost:8080";

describe("Home", () => {
  it("deveria renderizar modal de criar conta quando clica em criar conta no botão central", () => {
    cy.visit(APP_URL);

    cy.get('[data-test="create-account-central-btn"]').click();
    cy.get('[data-test="modal-create-account"]').should("be.visible");
  });

  it("deveria renderizar modal de criar conta quando clica em criar conta no botão do header", () => {
    cy.visit(APP_URL);

    cy.get('[data-test="create-account-header-btn"]').click();
    cy.get('[data-test="modal-create-account"]').should("be.visible");
  });

  it("deveria renderizar modal de login quando clica no botão de login", () => {
    cy.visit(APP_URL);

    cy.get('[data-test="login-btn"]').click();
    cy.get('[data-test="modal-login"]').should("be.visible");
  });

  it("deveria conseguir logar", () => {
    cy.visit(APP_URL);

    cy.get('[data-test="login-btn"]').click();
    cy.get('[data-test="modal-login"]').should("be.visible");
    cy.get('[data-test="email-input"]').type("igor@igor.me");
    cy.get('[data-test="password-input"]').type("1234");
    cy.get('[data-test="submit-btn"]').click();

    cy.url().should("include", "/feedbacks");
  });

  it("deveria dar erro ao tentar logar com email inválido", () => {
    cy.visit(APP_URL);

    cy.get('[data-test="login-btn"]').click();
    cy.get('[data-test="modal-login"]').should("be.visible");
    cy.get('[data-test="email-input"]').type("teste");
    cy.get('[data-test="password-input"]').type("1234");
    cy.get('[data-test="submit-btn"]').click();

    cy.get('[data-test="email-error"]').should("be.visible");
  });

  it("deveria conseguir deslogar", () => {
    cy.visit(APP_URL);

    cy.get('[data-test="login-btn"]').click();
    cy.get('[data-test="modal-login"]').should("be.visible");
    cy.get('[data-test="email-input"]').type("igor@igor.me");
    cy.get('[data-test="password-input"]').type("1234");
    cy.get('[data-test="submit-btn"]').click();

    cy.url().should("include", "/feedbacks");

    cy.get('[data-test="logout-btn"]').click();
    cy.url().should("include", "/");
  });
});
