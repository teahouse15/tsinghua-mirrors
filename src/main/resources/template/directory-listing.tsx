import { Box, FileText } from "lucide-react"

export default function Component() {
    const directories = [
        { name: "Parent directory/", date: "-" },
        { name: "centosplus/", date: "2014-07-31 22:43" },
        { name: "centosplus-testing/", date: "2014-07-31 23:46" },
        { name: "cern/", date: "2015-04-02 22:26" },
        { name: "cern-testing/", date: "2014-07-29 20:18" },
        { name: "cr/", date: "2015-04-01 22:54" },
        { name: "cr-testing/", date: "2015-04-01 22:53" },
        { name: "extras/", date: "2014-07-31 22:42" },
        { name: "extras-testing/", date: "2014-07-31 23:47" },
        { name: "fasttrack/", date: "2015-04-01 23:10" },
        { name: "fasttrack-testing/", date: "2015-04-01 23:10" },
        { name: "isos/", date: "2014-07-06 06:04" },
        { name: "os/", date: "2014-07-31 22:41" },
        { name: "updates/", date: "2014-07-29 20:18" },
        { name: "updates-testing/", date: "2014-07-31 23:47" },
    ]

    return (
        <div className="container mx-auto p-4 font-mono">
            <div className="flex items-center mb-4">
                <Box className="mr-2" />
                <h1 className="text-2xl font-bold">Index of /cc/7.0/</h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span>Last Update: 0000-00-00 00:00</span>
                <span className="bg-yellow-500 text-black px-2 py-1 rounded">failed</span>
            </div>
            <table className="w-full">
                <thead>
                <tr className="border-b">
                    <th className="text-left pb-2">File Name</th>
                    <th className="text-left pb-2">File Size</th>
                    <th className="text-left pb-2">Date</th>
                </tr>
                </thead>
                <tbody>
                {directories.map((dir, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                        <td className="py-2 text-blue-600">
                            <div className="flex items-center">
                                <FileText className="mr-2 w-4 h-4" />
                                {dir.name}
                            </div>
                        </td>
                        <td className="py-2">-</td>
                        <td className="py-2">{dir.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}