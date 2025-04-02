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
  const [weekendDaysLeft, setWeekendDaysLeft] = useState(0);
  const [schoolDaysLeft, setSchoolDaysLeft] = useState(0);
  const [confettiVisible, setConfettiVisible] = useState(false); // State to control confetti

  useEffect(() => {
    const calculateData = () => {
      const now = new Date();
      const daysLeft = differenceInCalendarDays(countdownDate, now);
      setCountdown(formatDistanceToNow(countdownDate, { addSuffix: true }));

      const weekends = eachWeekendOfInterval({
        start: now,
        end: countdownDate
      });

      setWeekendsLeft(weekends.length);

      // Calculate weekend days (counting each Saturday and Sunday)
      let weekendDays = 0;
      weekends.forEach(() => {
        weekendDays += 1; // Sunday
      });

      setWeekendDaysLeft(weekendDays);

      // Calculate school days (assuming school days are weekdays)
      let schoolDays = 0;
      for (let i = 0; i <= daysLeft; i++) {
        const currentDate = new Date(now);
        currentDate.setDate(now.getDate() + i);
        if (!isWeekend(currentDate)) {
          schoolDays++;
        }
      }

      setSchoolDaysLeft(schoolDays);
    };

    calculateData();
    const interval = setInterval(calculateData, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Function to trigger confetti on hover
  const handleHover = () => {
    setConfettiVisible(true);
    setTimeout(() => setConfettiVisible(false), 50000); // Hide confetti after 3 seconds
  };

  return (
    <>
    <Head>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
      rel="stylesheet"
    />
  </Head>
    <div className="font-poppins w-full h-screen mx-auto px-4 py-10 relative bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradientBackground">
            
      <Link href={"https://dejny.eu"} className='cursor-pointer z-99 justify-center left-4 top-4 absolute'> 
        <p className='font-poppins'>Dejny.eu</p>
      </Link>

      {/* Confetti Component */}
      {confettiVisible && <Confetti />}

      <motion.h1
        className="text-4xl font-bold text-center mt-10 font-poppins relative z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        END OF THE SCHOOL
      </motion.h1>
      <motion.p
        className="text-xl text-center mt-5 relative z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
      >
        Time left: {countdown}
      </motion.p>
      
      <motion.div
        className="stats mt-10 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
      >
        <motion.h2
          className="text-2xl font-semibold text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
        >
          Stats
        </motion.h2>
        <motion.p
          className="text-center mt-3 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
        >
          Weekends left: {weekendsLeft / 2}
        </motion.p>
        <motion.p
          className="text-center mt-3 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
        >
          Weekend days left: {weekendDaysLeft}
        </motion.p>
        <motion.p
          className="text-center mt-3 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1, ease: "easeInOut" }}
        >
          School days left: {" "} 
          <span 
            className='underline cursor-pointer'
            onMouseEnter={handleHover}>
             {schoolDaysLeft}
          </span> 
        </motion.p>
        
      </motion.div>
    </div>
    </>
  );
}
