# scheduling
scheduling app


# Description

This is a scheduling app that allows coaches to create 2 hour long time slots and students to book upcoming, 
available slots for any coach as long as there isn't a conflict.

# Usage

After following the installation steps, you can access the application by navigating to http://localhost:3000 in your web browser. 
From there, you can continue as a coach or student and start scheduling appointments. Since there isn't a user creation step, I manually created 
2 students with userId 1 and 2, and 2 coaches with userId 3 and 4 on my local. To switch between users, navigate back to http://localhost:3000

# API Endpoints

## Coach APIs

- GET /coaching/:coachId Get all upcoming available slots
- GET /coaching/:coachId/appointments Get upcoming booked slots (appointments)
- GET /coaching/:coachId/slots/completed Get all completed sessions
- GET /coaching/:coachId/slots/completed/:slotId Get a completed session
- POST /coaching/:coachId/slots Create a slot
- PUT /coaching/:coachId/:slotId/feedback Create or update a feedback for a completed session

## Student APIs

- GET /learning/:studentId Get all coaches and slots (limit to 5 slots)
- GET /learning/:studentId/:coachId/availability Get all slots for a specific coach
- GET /learning/:studentId/appointments Get all appointments
- GET /learning/:studentId/reserve/:slotId Get a single time slot for a specific coach
- PATCH /learning/:studentId/reserve/:slotId Book a time slot for a specific coach

# Tech stack

## Front End

- React
- Typescript
- ChakraUI

## Backend

- Node w/ Express

## Database

- PostgreSQL
- Sequelize

