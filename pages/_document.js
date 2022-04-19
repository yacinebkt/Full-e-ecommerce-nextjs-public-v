import React from 'react'
import Document from 'next/document'
import {Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='stylesheet'
                     href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                     />
                     
                     {/* <script type="text/javascript" src="node_modules/default-passive-events/dist/index.js"></script> */}
                {/* <script type="text/javascript" src="https://unpkg.com/default-passive-events"></script> */}
              
                <link rel="icon" href="/logo.png"  />

                </Head>

                <body>
                    
          {/* Icons iconscout */}
          <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />

                    <Main />
                    <NextScript />
                    
                </body>
                
            </Html>
        )
    }

}

// get initial props /defining
// to fixed material ui styles sheet

MyDocument.getInitialProps = async(ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRendrePage = ctx.renderPage
    ctx.renderPage = () =>{
        return  originalRendrePage({
            enhanceApp: (App) =>(props) => sheets.collect(<App {...props} />)
        })
    }
    const initialProps = await Document.getInitialProps(ctx);
    return{
        ...initialProps,
        styles : [
            ...React.Children.toArray(initialProps.styles), sheets.getStyleElement(),
        ]
    }
}