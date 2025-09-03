import { User, Phone, Mail, Star, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/types/restaurant";

interface ProfileSectionProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export const ProfileSection = ({ profile, onUpdateProfile }: ProfileSectionProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedProfile: UserProfile = {
      ...profile,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };
    
    onUpdateProfile(updatedProfile);
  };

  return (
    <div className="space-y-6">
      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{profile.totalOrders}</p>
            <p className="text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{profile.favoriteItems.length}</p>
            <p className="text-muted-foreground">Favorite Items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <User className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">Regular</p>
            <p className="text-muted-foreground">Customer Status</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="name"
                  name="name"
                  defaultValue={profile.name}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profile.email}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={profile.phone}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Restaurant Information */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">MOS Restaurant</h4>
            <p className="text-muted-foreground text-sm">
              Authentic Indian Cuisine & Pizza<br />
              123 Food Street, Gourmet District<br />
              Open Daily: 11:00 AM - 10:00 PM
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Pickup Instructions</h4>
            <p className="text-muted-foreground text-sm">
              • Orders are prepared fresh after payment<br />
              • Please arrive within 15 minutes of pickup notification<br />
              • Show your order confirmation at the counter<br />
              • Free parking available for pickup customers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};