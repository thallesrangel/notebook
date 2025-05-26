# Notebook (caderno) para Aprender Inglês com Feedback de IA

Este sistema é uma ferramenta simples e eficaz para ajudar no aprendizado de inglês. Ele permite que o usuário digite textos, receba feedback imediato e construtivo de uma inteligência artificial personalizada, além de acompanhar seu progresso ao longo do tempo.

## Por que usar este software?

- Receba feedback instantâneo e detalhado para melhorar sua escrita em inglês.
- Experiência de aprendizado com uma IA que oferece feedback construtivo e personalizado.
- Acompanhe seu progresso e evolução no inglês de forma clara e organizada.
- Sistema simples, focado na usabilidade e aprendizado contínuo.

## Tecnologias utilizadas

- PHP 8.3.21  
- Laravel 10  
- MySQL 8  

## Como Rodar

Para rodar o projeto, siga os passos abaixo:

1. Clone o repositório e entre na pasta do projeto.  
2. Instale as dependências PHP e JavaScript.  
3. Compile os assets front-end.  
4. Configure o arquivo `.env`, especialmente a chave `CHATGPT_KEY` que você deve obter em https://platform.openai.com/api-keys  
5. Gere a chave da aplicação Laravel.  
6. Rode as migrations para criar o banco de dados.  
7. Inicie o servidor local do Laravel.  
8. Acesse no navegador.

Execute os comandos abaixo no terminal:

```bash
git clone <url-do-repositorio> && cd <nome-da-pasta>
composer install
npm install
npm run dev
cp .env.example .env
# Edite o arquivo .env e configure DB_* e CHATGPT_KEY
php artisan key:generate
php artisan migrate
php artisan serve
```

Após isso, acesse:  
`http://localhost:8000`

## Considerações

Você pode alterar o modelo e prompt no arquivo `NotebookController.php`, na linha 70, dentro do método `checkText()`.


## Bater um papo
`https://www.linkedin.com/in/rangelthr/`


## NEWS - "Duolingo CEO says AI is a better teacher than humans—but schools will still exist ‘because you still need childcare’"
https://fortune.com/2025/05/20/duolingo-ai-teacher-schools-childcare/