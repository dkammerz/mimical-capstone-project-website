Mimical Readme File

## Mimical | Emotions and facial expressions in everyday life | (Mimical for short)

- Aim: Development of an everyday self-exercise program for people with facial paresis (facial paralysis), which affected persons can use as additional training parallel to regular speech therapy.

## Motivation

- In Germany annually "200,000 first-time (...) and approx. 70,000 repeated strokes "1 How many of them also suffer from facial paresis is not recorded [see Swiss Neuropaediatric Stroke Registry (2000-2009): almost 60% had some form of facial paresis].
- in many places there is no sufficient offer of speech therapy treatment available
- self-training is an important part of the recovery process
- outpatient speech therapy is not sufficient for intensive therapy

## Report

- Our team held daily meetings throughout the entire sprint to ensure that everyone was on the same page. Additionally, we held weekly remote meetings with our partners (from Gateway/Humanwissenschaftliche Fakultät) to exchange ideas/discuss our results and an in-person meeting at the beginning of the sprint.

# Sprint Log

## Website

- How to start the website:

  - Once in the repository, install the necessary dependencies using the "npm install" command
  - After the dependencies are installed use “npm run dev” to start the application
  - Add the ".process.env" to the repository (https://drive.google.com/file/d/11x0xJ-RxX5Fm3aoCA5qGasrH-VZsZQhJ/view?usp=share_link)
  - It is important to make sure that the file is named ".process.env", because the file will be renamed to "process.env" after the download!

- 2023-01-20 -- 1.0.0

  - the repository for the website can be found here: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-08/mimical-website
  - the website design has now been adapted to the design of the app
  - ChartJS was implemented and fully functional on the last 365 days seen
  - comment function was introduced (adding and deleting comments)

- 2023-01-13 -- 0.0.4

  - the repository for the website can be found here: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-08/mimical-website
  - therapists are able to add patients if a key is provided by the patient
  - therapists can edit data when adding a patient
  - therapists can edit data after they added a patient
  - charts are now implemented on the webiste
  - design changes

- 2022-12-16 -- 0.0.3

  - the repository for the website can be found here: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-08/mimical-website
  - therapists are able to login
  - middleware for protected routing is implemented
  - added database to the project
  - patients are displayed exclusively to the associated therapist
  - patient add dummy
  - new express fetches and calls

- 2022-12-02 -- 0.0.2

  - the repository for the website can be found here: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-08/mimical-website
  - new design
  - created patient creation page
  - therapist is able to create new patients
  - created dynamic patient cards
  - created mysql database
  - added connection to mysql database (right now still local)
  - added express as backend
  - added new login page

- 2022-11-18 -- 0.0.1

  - created project with NextJS
  - the repository for the website can be found here: https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-08/mimical-website
  - created login page with possibility to save entered values
  - created patients page with a search bar for entries which are contained inside a JSON file
  - created add patients page (which can be entered through the corresponding button located in the patients page) with the possibility to save entered values for future backend
  - created navbar with desktop and mobile view for responsiveness
  - created footer with links to facebook, instagram and linkedin
  - added a temporary CSS Layout
  - created homepage and settings page (empty)

## Database

- How to add the database to the project:

  - Currently there are two backends (both expressJS) for testing purposes.
  - On the WEBSITE, the backend is started automatically when "npm run dev" is executed.
  - On the APP, on the other hand, it is important that two processes are started. Once for the app ("npm start") and once for the server ("npm run backend").

1. Add the ".process.env" to the repository (https://drive.google.com/file/d/11x0xJ-RxX5Fm3aoCA5qGasrH-VZsZQhJ/view?usp=share_link)
2. Launching the app/website in the normal way

- 2023-01-20 -- 1.0.0

  - the database now stores all the progress of users

- 2023-01-13 -- 0.0.4


- 2022-12-16 -- 0.0.3

  - added the design of the databse
  - added tables to the database
  - added patients and therapists to the database
