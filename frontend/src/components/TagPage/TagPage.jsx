import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TagItem from './TagItem';
import styles from './TagPage.module.css';

const tagData = [
  {
    name: 'JavaScript',
    description:
      'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that...',
    weeklyQuestions: 137,
    totalQuestions: 2530593,
  },
  {
    name: 'Python',
    description:
      'Python is a dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a...',
    weeklyQuestions: 226,
    totalQuestions: 2198272,
  },
  {
    name: 'Java',
    description:
      "Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself.",
    weeklyQuestions: 69,
    totalQuestions: 1918874,
  },
  {
    name: 'PHP',
    description:
      'PHP is an open-source, multi-paradigm, dynamically-typed, interpreted scripting language and designed primarily for server-side web...',
    weeklyQuestions: 38,
    totalQuestions: 1465452,
  },
  {
    name: 'Android',
    description:
      "Android is Google's mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobile...",
    weeklyQuestions: 59,
    totalQuestions: 1481646,
  },
  {
    name: 'HTML',
    description:
      'HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser...',
    weeklyQuestions: 53,
    totalQuestions: 1188198,
  },
  {
    name: 'C#',
    description:
      'C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft. C# code...',
    weeklyQuestions: 50,
    totalQuestions: 1671423,
  },
  {
    name: 'jQuery',
    description:
      'jQuery is a JavaScript library. jQuery is a popular cross-browser JavaScript library that facilitates Document Object Model (DOM)...',
    weeklyQuestions: 8,
    totalQuestions: 1034648,
  },
  {
    name: 'CSS',
    description:
      'CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML (HyperText...',
    weeklyQuestions: 37,
    totalQuestions: 805577,
  },
  {
    name: 'iOS',
    description:
      'iOS is the mobile operating system running on the Apple iPhone, iPod touch, and iPad. Use this tag [ios] for questions related to programming on...',
    weeklyQuestions: 21,
    totalQuestions: 687565,
  },
];

const TagPage = () => {
  return (
    <>
      <Header />
      <div className={styles.descriptionContainer}>
        <h1>Tags</h1>
        <p>
          A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags
          makes it easier for others to find and answer your question.
        </p>
      </div>
      <div className={styles.searchContainer}>
        <input type='text' placeholder='Filter by tag name' className={styles.searchInput} />
      </div>
      <div className={styles.container}>
        {tagData.map((tag, index) => (
          <TagItem key={index} tag={tag} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TagPage;
