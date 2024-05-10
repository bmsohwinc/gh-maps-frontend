import { PinDrop } from '@mui/icons-material';
import { Grid, IconButton, InputBase, Paper, Snackbar, Stack } from '@mui/material';
import { useRouter } from 'next/router'
import GitHubIcon from '@mui/icons-material/GitHub';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import styles from "./page.module.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TopBar from './TopBar';
import ListContent from './ListContent';



export default function Page() {
    const router = useRouter()
    const userListId = router.query.slug;
    return (
        <main 
            
            className={`${styles.main} ${inter.className}`}
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }} 

        >
            <TopBar userListId={userListId} />
            {
                userListId && (
                    <div style={{
                        height: '100%',
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 10,
                        margin: 'auto',
                    }}>
                        <ListContent userListId={userListId} />
                    </div>
                )
            }
        </main>
    );
}
