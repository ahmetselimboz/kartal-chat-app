
# Kartal Chat Application

![Application Screenshot](https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/Kartal_Thumbnail.jpg)

**Kartal Chat Application** is a modern chat application that allows users to communicate in real-time and is equipped with AI-powered features. This project is developed using **TypeScript** with **Next.js** on the frontend, and **JavaScript** with **Node.js** and **Socket.io** on the backend. The application offers advanced features such as real-time messaging, message "seen" status, secure user data storage, and an AI-powered chat experience. With **Docker** support, the setup and deployment of the application are extremely easy.

## Installation

To set up the project locally, follow these steps:

```bash
git clone https://github.com/ahmetselimboz/kartal-chat-app.git
```
Clone the repository.

```bash
cd kartal-chat-app
```
Navigate to the project directory.

```bash
npm install
```
Install the necessary dependencies.

```bash
npm run dev
```
Start both the frontend and backend of the project.Open [http://localhost:3000](http://localhost:3000) in your browser for the frontend, and the backend will run on [http://localhost:5000](http://localhost:5000).

## Usage

After starting the application, navigate to `http://localhost:3000` in your browser to chat with other users in real-time. The backend handles message processing and storage, while the AI-powered features enhance the user experience.

## Features

- **Real-Time Messaging:** Users can send and receive messages instantly.
- **Seen Status:** Track whether messages have been read by the recipient.
- **Chat History:** Access the entire chat history even after reopening the app.
- **User Authentication:** Secure user sign-up and login functionality.
- **Responsive Design:** Ensures a smooth user experience across all devices.
- **Advanced Storage with MinIO:** User-generated content is securely stored and managed, ensuring scalability and data integrity.
- **AI-Powered Interactions with Gemini:** Gemini enhances the chat experience by offering intelligent responses and suggestions, making conversations more engaging and personalized.

## Code Quality and Development Principles

**Kartal Chat App** is developed in accordance with high-quality coding standards and software development principles:

- **SOLID Principles:** The code structure adheres to SOLID principles, making the code more modular, readable, and maintainable.
- **TypeScript Usage:** TypeScript on the frontend ensures type safety, minimizing the risk of errors and increasing the reliability of the code, especially in large-scale projects.
- **Asynchronous Structures:** The backend is designed as a high-performance, scalable API using Node.js's asynchronous structure, allowing multiple users to interact smoothly at the same time.
- **Testability:** The code is structured to support functional and unit testing, ensuring the maintenance of code quality in future developments.
- **Modular Design:** Both frontend and backend are designed with a modular approach, making it easier to add new features and reuse existing code.
- **CI/CD Integration:** The project is configured for continuous integration and deployment processes, making the development process more efficient.

## Used Packages

The main packages used in this project are:

- `next`
- `react`
- `react-dom`
- `tailwindcss`
- `socket.io`
- `express`
- `mongoose`
- `jsonwebtoken`
- `dotenv`
- `minio`
- `gemini-ai-sdk`

## Used Technologies

The main technologies used in this project are:

- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [MinIO](https://min.io/)
- [Gemini AI](https://gemini.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contributors

If you would like to contribute to this project, please send a pull request or open an issue.

## License

This project is licensed under the MIT License. For more information, see the `LICENSE` file.
