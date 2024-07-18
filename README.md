# Merge AI - Insights
tool focused on generating insights for a gitlab user using the data of merge request and comments of a given user.
it leverages the poser of vertex AI particularly gemening-1.5-flash-001 model for dong the analysis of the user.

I made this project as the part of my 2 months summer internship at Sprinklr.

## Environment setup
- make a clone to the project.
- inside server folder create a .env file
```python
  GITLAB_ACCESS_TOKEN="Place your gitlab token here with read acess"
  BLOB_READ_WRITE_TOKEN="Read/Write token for vercel blob here"
  # Place your postgress information here. form vercel
  POSTGRES_URL="********"
  POSTGRES_PRISMA_URL="********"
  POSTGRES_URL_NO_SSL="********"
  POSTGRES_URL_NON_POOLING="********"
  POSTGRES_USER="********"
  POSTGRES_HOST="********"
  POSTGRES_PASSWORD="********"
  POSTGRES_DATABASE="********"
```
- inside your client folder make file .env.local and put following in it
```python
  BLOB_READ_WRITE_TOKEN="Read/Write token for vercel blob here"
  # Place your postgress information here. form vercel
  POSTGRES_URL="********"
  POSTGRES_PRISMA_URL="********"
  POSTGRES_URL_NO_SSL="********"
  POSTGRES_URL_NON_POOLING="********"
  POSTGRES_USER="********"
  POSTGRES_HOST="********"
  POSTGRES_PASSWORD="********"
  POSTGRES_DATABASE="********"
```
- authenticate the server project your using gcloud cli. see: [Authenticate for using the gcloud CLI | Authentication | Google Cloud](https://cloud.google.com/docs/authentication/gcloud#gcloud-credentials)
- for both serve and client install the required packages by running command  ``` npm i ``` in respective folders.

**Final Presentation:** [click here](https://docs.google.com/presentation/d/1P3pmx69XOV7E8pybV9YARDVxaK8y0_7A/edit?usp=sharing&ouid=109264835369932589961&rtpof=true&sd=true)

