export const Form1 = [
    {
        id: 8,
        type: "Header",
        text: "Section 1: About you!",
        variant: "h2"
    },
    {
        id: 16,
        type: "Header",
        variant: "p",
        text: "Please fill out the following information:"
    },
    {
        id: 1,
        type: "TextField",
        prompt: "What is your name?",
        required: false,
        variant: "standard",
        value: "Peter Wilson",
        multiline: false
    },
    {
        id: 2,
        type: "TextField",
        prompt: "What is your age?",
        required: false,
        variant: "standard",
        value: "23",
        multiline: false
    },
    {
        id: 3,
        type: "TextField",
        prompt: "What is your address?",
        required: false,
        variant: "standard",
        value: "",
        multiline: true
    },
    {
        id: 4,
        type: "RadioInput",
        prompt: "Do you have any pets?",
        required: false,
        value: "",
        options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ]
    },
    {
        id: 5,
        type: "RadioInput",
        prompt: "Do you like coffee?",
        required: false,
        value: "",
        options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
        ]
    },
    {
        id: 6,
        type: "SelectInput",
        prompt: "What is your favorite fruit?",
        required: false,
        value: "",
        options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
        ]
    },
    {
        id: 7,
        type: "SelectInput",
        prompt: "What is your preferred method of contact?",
        required: false,
        value: "",
        options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Mail', value: 'mail' },
        ]
    },
    {
        id: 9,
        type: "Checkboxes",
        prompt: "Which of the following apply?",
        options: [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
        ]
    },
    {
        id: 10,
        type: "DateInput",
        prompt: "When is your birthday?",
        required: true,
        format: "date", // can be "date", "time", or "datetime-local"
        value: '2017-05-26'
    },
    {
        id: 11,
        type: "DateInput",
        prompt: "When do you usually wake up?",
        required: true,
        format: "time", // can be "date", "time", or "datetime-local"
        value: '07:30'
    },
    {
        id: 12,
        type: "DateInput",
        prompt: "When is your next appointment?",
        required: true,
        format: "datetime-local", // can be "date", "time", or "datetime-local"
        value: '2017-05-24T10:30'
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
    }  
]
