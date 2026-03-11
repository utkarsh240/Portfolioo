'use client'

import React, { useState, useEffect } from 'react'

// Lazy-mount to guarantee this only renders in the browser
export default function CyberGlobeWrapper() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // Import CyberGlobe only after mounting on the client
    const CyberGlobe = require('./CyberGlobe').default
    return <CyberGlobe />
}
