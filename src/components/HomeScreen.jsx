export default function HomeScreen({ onStart }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 bg-white animate-fade-in">

      {/* Icon */}
      <div className="mb-8 w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center">
        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.75h.75v.75h-.75v-.75zM16.75 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75V13.5zM13.5 18.75h.75v.75h-.75v-.75zM18.75 13.5h.75v.75h-.75V13.5zM18.75 18.75h.75v.75h-.75v-.75zM16.5 16.5h.75v.75H16.5V16.5z" />
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 mb-2">
        Ticket Scanner
      </h1>
      <p className="text-sm text-neutral-400 text-center leading-relaxed mb-10">
        Scan a QR code to verify<br />guest entry to the event
      </p>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full max-w-xs bg-neutral-950 text-white text-sm font-medium py-4 rounded-2xl active:scale-95 transition-transform"
      >
        Start Scanning
      </button>
    </div>
  )
}
