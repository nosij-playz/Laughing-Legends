# Laughing Legends

A web-based game application with leaderboard functionality and admin panel management.

## Project Structure

### Leaderboard Module
- **app.py** - Flask application with routes for index, leaderboard, data JSON, and file serving
- **scoreboard.html** - Leaderboard display page
- **index.html** - Main landing page
- **requirements.txt** - Python dependencies
- **css/** - Styling files including animations and particle effects
- **scripts/upload_leaderboard.py** - Script for uploading leaderboard data with slugify and normalization functions
- **js/** - JavaScript modules for main functionality, text animations, transitions, and particle effects

### Game Module
- **app.py** - Main game Flask application with extensive functionality including:
  - SQLite database initialization
  - User authentication and session management
  - Image selection and game logic
  - Score tracking and updating
  - Leaderboard integration
- **game.db** - SQLite database file
- **data.json** - Game data configuration
- **requirements.txt** - Python dependencies
- **static/** - Frontend assets:
  - **css/** - Game styling and animations
  - **js/** - Game logic and image handling
  - **LAUGH/** - Extensive image library (300+ images)
- **templates/** - HTML templates for dashboard, game interface, login, and image selection

### Admin Module
- **app.py** - Admin panel Flask application with features:
  - Firebase initialization and management
  - Participant management (add, delete, view)
  - Unique code generation
  - Leaderboard status management
- **requirements.txt** - Python dependencies
- **static/** - Admin interface assets
- **templates/** - Admin panel HTML templates

## Technology Stack

- **Backend**: Python with Flask framework
- **Database**: SQLite for game data, Firebase for participant management
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: Session-based login system
- **Cloud Services**: Google Cloud integration

## Key Features

- Interactive game interface with image-based challenges
- Real-time leaderboard with score tracking
- Admin panel for participant management
- User authentication and session management
- Responsive design with animations and visual effects
- Extensive image library for game content

## Setup and Installation

Each module contains its own requirements.txt for Python dependencies. Refer to individual module documentation for specific setup instructions.

## License

This project is available as a public repository on GitHub.
