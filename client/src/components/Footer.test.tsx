import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

const renderWithRouter = (component: React.ReactElement) => {
  return render(component);
};

describe("Footer Component Tests", () => {
  it("should render footer with correct email", () => {
    renderWithRouter(<Footer />);

    const emailLink = screen.getByRole("link", { name: /bramptondetailingco@gmail\.com/i });
    expect(emailLink).toBeTruthy();
    expect(emailLink.getAttribute("href")).toBe("mailto:bramptondetailingco@gmail.com");
  });

  it("should display correct phone number", () => {
    renderWithRouter(<Footer />);

    const phoneLink = screen.getByRole("link", { name: /\(905\) 226-5301/i });
    expect(phoneLink).toBeTruthy();
    expect(phoneLink.getAttribute("href")).toBe("tel:+19052265301");
  });

  it("should not have Privacy Policy link", () => {
    renderWithRouter(<Footer />);

    const privacyLink = screen.queryByRole("link", { name: /Privacy Policy/i });
    expect(privacyLink).toBeNull();
  });

  it("should not have Terms of Service link", () => {
    renderWithRouter(<Footer />);

    const termsLink = screen.queryByRole("link", { name: /Terms of Service/i });
    expect(termsLink).toBeNull();
  });

  it("should have navigation links to main pages", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByRole("link", { name: /Home/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Services/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Gallery/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Contact/i })).toBeTruthy();
  });

  it("should display company name", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText(/Brampton Detail Co\./i)).toBeTruthy();
  });

  it("should have correct copyright text", () => {
    renderWithRouter(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeTruthy();
  });
});
