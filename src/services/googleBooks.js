// const API_KEY = "AIzaSyDqmdkcxCpPzHQO1i92a8IWM7gm4iSDLdY";
const API_KEY = "AIzaSyCKl8rpiJhPc8E8a_A4FazuMvJnHIW1hBU";

export async function fetchBooks(query) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&maxResults=30&key=${API_KEY}`
  );
  const data = await res.json();
  return data.items || [];
}
