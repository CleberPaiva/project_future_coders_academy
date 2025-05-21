import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrackProps {
  track: {
    grade: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  };
  delay?: number;
}

const TrackCard: React.FC<TrackProps> = ({ track, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="track-card"
    >
      <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${track.color} text-white`}>
        {track.icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2">{track.title}</h3>
      <p className="text-gray-600 mb-4">{track.description}</p>
      
      <Link 
        to={`/track/${track.grade}`}
        className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 transition-colors duration-200"
      >
        Ver mais
        <ArrowRight size={16} className="ml-1" />
      </Link>
    </motion.div>
  );
};

export default TrackCard;