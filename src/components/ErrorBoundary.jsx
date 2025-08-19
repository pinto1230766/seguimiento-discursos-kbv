import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', encodeURIComponent(error.message), errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#fff5f5',
          border: '1px solid #fed7d7',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#e53e3e', marginBottom: '16px' }}>
            Algo deu errado
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Ocorreu um erro inesperado. Tente recarregar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'var(--jw-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            🔄 Recarregar Página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary