import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TagItem from './TagItem/TagItem';
import FilterSearchBar from '../FilterSeachBar/FilterSearchBar';
import styles from './TagPage.module.css';

const TagPage = () => {
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = api().get()('/tags');
        setTags(response.data);
        setFilteredTags(response.data); // Initially show all tags
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
      <FilterSearchBar placeholder='Filter by tag name' data={tags} onFilter={handleFilter} />
      <div className={styles.container}>
        {filteredTags.map((tag, index) => (
          <TagItem key={index} tag={tag} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TagPage;
