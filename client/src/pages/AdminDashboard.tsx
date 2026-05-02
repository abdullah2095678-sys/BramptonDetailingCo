import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: orders, isLoading, refetch } = trpc.orders.getAll.useQuery(undefined as any, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const updateStatusMutation = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      setIsDialogOpen(false);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-foreground/70 mb-6">You need to log in to access the admin dashboard.</p>
          <a href={getLoginUrl()}>
            <Button className="w-full">Log In</Button>
          </a>
        </Card>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-foreground/70">You do not have permission to access this page.</p>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "completed":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Orders Dashboard</h1>
          <p className="text-foreground/70">Manage and track all customer bookings</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-foreground/50">Loading orders...</div>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{order.customerName}</h3>
                    <p className="text-sm text-foreground/70">{order.customerEmail}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(order.status)} border`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-foreground/70">Vehicle</p>
                    <p className="font-semibold capitalize">{order.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-foreground/70">Service</p>
                    <p className="font-semibold">{order.servicePackage}</p>
                  </div>
                  <div>
                    <p className="text-foreground/70">Date & Time</p>
                    <p className="font-semibold">
                      {order.serviceDate} at {order.serviceTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground/70">Price</p>
                    <p className="font-semibold text-primary">${(order.finalPrice / 100).toFixed(2)}</p>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-background rounded border border-border/50">
                  <p className="text-sm text-foreground/70 mb-1">Address:</p>
                  <p className="text-sm">{order.address}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Eye size={16} className="mr-1" />
                    View Details
                  </Button>
                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        updateStatusMutation.mutate({
                          id: order.id,
                          status: "completed",
                        });
                      }}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Mark Done
                    </Button>
                  )}
                  {order.status !== "cancelled" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        updateStatusMutation.mutate({
                          id: order.id,
                          status: "cancelled",
                        });
                      }}
                    >
                      <XCircle size={16} className="mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-foreground/70 text-lg">No orders yet. Check back soon!</p>
          </Card>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/70">Customer Name</p>
                  <p className="font-semibold">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Phone</p>
                  <p className="font-semibold">{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Email</p>
                  <p className="font-semibold text-sm">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Payment Method</p>
                  <p className="font-semibold capitalize">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-bold mb-2">Service Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/70">Vehicle Type</p>
                    <p className="font-semibold capitalize">{selectedOrder.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Service Package</p>
                    <p className="font-semibold">{selectedOrder.servicePackage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Date</p>
                    <p className="font-semibold">{selectedOrder.serviceDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Time</p>
                    <p className="font-semibold">{selectedOrder.serviceTime}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-bold mb-2">Pricing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Base Price:</span>
                    <span>${(selectedOrder.price / 100).toFixed(2)}</span>
                  </div>
                  {selectedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({selectedOrder.promoCode}):</span>
                      <span>-${(selectedOrder.discountAmount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t border-border pt-2">
                    <span>Final Price:</span>
                    <span className="text-primary">${(selectedOrder.finalPrice / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-bold mb-2">Address</h4>
                <p className="text-sm">{selectedOrder.address}</p>
              </div>

              {selectedOrder.specialRequests && (
                <div className="border-t border-border pt-4">
                  <h4 className="font-bold mb-2">Special Requests</h4>
                  <p className="text-sm">{selectedOrder.specialRequests}</p>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <p className="text-xs text-foreground/50">
                  Order ID: {selectedOrder.id} | Created: {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
