import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document{
    render() {
        return(
            <Html>
                <Head>
                    {/* "preconnect" significa que o next deve tentar se conectar com o google fonts o quanto antes */}
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    
                    {/* A aplicação é rodada dentro do Main  */}
                    <Main/>

                    {/* Scripts que o next precisa implementar */}
                    <NextScript/>
                </body>
            </Html>
        )
    }
}