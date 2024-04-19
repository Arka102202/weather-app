import { fireEvent, render, screen } from "@testing-library/react"
import SearchBox from "./SearchBox"
import userEvent from "@testing-library/user-event";

describe("Search-Box", () => {

  test("initial render", () => {
    render(<SearchBox />);

    const input = screen.getByLabelText("Search for a place :");
    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  test("user able to type properly", () => {

    const setPlace = jest.fn();
    const setLoadingState = jest.fn();

    render(<SearchBox setLoadingState={setLoadingState} setPlace={setPlace} />);

    const input = screen.getByLabelText("Search for a place :");

    userEvent.type(input, "Something")
    expect(input).toHaveValue("Something");
  })
})