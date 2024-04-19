import { render, screen } from "@testing-library/react"
import Header from "./Header"
import userEvent from "@testing-library/user-event";

describe("Header", () => {
  test("renders correctly", () => {
    render(<Header />);
    const appTitle = screen.getByText("The Weather App");
    const button = screen.getByText("Saved Places");

    expect(appTitle).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  test("checking with props", async () => {
    const setShowSavedPlaces = jest.fn();
    render(<Header showSavedPlaces={true} setShowSavedPlaces={setShowSavedPlaces} />);
    let button = screen.getByText("Go to search");
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(setShowSavedPlaces).toHaveBeenCalledTimes(1);
  })
})