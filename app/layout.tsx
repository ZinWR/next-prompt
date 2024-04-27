import { FC, ReactNode } from 'react';
import '../styles/globals.css';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';

interface layoutProps {
    children: ReactNode; // Define children as ReactNode
};
export const metadata: { title: string; description: string; } = {
    title: "Next-Prompt",
    description: 'Discover & Share AI Prompts'
}

const RootLayout: FC<layoutProps> = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  );
};

export default RootLayout;