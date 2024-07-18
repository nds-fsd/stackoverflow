<p align="center">
  <img src="frontend/public/assets/img/logo.png" width="100" />
</p>
<p align="center">
    <h1 align="center">DEVVIT, A STACKOVERFLOW CLONE</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/nds-fsd/stackoverflow?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/nds-fsd/stackoverflow?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/nds-fsd/stackoverflow?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below:</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=flat&logo=Bootstrap&logoColor=white" alt="Bootstrap">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<br>
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
	<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running stackoverflow](#-running-stackoverflow)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview


---

##  Features


---

##  Repository Structure

```sh
└── stackoverflow/
    ├── .github
    │   └── workflows
    │       └── prod-deployment.yaml
    ├── README.md
    ├── backend
    │   ├── .gitignore
    │   ├── Dockerfile
    │   ├── package.json
    │   └── src
    │       ├── controllers
    │       │   ├── authenticator.js
    │       │   ├── comments.js
    │       │   ├── like.js
    │       │   ├── questions.js
    │       │   ├── tags.js
    │       │   └── users.js
    │       ├── email-templates
    │       │   ├── commentemail.hbs
    │       │   └── welcome.hbs
    │       ├── index.js
    │       ├── middlewares
    │       │   ├── comments.js
    │       │   ├── questions.js
    │       │   └── users.js
    │       ├── mongo
    │       │   ├── connection
    │       │   │   └── index.js
    │       │   └── data
    │       │       └── schemas
    │       ├── routers
    │       │   ├── authenticator.js
    │       │   ├── comments.js
    │       │   ├── like.js
    │       │   ├── questions.js
    │       │   ├── tags.js
    │       │   └── users.js
    │       └── service
    │           └── email.service.js
    ├── docker-compose.yaml
    ├── emails
    │   ├── emails
    │   │   ├── commentemail.jsx
    │   │   └── welcome.jsx
    │   ├── package.json
    │   └── readme.md
    ├── frontend
    │   ├── .gitignore
    │   ├── index.html
    │   ├── package.json
    │   ├── public
    │   │   ├── _redirects
    │   │   └── assets
    │   │       ├── icons
    │   │       │   ├── close_7e3aed.svg
    │   │       │   ├── close_white.svg
    │   │       │   ├── membership.svg
    │   │       │   ├── reputation.svg
    │   │       │   └── search.svg
    │   │       └── img
    │   │           ├── hero1.png
    │   │           ├── hero2.png
    │   │           ├── hero3.png
    │   │           ├── hero4.png
    │   │           └── logo.png
    │   ├── src
    │   │   ├── App.jsx
    │   │   ├── _utils
    │   │   │   ├── api.js
    │   │   │   └── localStorage.utils.js
    │   │   ├── components
    │   │   │   ├── AuthModal
    │   │   │   │   ├── AuthModal.jsx
    │   │   │   │   └── AuthModal.module.css
    │   │   │   ├── FeaturesSection
    │   │   │   │   ├── FeaturesSection.jsx
    │   │   │   │   └── FeaturesSection.module.css
    │   │   │   ├── FilterSeachBar
    │   │   │   │   ├── FilterSearchBar.jsx
    │   │   │   │   └── FilterSearchBar.module.css
    │   │   │   ├── Footer
    │   │   │   │   ├── Footer.jsx
    │   │   │   │   └── Footer.module.css
    │   │   │   ├── Header
    │   │   │   │   ├── Header.jsx
    │   │   │   │   └── Header.module.css
    │   │   │   ├── HeroSection
    │   │   │   │   ├── HeroSection.jsx
    │   │   │   │   └── HeroSection.module.css
    │   │   │   ├── HomePage
    │   │   │   │   └── HomePage.jsx
    │   │   │   ├── InsideQuestionPage
    │   │   │   │   ├── InsideQuestionPage.jsx
    │   │   │   │   ├── InsideQuestionPage.module.css
    │   │   │   │   ├── deleteIcon.png
    │   │   │   │   ├── heart.png
    │   │   │   │   ├── photographer.png
    │   │   │   │   └── profilePic.png
    │   │   │   ├── QuestionForm
    │   │   │   │   ├── QuestionForm.jsx
    │   │   │   │   └── QuestionForm.module.css
    │   │   │   ├── QuestionPage
    │   │   │   │   ├── QuestionPage.jsx
    │   │   │   │   ├── QuestionPage.module.css
    │   │   │   │   ├── deleteIcon.png
    │   │   │   │   ├── heart.png
    │   │   │   │   └── profilePic.png
    │   │   │   ├── TagPage
    │   │   │   │   ├── TagItem
    │   │   │   │   ├── TagPage.jsx
    │   │   │   │   └── TagPage.module.css
    │   │   │   ├── UserPage
    │   │   │   │   ├── UserItem
    │   │   │   │   ├── UserPage.jsx
    │   │   │   │   └── UserPage.module.css
    │   │   │   └── UserProfilePage
    │   │   │       ├── UserProfilePage.jsx
    │   │   │       └── UserProfilePage.module.css
    │   │   ├── index.css
    │   │   └── main.jsx
    │   └── vite.config.js
    ├── package-lock.json
    ├── package.json
    └── turbo.json
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                            | Summary                                         |
| ---                                                                                             | ---                                             |
| [turbo.json](https://github.com/nds-fsd/stackoverflow/blob/master/turbo.json)                   |  `turbo.json`          |
| [package.json](https://github.com/nds-fsd/stackoverflow/blob/master/package.json)               |  `package.json`        |
| [docker-compose.yaml](https://github.com/nds-fsd/stackoverflow/blob/master/docker-compose.yaml) |  `docker-compose.yaml` |
| [package-lock.json](https://github.com/nds-fsd/stackoverflow/blob/master/package-lock.json)     |  `package-lock.json`   |

</details>

<details closed><summary>backend</summary>

| File                                                                                      | Summary                                          |
| ---                                                                                       | ---                                              |
| [Dockerfile](https://github.com/nds-fsd/stackoverflow/blob/master/backend/Dockerfile)     |  `backend/Dockerfile`   |
| [package.json](https://github.com/nds-fsd/stackoverflow/blob/master/backend/package.json) | `backend/package.json` |

</details>

<details closed><summary>backend.src</summary>

| File                                                                                  | Summary                                          |
| ---                                                                                   | ---                                              |
| [index.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/index.js) | `backend/src/index.js` |

</details>

<details closed><summary>backend.src.email-templates</summary>

| File                                                                                                                  | Summary                                                                  |
| ---                                                                                                                   | ---                                                                      |
| [commentemail.hbs](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/email-templates/commentemail.hbs) | `backend/src/email-templates/commentemail.hbs` |
| [welcome.hbs](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/email-templates/welcome.hbs)           | `backend/src/email-templates/welcome.hbs`      |

</details>

<details closed><summary>backend.src.mongo.connection</summary>

| File                                                                                                   | Summary                                                           |
| ---                                                                                                    | ---                                                               |
| [index.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/mongo/connection/index.js) | `backend/src/mongo/connection/index.js` |

</details>

<details closed><summary>backend.src.service</summary>

| File                                                                                                          | Summary                                                          |
| ---                                                                                                           | ---                                                              |
| [email.service.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/service/email.service.js) | `backend/src/service/email.service.js` |

</details>

<details closed><summary>backend.src.controllers</summary>

| File                                                                                                              | Summary                                                              |
| ---                                                                                                               | ---                                                                  |
| [comments.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/controllers/comments.js)           |   `backend/src/controllers/comments.js`      |
| [tags.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/controllers/tags.js)                   |   `backend/src/controllers/tags.js`          |
| [authenticator.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/controllers/authenticator.js) |   `backend/src/controllers/authenticator.js` |
| [users.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/controllers/users.js)                 |   `backend/src/controllers/users.js`         |
| [like.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/controllers/like.js)                   |   `backend/src/controllers/like.js`          |
| [questions.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/controllers/questions.js)         |   `backend/src/controllers/questions.js`     |

</details>

<details closed><summary>backend.src.middlewares</summary>

| File                                                                                                      | Summary                                                          |
| ---                                                                                                       | ---                                                              |
| [comments.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/middlewares/comments.js)   |   `backend/src/middlewares/comments.js`  |
| [users.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/middlewares/users.js)         |   `backend/src/middlewares/users.js`     |
| [questions.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/middlewares/questions.js) |   `backend/src/middlewares/questions.js` |

</details>

<details closed><summary>backend.src.routers</summary>

| File                                                                                                          | Summary                                                          |
| ---                                                                                                           | ---                                                              |
| [comments.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/routers/comments.js)           |   `backend/src/routers/comments.js`      |
| [tags.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/routers/tags.js)                   |   `backend/src/routers/tags.js`          |
| [authenticator.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/routers/authenticator.js) |   `backend/src/routers/authenticator.js` |
| [users.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/routers/users.js)                 |   `backend/src/routers/users.js`         |
| [like.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/routers/like.js)                   |   `backend/src/routers/like.js`          |
| [questions.js](https://github.com/nds-fsd/stackoverflow/blob/master/backend/src/routers/questions.js)         |   `backend/src/routers/questions.js`     |

</details>

<details closed><summary>frontend</summary>

| File                                                                                           | Summary                                             |
| ---                                                                                            | ---                                                 |
| [index.html](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/index.html)         |   `frontend/index.html`     |
| [vite.config.js](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/vite.config.js) |   `frontend/vite.config.js` |
| [package.json](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/package.json)     |   `frontend/package.json`   |

</details>

<details closed><summary>frontend.public</summary>

| File                                                                                          | Summary                                                |
| ---                                                                                           | ---                                                    |
| [_redirects](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/public/_redirects) |   `frontend/public/_redirects` |

</details>

<details closed><summary>frontend.src</summary>

| File                                                                                     | Summary                                            |
| ---                                                                                      | ---                                                |
| [App.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/App.jsx)     |   `frontend/src/App.jsx`   |
| [index.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/index.css) |   `frontend/src/index.css` |
| [main.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/main.jsx)   |   `frontend/src/main.jsx`  |

</details>

<details closed><summary>frontend.src.components.FilterSeachBar</summary>

| File                                                                                                                                                 | Summary                                                                                       |
| ---                                                                                                                                                  | ---                                                                                           |
| [FilterSearchBar.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/FilterSeachBar/FilterSearchBar.module.css) |   `frontend/src/components/FilterSeachBar/FilterSearchBar.module.css` |
| [FilterSearchBar.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/FilterSeachBar/FilterSearchBar.jsx)               |   `frontend/src/components/FilterSeachBar/FilterSearchBar.jsx`        |

</details>

<details closed><summary>frontend.src.components.HomePage</summary>

| File                                                                                                               | Summary                                                                   |
| ---                                                                                                                | ---                                                                       |
| [HomePage.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/HomePage/HomePage.jsx) |   `frontend/src/components/HomePage/HomePage.jsx` |

</details>

<details closed><summary>frontend.src.components.AuthModal</summary>

| File                                                                                                                                | Summary                                                                            |
| ---                                                                                                                                 | ---                                                                                |
| [AuthModal.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/AuthModal/AuthModal.jsx)               |   `frontend/src/components/AuthModal/AuthModal.jsx`        |
| [AuthModal.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/AuthModal/AuthModal.module.css) |   `frontend/src/components/AuthModal/AuthModal.module.css` |

</details>

<details closed><summary>frontend.src.components.HeroSection</summary>

| File                                                                                                                                      | Summary                                                                                |
| ---                                                                                                                                       | ---                                                                                    |
| [HeroSection.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/HeroSection/HeroSection.jsx)               |   `frontend/src/components/HeroSection/HeroSection.jsx`        |
| [HeroSection.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/HeroSection/HeroSection.module.css) |   `frontend/src/components/HeroSection/HeroSection.module.css` |

</details>

<details closed><summary>frontend.src.components.InsideQuestionPage</summary>

| File                                                                                                                                                           | Summary                                                                                              |
| ---                                                                                                                                                            | ---                                                                                                  |
| [InsideQuestionPage.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/InsideQuestionPage/InsideQuestionPage.module.css) |   `frontend/src/components/InsideQuestionPage/InsideQuestionPage.module.css` |
| [InsideQuestionPage.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/InsideQuestionPage/InsideQuestionPage.jsx)               |   `frontend/src/components/InsideQuestionPage/InsideQuestionPage.jsx`        |

</details>

<details closed><summary>frontend.src.components.Header</summary>

| File                                                                                                                       | Summary                                                                      |
| ---                                                                                                                        | ---                                                                          |
| [Header.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/Header/Header.module.css) |   `frontend/src/components/Header/Header.module.css` |
| [Header.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/Header/Header.jsx)               |   `frontend/src/components/Header/Header.jsx`        |

</details>

<details closed><summary>frontend.src.components.UserPage</summary>

| File                                                                                                                             | Summary                                                                          |
| ---                                                                                                                              | ---                                                                              |
| [UserPage.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/UserPage/UserPage.jsx)               |   `frontend/src/components/UserPage/UserPage.jsx`        |
| [UserPage.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/UserPage/UserPage.module.css) |   `frontend/src/components/UserPage/UserPage.module.css` |

</details>

<details closed><summary>frontend.src.components.UserPage.UserItem</summary>

| File                                                                                                                                      | Summary                                                                                   |
| ---                                                                                                                                       | ---                                                                                       |
| [UserItem.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/UserPage/UserItem/UserItem.jsx)               |   `frontend/src/components/UserPage/UserItem/UserItem.jsx`        |
| [UserItem.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/UserPage/UserItem/UserItem.module.css) |   `frontend/src/components/UserPage/UserItem/UserItem.module.css` |

</details>

<details closed><summary>frontend.src.components.FeaturesSection</summary>

| File                                                                                                                                                  | Summary                                                                                        |
| ---                                                                                                                                                   | ---                                                                                            |
| [FeaturesSection.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/FeaturesSection/FeaturesSection.module.css) |   `frontend/src/components/FeaturesSection/FeaturesSection.module.css` |
| [FeaturesSection.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/FeaturesSection/FeaturesSection.jsx)               |   `frontend/src/components/FeaturesSection/FeaturesSection.jsx`        |

</details>

<details closed><summary>frontend.src.components.UserProfilePage</summary>

| File                                                                                                                                                  | Summary                                                                                        |
| ---                                                                                                                                                   | ---                                                                                            |
| [UserProfilePage.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/UserProfilePage/UserProfilePage.module.css) |   `frontend/src/components/UserProfilePage/UserProfilePage.module.css` |
| [UserProfilePage.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/UserProfilePage/UserProfilePage.jsx)               |   `frontend/src/components/UserProfilePage/UserProfilePage.jsx`        |

</details>

<details closed><summary>frontend.src.components.QuestionForm</summary>

| File                                                                                                                                         | Summary                                                                                  |
| ---                                                                                                                                          | ---                                                                                      |
| [QuestionForm.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/QuestionForm/QuestionForm.module.css) |   `frontend/src/components/QuestionForm/QuestionForm.module.css` |
| [QuestionForm.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/QuestionForm/QuestionForm.jsx)               |   `frontend/src/components/QuestionForm/QuestionForm.jsx`        |

</details>

<details closed><summary>frontend.src.components.TagPage</summary>

| File                                                                                                                          | Summary                                                                        |
| ---                                                                                                                           | ---                                                                            |
| [TagPage.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/TagPage/TagPage.jsx)               |   `frontend/src/components/TagPage/TagPage.jsx`        |
| [TagPage.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/TagPage/TagPage.module.css) |   `frontend/src/components/TagPage/TagPage.module.css` |

</details>

<details closed><summary>frontend.src.components.TagPage.TagItem</summary>

| File                                                                                                                                  | Summary                                                                                |
| ---                                                                                                                                   | ---                                                                                    |
| [TagItem.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/TagPage/TagItem/TagItem.jsx)               |   `frontend/src/components/TagPage/TagItem/TagItem.jsx`        |
| [TagItem.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/TagPage/TagItem/TagItem.module.css) |   `frontend/src/components/TagPage/TagItem/TagItem.module.css` |

</details>

<details closed><summary>frontend.src.components.QuestionPage</summary>

| File                                                                                                                                         | Summary                                                                                  |
| ---                                                                                                                                          | ---                                                                                      |
| [QuestionPage.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/QuestionPage/QuestionPage.module.css) |   `frontend/src/components/QuestionPage/QuestionPage.module.css` |
| [QuestionPage.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/QuestionPage/QuestionPage.jsx)               |   `frontend/src/components/QuestionPage/QuestionPage.jsx`        |

</details>

<details closed><summary>frontend.src.components.Footer</summary>

| File                                                                                                                       | Summary                                                                      |
| ---                                                                                                                        | ---                                                                          |
| [Footer.module.css](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/Footer/Footer.module.css) |   `frontend/src/components/Footer/Footer.module.css` |
| [Footer.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/components/Footer/Footer.jsx)               |   `frontend/src/components/Footer/Footer.jsx`        |

</details>

<details closed><summary>frontend.src._utils</summary>

| File                                                                                                                    | Summary                                                               |
| ---                                                                                                                     | ---                                                                   |
| [api.js](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/_utils/api.js)                               |   `frontend/src/_utils/api.js`                |
| [localStorage.utils.js](https://github.com/nds-fsd/stackoverflow/blob/master/frontend/src/_utils/localStorage.utils.js) |   `frontend/src/_utils/localStorage.utils.js` |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                                | Summary                                                            |
| ---                                                                                                                 | ---                                                                |
| [prod-deployment.yaml](https://github.com/nds-fsd/stackoverflow/blob/master/.github/workflows/prod-deployment.yaml) | `.github/workflows/prod-deployment.yaml` |

</details>

<details closed><summary>emails.emails</summary>

| File                                                                                                    | Summary                                                    |
| ---                                                                                                     | ---                                                        |
| [commentemail.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/emails/emails/commentemail.jsx) | `emails/emails/commentemail.jsx` |
| [welcome.jsx](https://github.com/nds-fsd/stackoverflow/blob/master/emails/emails/welcome.jsx)           | `emails/emails/welcome.jsx`      |

</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **JavaScript**: `version x.y.z`

###  Installation

1. Clone the stackoverflow repository:

```sh
git clone https://github.com/nds-fsd/stackoverflow
```

2. Change to the project directory:

```sh
cd stackoverflow
```

3. Install the dependencies:

```sh
npm install
```

###  Running stackoverflow

Use the following command to run stackoverflow:

```sh
node app.js
```

###  Tests

To execute tests, run:

```sh
npm test
```

---

##  Project Roadmap

- [X] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...`

---

## Contributors

- [Alex Bessedonato](https://github.com/alexbessedonato)
- [Viktoria Kovacs](https://github.com/kovvik23)
- [Noah Rebollar](https://github.com/NoahRebollar)
- [Sofia Simeonoff](https://github.com/SofiaSimeonoff)

---


##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/nds-fsd/stackoverflow/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/nds-fsd/stackoverflow/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/nds-fsd/stackoverflow/issues)**: Submit bugs found or log feature requests for Stackoverflow.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/nds-fsd/stackoverflow
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
