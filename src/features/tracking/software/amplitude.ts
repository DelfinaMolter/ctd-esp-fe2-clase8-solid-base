import { InitializeTrackingSoftware } from 'features/tracking/tracking.types';

class AmplitudeTrackingSoftware implements InitializeTrackingSoftware {
  private initialized = false;

  initialize(): void {
    this.initialized = true;
    // DO EXTRA LOGIC
  }

  trackEvent(eventName: string, location: string): void {
    if (this.initialized) {
      console.log('Event: ' + eventName + ' dispatched from: ' + location);
    }
  }
}

export default AmplitudeTrackingSoftware;
