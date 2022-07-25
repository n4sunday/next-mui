import type { NextPage } from 'next'
import { Button, Container } from '@mui/material'

const Home: NextPage = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Next MUI
    </Container>
  )
}

export default Home
