import React from 'react';
import Background3DOrig from './Background3D';

// Safe wrapper that catches WebGL/Three.js errors
class SafeBackground3D extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.warn('Background3D failed to load:', error.message);
    }

    render() {
        if (this.state.hasError) {
            // Fallback: simple gradient background
            return (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)'
                }} />
            );
        }

        return <Background3DOrig {...this.props} />;
    }
}

export default SafeBackground3D;
