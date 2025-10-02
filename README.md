# MongoDB Fundamentals - Week 1

# PLP Bookstore — MongoDB Assignment

## Overview
This project demonstrates basic and advanced MongoDB operations using a sample bookstore database.  
It includes CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Project Structure
- `insert_books.js` → Script to insert at least 10 sample books into the `books` collection.
- `queries.js` → Contains all MongoDB queries from Task 2–5, with inline comments explaining each step.
- `screenshots/` → Contains screenshots from MongoDB Compass and MongoDB Shell to show the database and queries in action.

## Database Setup
1. Database Name: **plp_bookstore**  
2. Collection Name: **books**  
3. Each book document contains:
   - `title` (string)
   - `author` (string)
   - `genre` (string)
   - `published_year` (number)
   - `price` (number)
   - `in_stock` (boolean)
   - `pages` (number)
   - `publisher` (string)


---

## Repository contents

- `insert_books.js`  
  Node.js script (optional) to insert sample books (uses the MongoDB Node driver).  
- `queries.js`  
  MongoDB Shell (mongosh) friendly file containing the queries for Tasks 2–5 with inline comments (also usable as documentation of the commands you ran).  
- `screenshots/`  
  Folder with screenshots from MongoDB Compass and mongosh that prove the database and queries were executed.  
- `README.md` (this file)  
- `.gitignore` (should include `.env`)

---

## Quick start — recommended (MONGOSH)

This is the fastest way to reproduce the assignment results and what I used for submission.

1. **Get the MongoDB Shell (mongosh) URI from Atlas**
   - In Atlas → **Connect** → **Connect with MongoDB Shell** → copy the provided URI.
   - Example URI format:
     ```
    mongodb+srv://db_user:<db_password>@cluster0.slgsw8a.mongodb.net/
     ```

2. **Run the script file (all-in-one)**
   - If you saved the mongosh commands in `mongosh_queries.js`:
     ```bashmongodb+srv://db_user:<db_password>@cluster0.slgsw8a.mongodb.net/ --file mongosh_queries.js
     ```
   - Or connect first to the shell:
     ```bash
    mongodb+srv://db_user:<db_password>@cluster0.slgsw8a.mongodb.net/
     ```
     Then at the `plp_bookstore>` prompt run commands interactively:
     ```js
     use plp_bookstore
     db.books.find().pretty()
     ```

---

## Alternative: Run scripts with Node.js (optional)

> Use this only if you want to run `insert_books.js` or `queries.js` via Node.

1. Make sure you have Node.js (v16+) installed.
2. In the project folder run:
   ```bash
   npm install
(or npm install mongodb dotenv if package.json is not present)
3. Add a .env file (do not commit it — see .gitignore example below):

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/plp_bookstore?retryWrites=true&w=majority

Run insertion:

node insert_books.js


Run queries (if implemented as Node scripts):

node queries.js

Files & Purpose (what I submitted)

insert_books.js — (kept in repo) Node-style insertion script (if instructor wants to run with Node).

queries.js — the primary file documenting the exact MongoDB queries used for Tasks 2–5 (written in mongosh syntax with inline comments).

screenshots/ — images showing:

The plp_bookstore database and books collection in Compass (sample docs).

A selection of mongosh outputs for the queries (Proof of execution).

README.md — this document.

Screenshots included (suggested list)

I included the following screenshots in screenshots/:

books_collection_page1-5.png — Compass showing pages of documents.

gueries_page1-6.png — Compass showing result of queries inputed.

Enjoy.
