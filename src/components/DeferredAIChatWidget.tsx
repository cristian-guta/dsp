import React, { Suspense, useEffect, useState } from 'react';

const LazyAIChatWidget = React.lazy(() => import('./AIChatWidget'));

const DeferredAIChatWidget: React.FC = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const load = () => setShouldLoad(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(load, 2500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LazyAIChatWidget />
    </Suspense>
  );
};

export default DeferredAIChatWidget;