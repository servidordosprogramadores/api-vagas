# Jobs API

An unofficial public API that fetches and aggregates the latest job postings from [Meu Padrinho](https://meupadrinho.com.br).

## Routes

| Method | Route      | Description                          |
|--------|------------|--------------------------------------|
| GET    | `/`        | Lists all available routes           |
| GET    | `/estagio` | Returns the latest internship job    |
| GET    | `/junior`  | Returns the latest junior-level job  |
| GET    | `/pleno`   | Returns the latest mid-level job     |
| GET    | `/senior`  | Returns the latest senior-level job  |