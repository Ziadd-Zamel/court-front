// ============================================
// ARTICLES BOOKMARKS (المبادئ القانونية - Court Rulings)
// ============================================
const ARTICLES_BOOKMARK_KEY = "bookmarked_articles";

export const addArticleBookmark = (article: Article): boolean => {
  try {
    const bookmarks = getBookmarkedArticles();
    if (bookmarks.some((b) => b.uuid === article.uuid)) return false;

    const updated = [...bookmarks, article];
    localStorage.setItem(ARTICLES_BOOKMARK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding article bookmark:", error);
    return false;
  }
};

export const removeArticleBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedArticles();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(ARTICLES_BOOKMARK_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing article bookmark:", error);
    return false;
  }
};

export const toggleArticleBookmark = (article: Article): boolean => {
  const isBookmarked = isArticleBookmarked(article.uuid);
  if (isBookmarked) {
    return removeArticleBookmark(article.uuid);
  } else {
    return addArticleBookmark(article);
  }
};

export const getBookmarkedArticles = (): Article[] => {
  try {
    const stored = localStorage.getItem(ARTICLES_BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isArticleBookmarked = (uuid: string): boolean =>
  getBookmarkedArticles().some((b) => b.uuid === uuid);

// ============================================
// BOOKS BOOKMARKS (الكتب والإصدارات)
// ============================================
const BOOKS_BOOKMARK_KEY = "bookmarked_books";

export const addBookBookmark = (book: BookData): boolean => {
  try {
    const bookmarks = getBookmarkedBooks();
    if (bookmarks.some((b) => b.uuid === book.uuid)) return false;

    const updated = [...bookmarks, book];
    localStorage.setItem(BOOKS_BOOKMARK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding book bookmark:", error);
    return false;
  }
};

export const removeBookBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedBooks();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(BOOKS_BOOKMARK_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing book bookmark:", error);
    return false;
  }
};

export const toggleBookBookmark = (book: BookData): boolean => {
  const isBookmarked = isBookBookmarked(book.uuid);
  if (isBookmarked) {
    return removeBookBookmark(book.uuid);
  } else {
    return addBookBookmark(book);
  }
};

export const getBookmarkedBooks = (): BookData[] => {
  try {
    const stored = localStorage.getItem(BOOKS_BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isBookBookmarked = (uuid: string): boolean =>
  getBookmarkedBooks().some((b) => b.uuid === uuid);

// ============================================
// NEWS BOOKMARKS (أخبار المحكمة)
// ============================================
const NEWS_BOOKMARK_KEY = "bookmarked_news";

export const addNewsBookmark = (news: NewsArticle): boolean => {
  try {
    const bookmarks = getBookmarkedNews();
    if (bookmarks.some((b) => b.uuid === news.uuid)) return false;

    const updated = [...bookmarks, news];
    localStorage.setItem(NEWS_BOOKMARK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding news bookmark:", error);
    return false;
  }
};

export const removeNewsBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedNews();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(NEWS_BOOKMARK_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing news bookmark:", error);
    return false;
  }
};

export const toggleNewsBookmark = (news: NewsArticle): boolean => {
  const isBookmarked = isNewsBookmarked(news.uuid);
  if (isBookmarked) {
    return removeNewsBookmark(news.uuid);
  } else {
    return addNewsBookmark(news);
  }
};

export const getBookmarkedNews = (): NewsArticle[] => {
  try {
    const stored = localStorage.getItem(NEWS_BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isNewsBookmarked = (uuid: string): boolean =>
  getBookmarkedNews().some((b) => b.uuid === uuid);

// ============================================
// QUESTIONS BOOKMARKS (المعلومات المهمة)
// ============================================
const QUESTIONS_BOOKMARK_KEY = "bookmarked_questions";

export const addQuestionBookmark = (question: Iquestion): boolean => {
  try {
    const bookmarks = getBookmarkedQuestions();
    if (bookmarks.some((b) => b.uuid === question.uuid)) return false;

    const updated = [...bookmarks, question];
    localStorage.setItem(QUESTIONS_BOOKMARK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding question bookmark:", error);
    return false;
  }
};

export const removeQuestionBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedQuestions();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(QUESTIONS_BOOKMARK_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing question bookmark:", error);
    return false;
  }
};

export const toggleQuestionBookmark = (question: Iquestion): boolean => {
  const isBookmarked = isQuestionBookmarked(question.uuid);
  if (isBookmarked) {
    return removeQuestionBookmark(question.uuid);
  } else {
    return addQuestionBookmark(question);
  }
};

export const getBookmarkedQuestions = (): Iquestion[] => {
  try {
    const stored = localStorage.getItem(QUESTIONS_BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isQuestionBookmarked = (uuid: string): boolean =>
  getBookmarkedQuestions().some((b) => b.uuid === uuid);

// ============================================
// RESEARCH PAPERS BOOKMARKS (البحوث والأوراق العلمية)
// ============================================
const RESEARCH_BOOKMARK_KEY = "bookmarked_research";

export const addResearchBookmark = (research: Article): boolean => {
  try {
    const bookmarks = getBookmarkedResearch();
    if (bookmarks.some((b) => b.uuid === research.uuid)) return false;

    const updated = [...bookmarks, research];
    localStorage.setItem(RESEARCH_BOOKMARK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding research bookmark:", error);
    return false;
  }
};

export const removeResearchBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedResearch();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(RESEARCH_BOOKMARK_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing research bookmark:", error);
    return false;
  }
};

export const toggleResearchBookmark = (research: Article): boolean => {
  const isBookmarked = isResearchBookmarked(research.uuid);
  if (isBookmarked) {
    return removeResearchBookmark(research.uuid);
  } else {
    return addResearchBookmark(research);
  }
};

export const getBookmarkedResearch = (): Article[] => {
  try {
    const stored = localStorage.getItem(RESEARCH_BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isResearchBookmarked = (uuid: string): boolean =>
  getBookmarkedResearch().some((b) => b.uuid === uuid);

// ============================================
// LAWS BOOKMARKS (القوانين)
// ============================================
const LAWS_BOOKMARK_KEY = "bookmarked_laws";

export const addLawBookmark = (law: Law): boolean => {
  try {
    const bookmarks = getBookmarkedLaws();
    if (bookmarks.some((b) => b.uuid === law.uuid)) return false;

    const updated = [...bookmarks, law];
    localStorage.setItem(LAWS_BOOKMARK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding law bookmark:", error);
    return false;
  }
};

export const removeLawBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedLaws();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(LAWS_BOOKMARK_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing law bookmark:", error);
    return false;
  }
};

export const toggleLawBookmark = (law: Law): boolean => {
  const isBookmarked = isLawBookmarked(law.uuid);
  if (isBookmarked) {
    return removeLawBookmark(law.uuid);
  } else {
    return addLawBookmark(law);
  }
};

export const getBookmarkedLaws = (): Law[] => {
  try {
    const stored = localStorage.getItem(LAWS_BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isLawBookmarked = (uuid: string): boolean =>
  getBookmarkedLaws().some((b) => b.uuid === uuid);

// ============================================
// EXPORT ALL KEYS
// ============================================
// ============================================
// PRINCIPLES BOOKMARKS (المبادئ القانونية)
// ============================================
const PRINCIPLES_BOOKMARK_KEY = "bookmarked_principles";

export const addPrincipleBookmark = (principle: Principle): boolean => {
  try {
    const bookmarks = getBookmarkedPrinciples();
    if (bookmarks.some((b) => b.uuid === principle.uuid)) return false;

    const updated = [...bookmarks, principle];
    localStorage.setItem(PRINCIPLES_BOOKMARK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding principle bookmark:", error);
    return false;
  }
};

export const removePrincipleBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedPrinciples();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(PRINCIPLES_BOOKMARK_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing principle bookmark:", error);
    return false;
  }
};

export const togglePrincipleBookmark = (principle: Principle): boolean => {
  const isBookmarked = isPrincipleBookmarked(principle.uuid);
  if (isBookmarked) {
    return removePrincipleBookmark(principle.uuid);
  } else {
    return addPrincipleBookmark(principle);
  }
};

export const getBookmarkedPrinciples = (): Principle[] => {
  try {
    const stored = localStorage.getItem(PRINCIPLES_BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isPrincipleBookmarked = (uuid: string): boolean =>
  getBookmarkedPrinciples().some((b) => b.uuid === uuid);

export { PRINCIPLES_BOOKMARK_KEY };

export {
  ARTICLES_BOOKMARK_KEY,
  BOOKS_BOOKMARK_KEY,
  NEWS_BOOKMARK_KEY,
  QUESTIONS_BOOKMARK_KEY,
  RESEARCH_BOOKMARK_KEY,
  LAWS_BOOKMARK_KEY,
};
