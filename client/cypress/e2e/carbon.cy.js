// Tests for the Carbon page

describe("Carbon page functionality", () => {
  it("should render location A and B from the home page", () => {
    cy.visit("http://localhost:3000");
    cy.get("#outlined-basic1").type("London");
    cy.get("#outlined-basic").type("Barcelona");
    cy.get("#submit_route").click({ force: true });
    cy.url().should("eq", "http://localhost:3000/carbon");
    cy.get("#location").should("contain", "Barcelona", "London");
  });
  it("should render all steps in between location A and B on the carbon page", () => {
    cy.visit("http://localhost:3000");
    cy.get("#outlined-basic1").type("London");
    cy.get("#outlined-basic").type("Barcelona");
    cy.get("#submit_route").click({ force: true });
    cy.url().should("eq", "http://localhost:3000/carbon");
    // cy.get("#step_list").should("contain", "St Pancras International", "Gare du Nord");
  });
});

// Tests for Navigation bar within Carbon page

describe("Navigation should link to navlinks from the home page", () => {
    it("should navigate to the facts page when facts is clicked", () => {
      cy.get("#facts_link").click();
      cy.url().should("eq", "http://localhost:3000/facts");
    });
    it("should navigate to the about page when about is clicked", () => {
      cy.get("#about_link").click();
      cy.url().should("eq", "http://localhost:3000/aboutus");
    });
    it("should navigate back to the home page when home is clicked", () => {
      cy.get("#home_link").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
