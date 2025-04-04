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
    setTimeout(() => setConfettiVisible(false), 2500);
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>
      <div className="font-poppins w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 animate-gradientBackground p-6 text-white">
        <Link href="https://dejny.eu" className="absolute top-4 left-4 text-white font-semibold hover:underline">Dejny.eu</Link>
        {confettiVisible && <Confetti gravity={0.3} numberOfPieces={300} />} 
        
        <motion.h1 
          className="text-6xl font-extrabold drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}>
          🎉 END OF SCHOOL 🎉
        </motion.h1>
        
        <motion.p 
          className="text-3xl mt-4 font-light"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}>
          Time left: <span className="font-semibold">{countdown}</span>
        </motion.p>

        <motion.div 
          className="mt-8 text-center space-y-4"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}>
          <h2 className="text-4xl font-semibold">📊 Stats</h2>
          <p className="text-2xl">🗓️ Weekends left: <span className="font-bold">{weekendsLeft}</span></p>
          <p className="text-2xl">🏫 School days left: 
            <span className='underline cursor-pointer font-bold' onMouseEnter={handleHover}> {schoolDaysLeft} </span>
          </p>
        </motion.div>
      </div>
    </>
  );
}
