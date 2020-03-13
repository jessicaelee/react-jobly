import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
  let company = {
    handle: "test_handle",
    name: "Test Company",
    description: "This is a test company.",
    logo_url:
      "https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"

  };
  render(
    <MemoryRouter>
      <CompanyCard company={company} />
    </MemoryRouter>
  );
});

it("matches snapshot with logo", function () {
  let company = {
    handle: "test_handle",
    name: "Test Company",
    description: "This is a test company.",
    logo_url:
      "https://www.washingtonpost.com/resizer/uwlkeOwC_3JqSUXeH8ZP81cHx3I=/arc-anglerfish-washpost-prod-washpost/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg"

  };
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard company={company} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo", function () {
  let company = {
    handle: "test_handle",
    name: "Test Company",
    description: "Become a great dog."
  };
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard company={company} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
