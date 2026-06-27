# 🗳️ Online Voting System

A full-stack **online voting application** — a **React** frontend and a **Node.js / Express / MongoDB** backend — that lets an admin manage candidates and lets registered users cast exactly **one** vote each. The API ships with interactive **Swagger / OpenAPI** documentation.

---

## 📌 Problem Statement

Running a fair vote — for a club election, a classroom poll, or a community decision — requires three guarantees that are surprisingly easy to get wrong:

1. **Only eligible people vote** — voters must register and authenticate.
2. **Each person votes once** — no double voting, no ballot stuffing.
3. **Results are trustworthy and visible** — tallies update in real time and only an admin can manage candidates.

Manual or spreadsheet-based voting fails all three. **This project** delivers them with a clean separation of concerns:

- **Voters** sign up, log in (receiving a JWT), see the candidate list, and cast a single vote. Once they've voted, the system remembers it and blocks any further vote.
- **Admins** create candidates and view live vote counts; candidate management is locked behind a role check.
- **The integrity rule** ("one vote per user") is enforced server-side: casting a vote atomically increments the candidate's count and flags the user as having voted.

---

## ✨ Features

- 🔐 JWT authentication with bcrypt-hashed passwords
- 🙋 Voter self-registration
- ✅ **One vote per user**, enforced on the server
- 👮 Admin-only candidate creation and tally viewing (role-based access)
- 📊 Real-time vote counts
- 🛡️ Centralised error handling with an async wrapper (no unhandled rejections)
- 📚 Interactive API docs at `/api-docs` (OpenAPI 3.0)
- ❤️ Health-check endpoint

---

## 🛠️ Tech Stack

| Layer    | Technology                               |
| -------- | ---------------------------------------- |
| Frontend | React, React Router, Axios               |
| Backend  | Node.js, Express.js                      |
| Database | MongoDB + Mongoose                       |
| Auth     | JSON Web Tokens (JWT), bcrypt            |
| API docs | swagger-ui-express (OpenAPI 3)           |

---

## 🗂️ Repository Structure

```
voting/
├── client/    # React single-page app (Create React App)
└── server/    # Express REST API + Swagger docs
```

---

## 🚀 Getting Started

You need **Node.js** and a **MongoDB** instance (local or Atlas).

### 1. Backend (API)

```bash
cd server
npm install
cp .env.example .env        # then edit PORT / PRIVATEKEY / MONGODB_URI
npm run dev                 # starts on http://localhost:5000
```

API docs: **<http://localhost:5000/api-docs>**

### 2. Frontend (React)

```bash
cd client
npm install
npm start                   # starts on http://localhost:3000
```

The client talks to the API at `http://localhost:5000`.

---

## 📚 API Reference

Full interactive docs live at **`/api-docs`**; the raw spec is at **`/openapi.json`**.

| Method | Endpoint                          | Access | Description                       |
| ------ | --------------------------------- | ------ | --------------------------------- |
| POST   | `/user/signup`                    | Public | Register a new voter              |
| POST   | `/user/login`                     | Public | Log in, returns a JWT             |
| GET    | `/user/checkVotingStatus`         | Voter  | Has the user voted, and for whom  |
| GET    | `/candidate/listofcandidate`      | Voter  | List candidates                   |
| POST   | `/candidate/updatecandidatevotes` | Voter  | Cast a vote (once)                |
| POST   | `/candidate/createcandidate`      | Admin  | Create a candidate                |
| GET    | `/candidate/getcandidatevotes`    | Admin  | View vote tallies                 |
| GET    | `/health`                         | Public | Service health check              |

> Authenticated routes expect an `Authorization: Bearer <token>` header.
> **Admin** routes require a JWT whose `user_type` is `admin`.

---

## 🗃️ Data Model

**User**
- `username` (String), `email` (String), `phone_no` (Number)
- `password` (String, bcrypt-hashed)
- `user_type` (String — `voter` / `admin`)
- `isvoted` (Boolean) · `candidate` (ObjectId → Candidate)

**Candidate**
- `name` (String) · `count` (Number — votes received) · `candidate_id` (Number)

---

## 🔒 Security Notes

- Passwords are hashed with bcrypt; the API never returns them.
- Access is stateless via signed JWTs; sensitive operations are role-gated.
- The one-vote rule is enforced server-side, not in the UI.

> Built for learning/demonstration. Harden further (rate limiting, HTTPS, audit logging) before any production use.

---

## 📝 License

ISC © Tejas Davande
