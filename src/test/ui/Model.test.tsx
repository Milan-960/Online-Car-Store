import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "../../ui/Modal";

describe("Modal", () => {
  // Mock the onClose function
  const onClose = jest.fn();

  it("renders the modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        Test Modal
      </Modal>
    );
    // Check if the modal is in the document
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        Test Modal
      </Modal>
    );
    // Check if the modal is not in the document
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        Test Modal
      </Modal>
    );

    // Click the close button
    fireEvent.click(screen.getByText("X"));

    // Check if onClose has been called
    expect(onClose).toHaveBeenCalled();
  });
});
