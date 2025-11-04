'use client';

import { Container, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Toolbar from '@/components/Toolbar';
import DataTable from '@/components/DataTable';
import ManageColumnsDialog from '@/components/ManageColumnsDialog';
import ImportDialog from '@/components/ImportDialog';
import AnimatedBackground from '@/components/AnimatedBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box>
            <motion.div variants={itemVariants}>
              <Toolbar />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.002 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <DataTable />
            </motion.div>
            <ManageColumnsDialog />
            <ImportDialog />
          </Box>
        </motion.div>
      </Container>
    </>
  );
}
