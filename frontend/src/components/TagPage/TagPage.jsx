import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TagItem from './TagItem/TagItem';
import FilterSearchBar from '../FilterSeachBar/FilterSearchBar.jsx';
import styles from './TagPage.module.css';
import { api } from '../../_utils/api.js';

const TagPage = () => {
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('popular');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api().get('/tags/popular-tags');
        const filteredTags = response.data.filter((tag) => tag.latestQuestionDate !== null);
        setTags(filteredTags);
        setFilteredTags(filteredTags); // Initially show all filtered tags
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleFilter = (searchWord) => {
    const newFilter = tags.filter((tag) => {
      return tag.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredTags(newFilter);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    let sortedTags = [...filteredTags];
    if (criteria === 'name') {
      sortedTags.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'questionCount') {
      sortedTags.sort((a, b) => b.questionCount - a.questionCount);
    } else if (criteria === 'askedThisYear') {
      sortedTags.sort((a, b) => b.askedThisYear - a.askedThisYear);
    } else if (criteria === 'popular') {
      sortedTags.sort((a, b) => b.popularity - a.popularity);
    } else if (criteria === 'recent') {
      sortedTags.sort((a, b) => new Date(b.latestQuestionDate) - new Date(a.latestQuestionDate));
    }
    setFilteredTags(sortedTags);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.descriptionContainer}>
        <h1 className={styles.descriptionTitle}>Tags</h1>
        <p className={styles.descriptionText}>
          A tag is a keyword or label that categorizes your question with other, similar questions.
          <br />
          Using the right tags makes it easier for others to find and answer your question.
        </p>
      </div>
      <div className={styles.filterContainer}>
        <FilterSearchBar placeholder='Filter by tag name' data={tags} onFilter={handleFilter} />
        <div className={styles.sortOptionsContainer}>
          <div className={styles.sortOptions}>
            <button
              className={`${styles.sortButton} ${sortCriteria === 'popular' ? styles.active : ''}`}
              onClick={() => handleSortChange('popular')}
            >
              Popular
            </button>
            <button
              className={`${styles.sortButton} ${sortCriteria === 'name' ? styles.active : ''}`}
              onClick={() => handleSortChange('name')}
            >
              Name
            </button>
            <button
              className={`${styles.sortButton} ${sortCriteria === 'recent' ? styles.active : ''}`}
              onClick={() => handleSortChange('recent')}
            >
              Recent
            </button>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {Array.isArray(filteredTags) && filteredTags.map((tag, index) => <TagItem key={index} tag={tag} />)}
      </div>
      <Footer />
    </>
  );
};

export default TagPage;
