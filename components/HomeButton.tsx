'use client';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function HomeButton() {
  return (
    <IconButton aria-label="home" component={Link} color="primary" href="/">
      <HomeIcon />
    </IconButton>
  );
}
