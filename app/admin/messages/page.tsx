"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, Trash2, Mail, MailOpen } from "lucide-react"
import { getContactSubmissions, markContactSubmissionAsRead, deleteContactSubmission } from "@/lib/api"
import type { ContactSubmission } from "@/types/database"
import { useToast } from "@/components/ui/use-toast"

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const loadMessages = async () => {
    try {
      setIsLoading(true)
      const data = await getContactSubmissions()
      setMessages(data)
    } catch (error) {
      console.error("Failed to load messages:", error)
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [toast])

  const handleOpenMessage = async (message: ContactSubmission) => {
    setSelectedMessage(message)

    if (!message.read) {
      try {
        const updatedMessage = await markContactSubmissionAsRead(message.id)
        setMessages(messages.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)))
      } catch (error) {
        console.error("Failed to mark message as read:", error)
      }
    }
  }

  const handleDelete = async () => {
    if (!messageToDelete) return

    try {
      await deleteContactSubmission(messageToDelete)
      setMessages(messages.filter((message) => message.id !== messageToDelete))
      toast({
        title: "Success",
        description: "Message deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete message:", error)
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setMessageToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

      <Card>
        <CardContent className="p-0">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No messages found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={`cursor-pointer ${!message.read ? "font-medium" : ""}`}
                    onClick={() => handleOpenMessage(message)}
                  >
                    <TableCell>
                      {message.read ? (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MailOpen className="h-3 w-3" /> Read
                        </Badge>
                      ) : (
                        <Badge className="flex items-center gap-1">
                          <Mail className="h-3 w-3" /> New
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>{new Date(message.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setMessageToDelete(message.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 border rounded-md p-4 max-h-[300px] overflow-y-auto">
            <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedMessage(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!messageToDelete} onOpenChange={() => setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
