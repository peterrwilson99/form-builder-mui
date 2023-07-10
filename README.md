# MUI Form Builder

MUI Form Builder is a web application that allows you to create and view forms using Material-UI components. It provides a user-friendly interface for building forms and a form viewer to display and interact with the created forms.

## Features

- Form viewer to display and interact with the created forms
- Support for various Material-UI form components such as text fields, radio buttons, checkboxes, select inputs, and more
- Ability to customize properties of form components
- Rearrange form components using up and down arrows
- Delete form components
- Save and load form configurations
- Submit and handle form data

## Installation

1. Clone the repository:

   ```shell
   git clone <repository-url>
   ```
2. Install the dependencies:

    ```
    cd mui-form-builder
    npm install
    ```
3. Start the development server:

    ```
    npm start
    ```

The application should now be running on http://localhost:3000.

## Usage

### Builder

The builder interface allows you to create forms by dragging and dropping components from the toolbox onto the form canvas. You can customize the properties of each component by clicking on the settings icon. Components can be rearranged using the up and down arrows, and they can be deleted using the delete icon.

### Viewer

The viewer interface displays the created form. You can interact with the form inputs, select options, and submit the form. The submitted form data can be handled in the `handleSubmit` function.

### Saving and Loading Form Configurations

You can save and load form configurations using the provided buttons. Saved configurations are stored in the local storage of the browser.

### Customization

You can customize the form components and their properties by modifying the `Form1` configuration file. The `Form1` file contains an array of form elements, each representing a form component with its specific properties.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Material-UI](https://mui.com) - UI library for React
- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd) - Drag and drop library for React
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

## Contact

For any inquiries, please contact [your-email@example.com](mailto:your-email@example.com).
