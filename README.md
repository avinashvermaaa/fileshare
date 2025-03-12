# Sharekaro.io

Effortlessly Send & Receive Files - Secure🔐, Fast🚀, and Hassle-Free✨!

## 📌 Features

* Upload multiple files and share them easily
* Files are stored securely on Cloudinary
* Short links generated for quick file access
* Fully responsive UI built with React
* Backend powered by Node.js and Express
* Seamless integration with Cloudinary for file storage

## 🚀 Tech Stack

* **Frontend:** React, HTML, CSS
* **Backend:** Node.js, Express.js
* **Storage:** Cloudinary
* **Database:** Not required (Cloudinary handles file storage)
* **Short Links:** nanoid for generating short unique URLs

## 📥 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/avinashvermaaa/sharekaro.io.git
   cd sharekaro.io
   ```
2. **Set up the backend**
   ```sh
   cd backend
   npm install
   ```
   Create a `.env` file in the backend directory and add:
   ```env
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
   Start the backend server:
   ```sh
   npm start
   ```

3. **Set up the frontend**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

## 🔗 Usage

1. Upload files using the **Upload Files** button.
2. Click **Send Files** to generate a short link for easy sharing.
3. Access the uploaded files via the generated short link.
4. Manage files directly from the UI.

## 💙 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📜 License

This project is open-source and available under the MIT License.

---
Made with 💙 by [Avinash Verma]

