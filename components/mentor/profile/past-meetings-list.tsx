import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This would typically come from a database or API
const pastMeetings = [
  { id: 1, teacherName: "John Smith", date: "2023-05-15" },
  { id: 2, teacherName: "Emily Johnson", date: "2023-05-10" },
  { id: 3, teacherName: "Michael Brown", date: "2023-05-05" },
  { id: 4, teacherName: "Sarah Davis", date: "2023-04-30" },
  { id: 5, teacherName: "David Wilson", date: "2023-04-25" },
]

export function PastMeetingsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Teacher Name</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pastMeetings.map((meeting) => (
          <TableRow key={meeting.id}>
            <TableCell>{meeting.teacherName}</TableCell>
            <TableCell>{meeting.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

