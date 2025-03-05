import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerAddress } from "@/app/types/customer";

interface AddressFormProps {
  address: CustomerAddress;
  onChange: (address: CustomerAddress) => void;
}

export function AddressForm({ address, onChange }: AddressFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="street">Street</Label>
        <Input
          id="street"
          value={address.street}
          onChange={(e) => onChange({ ...address, street: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="number">Number</Label>
          <Input
            id="number"
            value={address.number}
            onChange={(e) => onChange({ ...address, number: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="complement">Complement</Label>
          <Input
            id="complement"
            value={address.complement}
            onChange={(e) => onChange({ ...address, complement: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={address.city}
          onChange={(e) => onChange({ ...address, city: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            id="postcode"
            value={address.postcode}
            onChange={(e) => onChange({ ...address, postcode: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={address.country}
            onChange={(e) => onChange({ ...address, country: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );
} 