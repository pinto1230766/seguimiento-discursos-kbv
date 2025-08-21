import React, { useState } from 'react'
import { useAppStore } from '../stores/appStore'

const AdvancedFilters = ({ onFiltersChange, currentFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    allergies: currentFilters.allergies || '',
    congregation: currentFilters.congregation || '',
    dateRange: currentFilters.dateRange || '',
    status: currentFilters.status || '',
    needs: currentFilters.needs || [],
    ...currentFilters
  })

  const { oradores, hotes } = useAppStore()

  const congregations = [...new Set(oradores.map(o => o.congregation).filter(Boolean))]
  const allergyTypes = ['grave', 'moderee']
  const statusOptions = ['confirmé', 'proposé', 'annulé']
  const needsOptions = ['hebergement', 'repas', 'transport']

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleNeedsChange = (need) => {
    const newNeeds = filters.needs.includes(need)
      ? filters.needs.filter(n => n !== need)
      : [...filters.needs, need]
    
    handleFilterChange('needs', newNeeds)
  }

  const clearFilters = () => {
    const emptyFilters = {
      allergies: '',
      congregation: '',
      dateRange: '',
      status: '',
      needs: []
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  )

  return (
    <div className="advanced-filters">
      <button
        className={`filters-toggle ${hasActiveFilters ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="filter-icon">🔍</span>
        <span>Filtros</span>
        {hasActiveFilters && <span className="filter-count">{
          Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== '').length
        }</span>}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </button>

      {isOpen && (
        <div className="filters-panel">
          <div className="filters-grid">
            {/* Congregação */}
            <div className="filter-group">
              <label>Congregação</label>
              <select
                value={filters.congregation}
                onChange={(e) => handleFilterChange('congregation', e.target.value)}
              >
                <option value="">Todas</option>
                {congregations.map(cong => (
                  <option key={cong} value={cong}>{cong}</option>
                ))}
              </select>
            </div>

            {/* Alergias */}
            <div className="filter-group">
              <label>Alergias</label>
              <select
                value={filters.allergies}
                onChange={(e) => handleFilterChange('allergies', e.target.value)}
              >
                <option value="">Todas</option>
                <option value="none">Sem alergias</option>
                {allergyTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'grave' ? 'Graves' : 'Moderadas'}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="filter-group">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">Todos</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === 'confirmé' ? 'Confirmado' : 
                     status === 'proposé' ? 'Proposto' : 'Cancelado'}
                  </option>
                ))}
              </select>
            </div>

            {/* Período */}
            <div className="filter-group">
              <label>Período</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="">Todos</option>
                <option value="this-week">Esta semana</option>
                <option value="this-month">Este mês</option>
                <option value="next-month">Próximo mês</option>
                <option value="past">Passadas</option>
              </select>
            </div>
          </div>

          {/* Necessidades */}
          <div className="filter-group">
            <label>Necessidades</label>
            <div className="checkbox-group">
              {needsOptions.map(need => (
                <label key={need} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.needs.includes(need)}
                    onChange={() => handleNeedsChange(need)}
                  />
                  <span>{
                    need === 'hebergement' ? 'Hospedagem' :
                    need === 'repas' ? 'Refeições' : 'Transporte'
                  }</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filters-actions">
            <button onClick={clearFilters} className="clear-filters">
              Limpar Filtros
            </button>
            <button onClick={() => setIsOpen(false)} className="apply-filters">
              Aplicar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .advanced-filters {
          margin-bottom: 16px;
        }

        .filters-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-medium);
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          justify-content: space-between;
        }

        .filters-toggle:hover {
          background: var(--bg-tertiary);
        }

        .filters-toggle.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        .filter-icon {
          font-size: 16px;
        }

        .filter-count {
          background: var(--warning-color);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .arrow {
          transition: transform 0.2s ease;
        }

        .arrow.up {
          transform: rotate(180deg);
        }

        .filters-panel {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-medium);
          padding: 16px;
          margin-top: 8px;
          box-shadow: var(--shadow-light);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-group label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .filter-group select {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-small);
          padding: 8px 12px;
          font-size: 14px;
          color: var(--text-primary);
        }

        .checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }

        .filters-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        .clear-filters {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: var(--radius-small);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-filters:hover {
          background: var(--bg-secondary);
        }

        .apply-filters {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: var(--radius-small);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-filters:hover {
          background: var(--primary-dark);
        }

        @media (max-width: 768px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }
          
          .filters-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default AdvancedFilters