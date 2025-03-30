import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Air Quality Monitoring</h1>
      <nav className="mt-4">
        <Link to="/upload" className="mr-4 text-blue-500">Upload Data</Link>
        <Link to="/dashboard" className="text-blue-500">View Dashboard</Link>
      </nav>
    </div>
  );
}