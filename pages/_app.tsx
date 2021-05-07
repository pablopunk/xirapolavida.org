import React, { FunctionComponent } from 'react';

import 'tailwindcss/tailwind.css';
import 'components/styles.css';
import Layout from 'components/Layout';

const App: FunctionComponent<any> = ({ Component, pageProps }) => (
    <Layout>
        <Component {...pageProps} />
    </Layout>
);

export default App;

