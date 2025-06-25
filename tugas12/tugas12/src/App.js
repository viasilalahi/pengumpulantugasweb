document.addEventListener('DOMContentLoaded', function() {
    // Book data
    const books = [
        {
            id: 1,
            title: "Menguasai Pemograman Berorientasi Objek",
            author: "Ade Rahmat Iskandar",
            publisher: "Informatika",
            year: "2020",
            cover: "arsip/menguasai_pemrograman.jpg",
            isPopular: false
        },
        {
            id: 2,
            title: "Dasar-Dasar Pemograman dengan.NET",
            author: "Ade Rahmat Iskanda", 
            publisher: "Informatika",
            year: "2019",
            cover: "arsip/ID_DPN2019MTH09PN.jpg",
            isPopular: false
        },
        {
            id: 3,
            title: "Metodologi Pengembangan Sistem Informasi",
            author: "Samiaji Sarosa",
            publisher: "Indeks",
            year: "2017",
            cover: "arsip/metodologi.jpg",
            isPopular: false
        },
        {
            id: 4,
            title: "Struktur Data",
            author: "Rosa A.S",
            publisher: "Modula",
            year: "2018",
            cover: "arsip/struktur_data.webp",
            isPopular: false
        },
        {
            id: 5,
            title: "Clean Code",
            author: "Robert C. Martin",
            publisher: "Pearson",
            year: "2008",
            cover: "arsip/clean_code.jpg",
            isPopular: true
        },
        {
            id: 6,
            title: "Atomic Habits",
            author: "James Clear",
            publisher: "Avery",
            year: "2018",
            cover: "arsip/atomic_habits.jpg",
            isPopular: true
        },
        {
            id: 7,
            title: "Deep Work",
            author: "Cal Newport",
            publisher: "Grand Central Publishing",
            year: "2016",
            cover: "arsip/deep_work.jpg",
            isPopular: true
        }
    ];

    // Get DOM elements
    const searchBtn = document.getElementById('searchBtn');
    const searchKeyword = document.getElementById('searchKeyword');
    const yearInput = document.getElementById('yearInput');
    const searchRadios = document.querySelectorAll('input[name="searchType"]');
    const booksContainer = document.getElementById('booksContainer');
    const popularBooksContainer = document.querySelector('.popular-books');
    const noResults = document.getElementById('noResults');

    // Initialize the page
    renderBooks();
    renderPopularBooks();

    // Event listeners
    searchBtn.addEventListener('click', searchBooks);
    searchKeyword.addEventListener('input', searchBooks);
    yearInput.addEventListener('input', searchBooks);
    searchRadios.forEach(radio => {
        radio.addEventListener('change', searchBooks);
    });

    // Functions
    function renderBooks() {
        booksContainer.innerHTML = '';
        const nonPopularBooks = books.filter(book => !book.isPopular);
        
        nonPopularBooks.forEach(book => {
            booksContainer.appendChild(createBookCard(book));
        });
    }

    function renderPopularBooks() {
        popularBooksContainer.innerHTML = '';
        const popularBooks = books.filter(book => book.isPopular);
        
        popularBooks.forEach(book => {
            const card = createBookCard(book);
            // Add popular badge
            const badge = document.createElement('div');
            badge.className = 'popular-badge';
            badge.textContent = 'POPULER';
            card.insertBefore(badge, card.firstChild);
            // Add rating
            const ratingDiv = document.createElement('div');
            ratingDiv.className = 'book-rating';
            ratingDiv.innerHTML = '★<span>4.7</span>';
            card.querySelector('.book-info').appendChild(ratingDiv);
            
            popularBooksContainer.appendChild(card);
        });
    }

    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-title', book.title.toLowerCase());
        card.setAttribute('data-author', book.author.toLowerCase());
        card.setAttribute('data-publisher', book.publisher.toLowerCase());
        card.setAttribute('data-year', book.year);

        card.innerHTML = `
            <img src="${book.cover}" alt="Book Cover" class="book-cover">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-publisher">${book.publisher}</p>
                <span class="book-year">${book.year}</span>
            </div>
        `;

        return card;
    }

    function searchBooks() {
        const keyword = searchKeyword.value.toLowerCase();
        const searchType = document.querySelector('input[name="searchType"]:checked').value;
        const year = yearInput.value;
        const allBooks = document.querySelectorAll('.book-card');
        let resultsFound = false;

        // Reset all books to visible first
        allBooks.forEach(book => {
            book.style.display = 'block';
        });

        // If search field is empty, show all books
        if (!keyword && searchType !== 'titleYear') {
            noResults.style.display = 'none';
            return;
        }

        // Filter books based on search criteria
        allBooks.forEach(book => {
            const bookTitle = book.getAttribute('data-title');
            const bookAuthor = book.getAttribute('data-author');
            const bookPublisher = book.getAttribute('data-publisher');
            const bookYear = book.getAttribute('data-year');
            let match = false;

            switch(searchType) {
                case 'title':
                    match = bookTitle.includes(keyword);
                    break;
                case 'author':
                    match = bookAuthor.includes(keyword);
                    break;
                case 'publisher':
                    match = bookPublisher.includes(keyword);
                    break;
                case 'titleYear':
                    const titleMatch = keyword ? bookTitle.includes(keyword) : true;
                    const yearMatch = year ? bookYear === year : true;
                    match = titleMatch && yearMatch;
                    break;
            }

            if (match) {
                book.style.display = 'block';
                resultsFound = true;
            } else {
                book.style.display = 'none';
            }
        });

        // Show no results message if needed
        if (!resultsFound && (keyword || (searchType === 'titleYear' && year))) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
});
