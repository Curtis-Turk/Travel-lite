// Tests for Home Page

describe("Home Page functionality", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000");
  });

  it('displays the input field to search "From"', () => {
    cy.get("#outlined-basic")
      .invoke("attr", "placeholder")
      .should("contain", "From");
  });

  it("should navigate to the carbon page when submitted", () => {
    cy.get("#outlined-basic1").type("London");
    cy.get("#outlined-basic").type("Barcelona");
    cy.get("#submit_route").click({ force: true });
    cy.url().should("eq", "http://localhost:3000/carbon");
  });
});

// Tests for Navigation bar within Home page

describe("Navigation should link to navlinks from the home page", () => {
  it("should navigate to the carbon page", () => {
    cy.get("#carbon_link").click();
    cy.url().should("eq", "http://localhost:3000/carbon");
  });
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
