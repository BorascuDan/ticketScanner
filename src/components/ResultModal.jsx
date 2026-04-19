function formatTimestamp(ts) {
  if (!ts) return '—'
  try {
    return new Date(ts).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return ts
  }
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">{label}</span>
      <span className="text-sm text-neutral-800 font-medium break-all">{value || '—'}</span>
    </div>
  )
}

export default function ResultModal({ result, error, onKeepScanning, onGoHome }) {
  let scenario = 'error'
  if (result) {
    if (!result.allow) scenario = 'denied'
    else if (!result.scanned) scenario = 'allowed'
    else scenario = 'already_scanned'
  }

  const config = {
    allowed: {
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      icon: '✓',
      label: 'Entry Granted',
      labelColor: 'text-emerald-600',
      ctaBg: 'bg-emerald-600 text-white',
    },
    denied: {
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      icon: '✕',
      label: 'Access Denied',
      labelColor: 'text-red-500',
      ctaBg: 'bg-neutral-950 text-white',
    },
    already_scanned: {
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      icon: '!',
      label: 'Already Scanned',
      labelColor: 'text-amber-500',
      ctaBg: 'bg-neutral-950 text-white',
    },
    error: {
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      icon: '✕',
      label: 'Scan Error',
      labelColor: 'text-red-500',
      ctaBg: 'bg-neutral-950 text-white',
    },
  }[scenario]

  const { name, email } = result?.userData ?? {}

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-50">
      <div className="w-full bg-white rounded-t-3xl px-6 pt-6 pb-10 flex flex-col gap-5 animate-slide-up">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-semibold ${config.iconBg} ${config.iconColor}`}>
            {config.icon}
          </div>
          <span className={`text-base font-semibold ${config.labelColor}`}>
            {config.label}
          </span>
        </div>

        {/* User info card */}
        {scenario !== 'error' && (
          <div className="bg-neutral-50 rounded-2xl p-4 flex flex-col gap-3">
            <InfoRow label="Name" value={name} />
            <InfoRow label="Email" value={email} />
            {scenario === 'already_scanned' && result?.enter_timestamp && (
              <InfoRow label="Entered at" value={formatTimestamp(result.enter_timestamp)} />
            )}
          </div>
        )}

        {/* Message */}
        <p className="text-sm text-neutral-500 leading-relaxed">
          {scenario === 'allowed' && (
            <>Welcome! Please greet <strong className="text-neutral-700">{name || 'this guest'}</strong> and wish them a great time at the event.</>
          )}
          {scenario === 'denied' && (
            <><strong className="text-neutral-700">{name || 'This person'}</strong> is not permitted to enter — the invitation was not issued for this event.</>
          )}
          {scenario === 'already_scanned' && (
            <>This ticket has already been used. <strong className="text-neutral-700">{name || 'This person'}</strong> already entered at the time shown above.</>
          )}
          {scenario === 'error' && (
            <>{error || 'Something went wrong. Please try scanning again.'}</>
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 mt-1">
          <button
            onClick={onKeepScanning}
            className={`w-full py-4 rounded-2xl text-sm font-medium active:scale-95 transition-transform ${config.ctaBg}`}
          >
            Keep Scanning
          </button>
          <button
            onClick={onGoHome}
            className="w-full py-4 rounded-2xl text-sm font-medium text-neutral-500 border border-neutral-200 active:scale-95 transition-transform"
          >
            Quit Scanning
          </button>
        </div>
      </div>
    </div>
  )
}
