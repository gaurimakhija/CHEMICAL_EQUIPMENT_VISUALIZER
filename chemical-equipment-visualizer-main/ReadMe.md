# Chemical Equipment Parameter Visualizer (Hybrid Web + Desktop App)

## Project Overview
This project is a hybrid application featuring both a web interface (React.js) and a desktop application (PyQt5). It allows users to upload CSV files containing chemical equipment parameters (e.g., Equipment Name, Type, Flowrate, Pressure, Temperature). The Django backend processes and analyzes this data, exposing APIs for frontends to display tables, charts, and summary statistics.

## Tech Stack
- Backend: Python, Django, Django REST Framework, Pandas, SQLite
- Web Frontend: React.js, Chart.js
- Desktop Frontend: PyQt5, Matplotlib
- Version Control: Git, GitHub

## Features
- CSV upload from both web and desktop interfaces
- Data summary API with counts, averages, and type distribution
- Visualizations with charts on web and desktop
- History management storing last 5 uploaded datasets
- PDF report generation
- Basic authentication with JWT tokens

## Setup Instructions

### Backend
1. Create a virtual environment and activate it.
2. Install dependencies:
pip install -r requirements.txt


3. Apply migrations and run the server:
python manage.py migrate
python manage.py runserver



### Web Frontend
1. Navigate to the frontend directory:
cd frontend


2. Install npm dependencies:
npm install


3. Run the development server:
npm start



### Desktop Frontend
1. Navigate to the desktop app directory (e.g., `desktop`).
2. Install dependencies (PyQt5, matplotlib):
pip install -r requirements.txt


3. Run the desktop app:
python main.py



## API Endpoints
- `POST /api/auth/register/`: User registration
- `POST /api/auth/token/`: Obtain JWT token
- `POST /api/upload/`: Upload CSV file
- `GET /api/summary/`: Get data summary
- More endpoints as appropriate...

## Sample Data
A sample CSV `sample_equipment_data.csv` is included for testing and demo.

## Usage
- Upload a CSV file on either web or desktop frontend.
- Visualize data tables and charts.
- View historical uploads and generate PDF reports.

## Contribution
Contributions and improvements are welcome! Feel free to submit issues, feature requests, or pull requests.

## License
Specify your project license here.

---

*Thank you for checking out this project! For questions or help setting up, please contact [makhijag24@gmail.com].*

