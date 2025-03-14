# Sharekaro.io 
live:-  https://share247.netlify.app/

Effortlessly Send & Receive Files - Secure🔐, Fast🚀, and Hassle-Free✨! file-sharing web application built with **React, Node.js, Cloudinary, and Multer**.

## 📌 Features

* Upload multiple files and share them easily
* Files are stored securely on Cloudinary
* Short links generated for quick file access
* Fully responsive UI built with React
* Backend powered by Node.js and Express
* Seamless integration with Cloudinary for file storage


## 🚀 Tech Stack

### Frontend:
- React.js
- Axios
- CSS & Tailwind CSS

### Backend:
- Node.js
- Express.js
- Multer (for file handling)
- Cloudinary (for file storage)
- Short Unique ID (for short links)

## 📥 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/avinashvermaaa/sharekaro.io.git
   cd sharekaro.io
   ```
2. **Set up the backend**
   ```sh
   cd backend
   npm install --legacy-peer-deps
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

## API Endpoints

- `POST /upload` → Uploads files to Cloudinary & returns a short link.
- `GET /file/:shortId` → Retrieves the file from Cloudinary using the short link.


## 💙 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---
Made with 💙 by [Avinash Verma]

Happy sharing with **Sharekaro.io**! 🎉
