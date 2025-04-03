import { useState, useEffect } from 'react';
import Head from 'next/head';
import { formatDistanceToNow, differenceInCalendarDays, eachWeekendOfInterval, isWeekend } from 'date-fns';
import { motion } from 'framer-motion';
import Link from "next/link";
import Confetti from 'react-confetti';

const countdownDate = new Date('2025-05-25T00:00:00');

export default function Home() {
  const [countdown, setCountdown] = useState('');
  const [weekendsLeft, setWeekendsLeft] = useState(0);
  const [schoolDaysLeft, setSchoolDaysLeft] = useState(0);
  const [confettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    const calculateData = () => {
      const now = new Date();
      const daysLeft = differenceInCalendarDays(countdownDate, now);
      setCountdown(formatDistanceToNow(countdownDate, { addSuffix: true }));

      // Count weekends (both Saturday & Sunday)
      const weekends = eachWeekendOfInterval({ start: now, end: countdownDate });
      setWeekendsLeft(weekends.length / 2);

      // Count school days (weekdays only)
      let schoolDays = 0;
      for (let i = 0; i <= daysLeft; i++) {
        const currentDate = new Date();
        currentDate.setDate(now.getDate() + i);
        if (!isWeekend(currentDate)) {
          schoolDays++;
        }
      }
      setSchoolDaysLeft(schoolDays);
    };

    calculateData();
    const interval = setInterval(calculateData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHover = () => {
    setConfettiVisible(true);
    setTimeout(() => setConfettiVisible(false), 3000);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>
      <div className="font-poppins w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradientBackground p-4">
        <Link href="https://dejny.eu" className="absolute top-4 left-4 text-white font-semibold">Dejny.eu</Link>
        {confettiVisible && <Confetti />} 
        
        <motion.h1 className="text-5xl font-bold text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          END OF THE SCHOOL
        </motion.h1>
        
        <motion.p className="text-2xl text-white mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          Time left: {countdown}
        </motion.p>

        <motion.div className="mt-8 text-center text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          <h2 className="text-3xl font-semibold">Stats</h2>
          <p className="mt-2 text-lg">Weekends left: {weekendsLeft}</p>
          <p className="mt-2 text-lg">School days left: <span className='underline cursor-pointer' onMouseEnter={handleHover}>{schoolDaysLeft}</span></p>
        </motion.div>
      </div>
    </>
  );
}
