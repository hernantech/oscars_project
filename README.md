# horatio
Horizon SF Hackathon Winning Project 🏆

This project aims to convert a speech into a memory palace using Python, FastAPI, PostgreSQL, DALL-E API, and LlamaIndex.

## Setup

1. Clone the repository:
```
git clone https://github.com/ohong/horatio.git
```

2. Navigate to the project directory:
```
cd horatio
```

3. Install dependencies:
```
poetry install
```

4. Set up the database:
   - Create a PostgreSQL database named `horatio`
   - Update the `DATABASE_URL` in the `.env` file with your credentials, eg `DATABASE_URL=postgresql://admin:password@localhost/horatio`

5. Set up OpenAI API key:
   - Add your OpenAI API key to the `OPENAI_API_KEY` variable in the `.env` file

6. Run the application:
```
poetry run python src/main.py
```

## Usage


## Contributing

[Add contributing guidelines here]

## License

[Add license information here]