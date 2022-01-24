import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const toastVerfiy=()=>{
    toast.success('This is a success message!')
  }
  const toastError=()=>{
    toast.error('This is a error message!')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Fitcart Admin
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Stack direction="row" spacing={2}>
            <Button color="secondary" onClick={toastVerfiy}>Secondary</Button>
            <Button variant="contained" color="success" onClick={toastVerfiy}>
              Success
            </Button>
            <Button variant="outlined" color="error" onClick={toastError}>
              Error
            </Button>
          </Stack>
          <ToastContainer />
        </div>
      </main>

      
    </div>
  )
}
