#  HealAI - Intelligent Wound & Health Assessment Platform

## 📌 Overview
HealAI is an AI-powered health platform designed to assist in wound assessment and general health analysis. The system enables users to upload wound images, receive instant classification, and access health insights through an intuitive web interface. 

---

##  Key Features

###  AI Wound Classification
- Upload wound images for instant analysis  
- Classifies wounds into multiple categories (Low / Medium / High risk)  
- Achieves **96.2% accuracy** using deep learning models  

### ⚖️ Health & BMI Analysis
- Calculates Body Mass Index (BMI)  
- Provides personalized health insights and exercise recommendations  

### 📚 Disease Encyclopedia
- Browse diseases by category and severity  
- Access detailed medical information  

### 📊 Health Reports
- View previous wound assessments  
- Track health progress over time  

---

##  System Architecture
The system follows a **three-tier architecture**:

- **Frontend:** React (UI)  
- **Backend:** FastAPI (API & logic)  
- **AI Model:** TensorFlow / CNN for image classification  
- **Communication:** REST APIs 

---

## ⚡ Performance
- AI inference time: **~166–186 ms**  
- End-to-end response: **< 1.5 seconds**  
- Model accuracy: **96.2%**  

---

## 🔒 Security
- JWT-based authentication  
- Password hashing (bcrypt)  
- Local processing for sensitive data  

---

## 🛠️ Technologies Used
- Python / FastAPI  
- React / TypeScript  
- TensorFlow / Keras  
- REST APIs  

---

## ▶️ How to Run

```bash
npm install
npm run dev or npm run dev:all
