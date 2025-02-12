"use client"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SendIcon from '@mui/icons-material/Send';



export default function Home() {
  return (
      <Container>
        <Typography
          variant='h6'
          component={'h2'}
          color='#616161'
        >
          Create New Note
        </Typography>
        <Button
          type='submit'
          color='secondary'
          variant='contained'
          size='large'
          startIcon={<SendIcon />}
          endIcon={<KeyboardArrowRightIcon />}
          onClick={() => alert("cliked")}
        >
          Submit
        </Button>

      </Container>
  );
}
