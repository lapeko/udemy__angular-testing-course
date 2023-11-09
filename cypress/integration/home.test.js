describe("Home page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/courses", { fixture: "courses.json" });
  });

  it("should display the home page", () => {
    cy.visit("/");
    cy.get("h3").contains("All Courses");
    cy.get("mat-card").should("have.length", 9);
  });

  it("should display the advanced courses when clicking on the tab", () => {
    cy.visit("/");
    cy.get("mat-tab-header").contains("Advanced").click();
    cy.get("mat-card").should("have.length", 3);
  });
});
