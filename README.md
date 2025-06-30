# MoodMate - Mood Tracking Application

A full-stack mood tracking application built with Spring Boot backend and React frontend, designed to help users track their daily mood, stress levels, energy, and sleep patterns.

## 🌟 Features

### Authentication & User Management
- User registration and login with JWT authentication
- Secure password hashing
- Role-based access control (USER, ADMIN)

### Mood Tracking
- Daily mood entries with multiple metrics:
  - Mood type (Happy, Sad, Neutral, Excited, Anxious, Calm, Frustrated, Grateful)
  - Stress level (1-5 scale)
  - Energy level (1-5 scale)
  - Sleep hours
  - Personal notes
- Edit and delete mood entries
- View mood history and trends

### Analytics & Insights
- Mood trend visualization with charts
- Statistics dashboard
- Wellness quotes for motivation
- Data export capabilities

### Technical Features
- RESTful API with Spring Boot
- MySQL database integration
- JWT token-based authentication
- CORS enabled for frontend integration
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL Database**
- **Maven** for dependency management

### Frontend
- **React 18**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Chart.js** for data visualization
- **Axios** for API calls

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/moodmate.git
cd moodmate
```

### 2. Database Setup
1. Start MySQL server
2. Create a database named `moodmate` (or update the configuration)
3. Update database credentials in `backend/src/main/resources/application.properties` if needed

### 3. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Mood Entry Endpoints
- `GET /api/mood-entries` - Get user's mood entries
- `POST /api/mood-entries` - Create new mood entry
- `PUT /api/mood-entries/{id}` - Update mood entry
- `DELETE /api/mood-entries/{id}` - Delete mood entry
- `GET /api/mood-entries/stats` - Get mood statistics

### Wellness Endpoints
- `GET /api/wellness/quote` - Get random wellness quote

## 🔧 Configuration

### Backend Configuration
Update `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/moodmate?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### Frontend Configuration
Update API base URL in frontend components if needed.

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Mood Entry**: Click "Add Mood" to record your daily mood and metrics
3. **View Dashboard**: See your mood trends and recent entries
4. **Check Statistics**: Visit the Stats page for detailed analytics
5. **Get Motivated**: Read wellness quotes for daily inspiration

## 📁 Project Structure

```
moodmate/
├── backend/                 # Spring Boot Backend
│   ├── src/main/java/com/moodmate/
│   │   ├── config/         # Security and JWT configuration
│   │   ├── controller/     # REST API controllers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entity/        # JPA entities
│   │   ├── repository/    # Data access layer
│   │   └── service/       # Business logic
│   └── src/main/resources/
│       └── application.properties
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main application component
│   ├── public/            # Static files
│   └── package.json
└── README.md
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

