const APP_URL = process.env.APP_URl || "http://localhost:8080";

describe("Credentials", () => {
  it("deveria conseguir gerar uma api key", () => {
    cy.visit(APP_URL);

    cy.get('[data-test="login-btn"]').click();
    cy.get('[data-test="modal-login"]').should("be.visible");
    cy.get('[data-test="email-input"]').type("igor@igor.me");
    cy.get('[data-test="password-input"]').type("1234");
    cy.get('[data-test="submit-btn"]').click();

    cy.wait(2000);
    cy.visit(`${APP_URL}/credentials`);
    cy.wait(2000);

    const oldApiKey = cy.get('[data-test="api-key"]').invoke("text");
    cy.get('[data-test="generate-btn"]').click();
    cy.wait(1000);
    const newApiKey = cy.get('[data-test="api-key"]').invoke("text");

    expect(oldApiKey).to.not.be.equal(newApiKey);
  });
});
