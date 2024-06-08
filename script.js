document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    fetchBooks(query);
  });
  
  function fetchBooks(query) {
    const apiUrl = `https://api.example.com/books?search=${query}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayBooks(data.books);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }
  function displayBooks(books) {
    const bookDisplay = document.getElementById('book-display');
    bookDisplay.innerHTML = ''; // Clear previous results
  
    books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.className = 'book-item';
  
      const bookCover = document.createElement('img');
      bookCover.className = 'book-cover';
      bookCover.src = book.coverImageUrl;
      bookCover.alt = `Cover of ${book.title}`;
  
      const bookDetails = document.createElement('div');
      bookDetails.className = 'book-details';
  
      const bookTitle = document.createElement('h2');
      bookTitle.className = 'book-title';
      bookTitle.textContent = book.title;
  
      const bookAuthor = document.createElement('p');
      bookAuthor.className = 'book-author';
      bookAuthor.textContent = `by ${book.author}`;
  
      const bookDescription = document.createElement('p');
      bookDescription.className = 'book-description';
      bookDescription.textContent = book.description;
  
      bookDetails.appendChild(bookTitle);
      bookDetails.appendChild(bookAuthor);
      bookDetails.appendChild(bookDescription);
      bookItem.appendChild(bookCover);
      bookItem.appendChild(bookDetails);
      bookDisplay.appendChild(bookItem);
    });
  }
  let currentPage = 1;
  let totalPages = 10; // This would be dynamically set based on API response
  
  document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      updatePageInfo();
      fetchBooks(document.getElementById('search-input').value, currentPage);
    }
  });
  
  document.getElementById('next-page').addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      updatePageInfo();
      fetchBooks(document.getElementById('search-input').value, currentPage);
    }
  });
  
  function updatePageInfo() {
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
  }
  
  // Initial call to update page info
  updatePageInfo();
      