# Mock server

Decidi disponibilizar o código da simulação de API do projeto podecaster que roda na insfraestrutura do [Cake Server](https://cake-server.vercel.app/), para fortalecer a proposta educativa.

> **Importante!**
> Essa sessão é apenas um exemplo do código que, efetivamente, roda no servidor de simulação. Assim, sua utilização é serve apenas para teor de consulta e/ou curiosidade;

<br/>

## Tecnologia

O Cake Server é uma infraestrutura baseada em núvem, **não pública** de uso majoritariamente pessoal. Seguindo uma lógica de auto gerenciamento, o serviço é hospedada pela [Vercel](https://vercel.com/) e seu código é escrito em TypeScript (portanto js) e aproveita o maravilhoso sistema de rotas de API do NextJS.

> O Cake Server é o responsável por prover os mocks desta aplicação.

<br/>

## Pq um servidor externo é necessário?

Quando usamos a API de rotas de uma aplicação NextJS, ela é iniciada juntamente com o aplicativo. Assim, no geração estática de artigos dinâmicos, quando o NextJS tenta acessar os dados (fonte dinâmica) para monstar as páginas estáticas, a API que fornece tais dados ainda está sendo iniciada, causando erros de execução.

Dessa forma, um servidor isolado é necessário para o caso específico do getStaticPaths. Para demais usos, como o fetch, o sistemas de rotas de API do NextJS dentro da aplicação basta e é extremamente eficiente.
