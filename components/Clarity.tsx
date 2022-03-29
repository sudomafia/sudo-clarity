import { clarity, version } from 'clarity-js';
import { Config, ExtractSource } from 'clarity-js/types/core';
import { useEffect } from 'react';

const config: Config = {
  delay: 500,
  upload: (data) => {
    navigator.sendBeacon('/api/clarity', data)
  },
  // extract: [ExtractSource.Javascript, "performance.timing"],
  projectId: 'asdf',
}

export default function Clarity() {
  useEffect(() => {
    clarity.start(config);
    console.log(version);

    return () => {
      clarity.stop();
    }
  }, []);

  return null;
}