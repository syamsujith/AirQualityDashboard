import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard({ data }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Air Quality Dashboard</h2>
      <Card className="mt-4">
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {data.length > 0 && Object.keys(data[0]).map((col, index) => (
                  <th key={index} className="border p-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border">
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border p-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}