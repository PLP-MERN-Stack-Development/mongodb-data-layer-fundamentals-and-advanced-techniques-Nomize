/****************************************************
 * MongoDB Queries - PLP Bookstore Assignment
 * Tasks 1–5: CRUD, Advanced Queries, Aggregation, Indexing
 ****************************************************/

/***************
 * Task 1: Setup
 * Database `plp_bookstore` and collection `books` already created in Atlas/Compass
 ***************/

// No commands needed here since setup is already done

/***************
 * Task 2: Basic CRUD Operations
 ***************/

// 1️⃣ Find all books in a specific genre ("Romance")
db.books.find({ genre: "Romance" }).pretty()
// Returns all books where the genre field is "Romance"

// 2️⃣ Find books published after 2010
db.books.find({ published_year: { $gt: 2010 } }).pretty()
// Returns books where published_year is greater than 2010

// 3️⃣ Find books by a specific author ("George Orwell")
db.books.find({ author: "George Orwell" }).pretty()
// Returns books written by George Orwell

// 4️⃣ Update the price of a specific book ("The Great Gatsby")
db.books.updateOne(
  { title: "The Great Gatsby" },   // Filter: select the book by title
  { $set: { price: 12.99 } }       // Update: set price to 12.99
)
// Confirm the update
db.books.find({ title: "The Great Gatsby" }).pretty()

// 5️⃣ Delete a book by its title ("Moby Dick
db.books.deleteOne({ title: "Moby Dick"})
// Confirm deletion
db.books.find({ title: "Moby Dick"}).pretty()


/***************
 * Task 3: Advanced Queries
 ***************/

// Books in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } }).pretty()
// Filters books that are available and published after 2010
// There were no avaialble books after 2010

// Projection: return only title, author, price
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
).pretty()
// Projection shows only selected fields, hiding _id

// Sort books by price ascending
db.books.find({}, { title: 1, price: 1, _id: 0 }).sort({ price: 1 }).pretty()
// Sorts all books by price in ascending order

// Sort books by price descending
db.books.find({}, { title: 1, price: 1, _id: 0 }).sort({ price: -1 }).pretty()
// Sorts all books by price in descending order

// Pagination: 5 books per page
// Page 1
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).sort({ title: 1 }).limit(5).pretty()
// Page 2
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).sort({ title: 1 }).skip(5).limit(5).pretty()
// Skip moves the cursor to start at a specific offset, useful for paging


/***************
 * Task 4: Aggregation Pipeline
 ***************/

// 1️⃣ Average price by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",                  // Group books by genre
      averagePrice: { $avg: "$price" } // Calculate average price for each genre
    }
  }
])

// 2️⃣ Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } }, // Count books per author
  { $sort: { count: -1 } },                           // Sort descending
  { $limit: 1 }                                       // Keep only top author
])

// 3️⃣ Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: [{ $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }, 0, 4] },
          "s"
        ]
      },                      // Creates decade label like "2010s"
      count: { $sum: 1 }       // Count number of books in that decade
    }
  },
  { $sort: { _id: 1 } }        // Sort decades chronologically
])


/***************
 * Task 5: Indexing
 ***************/

// 1️⃣ Create index on title for faster lookups
db.books.createIndex({ title: 1 }) // 1 for ascending

// 2️⃣ Create compound index on author + published_year for optimized queries
db.books.createIndex({ author: 1, published_year: -1 })
// Useful for filtering by author and sorting by published_year

// 3️⃣ Explain query performance
// Check how many documents are scanned before/after index creation
db.books.find({ title: "The Hobbit" }).explain("executionStats")
// Look for "IXSCAN" in the stage to confirm index usage

db.books.find({ author: "George Orwell", published_year: { $gt: 1940 } })
        .sort({ published_year: -1 })
        .explain("executionStats")
// Confirms compound index is used for efficient filtering and sorting
