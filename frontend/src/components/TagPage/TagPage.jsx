import React, { useEffect, useState } from 'react';
import { api } from '../../_utils/api';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TagItem from './TagItem/TagItem';
import TagFilterSearchBar from './TagFilterSeachBar/TagFilterSearchBar';
import styles from './TagPage.module.css';

const TagPage = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        console.log(api);
        const response = await api().get('/tags');

        setTags(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

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
      <TagFilterSearchBar placeholder='Filter by tag name' />
      <div className={styles.container}>
        {tags.map((tag, index) => (
          <TagItem key={index} tag={tag} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TagPage;
