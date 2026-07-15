# React Project Management System

A role-based dashboard for managing graduation/capstone project ideas at a bootcamp or university: students submit and track project ideas, teachers supervise assigned students and review their ideas, and admins oversee every user and idea across the program.

## The problem

Capstone programs need students to propose project ideas, form teams, get paired with a supervising teacher, and have staff oversee the whole cohort — usually scattered across spreadsheets and email. This app models that entire workflow as three role-specific dashboards sharing one data model.

## Features

- Three role-based experiences — **Student**, **Teacher**, **Admin** — each with its own routes and dashboard
- **Students:** submit new project ideas, track their own ideas, browse all submitted ideas
- **Teachers:** view assigned students, review and manage ideas under their supervision
- **Admin:** manage all users (add/view/edit), oversee every submitted idea across the program
- Full CRUD across ideas, teams, and supervision assignments
- Shared profile page across all roles

## Tech stack

React 19, Vite, Tailwind CSS 4, Radix UI, TanStack Query, React Hook Form, Recharts, Axios, react-hot-toast, SweetAlert2

## Data & auth

This is a frontend-only project — there's no custom backend in this repo. Login, registration, and all idea/team/supervision CRUD operations run against a mock REST API (mockapi.io) rather than a real database, which is why authentication just compares submitted credentials against stored records instead of using hashed passwords or tokens.

## Getting started

```bash
git clone https://github.com/intisar-alosaimi/React-Project-Management-System.git
cd React-Project-Management-System
npm install
npm run dev
```

## Try it

| Role | Email | Password |
|---|---|---|
| Student | `example@tuwaiq.edu.sa` | `123` |
| Teacher | `nasser@tuwaiq.edu.sa` | `t123` |
| Admin | `abeer@tuwaiq.edu.sa` | `admin123` |

## What I'd improve

- Replace the mock backend with a real API + database, with passwords properly hashed and real auth tokens instead of comparing stored credentials directly
- Move the mock API base URL into an environment variable instead of repeating the same hardcoded URL across every service file
- Add a test suite
- Add pagination to the admin "all users" / "all ideas" views as data grows
