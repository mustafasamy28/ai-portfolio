import Layout from './Components/Layout';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div className="w-full h-full cursor-progress">
      <Layout />
      <SpeedInsights />
    </div>
  );
}
