# Renacentia WEB

## Requirements

- **Node.js 20 or later**
    - *Tip:* Install [nvm](https://github.com/nvm-sh/nvm) to easily manage Node.js versions.
    - After installing nvm, type `nvm install 20` in the terminal to install the correct Node.js version
    - Then type `nvm use 20` to switch to the correct version.
- A `.env` file with the necessary configuration variables (ask someone to provide it).

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. **Add the environment file:**
   Place the provided `.env` file in the root of the project.

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Additional Commands

- **Build for production:**
  ```bash
  npm run build
  ```
- **Run the production server:**
  ```bash
  npm start
  ```

## Troubleshooting

- **Node.js version issues:**  
  Ensure you are using Node.js 20 or later by running:
  ```bash
  nvm current
  ```
- **Environment configuration:**  
  Double-check that all variables in the `.env` file are correctly set.