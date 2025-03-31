Assignment for Junior Frontend Developer role.

Environment Setup
This asisgnment is based on an Angular 12 application. To complete it, ensure you have the following setup:
⦁	Install Node.js 14 or 16 from ⦁	nodejs.org (newer versions will require you to run npm start).
⦁	Install Angular CLI globally using npm install -g @angular/cli.
⦁	Run npm install inside the project folder after extracting the provided ZIP.
⦁	Start the development server with ng serve or npm start and access the application at http://localhost:4200/.

Overview
The application includes a Contracts page that displays a list of contracts with filtering options. This assignment involves enhancing the existing functionality by adding new filters, improving data presentation and refining user interactions.

Requirements

Filters
Enhance the filtering functionality by ensuring the following filters are available:
⦁	Contract Status (Already exists)
⦁	Contract Type (New)
⦁	Start Date (New)
⦁	End Date (New)
⦁	Provide an option to clear all filters.

Grid Enhancements
Ensure the following properties are visible in the grid:
⦁	Contract Type (Already exists)
⦁	Contract Status (New) - Represent each status with an appropriate icon.
⦁	Customer Name (Already exists)
⦁	Boat Name (Already exists)
⦁	Location (Already exists)
⦁	Start Date (Already exists) - Format to: 12th December 2025.
⦁	End Date (Already exists) - Format to: 12th December 2025.
⦁	Duration in Days - Display the duration in days using the Contract class.
⦁	Total Inc VAT (New) - Display with respective currency format.
⦁	Delete Action (New) - Add a column with a delete icon; clicking it should remove the respective row.
Additionally:
⦁	Ensure each column is sortable and filterable.


Edit Contract Dialog
Complete the Edit Contract dialog with the following fields:
⦁	Contract Type (Dropdown)
⦁	Contract Status (Dropdown)
⦁	Start Date (Date Picker)
⦁	End Date (Date Picker)
When any relevant field in the form updates, dynamically retrieve and display a new quote within the dialog. Clicking "Update" should update the corresponding row in the grid.

Expectations
⦁	Implement clean and maintainable code.
⦁	Ensure intuitive UX/UI interactions.
⦁	Handle form updates efficiently, ensuring that the displayed quote reflects changes accurately.

Deliverables
⦁	A fully functional Contracts page with the specified enhancements.
