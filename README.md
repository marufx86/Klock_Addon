# Klock Addon

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen)](https://klock-addon.vercel.app/)

**Description:**

Klock Addon is designed to help users manage their time effectively by providing a simple interface for time calculations and focus sessions.

**Features:**

- **Time Calculation**: Easily compute time differences.
- **Focus Sessions**: Set up focus sessions with optional breaks.
- **Responsive Design**: Utilizes Tailwind CSS for a responsive UI.
- **Customizable**: Configure sessions according to personal preferences.
**Getting Started:**

**Prerequisites:**

*   Node.js
*   npm

**Installation:**

1.  Clone the repository:

    ```bash
    git clone https://github.com/marufx86/Klock_Addon.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd Klock_Addon
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

**Running the App:**

```bash
npm run dev
```
Open your browser to http://localhost:8080/ to view the app.

**Deployment:**

The app is deployed on Vercel at [klock-addon.vercel.app](https://klock-addon.vercel.app/).  To deploy your own version:

1.  Push your code to GitHub
2.  Import the repository to Vercel
3.  Deploy

**Screenshots:**






**Mobile Preview**




**Native Mobile App (Android) with Capacitor:**

You can easily wrap your web app into a native Android app using Capacitor. Here are the steps:

1.  **Install Capacitor:**

    ```bash
    npm install @capacitor/core @capacitor/cli
    ```

2.  **Initialize Capacitor:**

    ```bash
    npx cap init
    ```

    *   You'll be prompted for an app name and package ID (e.g., `com.example.KlockAddon`).

3.  **Add the Android Platform:**

    ```bash
    npx cap add android
    ```

4.  **Copy Your Built Web App:**

    ```bash
    npm run build  # Make sure you have a production build of your web app.
    npx cap copy
    ```

5.  **Open the Android Project in Android Studio:**

    ```bash
    npx cap open android
    ```

    *   This will open Android Studio. Build and run the app on an emulator or connected device.

**Important Notes for Capacitor:**

*   Ensure you have Android Studio installed and properly configured.
*   Some time errors will pop up, run all the Capacitor related commands again, and you're good to go.
*   Refer to the official Capacitor documentation for the most up-to-date information: [https://capacitorjs.com/docs](https://capacitorjs.com/docs)


**Contributing:**

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository
2.  Create a new branch for your feature/fix
3.  Commit your changes
4.  Open a pull request

**License:**

MIT License

Copyright (c) 2025 Maruf Khan Ornob

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
