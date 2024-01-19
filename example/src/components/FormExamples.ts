export const Form1 = [
  {
    id: 8,
    type: "Header",
    text: "Section 1: About you!",
    variant: "h3",
  },
  {
    id: 16,
    type: "Header",
    variant: "p",
    text: "Please fill out the following information:",
    divider: true,
  },
  {
    id: 1,
    type: "TextField",
    prompt: "What is your name?",
    required: false,
    variant: "standard",
    value: "Peter Wilson",
    multiline: false,
  },
  {
    id: 2,
    type: "TextField",
    prompt: "What is your age?",
    required: false,
    variant: "standard",
    value: "23",
    multiline: false,
  },
  {
    id: 3,
    type: "TextField",
    prompt: "What is your address?",
    required: false,
    variant: "standard",
    value: "",
    multiline: true,
  },
  {
    id: 4,
    type: "RadioInput",
    prompt: "Do you have any pets?",
    required: false,
    value: "",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 5,
    type: "RadioInput",
    prompt: "Do you like coffee?",
    required: false,
    value: "",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 6,
    type: "SelectInput",
    prompt: "What is your favorite fruit?",
    required: false,
    value: "",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ],
  },
  {
    id: 7,
    type: "SelectInput",
    prompt: "What is your preferred method of contact?",
    required: false,
    value: "",
    options: [
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "Mail", value: "mail" },
    ],
  },
  {
    id: 9,
    type: "Checkboxes",
    prompt: "Which of the following apply?",
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
    ],
  },
  {
    id: 10,
    type: "DateInput",
    prompt: "When is your birthday?",
    required: true,
    format: "date",
    value: "2017-05-26",
  },
  {
    id: 11,
    type: "DateInput",
    prompt: "When do you usually wake up?",
    required: true,
    format: "time",
    value: "07:30",
  },
  {
    id: 12,
    type: "DateInput",
    prompt: "When is your next appointment?",
    required: true,
    format: "datetime-local",
    value: "2017-05-24T10:30",
  },
  {
    id: 14,
    type: "MultipleTextField",
    prompt: "What did the client enjoy today?",
    required: true,
  },
  {
    id: 15,
    type: "NumberInput",
    prompt: "How many pets do you have?",
    required: true,
    variant: "standard",
    value: 0,
  },
];

export const Form1Filled = [
  { id: 8, type: "Header", text: "Section 1: About you!", variant: "h2" },
  {
    id: 16,
    type: "Header",
    variant: "p",
    text: "Please fill out the following information:",
  },
  {
    id: 1,
    type: "TextField",
    prompt: "What is your name?",
    required: false,
    variant: "standard",
    value: "Johnny Appleseed",
    multiline: false,
  },
  {
    id: 2,
    type: "TextField",
    prompt: "What is your age?",
    required: false,
    variant: "standard",
    value: "23",
    multiline: false,
  },
  {
    id: 3,
    type: "TextField",
    prompt: "What is your address?",
    required: false,
    variant: "standard",
    value: "123 Applewood Street",
    multiline: true,
  },
  {
    id: 4,
    type: "RadioInput",
    prompt: "Do you have any pets?",
    required: false,
    value: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 5,
    type: "RadioInput",
    prompt: "Do you like coffee?",
    required: false,
    value: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: 6,
    type: "SelectInput",
    prompt: "What is your favorite fruit?",
    required: false,
    value: "orange",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ],
  },
  {
    id: 7,
    type: "SelectInput",
    prompt: "What is your preferred method of contact?",
    required: false,
    value: "phone",
    options: [
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "Mail", value: "mail" },
    ],
  },
  {
    id: 9,
    type: "Checkboxes",
    prompt: "Which of the following apply?",
    options: [
      { label: "Option 1", value: "Option 1" },
      { label: "Option 2", value: "Option 2" },
    ],
    value: { "Option 2": true },
  },
  {
    id: 10,
    type: "DateInput",
    prompt: "When is your birthday?",
    required: true,
    format: "date",
    value: "1985-02-28",
  },
  {
    id: 11,
    type: "DateInput",
    prompt: "When do you usually wake up?",
    required: true,
    format: "time",
    value: "09:00",
  },
  {
    id: 12,
    type: "DateInput",
    prompt: "When is your next appointment?",
    required: true,
    format: "datetime-local",
    value: "2023-11-18T10:30",
  },
  {
    id: 14,
    type: "MultipleTextField",
    prompt: "What did the client enjoy today?",
    required: true,
    value: ["Walk in the park", "A great dinner"],
    variant: "standard",
  },
  {
    id: 15,
    type: "NumberInput",
    prompt: "How many pets do you have?",
    required: true,
    variant: "standard",
    value: "1",
  },
];

