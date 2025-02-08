# Caterpillar AI-Powered Inspection Software

An AI-powered web application designed to assist **service technicians** in conducting hands-free equipment inspections using **voice commands**. The app enables real-time data capture, guided inspection flows, and automated report generation.

## 🚀 Features

- **Voice-Enabled Guided Inspections:** Multilingual support using the WebKit Voice API.
- **Real-Time Data Capture:** Collects inputs, images, and equipment parameters dynamically.
- **Automated Report Generation:** Utilizes the OpenAI API for smart, detailed inspection reports.
- **Export to PDF:** Generate professional reports with embedded images using PDFToolkit.

## 🛠️ Tech Stack

- **Frontend:** JavaScript, WebKit Voice API
- **Backend:** Node.js, Express.js
- **APIs:** OpenAI API
- **Utilities:** PDFToolkit for report generation

---

## ⚙️ Installation & Setup Instructions

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/saranb565/caterpillarHackathon.git
cd caterpillarHackathon
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

### 5️⃣ Run the Application

```bash
npm start
```

Visit `http://localhost:3000` in your browser to access the app.

---

## 📋 Usage Guide

1. **Initiate Inspection:** Click on the "Start Inspection" button.
2. **Voice Commands:** Speak predefined commands to guide the inspection process.
3. **Capture Inputs:** The app will prompt for images, parameters, and real-time notes.
4. **Generate Report:** Once complete, click "Generate Report" to receive an AI-generated PDF.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

## 📧 Contact

For any queries, feel free to reach out via [LinkedIn](https://linkedin.com/in/your-profile) or open an issue here.

---

**Made for Caterpillar Hackathon 2025**
