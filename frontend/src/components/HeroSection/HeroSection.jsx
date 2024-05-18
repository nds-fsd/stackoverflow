import React from 'react';
import styles from './HeroSection.module.css';

const InfoBox = ({ children }) => {
  return <div className={styles['info-box']}>{children}</div>;
};

const ListItem = ({ children }) => {
  return <li>{children}</li>;
};

const ImageBox = ({ src, alt, title, description, buttonLabel }) => {
  return (
    <div className={styles.box}>
      <img src={src} alt={alt} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>{buttonLabel}</button>
    </div>
  );
};

function HeroSection() {
  return (
    <section className={styles['hero-section']}>
      <div className={styles['hero-content']}>
        <h2>Every developer keeps a tab open for Stack Overflow</h2>

        <InfoBox className={styles['info-box']}>
          <p>Discover the optimal solution to your technical query while lending a hand to others with theirs.</p>
        </InfoBox>
        <InfoBox className={styles['info-box']}>
          <p>Seeking a secure and confidential environment for your technical expertise?</p>
        </InfoBox>

        <ul className={styles['tag-list']}>
          <ListItem>
            {' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-people-fill'
              viewBox='0 0 16 16'
            >
              <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5' />
            </svg>{' '}
            100+ millions visitors every day
          </ListItem>
          <ListItem>
            {' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-graph-up-arrow'
              viewBox='0 0 16 16'
            >
              <path
                fill-rule='evenodd'
                d='M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5'
              />
            </svg>{' '}
            45+ billion users assisted since 2024
          </ListItem>
          <ListItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-inboxes-fill'
              viewBox='0 0 16 16'
            >
              <path d='M4.98 1a.5.5 0 0 0-.39.188L1.54 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h4.46l-3.05-3.812A.5.5 0 0 0 11.02 1zM3.81.563A1.5 1.5 0 0 1 4.98 0h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .106-.374zM.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393z' />
            </svg>{' '}
            91% ROI for Devvit users
          </ListItem>
          <ListItem>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              class='bi bi-patch-question'
              viewBox='0 0 16 16'
            >
              <path d='M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745' />
              <path d='m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z' />
              <path d='M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0' />
            </svg>{' '}
            5000+ questions every day
          </ListItem>
        </ul>

        <ImageBox
          className={styles['box']}
          src='https://cdn.sstatic.net/Img/home/illo-public.svg?v=14bd5a506009'
          alt=''
          title='A public platform building the definitive collection of coding questions & answers'
          description='A community-based space to find and contribute answers to technical challenges, and one of the most popular websites in the world.'
          buttonLabel='Join the community'
        />
        <ImageBox
          className={styles['box']}
          src='https://cdn.sstatic.net/Img/home/illo-teams.svg?v=7e543f14fcc0'
          alt=''
          title='A private collaboration & knowledge sharing SaaS platform for companies'
          description='A web-based platform to increase productivity, decrease cycle times, accelerate time to market, and protect institutional knowledge.'
          buttonLabel='Get started'
        />
      </div>
    </section>
  );
}

export default HeroSection;
