import { useState, useCallback, useRef } from 'react'
import QrScanner from 'react-qr-scanner'
import { scanTicket } from '../hooks/useScanTicket'
import ResultModal from './ResultModal'

const STATE = { SCANNING: 'scanning', LOADING: 'loading', RESULT: 'result', ERROR: 'error' }

export default function Scanner({ onGoHome }) {
  const [state, setState] = useState(STATE.SCANNING)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const processing = useRef(false)

  const handleScan = useCallback(async (data) => {
    if (!data || processing.current) return
    const raw = typeof data === 'string' ? data : data?.text
    if (!raw) return
    console.log({raw});
    const [id] = raw.split('|')
    if (!id) return

    processing.current = true
    setState(STATE.LOADING)

    try {
      const res = await scanTicket(id)
      setResult(res)
      setState(STATE.RESULT)
    } catch (err) {
      setError(err.message)
      setState(STATE.ERROR)
    }
  }, [])

  const handleKeepScanning = useCallback(() => {
    processing.current = false
    setResult(null)
    setError(null)
    setState(STATE.SCANNING)
  }, [])

  const isActive = state === STATE.SCANNING || state === STATE.LOADING

  return (
    <div className="h-full flex flex-col bg-black">

      {/* Camera */}
      <div className="flex-1 relative overflow-hidden">
        {isActive && (
          <QrScanner
            onScan={handleScan}
            onError={console.log('test')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            constraints={{ video: { facingMode: 'environment' } }}
          />
        )}

        {/* Darkened edges */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }}
        />

        {/* Scan frame */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-56 h-56">
            {/* Corners */}
            <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-white rounded-tl-sm" />
            <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-white rounded-tr-sm" />
            <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-white rounded-bl-sm" />
            <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-white rounded-br-sm" />

            {/* Scan line */}
            {state === STATE.SCANNING && (
              <div className="absolute left-2 right-2 h-px bg-white/70 animate-scan"
                style={{ boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
              />
            )}
          </div>
        </div>

        {/* Loading overlay */}
        {state === STATE.LOADING && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin-slow" />
            <span className="text-white/60 text-xs tracking-widest font-mono">VERIFYING</span>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="bg-white px-6 pt-5 pb-8 flex flex-col items-center gap-3">
        <p className="text-xs text-neutral-400 tracking-wide">
          {state === STATE.SCANNING ? 'Align QR code within the frame' : ''}
        </p>
        <button
          onClick={onGoHome}
          className="w-full max-w-xs border border-neutral-200 text-neutral-500 text-sm py-3.5 rounded-xl active:scale-95 transition-transform"
        >
          Quit Scanning
        </button>
      </div>

      {/* Modal */}
      {(state === STATE.RESULT || state === STATE.ERROR) && (
        <ResultModal
          result={result}
          error={error}
          onKeepScanning={handleKeepScanning}
          onGoHome={onGoHome}
        />
      )}
    </div>
  )
}