export const BuiltForm = [
  { id: 1, type: "Header", text: "Welcome to my Form!", variant: "h6" },
  {
    id: 2,
    type: "RadioInput",
    prompt: "What would you like to eat today?",
    required: true,
    value: "Steak",
    options: [
      { value: "Steak", label: "Steak" },
      { value: "Chicken", label: "Chicken" },
      { value: "Pork", label: "Pork" },
    ],
  },
  {
    id: 3,
    type: "SelectInput",
    prompt: "What should the side be?",
    required: true,
    value: "Mash potatoes",
    options: [
      { value: "Mash potatoes", label: "Mash potatoes" },
      { value: "Fried Veggies", label: "Fried Veggies" },
      { value: "Salad", label: "Salad" },
    ],
  },
  {
    id: 4,
    type: "TextField",
    prompt:
      "The meal described above, where did you have it the best in the past?",
    required: false,
    variant: "standard",
    value: "",
    multiline: false,
  },
  {
    id: 5,
    type: "DateInput",
    prompt: "When was this meal?",
    required: true,
    format: "date",
    value: "",
  },
  {
    id: 6,
    type: "MultipleTextField",
    prompt: "What were the sides of the meal?",
    required: true,
    variant: "standard",
  },
  {
    id: 7,
    type: "NumberInput",
    prompt: "How much did it cost? ($)",
    required: true,
    variant: "standard",
  },
];

export const BuiltFormFilled = [
  { id: 1, type: "Header", text: "Welcome to my Form!", variant: "h6" },
  {
    id: 2,
    type: "RadioInput",
    prompt: "What would you like to eat today?",
    required: true,
    value: "Steak",
    options: [
      { value: "Steak", label: "Steak" },
      { value: "Chicken", label: "Chicken" },
      { value: "Pork", label: "Pork" },
    ],
  },
  {
    id: 3,
    type: "SelectInput",
    prompt: "What should the side be?",
    required: true,
    value: "Salad",
    options: [
      { value: "Mash potatoes", label: "Mash potatoes" },
      { value: "Fried Veggies", label: "Fried Veggies" },
      { value: "Salad", label: "Salad" },
    ],
  },
  {
    id: 4,
    type: "TextField",
    prompt:
      "The meal described above, where did you have it the best in the past?",
    required: false,
    variant: "standard",
    value: "Moms house",
    multiline: false,
  },
  {
    id: 5,
    type: "DateInput",
    prompt: "When was this meal?",
    required: true,
    format: "date",
    value: "2023-09-06",
  },
  {
    id: 6,
    type: "MultipleTextField",
    prompt: "What were the sides of the meal?",
    required: true,
    variant: "standard",
    value: ["taters", "salad"],
  },
  {
    id: 7,
    type: "NumberInput",
    prompt: "How much did it cost? ($)",
    required: true,
    variant: "standard",
    value: "55",
  },
];

export const FormExamples = {
  Form1,
  Form1Filled,
  BuiltForm,
  BuiltFormFilled,
};

// create an interface with the keys of FormExamples
export type FormExamplesKeys = keyof typeof FormExamples;
