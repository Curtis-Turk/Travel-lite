describe("renders the home page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000");
  });

  it('displays the input field to search "From"', () => {
    cy.get("#outlined-basic")
      .invoke("attr", "placeholder")
      .should("contain", "From");
  });

  it("should navigate to the carbon page when submitted", () => {
    cy.get("#submit_route").click();
    cy.wait()
    cy.url().should("eq", "http://localhost:3000/carbon");
  });
});
