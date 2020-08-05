import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});

it("matches snapshot when logged in ", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Home isloggedIn={true} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
})

it("matches snapshot when NOT logged in ", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Home isloggedIn={false} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
})

it("expects a user to have a link to login when NOT logged in", function () {
  const { getByText } = render(<MemoryRouter>
    <Home isloggedIn={false} />
  </MemoryRouter>)

  expect(getByText("Login")).toBeInTheDocument();
})

it("expects a user to NOT have a link to login when logged in", function () {
  const { getByText } = render(<MemoryRouter>
    <Home isloggedIn={true} />
  </MemoryRouter>)

  expect(getByText("Welcome Back!")).toBeInTheDocument();
})