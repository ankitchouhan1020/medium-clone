// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Contains h1 as conduit", () => {
    cy.visit("/");
    cy.contains("h1", "conduit");
  });
  it("Has banner class", () => {
    cy.visit("/");
    cy.get(".banner");
  });
  it("Navigate to /register when signup clicked", () => {
    cy.visit("/");
    cy.get(".nav-item")
      .eq(1)
      .click()
      .url()
      .should("include", "/register");
  });
  // it('My Feed open on click', () => {
  //   cy.visit('/')
  //   cy.get('.nav-item').eq(3).click()
  // })
});
