import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowDown, Check } from 'react-feather';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/components/pull-to-refresh.css';

const PullToRefresh = ({ 
  onRefresh, 
  children, 
  pullThreshold = 80, 
  maxPull = 120, 
  pullFactor = 0.5,
  pullDownText = 'Puis vers le bas pour actualiser',
  releaseText = 'Relâchez pour actualiser',
  refreshingText = 'Mise à jour...',
  successText = 'Actualisé avec succès',
  showSuccess = true,
  successDuration = 1500,
  className = ''
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  const successTimerRef = useRef(null);

  // Nettoyer le timer lors du démontage
  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY <= 0 && e.touches.length > 0) {
      setStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (isRefreshing || window.scrollY > 0 || !isPulling) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > 0) {
      e.preventDefault();
      const distance = Math.min(diff * pullFactor, maxPull);
      setPullDistance(distance);
    }
  }, [isRefreshing, isPulling, startY, pullFactor, maxPull]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;
    
    if (pullDistance >= pullThreshold && !isRefreshing) {
      setIsRefreshing(true);
      setIsSuccess(false);
      
      try {
        await onRefresh();
        setIsSuccess(true);
        
        // Afficher le message de succès temporairement
        if (showSuccess) {
          if (successTimerRef.current) {
            clearTimeout(successTimerRef.current);
          }
          
          successTimerRef.current = setTimeout(() => {
            setIsSuccess(false);
          }, successDuration);
        }
      } catch (error) {
        console.error('Échec de l\'actualisation :', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setIsPulling(false);
    setPullDistance(0);
    setStartY(0);
  }, [isPulling, pullDistance, pullThreshold, isRefreshing, onRefresh, showSuccess, successDuration]);
  
  // Gestion des événements souris pour le desktop
  const handleMouseDown = useCallback((e) => {
    if (window.scrollY <= 0) {
      setStartY(e.clientY);
      setIsPulling(true);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isPulling || isRefreshing || window.scrollY > 0) return;
    
    const currentY = e.clientY;
    const diff = currentY - startY;

    if (diff > 0) {
      e.preventDefault();
      const distance = Math.min(diff * pullFactor, maxPull);
      setPullDistance(distance);
    }
  }, [isPulling, isRefreshing, startY, pullFactor, maxPull]);

  const handleMouseUp = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isPulling) {
      setIsPulling(false);
      setPullDistance(0);
      setStartY(0);
    }
  }, [isPulling]);

  // Effet pour gérer les écouteurs d'événements
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Événements tactiles
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    // Événements souris pour le desktop
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      // Nettoyage des événements tactiles
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleMouseMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);

      // Nettoyage des événements souris
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave]);

  // Calcul du progrès du pull (0 à 1)
  const pullProgress = Math.min(pullDistance / pullThreshold, 1);
  
  // Effet de rebond pour une animation plus naturelle
  const bounceEffect = isPulling && pullDistance > 0 
    ? Math.sin(pullProgress * Math.PI) * 10 
    : 0;

  // Styles dynamiques
  const containerStyle = {
    '--pull-progress': pullProgress,
    '--pull-distance': `${pullDistance}px`,
    '--bounce-effect': `${bounceEffect}px`,
    '--indicator-opacity': Math.min(pullDistance / 30, 1),
    '--indicator-scale': 0.5 + (0.5 * Math.min(pullDistance / pullThreshold, 1)),
  };

  // Rendu du composant
  return (
    <div 
      ref={containerRef} 
      className={`pull-to-refresh-container ${className}`}
      style={containerStyle}
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing || isSuccess) && (
          <motion.div 
            className="pull-to-refresh-indicator"
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              y: Math.max(pullDistance - 50, 0),
              scale: 1 + (0.1 * Math.min(pullProgress, 1))
            }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="refresh-icon-container">
              <div className="refresh-icon-background" />
              <motion.div 
                className="refresh-icon"
                animate={{
                  rotate: isRefreshing ? 360 : 0,
                  y: isPulling ? 0 : -5,
                }}
                transition={{ 
                  rotate: { 
                    repeat: isRefreshing ? Infinity : 0, 
                    duration: 1, 
                    ease: "linear" 
                  },
                  y: { 
                    repeat: isPulling ? 0 : Infinity, 
                    repeatType: "reverse", 
                    duration: 0.8,
                    ease: "easeInOut"
                  }
                }}
              >
                {isSuccess ? (
                  <Check size={24} className="text-success" />
                ) : isRefreshing ? (
                  <RefreshCw size={24} className="animate-spin" />
                ) : (
                  <ArrowDown 
                    size={24} 
                    style={{
                      transform: `rotate(${pullProgress * 180}deg)`,
                      transition: 'transform 0.2s ease-out'
                    }} 
                  />
                )}
              </motion.div>
            </div>
            <motion.span 
              className="refresh-text"
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                opacity: pullDistance > 20 ? 1 : 0,
                y: 0
              }}
              transition={{ delay: 0.1 }}
            >
              {isSuccess 
                ? successText 
                : isRefreshing 
                  ? refreshingText 
                  : pullDistance >= pullThreshold 
                    ? releaseText 
                    : pullDownText}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="pull-to-refresh-content"
        style={{
          y: pullDistance,
          transition: pullDistance === 0 
            ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.4, 1)' 
            : 'none'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

PullToRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  pullThreshold: PropTypes.number,
  maxPull: PropTypes.number,
  pullFactor: PropTypes.number,
  pullDownText: PropTypes.string,
  releaseText: PropTypes.string,
  refreshingText: PropTypes.string,
  successText: PropTypes.string,
  showSuccess: PropTypes.bool,
  successDuration: PropTypes.number,
  className: PropTypes.string
};

export default PullToRefresh;