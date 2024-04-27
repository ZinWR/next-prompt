import { FC, ReactNode } from 'react';
import '../styles/globals.css';

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
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  );
};

export default RootLayout;