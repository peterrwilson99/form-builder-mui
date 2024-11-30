import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkboxes, { CheckboxesProps } from "./Checkboxes";

describe("Checkboxes Component", () => {
    const mockOnChange = jest.fn();
    const defaultProps: CheckboxesProps = {
        id: 1,
        type: "Checkboxes",
        prompt: "Select your favorite fruits",
        label: "Fruits",
        options: [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Cherry", value: "cherry" },
        ],
        value: { apple: false, banana: false, cherry: false },
        onChange: mockOnChange,
        required: true,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the Checkboxes component with options", () => {
        render(<Checkboxes {...defaultProps} />);

        // Check if prompt text is rendered
        expect(screen.getByText("Select your favorite fruits")).toBeDefined();

        // Check if all options are rendered
        if (!defaultProps.options) return;
        defaultProps.options.forEach((option) => {
            expect(screen.getByLabelText(option.label)).toBeDefined();
        });
    });

    it("calls onChange handler when a checkbox is clicked", () => {
        render(<Checkboxes {...defaultProps} />);

        const appleCheckbox = screen.getByLabelText("Apple");

        // Click the Apple checkbox
        fireEvent.click(appleCheckbox);

        // Check if the onChange handler is called with the correct value
        expect(mockOnChange).toHaveBeenCalledWith(1, {
            apple: true,
            banana: false,
            cherry: false,
        });
    });

    it("displays error message when required and no option is selected", () => {
        render(<Checkboxes {...defaultProps} />);

        // Click an option and uncheck it
        const appleCheckbox = screen.getByLabelText("Apple");
        fireEvent.click(appleCheckbox);
        fireEvent.click(appleCheckbox);

        // Check if the error message is displayed
        expect(screen.getByText("Please select at least one value")).toBeDefined();
    });

    it("does not call onChange for disabled checkboxes", () => {
        render(<Checkboxes {...defaultProps} disabled={true} />);

        const appleCheckbox = screen.getByLabelText("Apple");

        // Attempt to click the disabled checkbox
        fireEvent.click(appleCheckbox);

        // Ensure onChange is not called
        expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("renders additional markdown text if provided", () => {
        const propsWithAdditionalText = {
            ...defaultProps,
            additional: "This is **markdown** text",
        };

        render(<Checkboxes {...propsWithAdditionalText} />);

        // Check if the markdown text is rendered
        expect(screen.getByText("This is markdown text")).toBeDefined();
    });

    it("shows no error message when a checkbox is selected and required", () => {
        render(<Checkboxes {...defaultProps} />);

        const appleCheckbox = screen.getByLabelText("Apple");

        // Select the checkbox
        fireEvent.click(appleCheckbox);

        // Ensure no error message is displayed
        expect(screen.queryByText("Please select at least one value")).not.toBeDefined();
    });
});
