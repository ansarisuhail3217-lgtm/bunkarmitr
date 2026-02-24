import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-card/80 hover:bg-card border border-border rounded-full shadow-sm hover:shadow-card transition-all duration-200 active:scale-95 mb-4"
    >
      <ArrowLeft size={16} />
      <span>वापस</span>
    </motion.button>
  );
}
