import React, {useState, useEffect} from 'react';

const Loader = () => {
    const [totalComponents, setTotalComponents] = useState(0);
    const [loadedComponents, setLoadedComponents] = useState(0);

    useEffect(() => {
        const totalRoutes = document.querySelectorAll('[data-route]').length;
        setTotalComponents(totalRoutes);
        console.log(loadedComponents)
        const handleComponentLoad = () => {
            setLoadedComponents(prevLoaded => prevLoaded + 1);
        };

        document.addEventListener('componentLoaded', handleComponentLoad);

        return () => {
            document.removeEventListener('componentLoaded', handleComponentLoad);
        };
    }, [loadedComponents]);

    const progress = totalComponents === 0 ? 100 : (loadedComponents / totalComponents) * 100;

    return (
        <div className="loader">
            <p>{Math.round(progress)}%</p>
        </div>
    );
};

export default Loader;
