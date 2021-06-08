# Mock server

Decidi disponibilizar o código que roda na insfraestrutura do infraestrutura do [Cake Server](https://cake-server.vercel.app/) referente ao projeto Podcaster, para fortalecer a proposta educativa.

> **Importante!**
> Essa sessão é apenas um exemplo do código que, efetivamente, roda no servidor de simulação, servindo apenas para teor de consulta e/ou curiosidade;

## Tecnologia

O Cake Server é uma infraestrutura baseada em núvem, **não pública** de uso majoritariamente pessoal. Seguindo uma lógica de auto gerenciamento, o serviço é ospedada pela [Vercel](https://vercel.com/) e seu código é escrito em TypeScript (portanto js) e aproveita-se do maravilhoso sistema de rotas de API do NextJS.

> O Cake Server é o responsável por prover os mocks desta aplicação

## Pq um servidor externo é necessário?

Quando usamos a API de rotas de uma aplicação NextJS, ela é iniciada juntamente com o aplicativo. Assim, no geração estática de artigos dinâmicos, quando o NextJS tenta acessar os dados (fonte dinâmica) para monstar as páginas estáticas, a API que fornece tais dados ainda está sendo iniciada, causando erros de execução.

Dessa forma, um servidor isolado é necessário para o caso específico do getStaticPaths. Para demais usos, como o fetch, o sistemas de rotas de API do NextJS dentro da aplicação basta e é extremamente eficiente.
