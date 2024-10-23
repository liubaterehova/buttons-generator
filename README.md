# Buttons Generator

A React app that allows users to generate styled buttons by inputting color, size, text or style using the OpenAI API. The app dynamically generates valid HTML for the button based on user input and handles edge cases for different descriptions.

## Features

- **User Inputs**: Users can provide a color, size, text or style for generating a styled button.

- **AI-Powered Button Generation**: The OpenAI API is used to return valid styled HTML based on the provided inputs.

- **Edge Case Handling**: The app handles vague descriptions such as "very dark" for color or "super huge" for size.

- **Scalable Design**: Built with the idea that additional components and attributes could be added in the future.

## Getting Started

### Prerequisites

- Node.js (v14 or later)

- An OpenAI API key (available at [OpenAI](https://openai.com))

### Installation

1. Clone the repository:

```bash
git  clone <repository-url>
cd  buttons-generator
```

2. Install dependencies:

```bash
npm  install
```

3. Create a .env file in the root of the project and add your OpenAI API key:

```
OPEN_AI_API_KEY=your-openai-api-key-here
```

4. Start the development server:

```bash
npm  start
```

The app will be available at http://localhost:3000.

### Usage

1. Open the app in your browser.

2. Enter the desired color, size, and text into the provided text inputs.

3. Click "Generate Button."

The app will display a styled button based on your inputs.

### Example Inputs

- Color: "very dark", "#E51BFC" or red

- Size: "super huge" or "medium"

- Text: "Click me"

- Style: "Crazy"

The AI will return a valid styled button that reflects these values.

### Edge Case Handling

The app is built to handle both kind inputs like "very dark" or "super huge" as well as more precise inputs like #E51BFC for color.

For vague inputs, the OpenAI API interprets and generates a reasonable style for the button.

### Bonus Features:

- [x] Style Descriptor Input: The app allows users to enter style

descriptors (e.g., "modern," "minimal," or "cute") to affect the

button's appearance.

- [x] Improved UI: The interface has been enhanced to be more

interactive and modern.

- [x] Security: Safeguards against prompt injection and potentially

harmful inputs have been implemented.


### Enjoy The Demo!


https://github.com/user-attachments/assets/fab0f684-c27d-41e6-8706-b5c55a07568d

