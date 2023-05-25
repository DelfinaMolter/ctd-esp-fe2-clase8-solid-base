import { createContext, FC, useContext, useMemo, useState } from 'react';
import {
  AmplitudeTrackingSoftware,
  FacebookTrackingSoftware,
  GoogleTrackingSoftware
} from 'features/tracking/software';
import { TrackingSoftware, InitializeTrackingSoftware } from 'features/tracking/tracking.types';

export interface TrackingState {
  trackingSoftwares: TrackingSoftware[];
  initializedTrackingSoftwares: InitializeTrackingSoftware[];
  trackEvent: (eventName: string, location: string) => void;
}

const TrackingContext = createContext<TrackingState | undefined>(undefined);

export const TrackingProvider: FC = ({ children }) => {
  const [trackingSoftwares] = useState([new GoogleTrackingSoftware()]);
  const [initializedTrackingSoftwares] = useState([
    new AmplitudeTrackingSoftware(),
    new FacebookTrackingSoftware()
  ]);

  const value = useMemo(
    () => ({
      trackingSoftwares,
      initializedTrackingSoftwares,
      trackEvent: (eventName: string, location: string) => {
        trackingSoftwares.forEach((trackingSoftwares) => {
          // Why do we initialize every service ?? if google doesn't require initialization
          trackingSoftwares.trackEvent(eventName, location);
          console.log(eventName);
        });
        initializedTrackingSoftwares.forEach((initializedTrackingSoftwares) => {
          // Why do we initialize every service ?? if google doesn't require initialization
          initializedTrackingSoftwares.initialize();
          initializedTrackingSoftwares.trackEvent(eventName, location);
        });
      }
    }),
    [trackingSoftwares, initializedTrackingSoftwares]
  );

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

const useTracking = (): TrackingState => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};

export default useTracking;
