import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactList } from "@/components/contacts/contact-list";
import { ContactSearch } from "@/components/contacts/contact-search";
import { Suspense } from "react";
import {
  Users,
  AlertCircle,
  Calendar,
  TrendingUp,
  Plus
} from "lucide-react";

export default async function CrmDashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Personal CRM Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your professional relationships intelligently
          </p>
        </div>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Requires follow-up</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">From email & calendar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<div>Loading search...</div>}>
            <ContactSearch />
          </Suspense>
          <Suspense fallback={<div>Loading contacts...</div>}>
            <ContactList />
          </Suspense>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Meeting with John</span>
                  <span className="text-muted-foreground">2h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Email from Sarah</span>
                  <span className="text-muted-foreground">5h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Call with Mike</span>
                  <span className="text-muted-foreground">1d ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Follow up with Alex</span>
                  <span className="text-muted-foreground">Tomorrow</span>
                </div>
                <div className="flex justify-between">
                  <span>Check in with Emma</span>
                  <span className="text-muted-foreground">Wed</span>
                </div>
                <div className="flex justify-between">
                  <span>Review project with Tom</span>
                  <span className="text-muted-foreground">Fri</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}