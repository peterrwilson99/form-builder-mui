# Form Builder Mui

Form Builder Mui is a React library that allows you to create and view forms using Material-UI components. It provides a user-friendly interface for building forms and a form viewer to display and interact with the created forms.

## Demo

A demo can be found [here](https://form-builder-ts.vercel.app/), displaying the core functionality of the components.

## Features

- Form viewer to display and interact with the created forms
- Autosave form data
- Support for various Material-UI form components such as text fields, radio buttons, checkboxes, select inputs, and more
- Ability to customize properties of form components
- Rearrange form components using up and down arrows
- Delete form components
- Save and load form configurations
- Submit and handle form data

## Installation

### Installing using npm

```shell
npm install form-builder-mui
```

### Local Install
1. Clone the repository:

   ```shell
   git clone https://github.com/peterrwilson99/form-builder-ts
   ```
2. Install the dependencies:

    ```
    cd form-builder-mui/package
    npm install
    ```

## Usage

### Builder

The Builder component is responsible for creating and customizing forms. Here are the props it accepts:

- `form`: Can be null or can contain a form to be used as a template for the next form.
- `saveForm`: A callback function that takes one argument—an array containing the form's elements. If not provided, the form will be logged to the console upon saving.
- `scrollToNewElement`: A boolean indicating whether the page should scroll to the newly added form element, defaults to true.

*Example usage*
```js
import { Box } from "@mui/material";
import Builder from "form-builder-mui/build/Builder";
import React from "react";

function FormBuilderExample({ form }) {
  const handleSave = (data) => {
    // handle saving of form data
    console.log(data);
  };

  return (
    <Box>
      <Builder form={form ?? []} saveForm={handleSave} />
    </Box>
  );
}

export default FormBuilderExample;
```

### Viewer
The Viewer component displays and interacts with the forms created using the Builder. It accepts the following props:

- `form`: The input for the form designed in the Builder.
- `onSubmit`: A callback function that takes one argument—an array containing the form's values. This function will be called if all required fields are filled.
- `onSubmitPartial`: A callback function that also takes one argument — an array containing the form's values. This function will be called to allow for submission when required values are not completed.
- `onAutoSave`: A callback function that takes one argument—an array containing the form's values. This function will be called whenever the form is updated, allowing for autosaving of form data. If not provided, the form will not autosave
- `autoSaveInterval`: An integer representing the number of milliseconds between autosaves. If not provided, the form will default to 3 seconds. on AutoSave must be provided for this to work.
- `preview`: A boolean indicating whether the submit buttons should be hidden, allowing users to interact with the form but not submit it.
- `disabled`: A boolean indicating whether the submit buttons should be hidden and the user should only be able to see previous responses without editing.
- `submitText`: A string representing the text to be displayed on the submit button.
- `saveText`: A string representing the text to be displayed on the save button.

*Example usage*

```js
import { Box } from "@mui/material";
import Viewer from "form-builder-mui/build/Viewer";
import React from "react";

function FormViewerExample({ form }) {
  const onSubmit = (data) => {
    // handle submission of form data
    console.log(data);
  };

  const onSubmitPartial = (data) => {
    // handle submission of partial form data
    console.log(data);
  };

  return (
    <Box>
      <Viewer
        form={form}
        onSubmit={onSubmit}
        onSubmitPartial={onSubmitPartial}
        preview={false} // set to true to hide submit buttons
        disabled={false} // set to true to disable form and hide submit buttons
      />
    </Box>
  );
}

export default FormViewerExample;
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

