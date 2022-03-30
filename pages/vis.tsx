import { Visualizer } from 'clarity-visualize';
import { Data, waitSync } from '../db';
import { MutableRefObject, useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { DecodedEvent } from 'clarity-decode/types/data';
import { Activity, ElementData } from 'clarity-visualize/types/visualize';

export async function getServerSideProps() {
  await waitSync;
  const data = await Data.findAll({ limit: 1000, order: [['createdAt', 'DESC']] });
  return {
    props: { data: data.map(a => JSON.parse(a.toJSON().data)) }
  }
}

export default function Viz({ data }) {
  const [viz, setViz] = useState<Visualizer>();
  const [events, setEvents] = useState<DecodedEvent[]>();
  const iRef = useCallback((node: HTMLIFrameElement) => {
    if (node !== null) {
      const viz = new Visualizer();
      const merged = viz.merge(data);
      viz.setup(node.contentWindow, {
        version: data[0].envelope.version,
        dom: merged.dom
      });
      console.log(merged)
      setEvents(merged.events);
      setViz(viz);
    }
  }, [data]);

  useEffect(() => {
    if (events && events.length > 0 && viz) {
      const merged = viz.merge(data);
      const clicks = events
        // Filter Clicks
        .filter(e => e.event === 9)
        .map(e => ({
          ...e,
          // @ts-ignore
          dom: merged.dom.data[e.data.target]
        }))
        .map((e): ElementData => ({
          // @ts-ignore
          hash: e.data.hash,
          selector: e.dom.selector,
          totalclicks: 1,
          // @ts-ignore
          x: [e.data.eX],
          // @ts-ignore
          y: [e.data.eY],
          // key: `${e.data.eX}-${e.data.eY}`,
          clicks: [1],
          points: 1,
        }))
      
      viz.clickmap(Object.values(clicks));
    }
  })
  return <>
    <h1>Replay</h1>
    <iframe style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      border: 0
    }} ref={iRef} id="clarity" title="Clarity Inspector" scrolling="no"></iframe>
  </>;
}