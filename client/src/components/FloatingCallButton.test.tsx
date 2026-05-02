import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import FloatingCallButton from "./FloatingCallButton";

describe("FloatingCallButton Component Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render call button with correct phone number", async () => {
    render(<FloatingCallButton />);

    // Advance timers to show button after 3 seconds
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      const callLink = screen.getByRole("link", { name: /Call Now/i });
      expect(callLink).toBeTruthy();
      expect(callLink.getAttribute("href")).toBe("tel:+19052265301");
    });
  });

  it("should have fixed positioning classes for mobile", async () => {
    const { container } = render(<FloatingCallButton />);

    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      const button = container.querySelector("a");
      expect(button).toBeTruthy();
      expect(button?.className).toContain("fixed");
      expect(button?.className).toContain("bottom-6");
      expect(button?.className).toContain("right-6");
    });
  });

  it("should display after 3 second delay", async () => {
    render(<FloatingCallButton />);

    // Initially should not be visible
    let callLink = screen.queryByRole("link", { name: /Call Now/i });
    expect(callLink).toBeNull();

    // After 3 seconds, should be visible
    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      callLink = screen.getByRole("link", { name: /Call Now/i });
      expect(callLink).toBeTruthy();
    });
  });

  it("should have Phone icon inside button", async () => {
    const { container } = render(<FloatingCallButton />);

    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      const button = container.querySelector("button");
      expect(button).toBeTruthy();
      // Check for SVG icon (Phone icon from lucide-react)
      const svg = button?.querySelector("svg");
      expect(svg).toBeTruthy();
    });
  });

  it("should have pulse animation on outer ring", async () => {
    const { container } = render(<FloatingCallButton />);

    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      const pulseDiv = container.querySelector(".animate-pulse");
      expect(pulseDiv).toBeTruthy();
      expect(pulseDiv?.className).toContain("bg-primary");
    });
  });

  it("should be hidden on desktop (md and above)", async () => {
    const { container } = render(<FloatingCallButton />);

    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      const link = container.querySelector("a");
      expect(link?.className).toContain("md:hidden");
    });
  });

  it("should have aria-label for accessibility", async () => {
    render(<FloatingCallButton />);

    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      const callLink = screen.getByRole("link", { name: /Call Brampton Detail Co\./i });
      expect(callLink).toBeTruthy();
      expect(callLink.getAttribute("aria-label")).toBe("Call Brampton Detail Co.");
    });
  });
});
