function LoadingSpinner({ size = 'medium', message = 'Carregando...' }) {
  const sizeClasses = {
    small: '20px',
    medium: '40px',
    large: '60px'
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div
        style={{
          width: sizeClasses[size],
          height: sizeClasses[size],
          border: '3px solid #f3f3f3',
          borderTop: '3px solid var(--jw-blue)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      {message && (
        <p style={{
          marginTop: '12px',
          color: '#666',
          fontSize: '14px'
        }}>
          {message}
        </p>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner