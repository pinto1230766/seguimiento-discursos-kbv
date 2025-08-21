import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Clock } from 'react-feather';
import { useAppStore } from '../stores/appStore';
import { useDebounce } from '../hooks/useDebounce';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/components/global-search.css';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const { oradores, hotes, eventos, attributions } = useAppStore();
  const debouncedQuery = useDebounce(query, 200);
  
  // Charger les recherches récentes depuis le stockage local
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);
  
  // Sauvegarder une recherche récente
  const saveSearch = useCallback((searchTerm, result) => {
    const searchItem = {
      id: Date.now(),
      term: searchTerm,
      result: {
        type: result.type,
        id: result.id,
        title: result.title,
        subtitle: result.subtitle,
        icon: result.icon
      },
      timestamp: new Date().toISOString()
    };
    
    setRecentSearches(prev => {
      const updated = [searchItem, ...prev.filter(item => 
        item.term.toLowerCase() !== searchTerm.toLowerCase()
      )].slice(0, 5); // Limiter à 5 recherches récentes
      
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Gestion du clic en dehors du composant
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Focus sur l'input quand le composant s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Recherche lorsque la requête change
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const searchResults = [];
    const q = debouncedQuery.toLowerCase();

    // Rechercher des orateurs
    oradores.forEach(orador => {
      if (orador.nom?.toLowerCase().includes(q) || 
          orador.congregation?.toLowerCase().includes(q) ||
          orador.phone?.includes(q)) {
        searchResults.push({
          type: 'orador',
          id: orador.id,
          title: orador.nom,
          subtitle: orador.congregation,
          icon: '👤',
          action: () => {
            saveSearch(debouncedQuery, {
              type: 'orador',
              id: orador.id,
              title: orador.nom,
              subtitle: orador.congregation,
              icon: '👤'
            });
            navigate(`/oradores?id=${orador.id}`);
            onClose();
          }
        });
      }
    });

    // Rechercher des hôtes
    hotes.forEach(host => {
      if (host.nom?.toLowerCase().includes(q) || host.phone?.includes(q)) {
        searchResults.push({
          type: 'hôte',
          id: host.id,
          title: host.nom,
          subtitle: host.phone || 'Pas de téléphone',
          icon: '🏠',
          action: () => {
            saveSearch(debouncedQuery, {
              type: 'hôte',
              id: host.id,
              title: host.nom,
              subtitle: host.phone || 'Pas de téléphone',
              icon: '🏠'
            });
            navigate(`/hotes?id=${host.id}`);
            onClose();
          }
        });
      }
    });

    // Rechercher des événements
    eventos.forEach(evento => {
      if ((evento.title?.toLowerCase().includes(q) || 
          evento.description?.toLowerCase().includes(q)) &&
          evento.date) {
            
        const eventDate = new Date(evento.date);
        const formattedDate = eventDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        
        searchResults.push({
          type: 'événement',
          id: evento.id,
          title: evento.title || 'Événement sans titre',
          subtitle: formattedDate,
          icon: '📅',
          action: () => {
            saveSearch(debouncedQuery, {
              type: 'événement',
              id: evento.id,
              title: evento.title || 'Événement sans titre',
              subtitle: formattedDate,
              icon: '📅'
            });
            navigate(`/calendario?date=${evento.date}`);
            onClose();
          }
        });
      }
    });

    // Rechercher des attributions
    attributions.forEach(attr => {
      const orador = oradores.find(o => o.id === attr.orateurId);
      const host = hotes.find(h => h.id === attr.hoteId);
      
      if (orador && (orador.nom?.toLowerCase().includes(q) || 
          (host?.nom && host.nom.toLowerCase().includes(q)))) {
            
        const attributionDate = new Date(attr.dateVisite);
        const formattedDate = attributionDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        
        searchResults.push({
          type: 'attribution',
          id: attr.id,
          title: `${orador.nom} → ${host?.nom || 'Sans hôte'}`,
          subtitle: formattedDate,
          icon: '🔗',
          action: () => {
            saveSearch(debouncedQuery, {
              type: 'attribution',
              id: attr.id,
              title: `${orador.nom} → ${host?.nom || 'Sans hôte'}`,
              subtitle: formattedDate,
              icon: '🔗'
            });
            navigate(`/atribuicoes?id=${attr.id}`);
            onClose();
          }
        });
      }
    });

    setResults(searchResults.slice(0, 8));
    setSelectedIndex(0);
  }, [debouncedQuery, oradores, hotes, eventos, attributions, navigate, onClose, saveSearch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      results[selectedIndex]?.action();
    }
  }, [onClose, results, selectedIndex]);
  
  const handleClearSearch = useCallback((e) => {
    e.stopPropagation();
    setQuery('');
    inputRef.current?.focus();
  }, []);
  
  const handleRecentSearchClick = useCallback((search) => {
    setQuery(search.term);
    // Déclencher la recherche pour ce terme
    const event = new Event('input', { bubbles: true });
    if (inputRef.current) {
      inputRef.current.value = search.term;
      inputRef.current.dispatchEvent(event);
    }
  }, []);
  
  const handleResultClick = useCallback((result, e) => {
    e.preventDefault();
    result.action();
  }, []);
  
  // Rendu du composant
  if (!isOpen) return null;
  
  const showRecentSearches = recentSearches.length > 0 && !query.trim() && isFocused;
  const showNoResults = query.trim() && results.length === 0 && !showRecentSearches;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-20 z-50"
      onClick={onClose}
    >
      <motion.div 
        ref={containerRef}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
      >
        {/* En-tête de la recherche */}
        <div className="relative p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={20} 
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-white"
              placeholder="Rechercher des orateurs, hôtes, événements..."
              autoComplete="off"
            />
            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Effacer la recherche"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Contenu des résultats */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Résultats de la recherche */}
          {results.length > 0 && (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                    selectedIndex === index ? 'bg-gray-50 dark:bg-gray-700' : ''
                  }`}
                  onClick={(e) => handleResultClick(result, e)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 mr-3">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result.subtitle}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {result.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aucun résultat */}
          {showNoResults && (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">Aucun résultat trouvé pour "{query}"</p>
              <p className="text-sm text-gray-400 mt-2">Essayez d'autres termes de recherche</p>
            </div>
          )}

          {/* Recherches récentes */}
          {showRecentSearches && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recherches récentes
                </h3>
                <button 
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('recentSearches');
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Effacer tout
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search) => (
                  <button
                    key={search.id}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <Clock className="text-gray-400 mr-3" size={16} />
                    <span className="text-gray-700 dark:text-gray-200 truncate">
                      {search.term}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pied de page avec raccourci clavier */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Appuyez sur</span>
            <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 shadow-sm">
              Échap
            </kbd>
            <span>pour fermer</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

GlobalSearch.propTypes = {
  /** Indique si la barre de recherche est ouverte */
  isOpen: PropTypes.bool.isRequired,
  /** Fonction appelée pour fermer la barre de recherche */
  onClose: PropTypes.func.isRequired
};

export default GlobalSearch;