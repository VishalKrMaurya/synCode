# synCode

synCode is a real-time collaborative code editor that allows multiple users to join a room, write code together, and see each other's changes instantly. Built with React, Node.js, Express, and Socket.IO, synCode is perfect for remote interviews, coding sessions, pair programming, and learning environments.

## Features

- **Real-time Collaboration:** Multiple users can join the same room and edit code together in real time.
- **Room-based Sessions:** Create or join a room using a unique Room ID.
- **Language Support:** Switch between JavaScript, Python, Java, and C++ for syntax highlighting.
- **User Presence:** See who is currently in the room.
- **Typing Indicator:** Know when someone is actively typing.
- **Copy Room ID:** Easily share the room with others.
- **Leave Room:** Exit the session cleanly at any time.
- **Modern UI:** Clean, responsive, and professional user interface.

## Tech Stack

- **Frontend:** React, Monaco Editor, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO
- **Styling:** CSS (custom, responsive, and modern)

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/synCode.git
   cd synCode
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start the backend server:**
   ```bash
   cd backend
   node index.js
   ```

2. **Start the frontend app:**
   ```bash
   cd ../frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Enter a Room ID and Username to join or create a session.
- Share the Room ID with others to collaborate in real time.
- Select your preferred programming language from the sidebar.
- Start coding and see changes reflected instantly for all users in the room.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
